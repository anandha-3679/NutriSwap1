
import { DictionaryItem, HealthGoal } from './types';

export const COMMON_SWAPS: DictionaryItem[] = [
  {
    food: 'White Rice',
    swaps: {
      [HealthGoal.LOWER_CARB]: {
        suggested: 'Cauliflower Rice',
        explanation: 'Cauliflower rice has significantly fewer carbohydrates and a similar texture when cooked.'
      },
      [HealthGoal.LOWER_CALORIE]: {
        suggested: 'Shirataki Rice',
        explanation: 'Made from konjac root, this rice is almost zero calories and very high in fiber.'
      }
    }
  },
  {
    food: 'Pasta',
    swaps: {
      [HealthGoal.LOWER_CALORIE]: {
        suggested: 'Zucchini Noodles (Zoodles)',
        explanation: 'Zucchini noodles provide the volume of pasta with a fraction of the calories.'
      },
      [HealthGoal.HIGHER_PROTEIN]: {
        suggested: 'Chickpea Pasta',
        explanation: 'Pasta made from legumes contains much higher protein and fiber than traditional wheat pasta.'
      }
    }
  },
  {
    food: 'Mayonnaise',
    swaps: {
      [HealthGoal.HIGHER_PROTEIN]: {
        suggested: 'Plain Greek Yogurt',
        explanation: 'Greek yogurt offers a creamy consistency with a massive protein boost and less fat than mayo.'
      },
      [HealthGoal.LOWER_CALORIE]: {
        suggested: 'Light Mayo or Mustard',
        explanation: 'Mustard adds flavor for negligible calories, while light mayo cuts fat content significantly.'
      }
    }
  },
  {
    food: 'Potato Chips',
    swaps: {
      [HealthGoal.LOWER_CALORIE]: {
        suggested: 'Air-popped Popcorn',
        explanation: 'Popcorn is a whole grain that allows for a much larger serving size for fewer calories.'
      },
      [HealthGoal.LOWER_CARB]: {
        suggested: 'Kale Chips',
        explanation: 'Baked kale provides a satisfying crunch with minimal impact on blood sugar levels.'
      }
    }
  },
  {
    food: 'Soda',
    swaps: {
      [HealthGoal.LOWER_CALORIE]: {
        suggested: 'Sparkling Water with Lime',
        explanation: 'Get the carbonation you crave without the added sugars or artificial sweeteners.'
      }
    }
  },
  {
    food: 'Sour Cream',
    swaps: {
      [HealthGoal.HIGHER_PROTEIN]: {
        suggested: 'Plain Non-fat Greek Yogurt',
        explanation: 'The taste and texture are nearly identical, but the protein content is much superior.'
      }
    }
  },
  {
    food: 'Pizza Crust',
    swaps: {
      [HealthGoal.LOWER_CARB]: {
        suggested: 'Cauliflower Crust',
        explanation: 'Using cauliflower as a base cuts down on flour and simple carbohydrates.'
      }
    }
  },
  {
    food: 'White Bread',
    swaps: {
      [HealthGoal.HIGHER_PROTEIN]: {
        suggested: 'Sprouted Grain Bread',
        explanation: 'Sprouting grains increases protein availability and lowers the glycemic index.'
      },
      [HealthGoal.LOWER_CARB]: {
        suggested: 'Lettuce Wraps',
        explanation: 'Replacing bread with large lettuce leaves eliminates grain-based carbs entirely.'
      }
    }
  },
  {
    food: 'Croutons',
    swaps: {
      [HealthGoal.HIGHER_PROTEIN]: {
        suggested: 'Roasted Chickpeas',
        explanation: 'Roasted chickpeas provide the crunch of croutons with added plant-based protein and fiber.'
      }
    }
  },
  {
    food: 'Ice Cream',
    swaps: {
      [HealthGoal.LOWER_CALORIE]: {
        suggested: 'Frozen Banana "Nice" Cream',
        explanation: 'Blending frozen bananas creates a creamy treat with no added dairy or refined sugars.'
      }
    }
  }
];
