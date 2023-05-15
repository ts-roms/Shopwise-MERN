import { useState } from "react";

export default function Payment() {
  const [select, setSelect] = useState(1);
  return (
    <div className="bg-white shadow rounded p-8 min-h-[40vh]">
      <div className="space-y-8">
        <button className="w-full flex gap-8" onClick={() => setSelect(1)}>
          <span
            className={`bg-transparent h-6 w-6 rounded-full border-2 border-green-500 flex justify-center items-center relative after:absolute after:bg-green-500 after:z-30 after:rounded-full ${
              select === 1 ? "after:h-full after:w-full" : ""
            }`}
          ></span>
          <h4 className="font-semibold text-[#000000b1]">
            Pay with Debit/Credit Card
          </h4>
        </button>
        <button className="w-full flex gap-8" onClick={() => setSelect(2)}>
          <span
            className={`bg-transparent h-6 w-6 rounded-full border-2 border-green-500 flex justify-center items-center relative after:absolute  after:bg-green-500 after:rounded-full after:z-30 ${
              select === 2 ? "after:h-full after:w-full" : ""
            }`}
          ></span>
          <h4 className="font-semibold text-[#000000b1]">Pay with Pay Pal</h4>
        </button>
        <button className="w-full flex gap-8" onClick={() => setSelect(3)}>
          <span
            className={`bg-transparent h-6 w-6 rounded-full border-2 border-green-500 flex justify-center items-center relative after:absolute after:bg-green-500 after:z-30 after:rounded-full ${
              select === 3 ? "after:h-full after:w-full" : ""
            }`}
          ></span>
          <h4 className="font-semibold text-[#000000b1]">Cash On Delivery</h4>
        </button>
      </div>
    </div>
  );
}
