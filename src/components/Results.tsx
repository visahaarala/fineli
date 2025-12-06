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
    <p className={styles.numResults}>{foods.length} hakutulosta</p>
    {foods.slice(0, MAX_RESULTS).map((food) => (
      <p
        key={Math.random()}
        onClick={() => setSearch(String(food.id))}
        className={styles.name}
      >
        {food.name}
        {food.scientific ? (
          <span className='scientific'>({food.scientific})</span>
        ) : (
          ''
        )}
      </p>
    ))}
    {foods.length > MAX_RESULTS ? (
      <p className={styles.numResults}>... {foods.length - MAX_RESULTS} lisää</p>
    ) : (
      ''
    )}
    {/*
      ADD AVERAGE VIEW (when less than 100?)
    */}
  </div>
);

export default Results;
