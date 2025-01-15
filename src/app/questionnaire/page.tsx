"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const circleSizes = ["w-14 h-14", "w-12 h-12", "w-10 h-10", "w-10 h-10", "w-12 h-12", "w-14 h-14"];

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for start page
  const [responses, setResponses] = useState<Record<string, number | string[]>>({});
  const searchParams = useSearchParams();
  const invitationId = searchParams.get("invitation_id");

  useEffect(() => {
    if (!invitationId) {
      console.error("Invitation ID is missing in the URL");
    }
  }, [invitationId]);

  const questions = [
       {
    id: 1,
    aspect: 'Well-being',
    statement: 'In my organisation, we actively strive to create a work environment where there is no work-related sick leave, no negative stress, and where people feel they can grow and develop as individuals.',
    reverseStatement: 'In my organisation, the focus is on productivity, meeting deadlines, and efficiently running the business.',
  },
  {
    id: 2,
    aspect: 'Psychological Safety',
    statement: 'In my organisation, we feel safe and valued, everyone is included, there is room for learning, and we all have the opportunity to contribute and challenge.',
    reverseStatement: 'In my organisation, people are involved and contribute according to their roles and positions.',
  },
  {
    id: 3,
    aspect: 'Coherent',
    statement: 'In my organisation, the values and beliefs are aligned with its purpose, goals, and strategies, and it’s natural for people to consistently behave in line with those values and beliefs in most situations.',
    reverseStatement: 'In my organisation, the values have been formulated by management and/or HR, and they are included in our presentations and documents.',
  },
  {
    id: 4,
    aspect: 'Collaboration',
    statement: 'In my organisation, there are no restrictions on collaboration when it comes to sharing new ideas, addressing problems, or tackling challenges.',
    reverseStatement: 'In my organisation, collaboration is clearly defined and follows the organizational structure and roles.',
  },
  {
    id: 5,
    aspect: 'Power Distribution',
    statement: 'In my organization, all groups have the freedom to make decisions within their areas and feel a strong sense of ownership over their goals and tasks.',
    reverseStatement: 'In my organization, it’s natural that some groups, positions, or roles have more decision-making authority than others, regardless of who is performing the tasks.',
  },
  {
    id: 6,
    aspect: 'Organizational structure',
    statement: 'In my organization, teams are formed as needed, and individuals can belong to multiple teams. Planning, follow-ups, and communication are coordinated across teams.',
    reverseStatement: 'In my organization, all teams and units are well-defined, with each person belonging to one team and a clear reporting structure in place.',
  },
  {
    id: 7,
    aspect: 'Leadership distribution',
    statement: 'In my organization, anyone can take the lead depending on the situation and the task at hand.',
    reverseStatement: 'In my organization, it is well understood that formal managers are the leaders, making key decisions and influencing the outcomes of the group.',
  },
  {
    id: 8,
    aspect: 'Self-leadership',
    statement: 'In my organization, individuals are responsible for their own development, managing their behaviors and emotions to achieve both personal and professional goals.',
    reverseStatement: 'In my organization, managers are responsible for overseeing people’s behaviors and development, and they provide support when conflicts arise.',
  },
  {
    id: 9,
    aspect: 'Transparency',
    statement: 'In my organization, we maintain transparency in nearly everything, both internally and externally.',
    reverseStatement: 'In my organization, there are clear processes for sharing plans, information, and challenges, along with clarity on what type of information to share and with whom.',
  },
  {
    id: 10,
    aspect: 'Feedback',
    statement: 'In my organization, there are no formal routines for following up on results and behaviors. Instead, we rely on spontaneous peer-to-peer conversations for learning and finding solutions.',
    reverseStatement: 'In my organization, we strive for continuous improvement, and managers conduct evaluations and follow-ups on both individuals and teams.',
  },
  {
    id: 11,
    aspect: 'Degree of decentralization and Involvement',
    statement: 'In my organization, decision-making is distributed among several people, and it is not solely the responsibility of managers.',
    reverseStatement: 'In my organization, managers and specialists are responsible for making decisions, and they sometimes gather input from others.',
  },
  {
    id: 12,
    aspect: 'Balance/Focus',
    statement: 'In my organization, we have well-defined forums for making operational, tactical, and strategic decisions.',
    reverseStatement: 'In my organization, we focus on making decisions about urgent matters and immediate problems, with open forums available to discuss emerging issues.',
  },
  {
    id: 13,
    aspect: 'Salary equilibrium',
    statement: 'In my organization, salaries are based on competence, tasks, and value to the organization, with the intention to keep the difference between the lowest and highest salaries no greater than fourfold.',
    reverseStatement: 'In my organization, salary is determined by position, with the specific salary level set individually.',
  },
  {
    id: 14,
    aspect: 'Profit-sharing',
    statement: 'In my organization, there is a clear intention for 20-30 percent of the profit to be shared among everyone in the organization.',
    reverseStatement: 'In my organization, profits are shared through bonuses for certain positions and dividends to shareholders, with the levels determined by the board and the management team.',
  },
  {
    id: 15,
    aspect: 'Collaboration tools',
    statement: 'In my organization, digital tools for collaboration are used by everyone for both work tasks and socialization.',
    reverseStatement: 'In my organization, digital collaboration tools are used when the task or process requires them.',
  },
  {
    id: 16,
    aspect: 'Digital information sharing',
    statement: 'In my organization, digital tools and technology facilitate the exchange of information to everyone in an understandable format, and nearly in real-time.',
    reverseStatement: 'In my organization, information sharing through digital tools is secured by clear access rights.',
  },
  {
    id: 17,
    aspect: 'Talent acquisition',
    statement: 'In my organization, we recruit people based on cultural fit and alignment with the organization, rather than for a specific role.',
    reverseStatement: 'In my organization, we ensure we have the necessary competence by recruiting individuals with the relevant knowledge and experience.',
  },
  {
    id: 18,
    aspect: 'Competence development',
    statement: 'In my organization, individuals are responsible for their own competence development, and the organization offers various learning approaches, such as testing, practicing, and simulating.',
    reverseStatement: 'In my organization, we ensure competence development by allocating a fixed budget for courses and training.',
  },
  {
    id: 19,
    aspect: 'Work flexibility',
    statement: 'In my organization, we have complete freedom to work wherever and whenever we choose, as long as we account for dependencies on others and meet delivery deadlines.',
    reverseStatement: 'In my organization, it is clear that we follow a pre-defined work schedule and perform all tasks at the workplace.',
  },
  {
    id: 20,
    aspect: 'Measurement of work',
    statement: 'In my organization, the focus is on measuring deliveries, and we do not use standardized time estimations for tasks.',
    reverseStatement: 'In my organization, we use standardized time units to measure and track the progress of our tasks.',
  },
  {
    id: 21,
    aspect: 'Social engagement',
    statement: 'In my organization, there is a dedicated budget and opportunities to participate in social engagements during working hours.',
    reverseStatement: 'In my organization, social engagement is considered a personal matter and not part of the work, although some funds are allocated to non-profit organizations.',
  },
  {
    id: 22,
    aspect: 'Sustainability',
    statement: 'In my organization, sustainability is considered in all aspects, including product lifecycle, supplier selection, transportation, employee activities, and ways of working.',
    reverseStatement: 'In my organization, we are highly cost-conscious when selecting suppliers, planning travel, managing logistics, and determining ways of working.',
  },
  {
    id: 23,
    aspect: 'Ethical business aspects',
    statement: 'In my organization, our ethical principles guide all financial decisions.',
    reverseStatement: 'In my organization, financial decisions are driven by ensuring compliance, as well as considering public perceptions and trends.',
  },
  ];

  const multichoiceQuestions = [
    {
      id: "q24",
      title: "Purpose",
      description: "Purpose defines the overarching mission and higher objectives of an organization...",
      options: [
        "My organization has a higher purpose.",
        "My team has a clear, well-defined purpose aligned with the organization’s purpose.",
        "In my organization, we aim to be effective, which is why we focus on what we do and do not spend much time discussing \"the why.\"",
        "In my organization, people understand how they can contribute to its purpose.",
        "I’m unsure whether my organization has a stated purpose.",
      ],
    },
    {
      id: "q25",
      title: "Principles",
      description: "Principles are the core values and guidelines that shape decision-making and behavior...",
      options: [
        "In my organisation, most people are living our values.",
        "In my organisation, principles support us in decision-making.",
        "In my organization, values are primarily used for marketing purposes.",
        "In my organisation, principles and/or values are consistently communicated and maintained.",
        "I’m unsure whether my organization has stated principles and/or values.",
      ],
    },
  ];

  const handleStart = async () => {
    if (!invitationId) {
      console.error("Missing invitation ID");
      return;
    }

    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId }),
      });

      const data = await res.json();

      if (data.success) {
        setCurrentQuestionIndex(0); // Start the questionnaire
      } else {
        console.error("Failed to initialize responses:", data.message || data.error);
      }
    } catch (error) {
      console.error("Error initializing responses:", error);
    }
  };

  const handleNext = async () => {
    if (!invitationId) {
      console.error("Missing invitation ID");
      return;
    }

    const isMultiQuestion = currentQuestionIndex >= questions.length;
    const multiIndex = currentQuestionIndex - questions.length;

    try {
      if (isMultiQuestion) {
        const currentMultiQuestion = multichoiceQuestions[multiIndex];
        const selectedOptions =
          Array.isArray(responses[currentMultiQuestion.id])
            ? (responses[currentMultiQuestion.id] as string[])
            : [];

        await fetch("/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitationId,
            [currentMultiQuestion.id]: selectedOptions,
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

      if (currentQuestionIndex < questions.length + multichoiceQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log("All responses submitted.");
        alert("Thank you for completing the survey!");
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const handleChange = (questionId: number, value: number): void => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleMultiChange = (questionId: string, option: string): void => {
    setResponses((prev) => {
      const selected = Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : [];
      if (selected.includes(option)) {
        return { ...prev, [questionId]: selected.filter((o) => o !== option) };
      }
      if (selected.length < 3) {
        return { ...prev, [questionId]: [...selected, option] };
      }
      return prev;
    });
  };

  if (currentQuestionIndex === -1) {
    return (
      <div className="p-8 font-sans text-center max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome to the DPA Assessment Questionnaire</h1>
        <p className="text-lg mb-8">Click &quot;Start&quot; to begin the questionnaire.</p>
        <button
          onClick={handleStart}
          className="px-6 py-3 font-medium rounded bg-[#007A78] text-white hover:bg-[#005F5E]"
        >
          Start
        </button>
      </div>
    );
  }

  const isMultiQuestion = currentQuestionIndex >= questions.length;
  const multiIndex = currentQuestionIndex - questions.length;
  const currentMultiQuestion = multichoiceQuestions[multiIndex];
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-8 font-sans max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">DPA Assessment Questionnaire</h1>
      {isMultiQuestion ? (
        <>
          <h2 className="text-xl font-bold mb-4">{currentMultiQuestion.title}</h2>
          <p className="mb-6 text-center max-w-3xl mx-auto">{currentMultiQuestion.description}</p>
          <div className="space-y-4">
            {currentMultiQuestion.options.map((option) => (
              <label key={option} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={
                    Array.isArray(responses[currentMultiQuestion.id]) &&
                    (responses[currentMultiQuestion.id] as string[]).includes(option)
                  }
                  onChange={() => handleMultiChange(currentMultiQuestion.id, option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="mb-6 text-center max-w-3xl mx-auto">In my organization...</p>
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
                      ? "bg-[#007A78]"
                      : "bg-gray-200"
                  } hover:bg-[#007A78] focus:outline-none`}
                ></button>
              ))}
            </div>
            <span className="text-sm w-1/3 text-left">{currentQuestion.reverseStatement}</span>
          </div>
        </>
      )}
      <button
        onClick={handleNext}
        className="px-6 py-3 font-medium rounded block mx-auto bg-[#007A78] text-white hover:bg-[#005F5E]"
      >
        {currentQuestionIndex < questions.length + multichoiceQuestions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
};

const QuestionnaireWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Questionnaire />
  </Suspense>
);

export default QuestionnaireWrapper;
