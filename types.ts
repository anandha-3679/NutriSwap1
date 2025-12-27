
export enum HealthGoal {
  LOWER_CALORIE = 'Lower Calorie',
  HIGHER_PROTEIN = 'Higher Protein',
  LOWER_CARB = 'Lower Carb',
  HEART_HEALTHY = 'Heart Healthy',
  LOW_SODIUM = 'Low Sodium',
  BUDGET_FRIENDLY = 'Budget Friendly'
}

export enum UserCategory {
  KID = 'Kid',
  ADULT = 'Adult',
  ELDERLY = 'Elderly'
}

export interface MacroData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface RecipeIngredient {
  item: string;
  amount: string;
}

export interface SwapResult {
  id: string;
  originalFood: string;
  suggestedSwap: string;
  explanation: string;
  reasoning: string;
  goals: HealthGoal[];
  category: UserCategory;
  estimatedPrice?: string;
  macros: {
    original: MacroData;
    swap: MacroData;
  };
  recipe: {
    ingredients: RecipeIngredient[];
    steps: string[];
    prepTime: string;
  };
}

export interface UserProfile {
  name: string;
  category: UserCategory;
  goals: HealthGoal[];
  allergies: string[];
  budgetLimit?: number;
  points: number;
  level: number;
  streak: number;
  lastCheckIn?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isThinking?: boolean;
  swapResult?: SwapResult;
}

export interface SocialPost {
  id: string;
  userName: string;
  userLevel: number;
  content: string;
  swap?: {
    from: string;
    to: string;
  };
  likes: number;
  timestamp: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  daysTotal: number;
  daysCompleted: number;
  isActive: boolean;
}

export interface DictionaryItem {
  food: string;
  swaps: Partial<Record<HealthGoal, {
    suggested: string;
    explanation: string;
  }>>;
}

export type ToastType = 'success' | 'error' | 'info' | 'xp';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}
