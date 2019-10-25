import env from "../env";

const apiFetch = async (url, options) => {
  const res = await fetch(`${env.REACT_APP_API_URL}${url}`, options);

  return await res.json();
};

export default apiFetch;
