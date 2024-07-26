export const generateVariations = (attributes) => {
  if (attributes.length === 0) return [];

  const result = [];

  const combine = (currentCombination, index) => {
    if (index === attributes.length) {
      result.push(currentCombination.join(" "));
      return;
    }

    const attribute = attributes[index];
    for (const value of attribute.values) {
      combine([...currentCombination, value], index + 1);
    }
  };

  combine([], 0);

  return result;
};
