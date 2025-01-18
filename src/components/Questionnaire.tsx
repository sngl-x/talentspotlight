"use client";

import React, { useState, useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import { useSearchParams } from "next/navigation";
import { LocalizedText, QuestionText, MultiChoiceQuestion } from "../types";

const circleSizes = ["w-14 h-14", "w-12 h-12", "w-10 h-10", "w-10 h-10", "w-12 h-12", "w-14 h-14"];
const totalQuestions = 25;

const Questionnaire: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [responses, setResponses] = useState<Record<string, number | number[]>>({});
  const [selectedCircle, setSelectedCircle] = useState<Record<number, number>>({});
  const [localizedText, setLocalizedText] = useState<LocalizedText | null>(null);
  const [language, setLanguage] = useState("en");
  const searchParams = useSearchParams();
  const invitationId = searchParams.get("invitation_id");

  useEffect(() => {
    const loadLocalizedText = async () => {
      try {
        const res = await fetch(`/locales/questions-${language}.json`);
        const data: LocalizedText = await res.json();
        setLocalizedText(data);
      } catch (error) {
        console.error("Error loading localized text:", error);
      }
    };
    loadLocalizedText();
  }, [language]);

  if (!localizedText) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const staticText = localizedText.staticText;

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleResponseChange = (questionId: number, circleIndex: number) => {
    const valueMapping: Record<number, number> = { 1: 5, 2: 4, 3: 3.5, 4: 3.5, 5: 2, 6: 1 };
    setSelectedCircle((prev) => ({ ...prev, [questionId]: circleIndex }));
    setResponses((prev) => ({ ...prev, [questionId]: valueMapping[circleIndex] }));
  };

  const handleMultiChoiceChange = (id: string, option: number) => {
    setResponses((prev) => {
      const selected = Array.isArray(prev[id]) ? (prev[id] as number[]) : [];
      if (selected.includes(option)) {
        return { ...prev, [id]: selected.filter((o) => o !== option) };
      }
      if (selected.length < 3) {
        return { ...prev, [id]: [...selected, option] };
      }
      return prev;
    });
  };

  const handleNext = async () => {
    try {
      const isMultiChoice = currentQuestionIndex >= 23;
      const questionId = currentQuestionIndex + 1;

      if (isMultiChoice) {
        const multiQuestionId = `q${questionId}`;
        const selectedOptions = responses[multiQuestionId] || [];
        await fetch("/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitationId,
            [multiQuestionId]: selectedOptions,
          }),
        });
      } else {
        const responseValue = responses[questionId];
        await fetch("/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitationId,
            questionId,
            responseValue,
          }),
        });
      }

      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  if (currentQuestionIndex === -1) {
    return (
      <WelcomeScreen
        onStart={() => setCurrentQuestionIndex(0)}
        staticText={staticText}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  if (currentQuestionIndex >= 23) {
    const multiQuestionId = `q${currentQuestionIndex + 1}`;
    const currentMultiQuestion = localizedText[multiQuestionId] as MultiChoiceQuestion | undefined;

    const isResponseValid =
      Array.isArray(responses[multiQuestionId]) &&
      (responses[multiQuestionId] as number[]).length > 0;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            {currentMultiQuestion?.title || "Title not available"}
          </h1>
          <p className="text-lg text-gray-700 mb-6 text-center">
            {currentMultiQuestion?.description || "Description not available"}
          </p>
          <div className="flex flex-col items-center space-y-4">
            {currentMultiQuestion?.options.map((option, index) => (
              <button
                key={index}
                className={`rounded-lg px-4 py-2 w-full max-w-xs text-center shadow-sm transition-all duration-200 ${
                  Array.isArray(responses[multiQuestionId]) &&
                  (responses[multiQuestionId] as number[]).includes(index + 1)
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleMultiChoiceChange(multiQuestionId, index + 1)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className={`mt-6 px-6 py-3 font-medium rounded-lg transition-all duration-150 ${
              isResponseValid
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isResponseValid}
          >
            {currentQuestionIndex < totalQuestions - 1
              ? staticText.nextButton || "Next"
              : staticText.submitButton || "Submit"}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = localizedText[currentQuestionIndex + 1] as QuestionText | undefined;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-6">
      <header className="bg-white shadow-md w-full py-4 px-6 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">DPA Assessment Questionnaire</h1>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="appearance-none px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none hover:border-gray-400 focus:ring-2 focus:ring-teal-300 cursor-pointer"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="sv">Svenska</option>
        </select>
      </header>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            {staticText.prefixStatement || "In my organization..."}
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="text-gray-700 text-left">
            {currentQuestion?.statement || "Left statement not available"}
          </p>
          <div className="flex justify-center items-center space-x-2">
            {circleSizes.map((size, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-full border-2 border-gray-400 ${size} flex justify-center items-center transition-all ${
                  selectedCircle[currentQuestionIndex + 1] === index + 1
                    ? "bg-teal-600 border-teal-600"
                    : "hover:border-teal-600"
                }`}
                onClick={() => handleResponseChange(currentQuestionIndex + 1, index + 1)}
              />
            ))}
          </div>
          <p className="text-gray-700 text-right">
            {currentQuestion?.reverseStatement || "Right statement not available"}
          </p>
        </div>
        <div className="mt-4">
          <p className="text-gray-600 text-sm">
            {staticText.progressText || "Progress:"} {progressPercentage}%
          </p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleNext}
        className={`mt-6 px-6 py-3 font-medium rounded-lg transition-all duration-150 ${
          selectedCircle[currentQuestionIndex + 1]
            ? "bg-teal-600 text-white hover:bg-teal-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!selectedCircle[currentQuestionIndex + 1]}
      >
        {staticText.nextButton || "Next"}
      </button>
    </div>
  );
};

export default Questionnaire;
