export const addToFavs = (item, array) => {
  array.push(item);
  return array;
};
export const removeFav = (item, array) => {
  return array.filter((i) => i.id !== item.id);
};
