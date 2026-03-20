"use client";

import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className="loader-goo w-[200px] h-[200px] m-auto animate-[rotate-move_2s_ease-in-out_infinite]"
        aria-hidden="true"
      >
        <div className="dot dot-1 absolute top-0 right-0 bottom-0 left-0 m-auto h-[70px] w-[70px] rounded-full bg-blue-500" />
        <div className="dot dot-2 absolute top-0 right-0 bottom-0 left-0 m-auto h-[70px] w-[70px] rounded-full bg-blue-500" />
        <div className="dot dot-3 absolute top-0 right-0 bottom-0 left-0 m-auto h-[70px] w-[70px] rounded-full bg-blue-500" />

        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                result="blur"
                stdDeviation={10}
                in="SourceGraphic"
              />
              <feColorMatrix
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                mode="matrix"
                in="blur"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
