// 컴포넌트 맨 위에 추가
'use client';

import { useEffect, use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addImage, deleteItem, getItem, updateDetailItem } from '@/lib/api';
import useStore from '@/data/store';

export default function Test({ params }) {
  const { itemId } = use(params);
  const item = useStore(state => state.item);
  const toggleCompleted = useStore(state => state.toggleCompleted);
  const [isFiled, setIsFiled] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getTodoItem(itemId);
  }, []);

  const getTodoItem = async itemId => {
    const res = await getItem(itemId);
    useStore.setState({ item: res });
  };

  const setTodoItem = async () => {
    await addImage(item.imageUrl);
    await updateDetailItem(item.id, item.name, item.memo, item.imageUrl, item.isCompleted);
  };

  const deleteTodoItem = async itemId => {
    console.log(`Item ID: ${itemId} deleted`);
    await deleteItem(itemId);
    router.push('/');
  };

  const toggleChecked = () => {
    toggleCompleted();
  };
  return (
    <div className="px-[24px] pc:px-[102px] py-[24px]">
      {/* ✅ 체크리스트 이름 섹션 */}
      {item.isCompleted ? (
        <div className="bg-violet-100 border-2 border-slate-900 rounded-[24px] p-4 w-full h-[64px] flex items-center justify-center gap-2">
          <img
            src="/icons/ic/Property 1=Frame 2610233.svg"
            alt="Property 1=Frame 2610233"
            className="mx-[10px]"
            onClick={toggleChecked}
          />
          <input
            className="text-slate-900 text-[20px] font-bold underline text-center"
            value={item.name || ''}
            onChange={e => {
              useStore.setState({
                item: {
                  ...item,
                  name: e.target.value,
                },
              });
              setIsChanged(true);
            }}
          />
        </div>
      ) : (
        <div className="bg-white border-2 border-slate-900 rounded-[24px] p-4 w-full h-[64px] flex items-center justify-center gap-2">
          <img
            src="/icons/ic/Property 1=Default.svg"
            alt="Property 1=Frame 2610233"
            className="mx-[10px]"
            onClick={toggleChecked}
          />
          <input
            className="text-slate-900 text-[20px] font-bold underline text-center"
            value={item.name || ''}
            onChange={e => {
              useStore.setState({
                item: {
                  ...item,
                  name: e.target.value,
                },
              });
              setIsChanged(true);
            }}
          />
        </div>
      )}

      {/* ✅ 이미지 섹션 */}
      <div className="flex flex-col pc:flex-row justify-center mt-[25px] gap-[25px]">
        <div
          className={`flex flex-col items-start justify-start w-full pc:w-[384px] h-[311px] bg-slate-50 bg-[url(${
            item.imageUrl ? item.imageUrl : '/images/ic/img.png'
          })] bg-no-repeat bg-center ${
            isFiled ? 'border-transparent' : 'border-slate-300'
          } border-2 border-dashed rounded-[24px] relative`}
        >
          <label
            htmlFor="file"
            className={`${
              item.imageUrl
                ? "bg-[url('/buttons/Type=Edit.png')]"
                : "bg-[url('/buttons/Type=Plus.png')]"
            } bg-no-repeat bg-center w-[70px] h-[70px] absolute bottom-[24px] right-[24px] cursor-pointer z-10`}
          />
          <input
            type="file"
            name="file"
            className="hidden"
            id="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file && file.size > 5 * 1024 * 1024) {
                alert('파일 크기는 5MB 이하만 가능합니다.');
                e.target.value = ''; // 파일 입력 초기화
              } else if (file) {
                const reader = new FileReader();
                reader.onload = event => {
                  const container = e.target.closest('div');
                  let previewImage = container?.querySelector('img');

                  if (!previewImage) {
                    previewImage = document.createElement('img');
                    previewImage.className =
                      'absolute inset-0 w-full h-full object-cover rounded-[24px]';
                    container?.appendChild(previewImage);
                  }

                  previewImage.src = event.target?.result || '';
                  previewImage.alt = 'Preview';
                  const label = container?.querySelector('label');
                  if (label) {
                    label.style.backgroundImage = "url('/buttons/Type=Edit.png')";
                  }
                };
                reader.readAsDataURL(file);
                setIsFiled(true);
                useStore.setState({
                  item: {
                    ...item,
                    imageUrl: e.target.value,
                  },
                });
                setIsChanged(true);
              }
            }}
          />
        </div>

        {/* ✅ 메모 섹션 */}
        <div className="flex flex-col items-center justify-center w-full pc:w-[588px] h-[311px] px-[16px] pt-[58px] pb-[24px] rounded-[24px] bg-[url('/images/img/memo.png')] relative">
          <p className="text-[16px] text-amber-800 font-[800] absolute top-[24px]">Memo</p>

          {/* ✅ 자동 높이 조절되는 textarea */}
          <textarea
            value={item.memo || ''}
            onChange={e => {
              useStore.setState({
                item: {
                  ...item,
                  memo: e.target.value,
                },
              });
              setIsChanged(true);
            }}
            className="w-full max-h-[229px] leading-tight resize-none outline-none break-words whitespace-pre-wrap
            text-[16px] font-[400] text-slate-900 text-center bg-transparent scrollbar"
            placeholder="여기에 메모를 입력하세요..."
          />
        </div>
      </div>

      {/* ✅ 버튼들 (수정하기, 삭제하기) */}
      <div className="w-full flex justify-center pc:justify-end  gap-[10px] mt-[25px]">
        <button className="cursor-pointer">
          <img
            id="btn_edit_complete"
            src={`${
              isChanged
                ? '/buttons/Type=Edit, Size=Large, State=Active.png'
                : '/buttons/Type=Edit, Size=Large, State=Default.png'
            }`}
            alt="Type=Edit, Size=Large, State=Default.png"
            disabled={!isChanged}
            onClick={() => {
              setTodoItem(item.id, item.name, item.memo, item.imageUrl, item.isCompleted);
              setIsChanged(false);
            }}
          />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => deleteTodoItem(item.id)}
        >
          <img
            src="/buttons/Type=Delete, Size=Large, State=Default.png"
            alt="Type=Delete, Size=Large, State=Default.png"
          />
        </button>
      </div>
    </div>
  );
}
