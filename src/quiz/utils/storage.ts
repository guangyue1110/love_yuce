export const STORAGE_KEY = 'quiz_answers';

// 保存答案到 localStorage
export const saveAnswers = (answers: Record<string, any>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    return true;
  } catch (error) {
    console.error('Failed to save answers:', error);
    return false;
  }
};

// 从 localStorage 获取答案
export const getAnswers = (): Record<string, any> | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get answers:', error);
    return null;
  }
};

// 清除答案
export const clearAnswers = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear answers:', error);
    return false;
  }
}; 