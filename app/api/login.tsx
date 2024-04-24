import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    // Perform authentication logic here (e.g., validate credentials)
    if (email === 'user@example.com' && password === 'password') {
      // Authentication successful
      res.status(200).json({ message: 'Login successful' })
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}