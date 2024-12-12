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