import { createUserToken, validateAuth } from "@/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    if (!email || !password) {
        return NextResponse.json({ error: 'Campos incompletos' });
    }

    const user = await validateAuth(email, password);
    if (!user) return NextResponse.json({ error: 'Acesso negado' });

    const token = await createUserToken(user.id);

    return NextResponse.json({ user, token });
}