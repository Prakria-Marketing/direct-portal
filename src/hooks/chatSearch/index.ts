import { create } from "zustand";

type ChatSearchStore = {
    query: string;
    channels: [];
    users: [];
    setResults: (results: Partial<ResultType>) => void;
    setQuery: (q: string) => void
};
type ResultType = {
    users: [],
    channels: [],
}
export const useChatSearch = create<ChatSearchStore>()((set) => ({
    // results: [],
    query: "",
    channels: [],
    users: [],
    setResults: (res) => set({ ...res }),
    setQuery: (query) => set({ query })
}));
