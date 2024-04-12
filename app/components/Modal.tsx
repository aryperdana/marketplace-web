'use client'

import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full z-50" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">{children}</div>
                <div className="px-6 py-4 bg-gray-100 flex justify-end">
                <button className=" bg-transparent outline text-black hover:text-gray-800 px-2 rounded-sm" onClick={onClose}>
                    Close
                </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
