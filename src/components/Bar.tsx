import type { PercentageType } from '../@types/types';
import fi from '../utilities/fi';
import styles from './Bar.module.scss';

const Bar = ({
  pctg,
  nutrient,
  showName = true,
  heightRem,
}: {
  pctg: PercentageType;
  nutrient: string;
  showName?: boolean;
  heightRem?: number;
}) => {
  return (
    <div key={nutrient} className={styles.nutrientBar}>
      {showName ? (
        <p className={styles.name}>
          {fi(nutrient)} {pctg.amount.toFixed(0)}%
        </p>
      ) : (
        <></>
      )}
      <div
        className={styles.bar}
        style={heightRem ? { height: heightRem + 'rem' } : {}}
      >
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
