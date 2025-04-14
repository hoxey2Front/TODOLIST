'use client';

import { useEffect } from 'react';
import Card from '@/components/Card';
import { getItemList } from '@/lib/api';
import useStore from '@/data/store';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const localItems = useStore(state => state.items);

  useEffect(() => {
    getTodoItemList();
  }, []);

  const getTodoItemList = async () => {
    const res = await getItemList();
    useStore.setState({ items: res });
  };

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
