import React from "react";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  hideCloseButton?: boolean; // New optional prop
}

const Modal: React.FC<ModalProps> = ({ onClose, title, children, hideCloseButton }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <div>{children}</div>
        {!hideCloseButton && ( // Conditionally render the Close button
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;

