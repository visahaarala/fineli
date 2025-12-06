const fi: { [key: string]: string } = {
  fat: 'rasva',
  protein: 'proteiini',
  sugar: 'sokeri',
  starch: 'tärkkelys',
  fiber: 'kuitu',
};

export default (en: string): string => fi[en] || '?';
