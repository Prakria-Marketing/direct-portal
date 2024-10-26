import { create } from "zustand";

type ChatSearchStore = {
    selectedTask: any;
    setSelected: (s: any) => void;
    isOpenTask: boolean;
    setIsOpen: (b: boolean) => void
};

export const useSelectTask = create<ChatSearchStore>()((set) => ({
    selectedTask: null,
    isOpenTask: false,
    setSelected: (selectedTask: any) => { set({ selectedTask }) },
    setIsOpen: (isOpenTask: boolean) => {
        isOpenTask ? set({ isOpenTask }) : set({ isOpenTask, selectedTask: null });
    }
}));



