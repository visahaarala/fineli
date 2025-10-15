import './App.css';
import { useState } from 'react';
import type { Food } from './@types/types';
import Search from './components/Search';
import Results from './components/Results';

function App() {
  const [foods, setFoods] = useState<Food[]>([]);

  return (
    <>
      <header>
        <strong>fineli app header</strong>
      </header>
      <main>
        <Search setFoods={setFoods} />
        <Results foods={foods} />
      </main>
    </>
  );
}

export default App;
