import { QuizQuestion } from '../types/quiz';

interface AnalysisResult {
  totalScore: number;
  sections: {
    title: string;
    content: string;
    score?: number;
  }[];
}

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

export const analyzeAnswers = (
  questions: QuizQuestion[],
  answers: Answer[]
): AnalysisResult => {
  // 计算总分
  const totalScore = calculateTotalScore(answers);

  // 生成分析报告
  const sections = [
    {
      title: '性格特征分析',
      content: generatePersonalityAnalysis(answers),
      score: calculatePersonalityScore(answers),
    },
    {
      title: '兴趣爱好分析',
      content: generateInterestsAnalysis(answers),
      score: calculateInterestsScore(answers),
    },
    {
      title: '匹配建议',
      content: generateMatchingSuggestions(answers),
    },
  ];

  return {
    totalScore,
    sections,
  };
};

// 添加类型转换辅助函数
function getNumericValue(value: string | undefined): number {
  if (!value) return 0
  return parseInt(value, 10) || 0
}

// 修改计算函数
const calculateTotalScore = (answers: Answer[]): number => {
  let score = 0;
  
  // 根据年龄段加分
  const ageAnswer = answers.find(a => a.questionId === 1)?.value as string
  if (ageAnswer === '26-30' || ageAnswer === '31-35') {
    score += 30;
  } else if (ageAnswer === '18-25') {
    score += 25;
  } else {
    score += 20;
  }

  // 根据学历加分
  const educationAnswer = answers.find(a => a.questionId === 3)?.value as string
  if (educationAnswer === 'master' || educationAnswer === 'phd') {
    score += 35;
  } else if (educationAnswer === 'bachelor') {
    score += 30;
  } else {
    score += 25;
  }

  // 根据兴趣爱好数量加分
  const interestsAnswer = answers.find(a => a.questionId === 5)?.value as string[]
  if (Array.isArray(interestsAnswer)) {
    score += Math.min(interestsAnswer.length * 5, 35);
  }

  return Math.min(score, 100);
};

// 生成性格特征分析
const generatePersonalityAnalysis = (answers: Answer[]): string => {
  const age = answers.find(a => a.questionId === 1)?.value as string;
  const education = answers.find(a => a.questionId === 3)?.value as string;

  let analysis = '根据您的答案，我们发现您是一个成熟稳重且富有责任心的人。您已经积累了一定的人生经验，对未来有清晰的规划。';

  if (education === 'master' || education === 'phd') {
    analysis += '同时，您的求学经历展现出您对知识的追求和较强的学习能力。';
  }

  return analysis;
};

// 生成兴趣爱好分析
const generateInterestsAnalysis = (answers: Answer[]): string => {
  const interests = answers.interests as string[];
  if (!Array.isArray(interests) || interests.length === 0) {
    return '您似乎还在探索自己的兴趣爱好。保持开放和好奇的心态，尝试不同的活动，这将帮助您发现更多乐趣。';
  }

  const interestMap: Record<string, string> = {
    reading: '阅读',
    music: '音乐',
    sports: '运动',
    travel: '旅行',
    movie: '电影',
    cooking: '烹饪',
  };

  const interestList = interests.map(i => interestMap[i]).join('、');
  return `您对${interestList}等领域表现出浓厚的兴趣。这些爱好不仅能丰富您的生活，还能帮助您结识志同道合的朋友。`;
};

// 生成匹配建议
const generateMatchingSuggestions = (answers: Answer[]): string => {
  const interests = answers.interests as string[];
  const interestCount = Array.isArray(interests) ? interests.length : 0;

  let suggestions = '建议您：\n';

  if (interestCount >= 3) {
    suggestions += '1. 可以多参加与您兴趣相关的社交活动，这样更容易遇到志同道合的人；\n';
  } else {
    suggestions += '1. 建议您尝试拓展更多兴趣爱好，这样可以扩大社交圈子；\n';
  }

  suggestions += '2. 保持真诚和开放的态度，在社交中展现真实的自己；\n';
  suggestions += '3. 适当提升自己，让自己成为更好的人，这样才能吸引到更好的另一半。';

  return suggestions;
};

// 计算性格得分
const calculatePersonalityScore = (answers: Answer[]): number => {
  let score = 0;
  
  // 根据年龄段评分
  if (answers.age === '26-30' || answers.age === '31-35') {
    score += 35;
  } else if (answers.age === '18-25') {
    score += 30;
  } else {
    score += 25;
  }

  return score;
};

// 计算兴趣得分
const calculateInterestsScore = (answers: Answer[]): number => {
  const interests = answers.interests as string[];
  if (!Array.isArray(interests)) return 0;
  
  return Math.min(interests.length * 10, 30);
}; 