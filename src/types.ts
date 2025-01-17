// src/types.ts
export interface StaticText {
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

export interface QuestionText {
  statement?: string;
  reverseStatement?: string;
}

export interface MultiChoiceQuestion {
  title: string;
  description: string;
  options: string[];
}

export interface LocalizedText {
  staticText: StaticText;
  [key: string]: QuestionText | MultiChoiceQuestion | StaticText;
}
