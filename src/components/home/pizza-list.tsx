"use client"

import { Product } from "@/generated/prisma";
import { PizzaItem } from "./pizza-item";
import { useProducts } from "@/stores/products";
import { useEffect } from "react";

type Props = {
    pizzas: Product[];
}

export const PizzaList = ({ pizzas }: Props) => {
    const products = useProducts();
    useEffect(() => products.setProducts(pizzas), []);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {pizzas.map((item: Product) => (
                <PizzaItem
                    key={item.id}
                    data={item}
                />
            ))}
        </div>
    );
}