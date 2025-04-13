'use client';
import Search from '@/components/Search';
import { useState } from 'react';
import useStore from '@/data/store';
import { addItem } from '@/lib/api';
import { getItemList } from '@/lib/api';

function Header() {
  const [name, setName] = useState('');

  const getTodoItemList = async () => {
    const res = await getItemList();
    useStore.setState({ items: res });
  };

  const addTodoItem = async () => {
    await addItem({ name });
    await getTodoItemList();
  };
  return (
    <div className="flex flex-row py-[2px] h-[60px]">
      <Search onChange={val => setName(val)} />
      <div className="w-[16px]"></div>
      <div className="w-[56px] md:w-[162px] xl:w-[168px] bg-no-repeat bg-[length:100%_100%]">
        <img
          src="/buttons/Type=Add, Size=Large, State=Default.png"
          alt="logo_large"
          className="hidden sm:inline"
          onClick={addTodoItem}
        />
        <img
          src="/buttons/Type=Add, Size=Small, State=Default.png"
          alt="logo_small"
          className="inline sm:hidden"
          onClick={addTodoItem}
        />
      </div>
    </div>
  );
}

export default Header;
