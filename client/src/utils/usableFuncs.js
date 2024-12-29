export const displayNumbers = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF',
  }).format(number);
};