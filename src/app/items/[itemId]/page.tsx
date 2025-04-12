"use client";

export default function Test(props) {
  return (
    <div className="px-[102px] py-[24px]">
      <div className="border-2 border-slate-900 rounded-lg p-4 w-full h-[64px] flex items-center justify-between">

      </div>

      <div className="flex flex-wrap justify-center mt-4 h-[311px]">
        <div className="flex flex-col items-start justify-start w-full xl:w-1/2 h-full bg-slate-50 border-slate-300 border-2 border-dashed rounded-xl">
        </div>

        <div className="flex flex-col items-start justify-start w-full xl:w-1/2 h-full bg-slate-50 border-slate-300 border-2 rounded-xl bg-[url('/images/img/memo.png')]">
        </div>
      </div>
    </div>
  );
}
