import React from "react";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  hideCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ onClose, title, children, hideCloseButton }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {!hideCloseButton && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-md"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
