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
  const [isScientific, setIsScientific] = useState(true);

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

    // for (const word of words) {
    //   console.log('searching for number in ', word);
    //   const searchId = Number(word);
    //   if (searchId) {
    //     const food = foods.find((food) => food.id === searchId);
    //     if (food !== undefined) {
    //       console.log('found food: ', food.name);
    //       setFoods([food]);
    //       return;
    //     }
    //   }
    // }

    const filteredFoods = foods
      .filter((food) => !isScientific || food['scientific'])
      .filter((food) => !isRaw || food['process'] === 'RAW')
      .filter((food) => !igclasspOpt || food['igclassp'] === igclasspOpt)
      .filter((food) => {
        for (let word of words) {
          if (word[0] === '-') {
            word = word.slice(1);
            if (
              word.length > 1 &&
              food['name'].toLowerCase().includes(word.toLowerCase())
            ) {
              console.log(word, 'ok');
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
      <div>
        <label htmlFor='scientific'>scientific</label>
        <input
          type='checkbox'
          checked={isScientific}
          onChange={() => setIsScientific(!isScientific)}
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
