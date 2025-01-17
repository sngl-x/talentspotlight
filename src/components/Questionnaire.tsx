"use client";

import React, { useState, useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import { useSearchParams } from "next/navigation";

// Define types for localizedText and staticText
interface StaticText {
  welcomeMessage?: string;
  startButton?: string;
  nextButton?: string;
  submitButton?: string;
  thankYouMessage?: string;
  loadingMessage?: string;
  completionMessage?: string;
  prefixStatement?: string;
  progressText?: string;
}

// Circle sizes
const circleSizes = ["w-14 h-14", "w-12 h-12", "w-10 h-10", "w-10 h-10", "w-12 h-12", "w-14 h-14"];

// Questions array (IDs and aspects only)
const questions = [
  { id: 1, aspect: "Well-being" },
  { id: 2, aspect: "Psychological Safety" },
  { id: 3, aspect: "Coherent" },
  { id: 4, aspect: "Collaboration" },
  { id: 5, aspect: "Power Distribution" },
  { id: 6, aspect: "Organizational Structure" },
  { id: 7, aspect: "Leadership Distribution" },
  { id: 8, aspect: "Self-leadership" },
  { id: 9, aspect: "Transparency" },
  { id: 10, aspect: "Feedback" },
  { id: 11, aspect: "Degree of Decentralization and Involvement" },
  { id: 12, aspect: "Balance/Focus" },
  { id: 13, aspect: "Salary Equilibrium" },
  { id: 14, aspect: "Profit-sharing" },
  { id: 15, aspect: "Collaboration Tools" },
  { id: 16, aspect: "Digital Information Sharing" },
  { id: 17, aspect: "Talent Acquisition" },
  { id: 18, aspect: "Competence Development" },
  { id: 19, aspect: "Work Flexibility" },
  { id: 20, aspect: "Measurement of Work" },
  { id: 21, aspect: "Social Engagement" },
  { id: 22, aspect: "Sustainability" },
  { id: 23, aspect: "Ethical Business Aspects" },
];

const totalQuestions = questions.length + 2; // Include multi-choice questions (q24, q25)

const Questionnaire: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [responses, setResponses] = useState<Record<string, number | number[]>>({});
  const [selectedCircle, setSelectedCircle] = useState<Record<number, number>>({}); // Tracks selected circle
  const [language, setLanguage] = useState("en");
  const [localizedText, setLocalizedText] = useState<Record<string, Record<string, string | string[]>>>({});
  const [staticText, setStaticText] = useState<StaticText>({});
  const [isComplete, setIsComplete] = useState(false);
  const searchParams = useSearchParams();
  const invitationId = searchParams.get("invitation_id");

  useEffect(() => {
    const loadLocalizedText = async (): Promise<void> => {
      try {
        const res = await fetch(`/locales/questions-${language}.json`);
        const data: Record<string, Record<string, string | string[]>> = await res.json();
        setLocalizedText(data);
        setStaticText(data.staticText || {});
      } catch (error) {
        console.error("Error loading localized text:", error);
      }
    };
    loadLocalizedText();
  }, [language]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
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
      return prev; // Prevent adding more than 3 options
    });
  };

const handleResponseChange = (questionId: number, circleIndex: number) => {
  const valueMapping: Record<number, number> = {
    1: 5,
    2: 4,
    3: 3.5,
    4: 3.5,
    5: 2,
    6: 1,
  };
  const mappedValue = valueMapping[circleIndex as keyof typeof valueMapping];

  // Update selected circle and corresponding response value
  setSelectedCircle((prev) => ({ ...prev, [questionId]: circleIndex }));
  setResponses((prev) => ({ ...prev, [questionId]: mappedValue }));
};

  const handleNext = async () => {
    try {
      const isMultiChoice = currentQuestionIndex >= questions.length;
      const multiIndex = currentQuestionIndex - questions.length;

      if (isMultiChoice) {
        const currentMultiQuestionId = `q${24 + multiIndex}`;
        const selectedOptions = responses[currentMultiQuestionId] || [];
        await fetch("/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitationId,
            [currentMultiQuestionId]: selectedOptions,
          }),
        });
      } else {
        const currentQuestion = questions[currentQuestionIndex];
        const responseValue = responses[currentQuestion.id];
        await fetch("/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitationId,
            questionId: currentQuestion.id,
            responseValue,
          }),
        });
      }

      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsComplete(true);
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {staticText.completionMessage || "Thank you for participating!"}
        </h1>
      </div>
    );
  }

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

  if (currentQuestionIndex >= questions.length) {
    const multiIndex = currentQuestionIndex - questions.length;
    const currentMultiQuestionId = `q${24 + multiIndex}`;
    const currentMultiQuestion = localizedText[currentMultiQuestionId];

    if (!currentMultiQuestion || typeof currentMultiQuestion !== "object") {
      console.error("Invalid multi-question format");
      return null;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">{currentMultiQuestion.title}</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">{currentMultiQuestion.description}</p>
        <div className="flex flex-col items-center space-y-4">
          {Array.isArray(currentMultiQuestion.options) &&
            currentMultiQuestion.options.map((option: string, index: number) => (
              <button
                key={index}
                className={`rounded-lg px-4 py-2 w-full max-w-xs text-gray-700 text-center cursor-pointer border transition-all duration-200 ${
                  Array.isArray(responses[currentMultiQuestionId]) && responses[currentMultiQuestionId].includes(index + 1)
                    ? "bg-[#007A78] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleMultiChoiceChange(currentMultiQuestionId, index + 1)}
              >
                {option}
              </button>
            ))}
        </div>
        <button
          onClick={handleNext}
          className={`mt-6 px-6 py-3 font-medium rounded-lg transition-all duration-150 ${
            !responses[currentMultiQuestionId] ||
            (Array.isArray(responses[currentMultiQuestionId]) &&
              (responses[currentMultiQuestionId] as number[]).length === 0)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#007A78] text-white hover:bg-[#005F5E]"
          }`}
          disabled={
            !responses[currentMultiQuestionId] ||
            (Array.isArray(responses[currentMultiQuestionId]) &&
              (responses[currentMultiQuestionId] as number[]).length === 0)
          }
        >
          {currentQuestionIndex < totalQuestions - 1 ? staticText.nextButton || "Next" : staticText.submitButton || "Submit"}
        </button>
      </div>
    );
  }

  const currentQuestion = localizedText[currentQuestionIndex + 1] || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">DPA Assessment Questionnaire</h1>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-6">
        <div className="h-4 bg-gray-300 rounded-full">
          <div
            className="h-4 bg-[#007A78] rounded-full transition-all duration-200"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2 text-right">
          {staticText.progressText || "Progress:"} {progressPercentage}%
        </p>
      </div>

      {/* Question Content */}
      <div className="flex items-center justify-between w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <span className="text-lg font-medium text-gray-700 w-1/3 text-right pr-4">{currentQuestion.statement}</span>
        <div className="flex justify-center space-x-4 w-1/3">
          {circleSizes.map((size, i) => (
            <button
              key={i}
              className={`rounded-full ${size} ${
                selectedCircle[questions[currentQuestionIndex]?.id] === i + 1
                  ? "bg-[#007A78] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleResponseChange(questions[currentQuestionIndex]?.id, i + 1)}
            />
          ))}
        </div>
        <span className="text-lg font-medium text-gray-700 w-1/3 text-left pl-4">{currentQuestion.reverseStatement}</span>
      </div>

      <button
        onClick={handleNext}
        className={`mt-6 px-6 py-3 font-medium rounded-lg transition-all duration-150 ${
          !responses[questions[currentQuestionIndex]?.id]
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#007A78] text-white hover:bg-[#005F5E]"
        }`}
        disabled={!responses[questions[currentQuestionIndex]?.id]}
      >
        {currentQuestionIndex < totalQuestions - 1
          ? staticText.nextButton || "Next"
          : staticText.submitButton || "Submit"}
      </button>
    </div>
  );
};

export default Questionnaire;
