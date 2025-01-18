"use client";

import React from "react";

interface EndScreenProps {
  staticText: {
    thankYouMessage?: string;
    completionMessage?: string;
  };
}

const EndScreen: React.FC<EndScreenProps> = ({ staticText }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        {staticText.thankYouMessage || "Thank you for completing the survey!"}
      </h1>
      <p className="text-lg text-gray-700 text-center">
        {staticText.completionMessage || "Your responses have been recorded successfully."}
      </p>
    </div>
  );
};

export default EndScreen;
