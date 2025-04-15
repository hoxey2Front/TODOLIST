'use client';
import Search from '@/components/Search';
import { useState } from 'react';
import useStore from '@/data/store';
import { addItem } from '@/lib/api';
import { getItemList } from '@/lib/api';

function SearchBar() {
  const [name, setName] = useState('');

  const getTodoItemList = async () => {
    const res = await getItemList();
    useStore.setState({ items: res });
  };

  const addTodoItem = async () => {
    await addItem({ name });
    await getTodoItemList();
  };
  const handleAddTodoItem = async () => {
    if (!name.trim()) {
      alert('값을 입력해주세요.');
      return;
    }
    await addTodoItem();
    setName(''); // ✅ 입력창 초기화
  };

  return (
    <div className="flex flex-row py-[2px] h-[60px] mob:pl-[16px] mob:pr-[15px] tab:px-24px">
      <Search
        value={name}
        onChange={val => setName(val)}
        onEnter={handleAddTodoItem} // ⬅️ Enter 키 눌렀을 때 실행할 함수
      />
      <div className="w-[16px]"></div>
      <div className="w-[56px] tab:w-[162px] pc:w-[168px] bg-no-repeat bg-[length:100%_100%] bg-[url('/images/img/search.png')">
        <img
          src="/buttons/Type=Add, Size=Large, State=Default.png"
          alt="logo_large"
          className="h-full hidden mob:inline cursor-pointer"
          onClick={() => {
            handleAddTodoItem();
          }}
        />
        <img
          src="/buttons/Type=Add, Size=Small, State=Default.png"
          alt="logo_small"
          className="h-full inline mob:hidden cursor-pointer"
          onClick={handleAddTodoItem}
        />
      </div>
    </div>
  );
}

export default SearchBar;
