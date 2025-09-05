import { useAtom } from "jotai";
import { Textarea } from "./ui/textarea";
import { answerAtom, subAnswerAtom } from "@/atom/atom";

interface QuestionData {
  id: string;
  type: string;
  words: number;
  subQuestions?: any[];
}

export default function AnserPanel({ questionData }: {
  questionData: QuestionData;
}) {
  const [answer, setAnswer] = useAtom(answerAtom);
  const [subAnswer, setSubAnswer] = useAtom(subAnswerAtom);
  // const questionInfo = useAtomValue(questionAtom);

  const isComprehension = questionData.type === 'COMPREHENSION';

  if (isComprehension && questionData.subQuestions) {
    // Render multiple answer inputs for comprehension sub-questions
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 md:px-6 py-3 md:py-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Your Answers</h2>
        </div>
        <div className="flex-1 p-3 md:p-6 overflow-y-auto min-h-0">
          <div className="space-y-4 md:space-y-6 h-full overflow-y-auto">
            {questionData.subQuestions.map((subQ: any, index: number) => {
              const subAns: any = subAnswer.find((ans: any) => ans.id === subQ.id);

              const wordsArr = subAns?.answer?.split(" ") || [""];
              const wordsLength = wordsArr.length;

              return (
                <div key={subQ.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="bg-gray-50 px-3 md:px-4 py-2 border-b border-gray-200">
                    <h3 className="text-xs md:text-sm font-semibold text-gray-700">Answer {index + 1}</h3>
                  </div>
                  <div className="p-3 md:p-4">
                    <Textarea
                      onChange={(e: any) => {
                        setSubAnswer((prev: any) => {
                          const newArr = prev.map((y: any) => {
                            if (y.id === subQ.id) {
                              return {
                                ...y,
                                answer: e.target.value,
                                wordsNumber: wordsLength
                              }
                            }
                            return y;
                          });
                          return newArr;
                        });
                      }}
                      value={subAns?.answer || ''}
                      placeholder={`Start typing your answer for question ${index + 1}...`}
                      className="h-24 md:h-32 overflow-y-auto resize-none border-0 focus:ring-0 text-gray-700 leading-relaxed text-sm md:text-base"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Regular single answer for Essay and Letter questions
  //@ts-ignore
  let wordsArr = answer.find((x: any) => x.id === questionData.id)?.answer.split(" ");
  let wordsLength = wordsArr.length;
  const remainingWords = questionData.words - wordsLength + 1;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 md:px-6 py-3 md:py-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">Your Answer</h2>
      </div>
      <div className="flex-1 p-3 md:p-6 flex flex-col min-h-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1 min-h-0">
          {answer.map((x: any) => {
            if (x.id === questionData.id) {
              return (
                <Textarea
                  key={x.id}
                  onChange={(e: any) => {
                    setAnswer((prev: any) => {
                      const newArr = prev.map((y: any) => {
                        if (y.id == x.id) {
                          return {
                            ...y,
                            answer: e.target.value,
                            wordsTyped: wordsLength
                          }
                        } else { return y }
                      })
                      return newArr;
                    });
                  }}
                  value={x.answer}
                  placeholder="Start typing your answer here..."
                  className="h-full overflow-y-auto resize-none border-0 focus:ring-0 text-gray-700 text-sm md:text-lg leading-relaxed p-3 md:p-6"
                />
              );
            }
            return null;
          })}
        </div>
        <div className="mt-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 md:p-4 border border-gray-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <span className="font-medium text-gray-700 text-sm md:text-base">Word Count</span>
            <div className="flex items-center space-x-2">
              {remainingWords > 0 ? (
                <span className="font-bold text-green-600 text-sm md:text-base">{remainingWords} words remaining</span>
              ) : (
                <span className="font-bold text-red-500 text-sm md:text-base">Word limit reached</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
