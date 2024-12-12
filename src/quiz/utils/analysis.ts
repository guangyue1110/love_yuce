import { QuizQuestion } from '../types/quiz';

interface AnalysisResult {
  totalScore: number;
  sections: {
    title: string;
    content: string;
    score?: number;
  }[];
}

export const analyzeAnswers = (
  questions: QuizQuestion[],
  answers: Record<string, string | string[]>
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

// 计算总分
const calculateTotalScore = (answers: Record<string, string | string[]>): number => {
  let score = 0;
  
  // 根据年龄段加分
  if (answers.age === '26-30' || answers.age === '31-35') {
    score += 30;
  } else if (answers.age === '18-25') {
    score += 25;
  } else {
    score += 20;
  }

  // 根据学历加分
  if (answers.education === 'master' || answers.education === 'phd') {
    score += 35;
  } else if (answers.education === 'bachelor') {
    score += 30;
  } else {
    score += 25;
  }

  // 根据兴趣爱好数量加分
  const interests = answers.interests as string[];
  if (Array.isArray(interests)) {
    score += Math.min(interests.length * 5, 35);
  }

  return Math.min(score, 100);
};

// 生成性格特征分析
const generatePersonalityAnalysis = (answers: Record<string, string | string[]>): string => {
  const age = answers.age as string;
  const education = answers.education as string;

  let analysis = '根据您的答案，我们发现您是一个成熟稳重且富有责任心的人。您已经积累了一定的人生经验，对未来有清晰的规划。';

  if (education === 'master' || education === 'phd') {
    analysis += '同时，您的求学经历展现出您对知识的追求和较强的学习能力。';
  }

  return analysis;
};

// 生成兴趣爱好分析
const generateInterestsAnalysis = (answers: Record<string, string | string[]>): string => {
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
const generateMatchingSuggestions = (answers: Record<string, string | string[]>): string => {
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
const calculatePersonalityScore = (answers: Record<string, string | string[]>): number => {
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
const calculateInterestsScore = (answers: Record<string, string | string[]>): number => {
  const interests = answers.interests as string[];
  if (!Array.isArray(interests)) return 0;
  
  return Math.min(interests.length * 10, 30);
}; 