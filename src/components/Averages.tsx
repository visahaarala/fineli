import { useEffect, useState } from 'react';
import type { FoodType, PercentageType } from '../@types/types';
import styles from './Averages.module.scss';
import Bar from './Bar';

const Averages = ({ foods }: { foods: FoodType[] }) => {
  const initPctgs = (): { [key: string]: PercentageType } => {
    return {
      fat: { amount: 0 },
      protein: { amount: 0 },
      sugar: { amount: 0 },
      starch: { amount: 0 },
      fiber: { amount: 0 },
    };
  };

  const [pctgs, setPctgs] = useState(initPctgs());

  useEffect(() => {
    console.log('useEffect');

    const newPctgs: { [key: string]: PercentageType } = initPctgs();

    if (foods.length > 1) {
      foods.forEach((food) => {
        Object.keys(newPctgs).forEach((key) => {
          newPctgs[key].amount += Number(food[key as keyof FoodType]);
        });
      });
    } else {
      Object.keys(newPctgs).forEach((key) => {
        newPctgs[key].amount = 0;
      });
    }

    Object.keys(newPctgs).forEach(
      (key) => (newPctgs[key].amount = newPctgs[key].amount / foods.length)
    );

    setPctgs(newPctgs);
  }, [foods]);

  console.log('foods in average', foods.length);

  return (
    <div className={styles.averages}>
      {Object.keys(pctgs).map((nutrient) => (
        <Bar
          key={nutrient}
          pctg={pctgs[nutrient]}
          nutrient={nutrient}
          heightRem={1}
          showName={false}
        />
      ))}
    </div>
  );
};

export default Averages;
