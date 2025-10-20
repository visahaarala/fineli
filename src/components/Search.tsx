import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import styles from './Search.module.scss';
import type { FoodType } from '../@types/types';
import getFoods from '../functions/getFoods';
import { igclassp } from '../data/categories';

const foods = getFoods();

const Search = ({
  search,
  setSearch,
  setFoods,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setFoods: Dispatch<SetStateAction<FoodType[]>>;
}) => {
  const [igclasspOpt, setIgclasspOpt] = useState<string | undefined>();
  const [isRaw, setIsRaw] = useState(true);
  const [isScientific, setIsScientific] = useState(false);

  useEffect(() => {
    const words = search.split(' ');

    // check for food ID in search field
    if (words.length === 1 && Number(words[0])) {
      const food = foods.find((food) => food.id === Number(words[0]));
      if (food) {
        setFoods([food]);
      } else {
        setFoods([]);
      }
      return;
    }

    const filteredFoods = foods
      .filter((food) => !isScientific || food['scientific'])
      .filter((food) => !isRaw || food['process'] === 'RAW')
      .filter((food) => !igclasspOpt || food['igclassp'] === igclasspOpt)
      .filter((food) => {
        for (let word of words) {
          if (word[0] === '-') {
            word = word.slice(1);
            if (
              word.length > 0 &&
              food['name'].toLowerCase().includes(word.toLowerCase())
            ) {
              return false;
            }
          } else {
            if (!food['name'].toLowerCase().includes(word.toLowerCase())) {
              return false;
            }
          }
        }
        return true;
      });
    setFoods(filteredFoods);
  }, [search, igclasspOpt, isRaw, isScientific, setFoods]);

  useEffect(() => {
    document.getElementById('search')?.focus();
  }, []);

  return (
    <div className={styles.search}>
      <div className={styles.checkBox}>
        <label htmlFor='raw'>Käsittelemätön</label>
        <input
          type='checkbox'
          checked={isRaw}
          onChange={() => setIsRaw(!isRaw)}
        />
      </div>
      <div className={styles.checkBox}>
        <label htmlFor='scientific'>Tieteellinen nimi</label>
        <input
          type='checkbox'
          checked={isScientific}
          onChange={() => setIsScientific(!isScientific)}
        />
      </div>
      <select
        name='igclassp'
        id='igclassp'
        onChange={(e) => setIgclasspOpt(e.target.value)}
      >
        <option />
        {Object.entries(igclassp).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <div className={styles.input}>
        <input
          id='search'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='hae..'
        />
        <div
          className={`${styles.clear} ${
            search.length > 0 ? styles['clear--visible'] : ''
          }`}
          onClick={() => {
            setSearch('');
            document.getElementById('search')?.focus();
          }}
        />
      </div>
    </div>
  );
};

export default Search;
