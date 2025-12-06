import type { FoodType, PercentageType } from '../@types/types';

export default (
  food: FoodType,
  includeRdi: boolean
): { kcal: number; percentages: { [key: string]: PercentageType } } => {
  const { energy, fat, protein, sugar, starch, fiber } = food;

  const kcal = energy / 4.184; // wikipedia

  const calcKcal = fat * 9 + (protein + sugar + starch) * 4 + fiber * 2; // source?

  return {
    kcal,
    percentages: {
      fat: {
        amount: ((fat * 9) / calcKcal) * 100,
        rdi: includeRdi ? { min: 10, max: 35 } : undefined,
      },
      protein: {
        amount: ((protein * 4) / calcKcal) * 100,
        rdi: includeRdi ? { min: 10, max: 35 } : undefined,
      },
      sugar: {
        amount: ((sugar * 4) / calcKcal) * 100,
        // rdi: { max: 10 },
      },
      starch: {
        amount: ((starch * 4) / calcKcal) * 100,
        // rdi: { min: 45, max: 65 },
      },
      fiber: {
        amount: ((fiber * 2) / calcKcal) * 100,
        rdi: includeRdi ? { min: 2.8 } : undefined,
      },
    },
  };
};
