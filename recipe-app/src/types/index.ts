interface Recipe {
  id: string;
  title: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'other';
  image: string;
  description: string;
  totalTime: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  ingredients: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;
  steps: Array<{
    number: number;
    text: string;
    note?: string;
    duration?: number;
  }>;
  author: string;
  savedBy?: string[];
}

// Тип для шага рецепта
interface RecipeStep {
  number: number;
  text: string;
  note?: string;
  duration?: number;         // сколько времени занимает шаг
}

// Тип для пользователя
interface User {
  email: string;
  avatar?: string;
}

interface StepWithDuration {
  number: number;
  text: string;
  note?: string;
  duration?: number;
  timeLabel: string; // "00:02"
  startTime: number; // секунды от начала готовки
  endTime: number;   // секунды до конца этого шага
}

export type { Recipe, RecipeStep, User, StepWithDuration };