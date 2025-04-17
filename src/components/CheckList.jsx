'use client';

import { getItemList } from '@/lib/api';
import { updateListItem } from '@/lib/api';
import useStore from '@/data/store';
import Link from 'next/link';

const CheckList = ({ isDone, item }) => {
  const getTodoItemList = async () => {
    const res = await getItemList();
    useStore.setState({ items: res });
  };

  const updateTodoItem = async (id, isCompleted) => {
    await updateListItem(id, isCompleted);
    await getTodoItemList();
  };

  return (
    <div className="overflow-hidden flex-row justify-left items-center border-2 border-slate-900 rounded-full w-full h-[50px] my-[10px]">
      {isDone ? (
        <div className="w-full h-full bg-violet-100 flex flex-row items-center">
          <img
            src="/icons/ic/Property 1=Frame 2610233.svg"
            alt="Property 1=Frame 2610233"
            className="mx-[10px]"
            onClick={() => updateTodoItem(item.id, !isDone)}
          />
          <Link
            href={`/items/${item.id}`}
            className="w-full h-full flex items-center"
          >
            <span className="line-through">{item.name}</span>
          </Link>
        </div>
      ) : (
        <div className="w-full h-full bg-white flex flex-row items-center">
          <img
            src="/icons/ic/Property 1=Default.svg"
            alt="Property 1=Default"
            className="mx-[10px]"
            onClick={() => updateTodoItem(item.id, !isDone)}
          />
          <Link
            href={`/items/${item.id}`}
            className="w-full h-full flex items-center"
          >
            <span>{item.name}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckList;
