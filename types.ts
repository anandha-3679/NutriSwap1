
export enum HealthGoal {
  LOWER_CALORIE = 'Lower Calorie',
  HIGHER_PROTEIN = 'Higher Protein',
  LOWER_CARB = 'Lower Carb'
}

export interface SwapResult {
  originalFood: string;
  suggestedSwap: string;
  explanation: string;
  goal: HealthGoal;
  calories?: string;
  protein?: string;
  carbs?: string;
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
