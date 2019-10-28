import apiFetch from "./apiFetch";

export async function getProductDetails(id) {
  const res = await apiFetch(`/products/${id}`);
  return await res.json();
}
