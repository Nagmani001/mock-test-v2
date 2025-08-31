import clsx from "clsx"
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentSectionAtom, currentQuestionIdAtom, questionAtom } from "@/atom/atom";

export default function SecondaryNav() {
  const questionInfo = useAtomValue(questionAtom);
  const setCurrentSection = useSetAtom(currentSectionAtom);
  const [currentQuestionId, setCurrentQuestionId] = useAtom(currentQuestionIdAtom);

  return (
    <div className="flex justify-between items-center px-6 py-2 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex space-x-3">
        {questionInfo.question.map((question, index) => {
          return (
            <button
              key={question.id}
              onClick={() => {
                setCurrentSection(question.type);
                setCurrentQuestionId(question.id);
              }}
              className={clsx(
                "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out",
                currentQuestionId === question.id
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
              )}
            >
              {findSection(question.type)} {index + 1}
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-6">
        {questionInfo.question.map(x => {
          if (x.id === currentQuestionId) {
            return (
              <div key={x.id} className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg px-4 py-2 border border-green-200">
                <span className="font-semibold text-gray-700 text-sm">Marks:</span>
                <span className="font-bold text-green-600">+{x.successMarks}</span>
                <span className="text-gray-400">|</span>
                <span className="font-bold text-red-600">-{x.failureMarks}</span>
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
  }
}
