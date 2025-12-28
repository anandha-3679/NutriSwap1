
export enum HealthGoal {
  BULK = 'Main Character Bulk',
  SHRED = 'Elite Shred',
  VIBE = 'Casual Health Vibe',
  /* Support for NutriSwap constant categories */
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
  ROOKIE = 'Rookie',
  ELITE = 'Elite',
  LEGEND = 'Legendary Status'
}

export interface UserProfile {
  username: string;
  name: string;
  age: number;
  foodPrefs: string;
  allergies: string[];
  points: number;
  aura: number;
  streak: number;
  rank: UserRank;
  followers: number;
  following: number;
  bio: string;
  isAuthenticated: boolean;
  avatarUrl?: string;
  posts: SocialPost[];
  /* Added properties for health goals and category profiling */
  goals: HealthGoal[];
  category: UserCategory;
  level: number;
  email?: string;
  password?: string;
  phoneNumber?: string;
  provider?: string;
}

export interface SocialPost {
  id: string;
  username: string;
  content: string;
  imageUrl?: string;
  hypeCount?: number;
  squadCount?: number;
  timestamp: string;
  type?: 'LOCK_IN' | 'MEAL' | 'W';
  /* Community feature extensions */
  userLevel?: number;
  swap?: { from: string; to: string };
  likes?: number;
}

export interface ChatMessage {
  id?: string;
  sender?: string;
  text?: string;
  timestamp?: string;
  /* Agentic Chat extensions */
  role?: 'user' | 'assistant';
  content?: string;
  swapResult?: SwapResult;
}

export interface Challenge {
  id: string;
  title: string;
  xp: number;
  participants: number;
  emoji: string;
  checkedIn: boolean;
  /* Community challenge extensions */
  description?: string;
  reward: number;
  daysTotal: number;
  daysCompleted: number;
  isActive: boolean;
}

/* New interfaces for nutrition tracking and AI results */
export interface MacroData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface SwapResult {
  id: string;
  originalFood: string;
  suggestedSwap: string;
  explanation: string;
  reasoning: string;
  estimatedPrice: string;
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
  swaps: Partial<Record<HealthGoal, { suggested: string; explanation: string }>>;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'xp' | 'error';
}
