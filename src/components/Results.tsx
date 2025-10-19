import type { Dispatch, SetStateAction } from 'react';
import type { FoodType } from '../@types/types';
import styles from './Results.module.scss';

const MAX_RESULTS = 500;

const Results = ({
  foods,
  setSearch,
}: {
  foods: FoodType[];
  setSearch: Dispatch<SetStateAction<string>>;
}) => (
  <div className={styles.results}>
    {foods.length === 1 ? (
      <div className={styles.graph}>
        <h3>{foods[0].name}</h3>
      </div>
    ) : (
      <div className={styles.list}>
        <p>
          {foods.length > MAX_RESULTS ? `${MAX_RESULTS} / ` : ''} {foods.length}{' '}
          tulosta
        </p>
        {foods.slice(0, MAX_RESULTS).map((food) => (
          <div
            key={Math.random()}
            // onClick={() => setSearch(String(food.id))}
            onClick={() => setSearch(String(food.id))}
          >
            {food.name}
            {food.scientific ? <span>({food.scientific})</span> : ''}
          </div>
        ))}
        {foods.length > MAX_RESULTS ? (
          <div>... {foods.length - MAX_RESULTS} lisää</div>
        ) : (
          ''
        )}
      </div>
    )}
  </div>
);

export default Results;
