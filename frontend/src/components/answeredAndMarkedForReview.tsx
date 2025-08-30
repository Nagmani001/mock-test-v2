import React from "react";
import { FaList } from "react-icons/fa";

function AnsweredAndMarkedForReview({ number }: { number: number }) {
  return (
    <div className="relative w-[24px] h-[28px] flex items-center justify-center">
      <svg viewBox="0 0 38 47" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="grad-purple-answered" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M0 0 L38 0 L38 34 L19 47 L0 34 Z"
          fill="url(#grad-purple-answered)"
          stroke="#7c3aed"
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
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center border border-white shadow-sm">
        <FaList className="text-white text-[10px]" />
      </div>
    </div>
  );
}
export default React.memo(AnsweredAndMarkedForReview);
