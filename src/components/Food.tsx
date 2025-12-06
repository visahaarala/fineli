import type { FoodType } from '../@types/types';
import getFoodInfo from '../utilities/getFoodInfo';
import Bar from './Bar';
import styles from './Food.module.scss';

const Food = ({ food }: { food: FoodType }) => {
  const { kcal, percentages } = getFoodInfo(food, true);

  return (
    <div className={styles.food}>
      <div>
        <h2>
          #{food.id} - {food.name}
        </h2>
        <p className='scientific'>{food.scientific}</p>
      </div>
      <div>
        <h3>Energiajakauma ({kcal.toFixed(0)} kcal / 100g):</h3>
        <div className={styles.graph}>
          {Object.keys(percentages).map((nutrient) => (
            <Bar
              pctg={percentages[nutrient]}
              nutrient={nutrient}
              key={nutrient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Food;
