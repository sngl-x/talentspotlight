"use client";

import React from "react";

interface WelcomeScreenProps {
  onStart: () => void;
  staticText: {
    welcomeMessage?: string;
    instructions?: string; // Add instructions to staticText
    startButton?: string;
  };
  language: string;
  onLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  staticText,
  language,
  onLanguageChange,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {staticText.welcomeMessage || "Welcome to the DPA Assessment Questionnaire"}
      </h1>
      <div className="max-w-3xl w-full mb-6 text-center"> {/* Instruction container */}
        <p className="text-lg text-gray-700">
          {staticText.instructions ||
            "The survey consists of 26 different questions. Please answer honestly and thoughtfully based on your experience. Click 'Start' to begin."}
        </p>
      </div>
      <div className="relative mb-6">
        <select
          value={language}
          onChange={onLanguageChange}
          className="appearance-none px-4 py-3 w-full max-w-xs text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none hover:border-gray-400 focus:ring-2 focus:ring-gray-300 cursor-pointer"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="sv">Svenska</option>
        </select>
      </div>
      <button
        onClick={onStart}
        className="px-6 py-3 font-medium text-white bg-[#007A78] rounded-lg hover:bg-[#005F5E] transition-all duration-150"
      >
        {staticText.startButton || "Start"}
      </button>
    </div>
  );
};

export default WelcomeScreen;
