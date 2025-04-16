interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void; // ⬅️ Enter 키 처리용
}

// ✅ 할일 입력 input
export default function Search({ value, onChange, onEnter }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // ⬅️ Enter 키 눌러서 할 일 추가 가능
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter?.();
    }
  };

  return (
    <div className="flex-grow bg-[url('/images/img/search.png')] bg-no-repeat bg-[length:100%_100%]">
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        className="w-full h-full pl-[25px] bg-transparent px-2 focus:outline-none"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // ⬅️ 키다운 이벤트 연결
      />
    </div>
  );
}
