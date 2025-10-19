import type { FoodType, Percentage } from '../@types/types';
import Bar from './Bar';
import styles from './Food.module.scss';

const Food = ({ food }: { food: FoodType }) => {
  const { energy, fat, protein, sugar, starch, fiber } = food;

  const kcal = energy / 4.184; // wikipedia

  const calcKcal = fat * 9 + (protein + sugar + starch) * 4 + fiber * 2; // source?

  const pctgs: {
    [key: string]: Percentage;
  } = {
    fat: { amount: ((fat * 9) / calcKcal) * 100, rdi: { min: 10, max: 35 } },
    protein: {
      amount: ((protein * 4) / calcKcal) * 100,
      rdi: { min: 10, max: 35 },
    },
    sugar: {
      amount: ((sugar * 4) / calcKcal) * 100,
      rdi: { max: 10 },
    },
    starch: {
      amount: ((starch * 4) / calcKcal) * 100,
      rdi: { min: 45, max: 65 },
    },
    fiber: {
      amount: ((fiber * 2) / calcKcal) * 100,
      rdi: { min: 2.8 },
    },
  };

  return (
    <div className={styles.food}>
      <strong>
        {food.name} (#{food.id})
      </strong>
      <p>energy: {kcal.toFixed(0)} kcal</p>
      {Object.keys(pctgs).map((nutrient) => (
        <p key={nutrient}>{`${nutrient}: ${pctgs[nutrient].amount.toFixed(
          0
        )}%`}</p>
      ))}
      <div className={styles.graph}>
        {Object.keys(pctgs).map((nutrient) => (
          <Bar pctg={pctgs[nutrient]} nutrient={nutrient} />
        ))}
      </div>
    </div>
  );
};

export default Food;
