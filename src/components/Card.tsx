import CheckList from "@/components/CheckList";

export default function Card({ status, items }) {
  const isDone = status === "done";
  const filteredItems = items?.filter(item => item.isCompleted === isDone) || [];

  return (
    <div className="flex flex-col items-start justify-start w-full xl:w-1/2 pr-[16px]">
      <img
        src={isDone ? '/images/img/done.png' : '/images/img/todo.png'}
        alt="todo"
        className="my-[10px]"
      />

      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <CheckList key={item.id} isDone={isDone} item={item}/>
        ))
      ) : (
        <div className="flex flex-row justify-left items-center w-full h-[50px] my-[10px]">
          <img src="/images/img/Type=Todo, Size=Large.svg" alt="/images/img/Type=Todo, Size=Large" className={`mx-[10px] ${isDone ? 'hidden' : 'inline'}`}/>
          <img src="/images/img/Type=Done, Size=Large.svg" alt="/images/img/Type=Done, Size=Large" className={`mx-[10px] ${isDone ? 'inline' : 'hidden'}`}/>
        </div>
      )}
    </div>
  );
}
