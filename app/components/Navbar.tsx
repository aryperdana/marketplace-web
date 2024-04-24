import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { BiSolidUser } from 'react-icons/bi';
import Modal from './Modal';

interface LoginResponse {
  detail: {
    access_token: string;
    refresh_token: string;
  };
}

export const Navbar = () => {
  const router = useRouter();

  const [modal, setModal] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://metaderma.bithouse.id/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: LoginResponse = await response.json();

      localStorage.setItem('accessToken', data.detail.access_token);
      localStorage.setItem('refreshToken', data.detail.refresh_token);

      setIsLoggedIn(true);
      setModal(false);
      router.push('/');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <div className="bg-white border-b-2 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="font-bold text-lg sm:text-2xl">
        Sellerlist
      </Link>
      <div className="flex gap-4">
        <Link href="/womenwears" className="text-gray-800 hover:text-gray-600">
          Womenwears
        </Link>
        <Link href="/menwears" className="text-gray-800 hover:text-gray-600">
          Menwears
        </Link>
        <Link href="/sale" className="text-gray-800 hover:text-gray-600">
          Sale
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex justify-center items-center gap-1 bg-black text-white rounded-md px-1 hover:text-gray-100"
          >
            <BiSolidUser className="text-xl" /> Logout
          </button>
        ) : (
          <button
            onClick={() => setModal(true)}
            className="flex justify-center items-center gap-1 bg-black text-white rounded-md px-1 hover:text-gray-100"
          >
            <BiSolidUser className="text-xl" /> Login
          </button>
        )}
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div className="border-b-2 mb-3 pb-4 font-bold text-lg text-center">Login Customer</div>
        <form onSubmit={handleLogin}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="mb-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="border-2 rounded-sm px-4 py-2 w-full"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-sm px-4 py-2 w-full"
            />
          </div>
          <Link href="/registration" className="text-blue-400 text-sm">
            Don't have account?
          </Link>
          <button type="submit" className="bg-black text-white py-2 px-4 rounded-md mt-6 w-full">
            Login
          </button>
        </form>
      </Modal>
    </div>
  );
};
