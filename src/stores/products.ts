import { Product } from "@/generated/prisma"
import { create } from 'zustand';

type Store = {
    products: Product[];
    setProducts: (products: Product[]) => void;
}

export const useProducts = create<Store>((set) => ({
    products: [],
    setProducts: (products) => set({ products })
}));