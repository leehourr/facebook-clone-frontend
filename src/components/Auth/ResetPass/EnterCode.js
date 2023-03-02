import React from "react";
import { Link } from "react-router-dom";

export const EnterCode = () => {
  return (
    <div className="w-[31.3rem] py-3 rounded-lg shadow-md shadow-black/10 bg-white">
      <div className="text-[#162643] pb-4 pl-4 border-b-[1px] border-b-black/10 text-[21px] font-semibold">
        Enter security code{" "}
      </div>
      <div className="text-[17px] px-4 border-b-[1px]  border-b-black/10 pb-5">
        <div className="w-full flex flex-col items-center justify-around">
          <p className="my-3">
            Please check your email for message with your code. Your code is 8
            numbers long.
          </p>
          <div className="w-full flex items-start space-x-5">
            <input
              className="border-[1px] outline-none p-3 pl-4 rounded-lg border-black/20 w-1/2"
              type="text"
              placeholder="Email code"
            />
            <div className="flex flex-col">
              <span className="text-[15px] text-black/80">
                We sent your code to
              </span>
              <span className="text-[14px] text-black/70">
                emailasdfa.com
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-3 mr-5 space-x-2">
        <Link
          to="/"
          className="rounded-lg p-2 px-4 font-bold bg-black/10 text-black/60"
        >
          Cancel
        </Link>
        <button className="font-bold text-white bg-[#1A6ED8] rounded-lg p-2 px-4">
          Confirm
        </button>
      </div>
    </div>
  );
};
