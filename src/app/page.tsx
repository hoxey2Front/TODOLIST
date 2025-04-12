"use client";

import { useEffect, useState } from "react";
import Search from "@/components/Search";
import Card from "@/components/Card";
import { addItem } from "@/lib/api";
import { getItemList } from "@/lib/api";
import useStore from "@/data/store";

export default function Home() {
  const [name, setName] = useState("");
  const localItems = useStore((state) => state.items)
  
  useEffect(() => {
    getTodoItemList();
  }, []);

  const getTodoItemList = async () => {
    const res = await getItemList();
    useStore.setState({ items: res });
  };

  const addTodoItem = async () => {
    await addItem({ name });
    await getTodoItemList();
  };

  return (
    <div>
      <div className="flex flex-row py-[2px] h-[60px]">
        <Search onChange={(val) => setName(val)} />
        <div className="w-[16px]"></div>
        <div className="w-[56px] md:w-[162px] xl:w-[168px] bg-no-repeat bg-[length:100%_100%]">
          <img src="/buttons/Type=Add, Size=Large, State=Default.png" alt="logo_large" className="hidden sm:inline" onClick={addTodoItem}/>
          <img src="/buttons/Type=Add, Size=Small, State=Default.png" alt="logo_small" className="inline sm:hidden" onClick={addTodoItem}/>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-4">
        <Card status="todo" items={localItems}/>
        <Card status="done" items={localItems}/>
      </div>
    </div>
  );
}
