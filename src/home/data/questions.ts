export interface Question {
  id: number
  type: 'basic' | 'personality' | 'values'
  text: string
  options: string[]
}

export const questions: Question[] = [
  // 基础信息
  {
    id: 1,
    type: 'basic',
    text: '你的年龄段是？',
    options: [
      '18-25岁',
      '26-30岁',
      '31-35岁',
      '36-40岁',
      '40岁以上'
    ]
  },
  {
    id: 2,
    type: 'basic',
    text: '你目前的职业类型是？',
    options: [
      '企业职员',
      '个体经营',
      '自由职业',
      '公务员/事业单位',
      '其他'
    ]
  },
  // 性格测评
  {
    id: 6,
    type: 'personality',
    text: '在社交场合中，你通常会：',
    options: [
      '主动与他人交谈，享受社交',
      '保持适度互动，选择性社交',
      '倾向于安静观察，少量互动',
      '避免社交，更喜欢独处'
    ]
  },
  // 价值观调查
  {
    id: 16,
    type: 'values',
    text: '关于婚姻与家庭，你的观点是：',
    options: [
      '婚姻是必经之路，要慎重对待',
      '顺其自然，不刻意追求',
      '可以选择不婚，追求个人发展',
      '视情况而定，保持开放态度'
    ]
  }
] 