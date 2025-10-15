import type { Food } from '../@types/types';
import styles from './Results.module.scss';

const Results = ({ foods }: { foods: Food[] }) => {
  const capitalize = (str: string) => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className={styles.results}>
      <p>{foods.length} tulosta</p>
      {foods.map((food) => (
        <div key={Math.random()}>{capitalize(food.name)}</div>
      ))}
    </div>
  );
};

export default Results;
