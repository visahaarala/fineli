import type { FoodType, PercentageType } from '../@types/types';
import Bar from './Bar';
import styles from './Food.module.scss';

const Food = ({ food }: { food: FoodType }) => {
  const { energy, fat, protein, sugar, starch, fiber } = food;

  const kcal = energy / 4.184; // wikipedia

  const calcKcal = fat * 9 + (protein + sugar + starch) * 4 + fiber * 2; // source?

  const pctgs: {
    [key: string]: PercentageType;
  } = {
    fat: { amount: ((fat * 9) / calcKcal) * 100, rdi: { min: 10, max: 35 } },
    protein: {
      amount: ((protein * 4) / calcKcal) * 100,
      rdi: { min: 10, max: 35 },
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
      rdi: { min: 2.8 },
    },
  };

  return (
    <div className={styles.food}>
      <div>
        <h2>
          #{food.id}: {food.name}
        </h2>
        <p className='scientific'>{food.scientific}</p>
      </div>
      <div>
        <h3>Energiajakauma ({kcal.toFixed(0)} kcal / 100g):</h3>
        <div className={styles.graph}>
          {Object.keys(pctgs).map((nutrient) => (
            <Bar pctg={pctgs[nutrient]} nutrient={nutrient} key={nutrient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Food;
