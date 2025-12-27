
export enum HealthGoal {
  MUSCLE_GROWTH = 'Muscle Growth',
  WEIGHT_MANAGEMENT = 'Weight Management',
  GENERAL_FITNESS = 'General Fitness',
  LOWER_CARB = 'Lower Carb',
  LOWER_CALORIE = 'Lower Calorie',
  HIGHER_PROTEIN = 'Higher Protein'
}

export enum UserCategory {
  KID = 'Kid',
  ADULT = 'Adult',
  SENIOR = 'Senior'
}

export enum UserRank {
  NOVICE = 'Novice',
  ROOKIE = 'Rookie',
  ELITE = 'Elite',
  LEGEND = 'Legend'
}

export interface MacroData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface UserProfile {
  name: string;
  age: number;
  height: string;
  weight: string;
  goal: HealthGoal;
  goals: HealthGoal[];
  category: UserCategory;
  allergies: string[];
  points: number;
  aura: number;
  streak: number;
  rank: UserRank;
  isAuthenticated: boolean;
  avatarUrl?: string;
  level: number;
  email?: string;
  password?: string;
  phoneNumber?: string;
  provider?: string;
}

export interface SwapResult {
  id: string;
  originalFood: string;
  suggestedSwap: string;
  explanation: string;
  reasoning: string;
  estimatedPrice?: string;
  macros: {
    original: MacroData;
    swap: MacroData;
  };
  recipe: {
    ingredients: { item: string; amount: string }[];
    steps: string[];
    prepTime: string;
  };
  goals: HealthGoal[];
  category: UserCategory;
}

export interface DictionaryItem {
  food: string;
  swaps: {
    [key in HealthGoal]?: {
      suggested: string;
      explanation: string;
    }
  };
}

export interface SocialPost {
  id: string;
  userName: string;
  userLevel?: number;
  content: string;
  imageUrl?: string;
  hypeCount?: number;
  squadCount?: number;
  likes?: number;
  timestamp: string;
  type?: 'ACHIEVEMENT' | 'MEAL' | 'THOUGHT';
  swap?: { from: string; to: string };
}

export interface SquadComment {
  id: string;
  userName: string;
  text: string;
  timestamp: string;
}

export interface Challenge {
  id: string;
  title: string;
  description?: string;
  duration: string;
  participants: number;
  image: string;
  reward?: number;
  daysTotal?: number;
  daysCompleted?: number;
  isActive?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  swapResult?: SwapResult;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'xp';
}
