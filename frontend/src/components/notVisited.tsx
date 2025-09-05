import React from "react";

function NotVisited({ number }: {
  number: number
}) {
  return (
    <div className="w-[24px] h-[28px] flex flex-col justify-center items-center">
      <svg viewBox="0 0 38 47" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id={`grad-gray-${number}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#d1d5db', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#9ca3af', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M0 0 L38 0 L38 34 L19 47 L0 34 Z"
          fill={`url(#grad-gray-${number})`}
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          fontFamily="Arial"
          className="font-semibold text-lg"
        >
          {number}
        </text>
      </svg>
    </div>
  );
}
export default React.memo(NotVisited);
