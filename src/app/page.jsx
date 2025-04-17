'use client';

import { useEffect } from 'react';
import Card from '@/components/Card';
import { getItemList } from '@/lib/api';
import useStore from '@/data/store';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const localItems = useStore(state => state.items);
  const loading = useStore(state => state.loading);
  const setItems = useStore(state => state.setItems);
  const setLoading = useStore(state => state.setLoading);

  useEffect(() => {
    getTodoItemList();
  }, []);

  const getTodoItemList = async () => {
    setLoading(true);
    const res = await getItemList();
    setItems(res);
  };

  if (loading) {
    return (
      <div>
        <SearchBar />
        {/* 데이터 로드시 Skeleton UI 적용 */}
        <div className="flex flex-wrap justify-center mt-4 animate-pulse">
          <div className="flex flex-col items-start justify-start w-full pc:w-1/2 mob:pl-[16px] mob:pr-[15px] tab:px-24px ">
            <div className="w-[101px] h-[36px] my-[10px] bg-gray-300 rounded-full" />
            <div className="overflow-hidden flex-row justify-left items-center w-full h-[50px] my-[10px] bg-gray-300 rounded-full" />
            <div className="overflow-hidden flex-row justify-left items-center w-full h-[50px] my-[10px] bg-gray-300 rounded-full" />
            <div className="overflow-hidden flex-row justify-left items-center w-full h-[50px] my-[10px] bg-gray-300 rounded-full" />
          </div>
          <div className="flex flex-col items-start justify-start w-full pc:w-1/2 mob:pl-[16px] mob:pr-[15px] tab:px-24px ">
            <div className="w-[101px] h-[36px] my-[10px] bg-gray-300 rounded-full" />
            <div className="overflow-hidden flex-row justify-left items-center w-full h-[50px] my-[10px] bg-gray-300 rounded-full" />
            <div className="overflow-hidden flex-row justify-left items-center w-full h-[50px] my-[10px] bg-gray-300 rounded-full" />
            <div className="overflow-hidden flex-row justify-left items-center w-full h-[50px] my-[10px] bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SearchBar />
      <div className="flex flex-wrap justify-center mt-4">
        <Card
          status="todo"
          items={localItems}
        />
        <Card
          status="done"
          items={localItems}
        />
      </div>
    </div>
  );
}
