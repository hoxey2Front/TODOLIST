import { create } from 'zustand'

const useStore = create((set) => ({
    items: [],
    // addItem: (newItem) => set((state) => [...state.items, newItem]),
    // removeAllitems: () => set({ items: [] }),
    // setItems: (newItems) => set({ items: newItems }),
}));

export default useStore;