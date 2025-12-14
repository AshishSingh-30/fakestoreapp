import api from "./axios";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

export const getCategories = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/products/categories");
  return data;
};

export async function getProductById(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store", // ✅ IMPORTANT
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export type CreateProductPayload = Omit<Product, "id">;

export const createProduct = async (
  payload: CreateProductPayload
): Promise<Product> => {
  const { data } = await api.post<Product>("/products", payload);
  return data;
};
