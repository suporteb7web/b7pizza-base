import Link from "next/link";
import { CartButton } from "../cart/cart-button";
import { LoginAreaButton } from "../login-area/login-area-button";
import { cookies } from "next/headers";

export const Header = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    return (
        <header className="container mx-auto flex my-4 p-5 items-center justify-between bg-secondary rounded-md">
            <Link href="/">
                <div className="text-2xl font-bold">B7Pizza</div>
            </Link>
            <div className="flex gap-2">
                <LoginAreaButton initialState={token ? true : false} />
                <CartButton />
            </div>
        </header>
    );
}