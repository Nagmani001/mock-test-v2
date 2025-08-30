import Timer from "./timer";
import Badge from "./successbadge";
import FailBadge from "./failBadge";
import MarkedForReview from "./markedForReview";
import NotVisited from "./notVisited";
import AnsweredAndMarkedForReview from "./answeredAndMarkedForReview";
import { SectionWritingAnsweredMarkedBadge, SectionWritingBadge, SectionWritingFailBadge, SectionWritingMarkedBadge, SectionWritingNotVisitedBadge } from "./sectionWritingBadges";
import { useAtomValue } from "jotai";
import { answerAtom } from "@/atom/atom";

export default function TimerSection() {
  const answer = useAtomValue(answerAtom);
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Timer Header */}
      <div className="flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="font-semibold text-sm">Time Remaining</span>
        </div>
      </div>

      {/* Timer Display */}
      <div className="">
        <Timer />
      </div>

      {/* Instructions */}
      <div className="bg-white border-t border-slate-300">
        <div className="flex justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-2 border-b border-gray-200">
          <span className="font-bold text-gray-700 text-sm">Instructions</span>
        </div>

        {/* Status Grid */}
        <div className="p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 bg-green-100 rounded-md p-2 border border-green-300">
              <div className="w-6 h-7 flex items-center justify-center">
                <Badge number={0} />
              </div>
              <span className="font-medium text-gray-700 text-xs">Answered</span>
            </div>

            <div className="flex items-center space-x-2 bg-red-100 rounded-md p-2 border border-red-300">
              <div className="w-6 h-7 flex items-center justify-center">
                <FailBadge number={0} />
              </div>
              <span className="font-medium text-gray-700 text-xs">Not Answered</span>
            </div>

            <div className="flex items-center space-x-2 bg-yellow-100 rounded-md p-2 border border-yellow-300">
              <div className="w-6 h-7 flex items-center justify-center">
                <NotVisited number={0} />
              </div>
              <span className="font-medium text-gray-700 text-xs">Not Visited</span>
            </div>

            <div className="flex items-center space-x-2 bg-blue-100 rounded-md p-2 border border-blue-300">
              <div className="w-6 h-7 flex items-center justify-center">
                <MarkedForReview number={0} />
              </div>
              <span className="font-medium text-gray-700 text-xs">Marked For Review</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-purple-100 rounded-md p-2 border border-purple-300">
            <div className="w-6 h-7 flex items-center justify-center">
              <AnsweredAndMarkedForReview number={0} />
            </div>
            <span className="font-medium text-gray-700 text-xs">Answered and Marked For Review</span>
          </div>
        </div>
      </div>

      {/* Section Writing - Takes more space */}
      <div className="  border-t border-gray-200 flex flex-col ">
        <div className="flex justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 font-semibold">
          Section Writing
        </div>
        <div className="flex-1 grid grid-cols-3 gap-3 p-4 ">

          {answer.map((x: any, i: any) => {
            switch (x.status) {
              case "Answered":
                return <div className="flex justify-center items-center">
                  <SectionWritingBadge number={i + 1} />
                </div>

              case "Not_Answered":
                return <div className="flex justify-center items-center">
                  <SectionWritingFailBadge number={i + 1} />
                </div>

              case "Not_Visited":
                return <div className="flex justify-center items-center">
                  <SectionWritingNotVisitedBadge number={i + 1} />
                </div>

              case "Marked_For_Review":
                return <div className="flex justify-center items-center">
                  <SectionWritingMarkedBadge number={i + 1} />
                </div>

              case "Answered_And_Marked_For_Review":
                return <div className="flex justify-center items-center">
                  <SectionWritingAnsweredMarkedBadge number={i + 1} />
                </div>

            }
          })}
        </div>
      </div>
    </div>
  );
}
