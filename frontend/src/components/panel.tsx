import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import QuestionPanel from "./questionPanel";
import AnserPanel from "./answerPanel";
import { useAtomValue } from "jotai";
import { currentSectionAtom, currentQuestionIdAtom, questionAtom } from "@/atom/atom";

export default function LeftPanel() {
  const questionInfo = useAtomValue(questionAtom);
  const currentSection = useAtomValue(currentSectionAtom);
  const currentQuestionId = useAtomValue(currentQuestionIdAtom);

  // Find the specific question that matches both current section and current question ID
  const currentQuestion = questionInfo.question.find(x => x.id === currentQuestionId && x.type === currentSection);

  return (
    <div className="h-full">
      {/* Mobile Layout - Vertical Stack */}
      <div className="lg:hidden h-full flex flex-col">
        <div className="flex-1 min-h-0 border-b border-gray-200">
          {currentQuestion && (
            <QuestionPanel questionData={{
              question: currentQuestion.question,
              type: currentQuestion.type,
              title: currentQuestion.title,
              subQuestions: currentQuestion.subQuestions
            }} />
          )}
        </div>
        <div className="flex-1 min-h-0">
          {currentQuestion && (
            <AnserPanel questionData={{
              id: currentQuestion.id,
              type: currentQuestion.type,
              words: currentQuestion.words,
              subQuestions: currentQuestion.subQuestions
            }} />
          )}
        </div>
      </div>

      {/* Desktop Layout - Horizontal Resizable Panels */}
      <div className="hidden lg:block h-full">
        <PanelGroup direction="horizontal" className="h-full">
          <Panel defaultSize={50} className="min-w-0">
            {currentQuestion && (
              <QuestionPanel questionData={{
                question: currentQuestion.question,
                type: currentQuestion.type,
                title: currentQuestion.title,
                subQuestions: currentQuestion.subQuestions
              }} />
            )}
          </Panel>
          <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300 transition-colors duration-200" />
          <Panel defaultSize={50} className="min-w-0">
            {currentQuestion && (
              <AnserPanel questionData={{
                id: currentQuestion.id,
                type: currentQuestion.type,
                words: currentQuestion.words,
                subQuestions: currentQuestion.subQuestions
              }} />
            )}
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
