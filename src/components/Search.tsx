import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import styles from './Search.module.scss';
import type { Food } from '../@types/types';
import getFoods from '../functions/getFoods';
import { igclassp } from '../data/categories';

const foods = getFoods();

const Search = ({
  setFoods,
}: {
  setFoods: Dispatch<SetStateAction<Food[]>>;
}) => {
  const [search, setSearch] = useState('');
  const [igclasspOpt, setIgclasspOpt] = useState<string | undefined>();
  const [isRaw, setIsRaw] = useState(false);

  useEffect(() => {
    const words = search.split(' ');
    const filteredFoods = foods
      .filter((food) => !isRaw || food['process'] === 'RAW')
      .filter((food) => !igclasspOpt || food['igclassp'] === igclasspOpt)
      .filter((food) => {
        for (const word of words) {
          if (!food['name'].toLowerCase().includes(word.toLowerCase()))
            return false;
        }
        return true;
      });
    setFoods(filteredFoods);
  }, [search, igclasspOpt, isRaw, setFoods]);

  return (
    <div className={styles.search}>
      <div>
        <label htmlFor='raw'>käsittelemätön</label>
        <input
          type='checkbox'
          checked={isRaw}
          onChange={() => setIsRaw(!isRaw)}
        />
      </div>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='hae..'
      />
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
    </div>
  );
};

export default Search;
