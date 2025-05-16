import { create } from "zustand";
import { setCookie, deleteCookie } from 'cookies-next/client';

type Store = {
    token: string | null;
    open: boolean;
    setOpen: (newOpen: boolean) => void;
    setToken: (newToken: string | null) => void;
}

export const useAuth = create<Store>()(set => ({
    token: null,
    open: false,
    setOpen: (newOpen) => set(state => ({ ...state, open: newOpen })),
    setToken: (newToken) => set(state => {
        if (newToken) {
            setCookie('token', newToken);
        } else {
            deleteCookie('token');
        }
        return { ...state, token: newToken }
    })
}));