import type { FoodType } from '../@types/types';
import { header, rows } from '../data/foods';

export default () => {
  const foods: FoodType[] = [];

  const capitalize = (str: string) => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };

  rows.forEach((row) => {
    const sci = row[header.indexOf('scientific')];

    const food: FoodType = {
      id: Number(row[header.indexOf('id')]),
      scientific: sci === null ? null : capitalize(String(sci)),
      name: capitalize(
        String(row[header.indexOf('name')]).replace('(ARC)', '').trim()
      ),
      process: String(row[header.indexOf('process')]),
      igclass: String(row[header.indexOf('igclass')]),
      igclassp: String(row[header.indexOf('igclassp')]),
      energy: Number(row[header.indexOf('energy')]),
      fat: Number(row[header.indexOf('fat')]),
      sugar: Number(row[header.indexOf('sugar')]),
      protein: Number(row[header.indexOf('protein')]),
      starch: Number(row[header.indexOf('starch')]),
      fiber: Number(row[header.indexOf('fiber')]),
    };
    foods.push(food);
  });

  return (
    foods
      // sort alphabetically
      .sort((a, b) => a.name.localeCompare(b.name))
  );
};
