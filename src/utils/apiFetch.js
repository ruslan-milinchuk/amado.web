import env from "../env";

const apiFetch = async (url, options) => {
  return await fetch(`${env.REACT_APP_API_URL}${url}`, options);
};

export default apiFetch;
