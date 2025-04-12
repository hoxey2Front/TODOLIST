interface SearchProps {
  onChange: (value: string) => void;
}

export default function Search({ onChange }: SearchProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // 부모에게 전달
  };

  return (
    <div className="flex-grow bg-[url('/images/img/search.png')] bg-no-repeat bg-[length:100%_100%]">
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        className="w-full h-full bg-transparent px-2 focus:outline-none"
        onChange={handleChange}
      />
    </div>
  );
}