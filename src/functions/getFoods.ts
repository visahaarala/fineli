import type { Food } from '../@types/types';
import { header, rows } from '../data/foods';

export default () => {
  const foods: Food[] = [];
  rows.forEach((row) => {
    const food: Food = {};
    header.forEach((key, index) => {
      food[key] = String(row[index]);
    });
    foods.push(food);
  });
  return foods;
};
