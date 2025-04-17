'use client';

import { useEffect, use, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { addImage, deleteItem, getItem, updateDetailItem } from '@/lib/api';
import useStore from '@/data/store';

export default function ItemDetail({ params }) {
  const { itemId } = use(params);
  const item = useStore(state => state.item);
  const toggleCompleted = useStore(state => state.toggleCompleted);
  const [currentImage, setCurrentImage] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [isFiled, setIsFiled] = useState(false);
  const [rows, setRows] = useState(1);
  const [loading, setLoading] = useState(true); // Skeleton loading state
  const router = useRouter();

  useEffect(() => {
    getTodoItem(itemId).then(() => {
      {
        /* ✅ 자동너비 조절하는 투두리스트 제목(input) */
      }
      const item = useStore.getState().item;
      const lineBreaks = (item.memo?.match(/\n/g) || []).length + 1;
      const newRows = Math.max(lineBreaks, Math.ceil(item.memo?.length / 50));
      setRows(newRows);
      setLoading(false); // Stop loading after data is fetched
    });
  }, []);

  /* ✅ itemId로 아이템 정보 불러오기 */
  const getTodoItem = async itemId => {
    const res = await getItem(itemId);
    useStore.setState({ item: res });
    setIsFiled(res.imageUrl);
  };

  // ✅ 할 일 진행중/ 완료 변경하기
  const toggleChecked = () => {
    toggleCompleted();
  };

  /* ✅ 수정완료 버튼 눌러 업데이트 */
  const setTodoItem = async () => {
    let res;
    let imageUrl = item.imageUrl;
    if (currentImage) {
      res = await addImage(currentImage);
      imageUrl = res.url;
    }
    console.log(imageUrl);
    await updateDetailItem(item.id, item.name, item.memo, imageUrl, item.isCompleted);
  };

  /* ✅ 삭제하기 버튼 눌러 삭제 */
  const deleteTodoItem = async itemId => {
    await deleteItem(itemId);
    router.push('/');
  };

  /* ✅ 화면 로드시 Skeleton UI 적용 */
  if (loading) {
    return (
      <div className="px-[24px] pc:px-[102px] py-[24px]">
        <div className="animate-pulse">
          <div className="bg-gray-300 rounded-[24px] w-full h-[64px] mb-[25px]"></div>
          <div className="flex flex-col pc:flex-row justify-center gap-[25px]">
            <div className="bg-gray-300 rounded-[24px] w-full pc:w-[384px] h-[311px]"></div>
            <div className="bg-gray-300 rounded-[24px] w-full pc:w-[588px] h-[311px]"></div>
          </div>
          <div className="flex justify-center pc:justify-end gap-[10px] mt-[25px]">
            <div className="bg-gray-300 rounded-[24px] w-[168px] h-[56px]"></div>
            <div className="bg-gray-300 rounded-[24px] w-[168px] h-[56px]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[24px] pc:px-[102px] py-[24px]">
      {item.isCompleted ? (
        /* ✅ 투두리스트 완료시 */
        <div className="bg-violet-100 border-2 border-slate-900 rounded-[24px] p-4 w-full h-[64px] flex items-center justify-center">
          <img
            src="/icons/ic/Property 1=Frame 2610233.svg"
            alt="Property 1=Frame 2610233"
            onClick={() => {
              toggleChecked();
            }}
          />
          {/* ✅ 투두리스트 제목 */}
          <input
            className="min-w-[100px] text-slate-900 text-[20px] text-center font-bold underline focus:outline-none focus:ring-0 focus:border-transparent"
            value={item.name || ''}
            style={{ width: item.name?.length * 16 + 10 + 'px' }}
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
        /* ✅ 투두리스트 진행중일시 */
        <div className="bg-white border-2 border-slate-900 rounded-[24px] p-4 w-full h-[64px] flex items-center justify-center">
          <img
            src="/icons/ic/Property 1=Default.svg"
            alt="Property 1=Frame 2610233"
            onClick={toggleChecked}
          />
          {/* ✅ 투두리스트 제목 */}
          <input
            className="min-w-[100px] text-slate-900 text-[20px] text-center font-bold underline focus:outline-none focus:ring-0 focus:border-transparent"
            value={item.name || ''}
            style={{ width: item.name?.length * 16 + 10 + 'px' }}
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

      {/* ✅ 투두리스트 이미지 */}
      <div className="flex flex-col pc:flex-row justify-center mt-[25px] gap-[25px]">
        <div
          className={`flex flex-col items-start justify-start w-full pc:w-[384px] h-[311px] bg-no-repeat bg-center  ${
            isFiled ? 'border-transparent' : 'border-2 border-slate-300 border-dashed'
          } rounded-[24px] relative`}
          style={{
            backgroundImage: `url("${item.imageUrl ? item.imageUrl : '/images/ic/img.png'}")`,
            backgroundSize: `${item.imageUrl ? 'cover' : ''}`,
          }}
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
              /* ✅ 이미지 파일 검사 */
              const isFileNameValid = fileName => {
                const forbiddenPattern = /[?&()=]/;
                return !forbiddenPattern.test(fileName);
              };
              if (!isFileNameValid(file.name)) {
                alert('파일 이름에 ?, &, (), = 같은 특수 문자는 사용할 수 없습니다.');
                e.target.value = ''; // 파일 입력 초기화
                return;
              }
              if (file && file.size > 5 * 1024 * 1024) {
                alert('파일 크기는 5MB 이하만 가능합니다.');
                e.target.value = ''; // 파일 입력 초기화
                return;
              }
              if (file && file.name) {
                const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(file.name);
                if (hasKorean) {
                  alert('파일 이름에 한글이 포함되어 있습니다. 다른 이름으로 변경해주세요.');
                  e.target.value = ''; // 파일 입력 초기화
                  return;
                }
              }
              setCurrentImage(file);
              const reader = new FileReader();
              reader.onload = event => {
                const container = e.target.closest('div');
                let previewImage = container?.querySelector('img');
                {
                  /* ✅ 이미지 입력시 미리보기*/
                }
                if (!previewImage) {
                  previewImage = document.createElement('img');
                  previewImage.className =
                    'absolute w-full h-full inset-0 object-cover w-full pc:w-[384px] rounded-[24px]';
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
              setIsChanged(true);
            }}
          />
        </div>

        {/* ✅ 투두리스트 메모 */}
        <div className="flex flex-col items-center justify-center w-full pc:w-[588px] h-[311px] px-[16px] pt-[58px] pb-[24px] rounded-[24px] bg-[url('/images/img/memo.png')] relative">
          <p className="text-[16px] text-amber-800 font-[800] absolute top-[24px]">Memo</p>
          {/* ✅ 자동 높이 조절되는 textarea (메모)*/}
          <textarea
            rows={rows || 1}
            value={item.memo || ''}
            onChange={e => {
              const lineBreaks = (e.target.value.match(/\n/g) || []).length + 1;
              const newRows = Math.max(lineBreaks, Math.ceil(e.target.value.length / 50)) || 1;
              setRows(newRows);
              useStore.setState({
                item: {
                  ...item,
                  memo: e.target.value,
                },
              });
              setIsChanged(true);
            }}
            className="w-full leading-tight resize-none outline-none break-words whitespace-pre-wrap
            text-[16px] font-[400] text-slate-900 text-center bg-transparent scrollbar "
            placeholder="여기에 메모를 입력하세요..."
          />
        </div>
      </div>

      <div className="w-full flex justify-center pc:justify-end  gap-[10px] mt-[25px]">
        {/* ✅ 수정완료 버튼 */}
        <button className="cursor-pointer">
          <img
            id="btn_edit_complete"
            src={`${
              /* ✅ 내용 바뀔시 이미지 변경(색상) */
              isChanged
                ? '/buttons/Type=Edit, Size=Large, State=Active.png'
                : '/buttons/Type=Edit, Size=Large, State=Default.png'
            }`}
            alt="Type=Edit, Size=Large, State=Default.png"
            disabled={!isChanged}
            onClick={() => {
              if (isChanged) {
                if (!item.name) {
                  alert('할 일 내용을 입력해주세요.');
                }
                setTodoItem(item.id, item.name, item.memo, item.imageUrl, item.isCompleted);
                setIsChanged(false);
                alert('수정되었습니다.');
                router.push('/');
                console.log(item.id, item.name, item.memo, item.imageUrl, item.isCompleted);
              }
            }}
          />
        </button>
        {/* ✅ 삭제하기 버튼 */}
        <button
          className="cursor-pointer"
          onClick={() => {
            deleteTodoItem(item.id);
            alert('삭제되었습니다.');
          }}
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
