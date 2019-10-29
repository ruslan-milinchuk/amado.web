export const setCartToStorage = async (key, value) => {
  if (!value) {
    await localStorage.removeItem(key);
  } else {
    await localStorage.setItem(key, JSON.stringify(value));
  }
};
