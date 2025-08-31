import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { BASE_URL } from "../config/utils";
import ArenaNav from "../components/arenaNav";
import ArenaFooter from "../components/arenaFooter";
import TimerSection from "../components/timeSection";
import SecondaryNav from "../components/secondaryNav";
import LeftPanel from "@/components/panel";
import { useAtom, useSetAtom } from "jotai";
import { answerAtom, currentSectionAtom, currentQuestionIdAtom, questionAtom, sectionAtom, subAnswerAtom, testTimerAtom } from "@/atom/atom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";

export default function Arena() {
  const questionId = useParams();
  const [questionInfo, setQuestionInfo] = useAtom(questionAtom);

  const setAnswer = useSetAtom(answerAtom);
  const setSubAnswer = useSetAtom(subAnswerAtom);
  const setquestionTimer = useSetAtom(testTimerAtom);
  const setCurrentSection = useSetAtom(currentSectionAtom);
  const setSection = useSetAtom(sectionAtom);
  const setCurrentQuestionId = useSetAtom(currentQuestionIdAtom);
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isSignedIn) {
    toast.error("please sign in first to attempt the test")
    window.scrollTo({
      top: 0
    })
    navigate("/tests");

  }

  useEffect(() => {
    const main = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/test/${questionId.id}`);
        const array = res.data.msg.question.map((x: any) => {
          return x.type
        });
        setSection(array);
        setCurrentSection(array[0]);
        setCurrentQuestionId(res.data.msg.question[0].id);

        const { id, title, totalTimeHour, totalTimeMinute, totalTimeSecond, question } = res.data.msg;
        const actualQuestion = question.map((x: any) => {
          return {
            id: x.id,
            question: x.question,
            type: x.type,
            words: x.words,
            successMarks: x.successMarks,
            failureMarks: x.failureMarks,
            title: x.title,
            subQuestions: x.subQuestions || []
          }
        });
        
        // Set regular answers
        setAnswer(actualQuestion.map((x: any) => {
          return {
            id: x.id, // questionId
            words: x.words, // words allowed
            answer: "",
            type: x.type,
            status: "Not_Visited",
            //TODO: you want solution time : hour , minute and second
          }
        }));

        // Set sub-question answers for comprehension questions
        const subAnswers = actualQuestion.flatMap((x: any) => 
          x.type === 'COMPREHENSION' && x.subQuestions ? 
            x.subQuestions.map((subQ: any) => ({
              id: subQ.id, // subQuestionId
              questionId: x.id, // parent question id
              answer: "",
              status: "Not_Visited",
              wordsNumber: 0
            })) : []
        );
        setSubAnswer(subAnswers);
        setquestionTimer({
          hour: totalTimeHour,
          minute: totalTimeMinute,
          second: totalTimeSecond
        });
        setQuestionInfo({
          id,
          title,
          totalTimeHour,
          totalTimeMinute,
          totalTimeSecond,
          question: actualQuestion
        });
      } catch (err) {
        console.log("error", err);
      }
    }
    main();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 h-20 bg-white shadow-sm border-b border-gray-200">
        <ArenaNav title={questionInfo.title}  />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          <SecondaryNav />
          <div className="flex-1 bg-white shadow-sm">
            <LeftPanel />
          </div>
        </div>

        {/* Right Panel - Timer Section */}
        <div className="w-80 flex-shrink-0 bg-white shadow-lg border-l border-gray-200">
          <TimerSection />
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 h-16 bg-white shadow-sm border-t border-gray-200">
        <ArenaFooter id={questionId.id} />
      </div>
    </div>
  );
}
