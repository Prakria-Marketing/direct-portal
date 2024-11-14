import { create } from "zustand";

type AuthStore = {
    user?: any;
    provider?: string | null;
    setUser: (user: any) => void;
    setProvider: (provider: string | null) => void;
};
export const useAuth = create<AuthStore>()((set) => ({
    user: undefined,
    provider: undefined,
    setUser: (user) => set(() => ({ user: user })),
    setProvider: (provider) => set(() => ({ provider: provider })),
}));
