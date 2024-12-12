import { QuizQuestion } from '../types/quiz';

export const questions: QuizQuestion[] = [
  {
    id: 'age',
    title: '你的年龄段是？',
    type: 'single',
    required: true,
    options: [
      { value: '18-25', label: '18-25岁' },
      { value: '26-30', label: '26-30岁' },
      { value: '31-35', label: '31-35岁' },
      { value: '36-40', label: '36-40岁' },
      { value: '40+', label: '40岁以上' },
    ],
  },
  {
    id: 'gender',
    title: '你的性别是？',
    type: 'single',
    required: true,
    options: [
      { value: 'male', label: '男' },
      { value: 'female', label: '女' },
    ],
  },
  {
    id: 'education',
    title: '你的学历是？',
    type: 'single',
    required: true,
    options: [
      { value: 'high-school', label: '高中及以下' },
      { value: 'college', label: '大专' },
      { value: 'bachelor', label: '本科' },
      { value: 'master', label: '硕士' },
      { value: 'phd', label: '博士及以上' },
    ],
  },
  {
    id: 'interests',
    title: '你的兴趣爱好？（可多选）',
    type: 'multiple',
    required: true,
    options: [
      { value: 'reading', label: '阅读' },
      { value: 'music', label: '音乐' },
      { value: 'sports', label: '运动' },
      { value: 'travel', label: '旅行' },
      { value: 'movie', label: '电影' },
      { value: 'cooking', label: '烹饪' },
    ],
  },
]; 