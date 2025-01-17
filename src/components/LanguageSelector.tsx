"use client";

import { useState } from "react";

interface LanguageSelectorProps {
  currentLanguage: string; // Current selected language code
  onSelectLanguage: (language: string) => void; // Function to handle language change
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onSelectLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "sv", label: "Svenska" },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="appearance-none px-4 py-3 w-full max-w-xs text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none hover:border-secondary focus:ring-2 focus:ring-secondary flex justify-between items-center transition-all"
      >
        {languages.find((lang) => lang.code === currentLanguage)?.label || "Select Language"}
        <svg
          className={`w-5 h-5 text-gray-500 ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.292 7.293a1 1 0 011.415 0L10 10.586l3.293-3.293a1 1 0 111.415 1.414l-4 4a1 1 0 01-1.415 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onSelectLanguage(lang.code); // Notify parent of language change
                setIsOpen(false); // Close the dropdown
              }}
              className={`block px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 ${
                lang.code === currentLanguage ? "font-bold text-primary" : ""
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
