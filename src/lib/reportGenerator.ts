import { Answer } from '@/types/quiz'

interface PersonalityTrait {
  trait: string
  description: string
  score: number
  details?: string[]
}

interface Report {
  personalityTraits: PersonalityTrait[]
  relationshipStyle: {
    title: string
    description: string
    strengths: string[]
    challenges: string[]
  }
  suggestions: {
    title: string
    content: string
    tips: string[]
  }[]
  compatibility: {
    bestMatch: string
    whyMatch: string
    chemistry: number
    commonalities: string[]
    complementary: string[]
    advices: string[]
  }
}

const personalityMap = {
  outgoing: {
    trait: '外向开朗',
    description: '你是一个充满活力的人，善于社交，容易与人建立联系。在感情中，你喜欢表达和分享，能为关系带来欢乐和温暖。'
  },
  calm: {
    trait: '沉稳冷静',
    description: '你处事冷静，善于思考，给人可靠的感觉。在感情中，你是一个值得信赖的伴侣，能为关系带来稳定和安全感。'
  },
  creative: {
    trait: '富有创造力',
    description: '你思维活跃，充满想象力，总能带来新鲜的观点。在感情中，你能让生活充满惊喜和浪漫。'
  },
  rational: {
    trait: '理性务实',
    description: '你做事理性，注重实际，决策深思熟虑。在感情中，你是一个负责任的伴侣，能为关系提供良好的规划和保障。'
  }
}

export function generateReport(answers: Answer[]): Report {
  // 基础信息分析
  const age = answers.find(a => a.questionId === 1)?.value as string
  const occupation = answers.find(a => a.questionId === 2)?.value as string
  const education = answers.find(a => a.questionId === 3)?.value as string
  const marriage = answers.find(a => a.questionId === 4)?.value as string
  
  // 性格特征分析
  const personalityAnswer = answers.find(a => a.questionId === 6)?.value as string
  const decisionAnswer = answers.find(a => a.questionId === 7)?.value as string
  const lifestyleAnswer = answers.find(a => a.questionId === 8)?.value as string
  const socialStyle = answers.find(a => a.questionId === 9)?.value as string[]
  const stressHandling = answers.find(a => a.questionId === 10)?.value as string[]
  
  // 价值观分析
  const marriageView = answers.find(a => a.questionId === 11)?.value as string
  const familyCareer = answers.find(a => a.questionId === 12)?.value as string
  const financeView = answers.find(a => a.questionId === 13)?.value as string
  const educationView = answers.find(a => a.questionId === 14)?.value as string[]
  const lifeGoals = answers.find(a => a.questionId === 15)?.value as string[]

  const personality = personalityMap[personalityAnswer as keyof typeof personalityMap]
  
  // 生成性格特征分析
  const personalityTraits: PersonalityTrait[] = [
    {
      trait: personality.trait,
      description: personality.description,
      score: 85
    },
    {
      trait: '决策方式',
      description: `在重要决定时，你倾向于${
        decisionAnswer === 'rational' ? '理性分析，这有助于做出稳妥的选择。' :
        decisionAnswer === 'emotional' ? '跟随内心，这让你的决定更有温度。' :
        decisionAnswer === 'mixed' ? '理性感性结合，这是很好的平衡。' :
        '征求他人意见，这体现了你的开放态度。'
      }`,
      score: 75
    },
    {
      trait: '生活态度',
      description: `你偏好${
        lifestyleAnswer === 'fast' ? '快节奏的生活，充满激情和动力。' :
        lifestyleAnswer === 'moderate' ? '均衡的生活节奏，懂得张弛有度。' :
        lifestyleAnswer === 'slow' ? '从容的生活步调，注重生活品质。' :
        '灵活的生活方式，能够随机应变。'
      }`,
      score: 80
    }
  ]

  // 生成关系风格分析
  const relationshipStyle = {
    title: `你是一个${personality.trait}的人`,
    description: `在感情中${
      personalityAnswer === 'outgoing' ? '热情主动，善于表达。' :
      personalityAnswer === 'calm' ? '稳重可靠，注重承诺。' :
      personalityAnswer === 'creative' ? '富有创意，充满浪漫。' :
      '理性务实，注重规划。'
    }在处理压力时，你会${
      stressHandling?.includes('face') ? '勇于面对，' :
      stressHandling?.includes('share') ? '寻求支持，' :
      '保持冷静，'
    }这些特质都将帮助你建立稳固的感情关系。`,
    strengths: [
      `在感情中要保持${personality.trait}的优势，同时也要${
        personalityAnswer === 'outgoing' ? '给伴侣一些独处的空间。' :
        personalityAnswer === 'calm' ? '多表达你的感受。' :
        personalityAnswer === 'creative' ? '关注现实的需求。' :
        '保持一些浪漫的情调。'
      }`,
      `在工作与生活的平衡上，建议${
        familyCareer > 3 ? '适当关注家庭需求。' :
        familyCareer < 3 ? '也要追求个人发展。' :
        '继续保持当前的平衡。'
      }`,
      `在财务方面，你的${
        financeView === 'save' ? '储蓄习惯很好，但也要学会适度享受。' :
        financeView === 'balance' ? '平衡态度值得保持。' :
        financeView === 'invest' ? '投资意识很好，但要注意风险控制。' :
        '及时行乐很好，但也要为未来做准备。'
      }`
    ],
    challenges: [
      `在感情中要保持${personality.trait}的优势，同时也要${
        personalityAnswer === 'outgoing' ? '给伴侣一些独处的空间。' :
        personalityAnswer === 'calm' ? '多表达你的感受。' :
        personalityAnswer === 'creative' ? '关注现实的需求。' :
        '保持一些浪漫的情调。'
      }`,
      `在工作与生活的平衡上，建议${
        familyCareer > 3 ? '适当关注家庭需求。' :
        familyCareer < 3 ? '也要追求个人发展。' :
        '继续保持当前的平衡。'
      }`,
      `在财务方面，你的${
        financeView === 'save' ? '储蓄习惯很好，但也要学会适度享受。' :
        financeView === 'balance' ? '平衡态度值得保持。' :
        financeView === 'invest' ? '投资意识很好，但要注意风险控制。' :
        '及时行乐很好，但也要为未来做准备。'
      }`
    ]
  }

  // 生成建议
  const suggestions = [
    {
      title: '感情相处建议',
      content: `作为一个${personality.trait}的人，你在感情中需要注意平衡。`,
      tips: [
        `保持${personality.trait}的特质，这是你的优势`,
        personalityAnswer === 'outgoing' ? '给伴侣一些独处的空间和安静的时刻' :
        personalityAnswer === 'calm' ? '适当表达感受，让伴侣更了解你的想法' :
        personalityAnswer === 'creative' ? '在浪漫之余也要关注现实需求' :
        '在理性之外也要保持一些浪漫情调',
        '学会倾听和理解伴侣的需求'
      ]
    },
    {
      title: '工作生活平衡',
      content: `在工作与生活的平衡上，你目前的倾向需要适当调整。`,
      tips: [
        familyCareer > 3 ? [
          '适当放慢脚步，关注家庭需求',
          '为家人预留更多优质时间',
          '建立工作与生活的边界感'
        ] : familyCareer < 3 ? [
          '在照顾家庭的同时也要关注个人发展',
          '合理规划时间，提升工作效率',
          '寻找能够兼顾家庭的职业发展机会'
        ] : [
          '继续保持当前的平衡状态',
          '建立有效的时间管理系统',
          '定期评估和调整时间分配'
        ]
      ].flat()
    },
    {
      title: '财务规划建议',
      content: `根据你的财务观念，我们有以下具体建议。`,
      tips: [
        financeView === 'save' ? [
          '在确保储蓄的同时，适当享受生活',
          '尝试一些低风险的理财方式',
          '为自己和家人制定合理的娱乐预算'
        ] : financeView === 'balance' ? [
          '继续保持收支平衡的好习惯',
          '考虑制定长期理财计划',
          '为未来重大开支做好准备'
        ] : financeView === 'invest' ? [
          '保持理性投资的态度',
          '适当分散投资风险',
          '确保留有足够的应急资金'
        ] : [
          '在享受生活的同时也要考虑未来',
          '建立基本的储蓄习惯',
          '学习基础的理财知识'
        ]
      ].flat()
    }
  ]

  // 生成最佳匹配建议
  const compatibility = {
    bestMatch: `${
      personalityAnswer === 'outgoing' ? '善于倾听、较为内敛的人' :
      personalityAnswer === 'calm' ? '活泼开朗、富有创造力的人' :
      personalityAnswer === 'creative' ? '理性稳重、注重实际的人' :
      '开朗活泼、富有想象力的人'
    }`,
    whyMatch: `这种性格互补将帮助你们${
      personalityAnswer === 'outgoing' ? '建立更深层的情感连接。' :
      personalityAnswer === 'calm' ? '让生活更加丰富多彩。' :
      personalityAnswer === 'creative' ? '实现理想的同时保持稳定。' :
      '在生活中保持激情和稳定的平衡。'
    }`,
    chemistry: 90,
    commonalities: [
      `在感情中要保持${personality.trait}的优势，同时也要${
        personalityAnswer === 'outgoing' ? '给伴侣一些独处的空间。' :
        personalityAnswer === 'calm' ? '多表达你的感受。' :
        personalityAnswer === 'creative' ? '关注现实的需求。' :
        '保持一些浪漫的情调。'
      }`
    ],
    complementary: [
      `在工作与生活的平衡上，建议${
        familyCareer > 3 ? '适当关注家庭需求。' :
        familyCareer < 3 ? '也要追求个人发展。' :
        '继续保持当前的平衡。'
      }`
    ],
    advices: [
      `在财务方面，你的${
        financeView === 'save' ? '储蓄习惯很好，但也要学会适度享受。' :
        financeView === 'balance' ? '平衡态度值得保持。' :
        financeView === 'invest' ? '投资意识很好，但要注意风险控制。' :
        '及时行乐很好，但也要为未来做准备。'
      }`
    ]
  }

  return {
    personalityTraits,
    relationshipStyle,
    suggestions,
    compatibility
  }
} 