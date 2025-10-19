import type { Percentage } from '../@types/types';
import styles from './Bar.module.scss';

const Bar = ({ pctg, nutrient }: { pctg: Percentage; nutrient: string }) => {
  console.log('bar', nutrient);

  return (
    <div key={nutrient} className={styles.bar}>
      <div className={styles[nutrient]} style={{ height: pctg.amount + '%' }} />

      {pctg.rdi && (pctg.rdi.min || pctg.rdi.max) ? (
        <div className={styles.rdi}>
          <div style={{ height: pctg.rdi.min + '%' }} />
          <div
            className={`${styles.range} 
            ${!pctg.rdi.max ? styles['range--noTop'] : ''} 
            ${!pctg.rdi.min ? styles['range--noBottom'] : ''}
            `}
            style={{
              height:
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
  );
};

export default Bar;
