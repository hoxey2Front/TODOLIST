import { create } from 'zustand';

// ✅ zustand로 전역변수 사용
const useStore = create(set => ({
  items: [], // 전체 아이템
  item: {}, // 아이템 하나
  loading: true, // loading 여부

  setItems: items => set({ items, loading: false }),
  setLoading: loading => set({ loading }),
  toggleCompleted: () =>
    set(state => ({
      item: {
        ...state.item,
        isCompleted: !state.item?.isCompleted,
      },
    })),
}));

export default useStore;
