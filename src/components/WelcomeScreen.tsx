"use client";

import React from "react";
import { StaticText } from "../types";

interface WelcomeScreenProps {
  onStart: () => void;
  staticText: StaticText;
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {staticText.welcomeMessage || "Welcome to the DPA Assessment Questionnaire"}
      </h1>
      <div className="flex items-center mb-8">
        <label htmlFor="language" className="mr-2 text-gray-700 font-medium">
          Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={onLanguageChange}
          className="appearance-none px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none hover:border-gray-400 focus:ring-2 focus:ring-teal-300 cursor-pointer"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="sv">Svenska</option>
        </select>
      </div>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 shadow-md transition-all duration-150"
      >
        {staticText.startButton || "Start"}
      </button>
    </div>
  );
};

export default WelcomeScreen;
