export interface QuizOption {
  value: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  options: QuizOption[];
  type: 'single' | 'multiple';
  required?: boolean;
}

export interface QuizProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: Record<string, string | string[]>;
}

export interface QuizState {
  questions: QuizQuestion[];
  progress: QuizProgress;
  isSubmitting: boolean;
  error?: string;
} 