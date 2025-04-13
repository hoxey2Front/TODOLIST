// 컴포넌트 맨 위에 추가
"use client";

import { useEffect, use } from "react";
import { getItem } from "@/lib/api";
import useStore from "@/data/store";

export default function Test({ params }) {
  const { itemId } = use(params);
  const item = useStore((state) => state.item);
  const toggleCompleted = useStore((state) => state.toggleCompleted);

  // ✅ textarea 높이 자동 조절 함수
  const autoResize = (el) => {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
    getTodoItem(itemId);
  }, []);

  const getTodoItem = async (itemId) => {
    const res = await getItem(itemId);
    useStore.setState({ item: res });
  };

  const toggleChecked = () => {
    toggleCompleted();
  };

  return (
    <div className="px-[102px] py-[24px]">
      {item.isCompleted ? (
        <div className="border-2 border-slate-900 rounded-[24px] p-4 w-full h-[64px] flex items-center justify-center">
          <img
            src="/icons/ic/Property 1=Frame 2610233.svg"
            alt="Property 1=Frame 2610233"
            className="mx-[10px]"
            onClick={toggleChecked}
          />
          <span className="text-slate-900 text-[20px] font-bold underline">
            {item.name}
          </span>
        </div>
      ) : (
        <div className="border-2 border-slate-900 rounded-[24px] p-4 w-full h-[64px] flex items-center justify-center">
          <img
            src="/icons/ic/Property 1=Default.svg"
            alt="Property 1=Frame 2610233"
            className="mx-[10px]"
            onClick={toggleChecked}
          />
          <span className="text-slate-900 text-[20px] font-bold underline">
            {item.name}
          </span>
        </div>
      )}

      {/* ✅ 이미지 섹션 */}
      <div className="flex flex-col xl:flex-row justify-center mt-[25px] gap-[25px]">
        <div className="flex flex-col items-start justify-start w-full xl:w-[384px] h-[311px] bg-slate-50 bg-[url('/images/ic/img.png')] bg-no-repeat bg-center border-slate-300 border-2 border-dashed rounded-[24px] relative">
          <label htmlFor="file" className="bg-[url('/buttons/Type=Plus.png')] bg-no-repeat bg-center w-[70px] h-[70px] absolute bottom-[24px] right-[24px] cursor-pointer z-10" />
          <input
            type="file"
            name="file"
            className="hidden"
            id="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.size > 5 * 1024 * 1024) {
                alert("파일 크기는 5MB 이하만 가능합니다.");
                e.target.value = ""; // 파일 입력 초기화
              } else if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const container = e.target.closest("div");
                  let previewImage = container?.querySelector("img");

                  if (!previewImage) {
                    previewImage = document.createElement("img");
                    previewImage.className = "absolute inset-0 w-full h-full object-cover rounded-[24px]";
                    container?.appendChild(previewImage);
                  }

                  previewImage.src = event.target?.result as string;
                  previewImage.alt = "Preview";
                  const label = container?.querySelector("label");
                  if (label) {
                    label.style.backgroundImage = "url('/buttons/Type=Edit.png')";
                    const editButton = document.getElementById("btn_edit_complete");
                    if (editButton) {
                      editButton.src = "/buttons/Type=Edit, Size=Large, State=Active.png";
                    }
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        {/* ✅ 메모 섹션 */}
        <div className="flex flex-col items-center justify-center w-full xl:w-[588px] h-[311px] border-slate-300 border-2 rounded-[24px] bg-[url('/images/img/memo.png')] relative">
          <p className="text-[16px] text-amber-800 font-[800] absolute top-[24px]">Memo</p>

          {/* ✅ 자동 높이 조절되는 textarea */}
          <textarea
            onInput={(e) => autoResize(e.target)}
            className="w-full max-h-[200px] min-h-[40px] leading-tight p-2 resize-none outline-none break-words whitespace-pre-wrap
            text-[16px] font-[400] text-center bg-transparent scrollbar"
            placeholder="여기에 메모를 입력하세요..."
          />
        </div>
      </div>

      {/* ✅ 버튼들 (수정하기, 삭제하기) */}
      <div className="w-full flex justify-center xl:justify-end  gap-[10px] mt-[25px]">
        <button>
          <img id="btn_edit_complete" src="/buttons/Type=Edit, Size=Large, State=Default.png" alt="Type=Edit, Size=Large, State=Default.png" />
        </button>
        <button>
          <img src="/buttons/Type=Delete, Size=Large, State=Default.png" alt="Type=Delete, Size=Large, State=Default.png" />
        </button>
      </div>
    </div>
  );
}
