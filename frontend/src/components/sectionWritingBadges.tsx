import React from "react";
import { FaList } from "react-icons/fa";

// Larger badge for section writing - Success/Answered
export const SectionWritingBadge = React.memo(({ number }: { number: number }) => {
  return (
    <div className="w-[48px] h-[56px] flex items-center justify-center">
      <svg viewBox="0 0 38 47" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id={`grad-section-success-${number}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#86efac', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M0 0 L38 0 L38 34 L19 47 L0 34 Z"
          fill={`url(#grad-section-success-${number})`}
          stroke="#16a34a"
          strokeWidth="1.5"
        />
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          fill="white"
          fontSize="20"
          fontWeight="bold"
          fontFamily="Arial"
          className="font-semibold text-xl"
        >
          {number}
        </text>
      </svg>
    </div>
  );
});
// Larger badge for section writing - Fail/Not Answered
export const SectionWritingFailBadge = React.memo(
  ({ number }: { number: number }) => {
    return (
      <div className="w-[48px] h-[56px] flex items-center justify-center">
        <svg viewBox="0 0 38 47" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id={`grad-section-fail-${number}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fca5a5', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M0 0 L38 0 L38 34 L19 47 L0 34 Z"
            fill={`url(#grad-section-fail-${number})`}
            stroke="#dc2626"
            strokeWidth="1.5"
          />
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial"
            className="font-semibold text-xl"
          >
            {number}
          </text>
        </svg>
      </div>
    );
  });
// Larger badge for section writing - Marked for Review
export const SectionWritingMarkedBadge = React.memo(
  ({ number }: { number: number }) => {
    return (
      <div className="w-[48px] h-[56px] flex items-center justify-center">
        <svg viewBox="0 0 38 47" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id={`grad-section-marked-${number}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#c4b5fd', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M0 0 L38 0 L38 34 L19 47 L0 34 Z"
            fill={`url(#grad-section-marked-${number})`}
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial"
            className="font-semibold text-xl"
          >
            {number}
          </text>
        </svg>
      </div>
    );
  });
// Larger badge for section writing - Not Visited
export const SectionWritingNotVisitedBadge = React.memo(
  ({ number }: { number: number }) => {
    return (
      <div className="w-[48px] h-[56px] flex items-center justify-center">
        <svg viewBox="0 0 38 47" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id={`grad-section-not-visited-${number}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#9ca3af', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M0 0 L38 0 L38 34 L19 47 L0 34 Z"
            fill={`url(#grad-section-not-visited-${number})`}
            stroke="#6b7280"
            strokeWidth="1.5"
          />
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial"
            className="font-semibold text-xl"
          >
            {number}
          </text>
        </svg>
      </div>
    );
  });
// Larger badge for section writing - Answered and Marked for Review
export const SectionWritingAnsweredMarkedBadge = React.memo(
  ({ number }: { number: number }) => {
    return (
      <div className="relative w-[48px] h-[56px] flex items-center justify-center">
        <svg viewBox="0 0 38 47" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id={`grad-section-answered-marked-${number}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#c4b5fd', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M0 0 L38 0 L38 34 L19 47 L0 34 Z"
            fill={`url(#grad-section-answered-marked-${number})`}
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial"
            className="font-semibold text-xl"
          >
            {number}
          </text>
        </svg>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-md flex items-center justify-center border-2 border-white shadow-md">
          <FaList className="text-white text-sm" />
        </div>
      </div>
    );
  });
