export const stringifySearchParams = params => {
  const jsonStringify = JSON.parse(JSON.stringify(params));
  return new URLSearchParams(jsonStringify).toString();
};
