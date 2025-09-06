import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  sellerId: number;
};

export type ProductForm = Omit<Product, "id" | "sellerId">;

type ProductContextType = {
  products: Product[];
  addProduct: (form: ProductForm) => void;
  updateProduct: (id: number, form: ProductForm) => void;
  deleteProduct: (id: number) => void;
};

const ProductContext = createContext<ProductContextType>({} as ProductContextType);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (form: ProductForm) => {
    if (!user) throw new Error("Login required");
    const newProduct = { ...form, id: Date.now(), sellerId: user.id };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, form: ProductForm) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...form } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>{children}</ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);
