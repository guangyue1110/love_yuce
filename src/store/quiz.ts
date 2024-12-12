import { create } from 'zustand'

export interface Answer {
  questionId: number
  value: string | string[]
  type: '单选题' | '多选题' | '量表题'
}

export interface Question {
  id: number
  type: '单选题' | '多选题' | '量表题'
  title: string
  options: string[]
  category?: '基础信息' | '个性特征' | '生活习惯' | '伴侣期望'
}

export type QuestionCategory = '基础信息' | '个性特征' | '生活习惯' | '伴侣期望'

interface QuizState {
  questions: Question[]
  answers: Answer[]
  currentQuestion: number
  startTime: number
  selectedOptions: string[]
  
  setQuestions: (questions: Question[]) => void
  setCurrentQuestion: (index: number) => void
  addAnswer: (answer: Answer) => void
  toggleOption: (option: string) => void
  submitMultipleChoice: () => void
  resetQuiz: () => void
}

// 完整的题目数据
const initialQuestions: Question[] = [
  // 基础信息类
  {
    id: 1,
    type: '单选题',
    title: '你的年龄段是？',
    options: ['20-25岁', '26-30岁', '31-35岁', '35岁以上'],
    category: '基础信息'
  },
  {
    id: 2,
    type: '单选题',
    title: '你目前的感情状态是？',
    options: ['单身', '恋爱中', '已婚', '其他'],
    category: '基础信息'
  },
  {
    id: 3,
    type: '单选题',
    title: '你的职业状态是？',
    options: ['学生', '全职工作', '创业/自由职业', '其他'],
    category: '基础信息'
  },
  
  // 个性特征类
  {
    id: 4,
    type: '量表题',
    title: '你更倾向于哪种社交方式？',
    options: ['独处安静', '小圈子社交', '广泛社交'],
    category: '个性特征'
  },
  {
    id: 5,
    type: '量表题',
    title: '面对重要决定时，你通常会？',
    options: ['理性分析', '直觉判断', '权衡利弊'],
    category: '个性特征'
  },
  {
    id: 6,
    type: '量表题',
    title: '你对生活节奏的偏好是？',
    options: ['规律有序', '随性自由', '视情况调整'],
    category: '个性特征'
  },
  {
    id: 7,
    type: '量表题',
    title: '遇到压力时，你通常会？',
    options: ['主动寻求解决', '需要时间调整', '寻求他人帮助'],
    category: '个性特征'
  },
  {
    id: 8,
    type: '量表题',
    title: '对于新事物，你的态度是？',
    options: ['积极尝试', '谨慎观望', '视情况而定'],
    category: '个性特征'
  },
  {
    id: 9,
    type: '多选题',
    title: '你的兴趣爱好包括？（可多选）',
    options: ['运动健身', '读书学习', '旅行探索', '音乐艺术', '美食烹饪', '电影游戏', '其他'],
    category: '个性特征'
  },
  {
    id: 10,
    type: '量表题',
    title: '你的情感表达方式是？',
    options: ['直接表达', '含蓄委婉', '行动表示'],
    category: '个性特征'
  },
  
  // 生活习惯类
  {
    id: 11,
    type: '量表题',
    title: '你的作息时间偏好是？',
    options: ['早起早睡', '晚睡晚起', '不固定'],
    category: '生活习惯'
  },
  {
    id: 12,
    type: '量表题',
    title: '对于金钱的态度是？',
    options: ['计划消费', '随性消费', '平衡消费'],
    category: '生活习惯'
  },
  {
    id: 13,
    type: '多选题',
    title: '周末通常会做什么？（可多选）',
    options: ['宅家休息', '外出游玩', '学习充电', '社交聚会', '运动健身', '追剧看片'],
    category: '生活习惯'
  },
  
  // 伴侣期望类
  {
    id: 14,
    type: '量表题',
    title: '理想伴侣的性格特质是？',
    options: ['开朗活泼', '稳重可靠', '温和随性'],
    category: '伴侣期望'
  },
  {
    id: 15,
    type: '量表题',
    title: '对未来生活的规划重点是？',
    options: ['事业发展', '家庭生活', '平衡发展'],
    category: '伴侣期望'
  },
  {
    id: 16,
    type: '多选题',
    title: '最看重伴侣的哪些品质？（可多选）',
    options: ['责任心', '上进心', '同理心', '幽默感', '专业能力', '生活情趣'],
    category: '伴侣期望'
  },
  {
    id: 17,
    type: '量表题',
    title: '期望的约会方式是？',
    options: ['简单日常', '精心策划', '随性安排'],
    category: '伴侣期望'
  },
  {
    id: 18,
    type: '量表题',
    title: '对于未来另一半的期望是？',
    options: ['共同成长', '互相扶持', '独立发展'],
    category: '伴侣期望'
  }
]

const useQuizStore = create<QuizState>((set, get) => ({
  questions: initialQuestions,
  answers: [],
  currentQuestion: 0,
  startTime: Date.now(),
  selectedOptions: [],

  setQuestions: (questions) => set({ questions }),
  
  setCurrentQuestion: (index) => set({ 
    currentQuestion: index,
    selectedOptions: []
  }),
  
  addAnswer: (answer) => set((state) => ({
    answers: [...state.answers.filter(a => a.questionId !== answer.questionId), answer]
  })),

  toggleOption: (option: string) => set((state) => {
    const currentQuestion = state.questions[state.currentQuestion]
    if (currentQuestion.type !== '多选题') return state

    const selectedOptions = state.selectedOptions.includes(option)
      ? state.selectedOptions.filter(item => item !== option)
      : [...state.selectedOptions, option]

    return { selectedOptions }
  }),

  submitMultipleChoice: () => {
    const state = get()
    const currentQuestion = state.questions[state.currentQuestion]
    if (currentQuestion.type !== '多选题' || state.selectedOptions.length === 0) return

    state.addAnswer({
      questionId: currentQuestion.id,
      value: state.selectedOptions,
      type: '多选题'
    })

    if (state.currentQuestion < state.questions.length - 1) {
      state.setCurrentQuestion(state.currentQuestion + 1)
    }
  },
  
  resetQuiz: () => set({
    answers: [],
    currentQuestion: 0,
    startTime: Date.now(),
    selectedOptions: []
  })
}))

function isStringAnswer(answer: string | string[]): answer is string {
  return typeof answer === 'string'
}

export default useQuizStore