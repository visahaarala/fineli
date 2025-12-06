import './App.scss';
import { useState } from 'react';
import type { FoodType } from './@types/types';
import Search from './components/Search';
import Results from './components/Results';
import Food from './components/Food';

function App() {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [search, setSearch] = useState('');

  return (
    <>
      <header>
        <h1>fineli.fi ravintoaineet</h1>
        <Search search={search} setSearch={setSearch} setFoods={setFoods} />
      </header>
      <main>
        {foods.length === 1 ? (
          <Food food={foods[0]} />
        ) : (
          <Results foods={foods} setSearch={setSearch} />
        )}
      </main>
      {/* <footer>{foods.length !== 1 ? <Averages foods={foods} /> : <></>}</footer> */}
    </>
  );
}

export default App;
