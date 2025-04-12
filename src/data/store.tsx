import { create } from 'zustand'

const useStore = create(() => ({
    items: [],
    // addItem: (newItem) => set((state) => [...state.items, newItem]),
    // removeAllitems: () => set({ items: [] }),
    // setItems: (newItems) => set({ items: newItems }),
}));

export default useStore;