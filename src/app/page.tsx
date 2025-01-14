'use client';

import React, { useState } from 'react';

const questions = [
  {
    id: '1.1',
    aspect: 'Well-being',
    statement: 'we actively strive to create a work environment where there is no work-related sick leave, no negative stress, and where people feel they can grow and develop as individuals.',
    reverseStatement: 'the focus is on productivity, meeting deadlines, and efficiently running the business.',
  },
  {
    id: '1.2',
    aspect: 'Psychological Safety',
    statement: 'we feel safe and valued, everyone is included, there is room for learning, and we all have the opportunity to contribute and challenge.',
    reverseStatement: 'people are involved and contribute according to their roles and positions.',
  },
  {
    id: '2.1',
    aspect: 'Coherent',
    statement: 'the values and beliefs are aligned with its purpose, goals, and strategies, and it’s natural for people to consistently behave in line with those values and beliefs in most situations.',
    reverseStatement: 'the values have been formulated by management and/or HR, and they are included in our presentations and documents.',
  },
  // Add more questions as needed...
];

const circleSizes = ['w-14 h-14', 'w-12 h-12', 'w-10 h-10', 'w-10 h-10', 'w-12 h-12', 'w-14 h-14'];

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (questionId: string, value: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setSubmitted(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isResponseSelected = responses[currentQuestion.id] !== undefined;

  if (submitted) {
    return (
      <div className="p-8 font-sans text-center max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Thank you for completing the survey!</h1>
        <p className="text-lg">Your responses have been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="p-8 font-sans max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">DPA Assessment Questionnaire</h1>
      <p className="mb-6 text-center max-w-3xl mx-auto">
        You will see two statements; decide which one is most applicable to your organization and then rate its strength.
        These may be even-over statements, meaning both could apply, but one is more applicable than the other.
      </p>
      <p className="text-lg font-semibold mb-8 text-center">In my organisation...</p>
      <div className="flex items-center justify-between space-x-8 mb-12">
        <span className="text-sm w-1/3 text-right">{currentQuestion.statement}</span>
        <div className="flex justify-center space-x-6 w-1/3 items-center">
          {circleSizes.map((size, i) => (
            <button
              type="button"
              key={i + 1}
              onClick={() => handleChange(currentQuestion.id, i + 1)}
              className={`${size} rounded-full ${
                responses[currentQuestion.id] === i + 1
                  ? 'bg-[#007A78]'
                  : 'bg-gray-200'
              } hover:bg-[#007A78] focus:outline-none`}
            ></button>
          ))}
        </div>
        <span className="text-sm w-1/3 text-left">{currentQuestion.reverseStatement}</span>
      </div>
      <button
        onClick={handleNext}
        disabled={!isResponseSelected}
        className={`px-6 py-3 font-medium rounded block mx-auto ${
          isResponseSelected
            ? 'bg-[#007A78] text-white hover:bg-[#005F5E]'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
};

export default Questionnaire;
