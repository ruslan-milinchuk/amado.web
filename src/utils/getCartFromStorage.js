export const getCartFromStorage = async key => {
  const data = await localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};
