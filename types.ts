
export enum HealthGoal {
  LOWER_CALORIE = 'Lower Calorie',
  HIGHER_PROTEIN = 'Higher Protein',
  LOWER_CARB = 'Lower Carb',
  HEART_HEALTHY = 'Heart Healthy',
  LOW_SODIUM = 'Low Sodium'
}

export enum UserCategory {
  KID = 'Kid',
  ADULT = 'Adult',
  ELDERLY = 'Elderly'
}

export interface RecipeIngredient {
  item: string;
  amount: string;
}

export interface SwapResult {
  originalFood: string;
  suggestedSwap: string;
  explanation: string;
  goals: HealthGoal[];
  category: UserCategory;
  recipe: {
    ingredients: RecipeIngredient[];
    steps: string[];
    prepTime: string;
  };
}

export interface DictionaryItem {
  food: string;
  swaps: {
    [key in HealthGoal]?: {
      suggested: string;
      explanation: string;
    }
  }
}
