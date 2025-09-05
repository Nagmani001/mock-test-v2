import clsx from "clsx"
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentSectionAtom, currentQuestionIdAtom, questionAtom } from "@/atom/atom";

export default function SecondaryNav() {
  const questionInfo = useAtomValue(questionAtom);
  const setCurrentSection = useSetAtom(currentSectionAtom);
  const [currentQuestionId, setCurrentQuestionId] = useAtom(currentQuestionIdAtom);

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center px-3 md:px-6 py-2 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex space-x-2 md:space-x-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        {questionInfo.question.map((question, index) => {
          return (
            <button
              key={question.id}
              onClick={() => {
                setCurrentSection(question.type);
                setCurrentQuestionId(question.id);
              }}
              className={clsx(
                "px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all duration-200 ease-in-out whitespace-nowrap flex-shrink-0",
                currentQuestionId === question.id
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
              )}
            >
              <span className="hidden md:inline">{findSection(question.type)} {index + 1}</span>
              <span className="md:hidden">{findSectionShort(question.type)} {index + 1}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center md:justify-start space-x-2 md:space-x-6 mt-2 md:mt-0">
        {questionInfo.question.map(x => {
          if (x.id === currentQuestionId) {
            return (
              <div key={x.id} className="flex items-center space-x-1 md:space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg px-2 md:px-4 py-1 md:py-2 border border-green-200">
                <span className="font-semibold text-gray-700 text-xs md:text-sm">Marks:</span>
                <span className="font-bold text-green-600 text-xs md:text-sm">+{x.successMarks}</span>
                <span className="text-gray-400 text-xs md:text-sm">|</span>
                <span className="font-bold text-red-600 text-xs md:text-sm">-{x.failureMarks}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
function findSection(section: string) {
  if (section == "LETTER") {
    return "Letter Writing"
  } else if (section == "ESSAY") {
    return "Essay Writing"
  } else if (section == "COMPREHENSION") {
    return "Comprehension Writing"
  } else if (section == "PRECIS") {
    return "Precis Writing"
  }
}

function findSectionShort(section: string) {
  if (section == "LETTER") {
    return "Letter"
  } else if (section == "ESSAY") {
    return "Essay"
  } else if (section == "COMPREHENSION") {
    return "Comp"
  } else if (section == "PRECIS") {
    return "Precis"
  }
}
