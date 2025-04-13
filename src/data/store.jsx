import { create } from 'zustand'

const useStore = create((set) => ({
    items: [],
    item: {},
    toggleCompleted: () =>
        set((state) => ({
            item: {
                ...state.item,
                isCompleted: !state.item?.isCompleted,
            },
        })),
}));

export default useStore;