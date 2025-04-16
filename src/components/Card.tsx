import CheckList from "@/components/CheckList";

interface CardProps {
  status: "done" | "todo";
  items: { id: string; name: string; isCompleted: boolean }[];
}

export default function Card({ status, items }: CardProps) {
  const isDone = status === "done";
  const filteredItems = items?.filter(item => item.isCompleted === isDone).map(item => ({
    ...item,
    name: item.name || "Unnamed Task", // Provide a default name if missing
  })) || [];

  return (
    <div className="flex flex-col items-start justify-start w-full pc:w-1/2 mob:pl-[16px] mob:pr-[15px] tab:px-24px">
      <img
        src={isDone ? '/images/img/done.png' : '/images/img/todo.png'}
        alt="todo"
        className="my-[10px]"
      />

      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <CheckList key={item.id} isDone={isDone} item={item} />
        ))
      ) : (
        <div className="flex flex-row justify-center items-center w-full min-h-[250px] my-[10px]">
          <div className={`mx-[10px] text-center ${isDone ? 'hidden' : 'inline'}`}>
            <img src="/images/img/Type=Todo, Size=Large.svg" alt="/images/img/Type=Todo, Size=Large" />
            <p className="text-[16px] font-[700] text-slate-400">할 일이 없어요.<br />
              TODO를 새롭게 추가해주세요!</p>
          </div>
          <div className={`mx-[10px] text-center ${isDone ? 'inline' : 'hidden'}`}>
            <img src="/images/img/Type=Done, Size=Large.svg" alt="/images/img/Type=Done, Size=Large" />
            <p className="text-[16px] font-[700] text-slate-400">
              아직 다 한 일이 없어요.<br />
              해야 할 일을 체크해보세요!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
