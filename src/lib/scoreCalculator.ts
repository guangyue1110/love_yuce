import type { Answer } from '@/types/quiz';

interface ScoreWeight {
  personality: number
  values: number
  lifestyle: number
}

// 定义各维度的权重
const SCORE_WEIGHTS: ScoreWeight = {
  personality: 0.4,  // 性格匹配占40%
  values: 0.35,      // 价值观契合占35%
  lifestyle: 0.25    // 生活方式占25%
}

// 计算性格匹配度
const calculatePersonalityScore = (answers: Answer[]) => {
  // 性格相关题目的ID范围（根据我们之前定义的题目）
  const personalityQuestions = [6, 7, 8, 9, 10]
  const relevantAnswers = answers.filter(a => personalityQuestions.includes(a.questionId))
  
  // 根据答案计算匹配度
  const scores = relevantAnswers.map(answer => {
    // 这里可以根据具体题目定义不同的评分规则
    switch (answer.questionId) {
      case 6: // 外向性问题
        return answer.value === '适度外向' ? 100 : 
               answer.value === '比较外向' ? 85 :
               answer.value === '比较内向' ? 70 : 60
      case 7: // 决策方式
        return answer.value === '综合考虑' ? 100 :
               answer.value === '依靠理性分析' ? 85 :
               answer.value === '相信直觉感受' ? 80 : 70
      // ... 其他性格题目的评分规则
      default:
        return 80 // 默认分数
    }
  })

  return scores.reduce((acc, score) => acc + score, 0) / scores.length
}

// 计算价值观契合度
const calculateValuesScore = (answers: any[]) => {
  // 价值观相关题目的ID范围
  const valueQuestions = [11, 12, 13, 14, 15]
  const relevantAnswers = answers.filter(a => valueQuestions.includes(a.questionId))
  
  const scores = relevantAnswers.map(answer => {
    // 根据具体题目定义评分规则
    switch (answer.questionId) {
      case 11: // 婚姻观念
        return answer.value === '情感陪伴' ? 100 :
               answer.value === '共同成长' ? 95 :
               answer.value === '组建家庭' ? 90 : 80
      // ... 其他价值观题目的评分规则
      default:
        return 80
    }
  })

  return scores.reduce((acc, score) => acc + score, 0) / scores.length
}

// 计算生活方式兼容度
const calculateLifestyleScore = (answers: any[]) => {
  // 生活方式相关题目的ID范围
  const lifestyleQuestions = [1, 2, 3, 4, 5]
  const relevantAnswers = answers.filter(a => lifestyleQuestions.includes(a.questionId))
  
  const scores = relevantAnswers.map(answer => {
    // 根据具体题目定义评分规则
    switch (answer.questionId) {
      case 1: // 年龄段
        return answer.value === '26-30岁' ? 100 :
               answer.value === '31-35岁' ? 90 :
               answer.value === '18-25岁' ? 85 : 80
      // ... 其他生活方式题目的评分规则
      default:
        return 80
    }
  })

  return scores.reduce((acc, score) => acc + score, 0) / scores.length
}

// 计算总分
export const calculateTotalScore = (answers: any[]) => {
  const personalityScore = calculatePersonalityScore(answers)
  const valuesScore = calculateValuesScore(answers)
  const lifestyleScore = calculateLifestyleScore(answers)

  const totalScore = (
    personalityScore * SCORE_WEIGHTS.personality +
    valuesScore * SCORE_WEIGHTS.values +
    lifestyleScore * SCORE_WEIGHTS.lifestyle
  )

  return {
    total: Math.round(totalScore),
    personality: Math.round(personalityScore),
    values: Math.round(valuesScore),
    lifestyle: Math.round(lifestyleScore),
    level: getMatchLevel(totalScore)
  }
}

// 根据分数确定匹配等级
const getMatchLevel = (score: number): string => {
  if (score >= 90) return '完美匹配'
  if (score >= 80) return '优秀匹配'
  if (score >= 70) return '良好匹配'
  return '一般匹配'
} 