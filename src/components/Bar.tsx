import type { PercentageType } from '../@types/types';
import styles from './Bar.module.scss';

const Bar = ({ pctg, nutrient }: { pctg: PercentageType; nutrient: string }) => {
  
  const fi: { [key: string]: string } = {
    fat: 'rasva',
    protein: 'proteiini',
    sugar: 'sokeri',
    starch: 'tärkkelys',
    fiber: 'kuitu',
  };

  return (
    <div key={nutrient} className={styles.nutrientBar}>
      <p className={styles.name}>
        {fi[nutrient]} {pctg.amount.toFixed(0)}%
      </p>
      <div className={styles.bar}>
        <div
          className={styles[nutrient]}
          style={{ width: pctg.amount + '%' }}
        />

        {pctg.rdi && (pctg.rdi.min || pctg.rdi.max) ? (
          <div className={styles.rdi}>
            <div
              style={{
                width: (pctg.rdi.min || 0) + '%',
              }}
            />
            <div
              className={`${styles.range} 
                ${!pctg.rdi.min ? styles['range--noMin'] : ''}
                ${!pctg.rdi.max ? styles['range--noMax'] : ''} 
                `}
              style={{
                width:
                  (pctg.rdi.max || Math.min(pctg.rdi.min! + 20, 100)) -
                  (pctg.rdi.min || 0) +
                  '%',
              }}
            >
              <div />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Bar;
