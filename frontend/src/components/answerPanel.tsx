import { useAtom, useAtomValue } from "jotai";
import { Textarea } from "./ui/textarea";
import { answerAtom, currentSectionAtom, questionAtom, subAnswerAtom } from "@/atom/atom";

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
  const currentSection = useAtomValue(currentSectionAtom);
  const questionInfo = useAtomValue(questionAtom);

  const isComprehension = questionData.type === 'COMPREHENSION';

  if (isComprehension && questionData.subQuestions) {
    // Render multiple answer inputs for comprehension sub-questions
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">Your Answers</h2>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {questionData.subQuestions.map((subQ: any, index: number) => {
              const subAns = subAnswer.find((ans: any) => ans.id === subQ.id);
              const wordsArr = subAns?.answer?.split(" ") || [""];
              const wordsLength = wordsArr.length;
              const remainingWords = Math.max(0, questionData.words - wordsLength + 1);
              
              return (
                <div key={subQ.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700">Answer {index + 1}</h3>
                  </div>
                  <div className="p-4">
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
                      className="h-32 overflow-y-auto resize-none border-0 focus:ring-0 text-gray-700 leading-relaxed"
                    />
                    <div className="mt-2 text-sm text-gray-600 flex justify-between">
                      <span>Question {index + 1}</span>
                      <span className={remainingWords > 0 ? "text-green-600" : "text-red-500"}>
                        {remainingWords > 0 ? `${remainingWords} words remaining` : "Word limit reached"}
                      </span>
                    </div>
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
  let wordsArr = answer.find((x: any) => x.type == currentSection)?.answer.split(" ");
  let wordsLength = wordsArr.length;
  const remainingWords = questionData.words - wordsLength + 1;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800">Your Answer</h2>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {answer.map((x: any) => {
            if (x.type == currentSection) {
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
                  className="h-[55vh] overflow-y-auto resize-none border-0 focus:ring-0 text-gray-700 text-lg leading-relaxed p-6"
                />
              );
            }
            return null;
          })}
        </div>
        <div className="mt-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Word Count</span>
            <div className="flex items-center space-x-2">
              {remainingWords > 0 ? (
                <span className="font-bold text-green-600">{remainingWords} words remaining</span>
              ) : (
                <span className="font-bold text-red-500">Word limit reached</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
