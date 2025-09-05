import React from "react";

const Badge = ({ number }: { number: number }) => {
  const gradientId = `grad-success-${number}-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-[24px] h-[28px]">
      <svg
        viewBox="0 0 38 47"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ccf47d', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4CAF50', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Reversed shape with straight sides and flat top */}
        <path
          d="M0 0 L38 0 L38 34 L19 47 L0 34 Z"
          fill={`url(#${gradientId})`}
          stroke="#7EC850"
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
};

export default React.memo(Badge);
