export interface Question {
  id: string
  title: string
  type: 'single' | 'multiple' | 'scale'
  options?: {
    value: string
    label: string
  }[]
  scale?: {
    min: number
    max: number
    labels: string[]
  }
}

export interface Answer {
  questionId: string
  value: string | number | string[]
}

export type MatchResult = {
  score: number;
  level: string;
  categoryScores?: {
    基础信息: number;
    个性特征: number;
    生活习惯: number;
    伴侣期望: number;
  }
}; 