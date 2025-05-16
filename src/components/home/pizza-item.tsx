"use client"

import { Product } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "../ui/button";
import { decimalToMoney } from "@/lib/utils";
import { useCart } from "@/stores/cart";

type Props = {
    data: Product;
}

export const PizzaItem = ({ data }: Props) => {
    const cart = useCart();

    const handleAddToCart = () => {
        cart.addItem({
            productId: data.id,
            quantity: 1
        });
        cart.setOpen(true);
    }

    return (
        <div className="text-sm bg-secondary p-4 rounded-md">
            <Image
                src={data.image}
                alt={data.name}
                width={200}
                height={200}
                className="w-full mb-3"
            />
            <div className="text-lg font-bold">{data.name}</div>
            <div>{decimalToMoney(data.price)}</div>
            <div className="truncate mb-3">{data.ingredients}</div>
            <div className="text-center">
                <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
            </div>
        </div>
    );
}