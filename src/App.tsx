import './App.css';
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
        <strong>fineli app header</strong>
      </header>
      <main>
        <Search search={search} setSearch={setSearch} setFoods={setFoods} />
        {foods.length === 1 ? (
          <Food food={foods[0]} />
        ) : (
          <Results foods={foods} setSearch={setSearch} />
        )}
      </main>
    </>
  );
}

export default App;
