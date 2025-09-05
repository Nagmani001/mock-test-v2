import { answerAtom, currentSectionAtom, currentQuestionIdAtom, questionAtom, subAnswerAtom, testTimerAtom } from "@/atom/atom";
import { BASE_URL } from "@/config/utils";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ArenaFooter({ id }: { id: string | undefined }) {
  const [answer, setAnswer] = useAtom(answerAtom);
  const subAnswer = useAtomValue(subAnswerAtom);
  const questionInfo = useAtomValue(questionAtom);
  const setCurrentSection = useSetAtom(currentSectionAtom);
  const [currentQuestionId, setCurrentQuestionId] = useAtom(currentQuestionIdAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const time = useAtomValue(testTimerAtom);
  const auth = useAuth();

  useEffect(() => {
    const main = async () => {
      const requiredSolution = answer.map((x: any) => {
        return {
          answer: x.answer,
          status: x.status,
          questionId: x.id,
          wordsNumber: x.answer.split(" ").length
        }
      });

      const requiredSubSolution = subAnswer.map((x: any) => {
        return {
          answer: x.answer,
          status: x.status,
          subQuestionId: x.id,
          wordsNumber: x.answer ? x.answer.split(" ").length : 0
        }
      });

      try {
        const token = await auth.getToken();
        // managing state first 
        await axios.post(`${BASE_URL}/api/v1/test/submit`, {
          remainingHour: time.hour,
          remainingMinute: time.minute,
          remainingSecond: time.second,
          type: "Completed",
          testId: id,
          submittedAt: new Date(),
          solution: requiredSolution,
          subSolution: requiredSubSolution.length > 0 ? requiredSubSolution : undefined
        }, {
          headers: {
            Authorization: token
          }
        });
        toast.success("Submitted successfully");
        alert("submitted successfully");
        navigate("/tests");
      } catch (err) {
        console.log(err);
      }
    }
    if (time.hour == 0 && time.minute == 0 && time.second == 0) {
      main();
    }
  }, [time]);


  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center px-3 md:px-6 py-2 md:py-4 bg-white shadow-sm gap-3 sm:gap-0 overflow-x-hidden">
      <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto justify-center sm:justify-start">
        <button
          onClick={() => {
            answer.map((x: any) => {
              if (x.id === currentQuestionId) {
                if (x.answer == "") {
                  setAnswer((prev: any) => {
                    const newArr = prev.map((x: any) => {
                      if (x.id === currentQuestionId) {
                        return { ...x, status: "Marked_For_Review" }
                      } else {
                        return x
                      }
                    });
                    return newArr;
                  });
                } else {
                  setAnswer((prev: any) => {
                    const newArr = prev.map((x: any) => {
                      if (x.id === currentQuestionId) {
                        return { ...x, status: "Answered_And_Marked_For_Review" }
                      } else {
                        return x
                      }
                    });
                    return newArr;
                  });

                }
              }
            })
            
            // Navigate to next question
            const currentIndex = questionInfo.question.findIndex(q => q.id === currentQuestionId);
            if (currentIndex === questionInfo.question.length - 1) {
              // Go to first question
              const firstQuestion = questionInfo.question[0];
              setCurrentSection(firstQuestion.type);
              setCurrentQuestionId(firstQuestion.id);
            } else {
              // Go to next question
              const nextQuestion = questionInfo.question[currentIndex + 1];
              setCurrentSection(nextQuestion.type);
              setCurrentQuestionId(nextQuestion.id);
            }
          }}
          className="px-2 md:px-4 lg:px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 text-xs md:text-sm whitespace-nowrap"
        >
          <span className="hidden md:inline">Mark for Review & Next</span>
          <span className="md:hidden">Mark & Next</span>
        </button>
        <button
          onClick={() => {
            setAnswer((prev: any) => {
              const newArr = prev.map((x: any) => {
                if (x.id === currentQuestionId) {
                  return { ...x, answer: "" }
                } else { return x }
              });
              return newArr;
            });
          }}
          className="px-2 md:px-4 lg:px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-600 transition-all duration-200 text-xs md:text-sm whitespace-nowrap"
        >
          <span className="hidden md:inline">Clear Response</span>
          <span className="md:hidden">Clear</span>
        </button>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto justify-center sm:justify-end">
        <button
          onClick={() => {
            answer.map((x: any) => {
              if (x.id === currentQuestionId) {
                if (x.answer == "") {
                  setAnswer((prev: any) => {
                    const newArr = prev.map((x: any) => {
                      if (x.id === currentQuestionId) {
                        return { ...x, status: "Not_Answered" }
                      } else {
                        return x
                      }
                    });
                    return newArr;
                  });

                } else {

                  setAnswer((prev: any) => {
                    const newArr = prev.map((x: any) => {
                      if (x.id === currentQuestionId) {
                        return { ...x, status: "Answered" }
                      } else {
                        return x
                      }
                    });
                    return newArr;
                  });

                }

                // Navigate to next question
                const currentIndex = questionInfo.question.findIndex(q => q.id === currentQuestionId);
                if (currentIndex === questionInfo.question.length - 1) {
                  // Go to first question
                  const firstQuestion = questionInfo.question[0];
                  setCurrentSection(firstQuestion.type);
                  setCurrentQuestionId(firstQuestion.id);
                } else {
                  // Go to next question
                  const nextQuestion = questionInfo.question[currentIndex + 1];
                  setCurrentSection(nextQuestion.type);
                  setCurrentQuestionId(nextQuestion.id);
                }
              }
            })
          }}
          className="px-3 md:px-6 lg:px-8 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-xs md:text-sm whitespace-nowrap"
        >
          Next
        </button>
        <button
          onClick={async () => {
            setLoading(true);
            const requiredSolution = answer.map((x: any) => {
              return {
                answer: x.answer,
                status: x.status,
                questionId: x.id,
                wordsNumber: x.answer.split(" ").length
              }
            });

            const requiredSubSolution = subAnswer.map((x: any) => {
              return {
                answer: x.answer,
                status: x.status,
                subQuestionId: x.id,
                wordsNumber: x.answer ? x.answer.split(" ").length : 0
              }
            });

            try {
              const token = await auth.getToken();
              await axios.post(`${BASE_URL}/api/v1/test/submit`, {
                remainingHour: time.hour,
                remainingMinute: time.minute,
                remainingSecond: time.second,
                type: "Completed",
                testId: id,
                submittedAt: new Date(),
                solution: requiredSolution,
                subSolution: requiredSubSolution.length > 0 ? requiredSubSolution : undefined
              }, {
                headers: {
                  Authorization: token
                }
              });
              navigate("/tests");
            } catch (err) {
              console.log(err);
            }
          }}
          className="px-3 md:px-6 lg:px-8 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-xs md:text-sm whitespace-nowrap"
        >
          {loading ?
            <span className="loading loading-dots loading-sm md:loading-md"></span>
            : "Submit Test"}

        </button>
      </div>
    </div>
  );
}
export default React.memo(ArenaFooter);

