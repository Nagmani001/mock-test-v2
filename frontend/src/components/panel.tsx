import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import QuestionPanel from "./questionPanel";
import AnserPanel from "./answerPanel";
import { useAtomValue } from "jotai";
import { currentSectionAtom, questionAtom } from "@/atom/atom";

export default function LeftPanel() {
  const questionInfo = useAtomValue(questionAtom);
  const currentSection = useAtomValue(currentSectionAtom);

  return (
    <div className="h-full">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={50} className="min-w-0">
          {questionInfo.question.map(x => {
            if (x.type == currentSection) {
              return <QuestionPanel key={x.id} questionData={{
                question: x.question,
                type: x.type,
                title: x.title,
                subQuestions: x.subQuestions
              }} />
            }
          })}
        </Panel>
        <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300 transition-colors duration-200" />
        <Panel defaultSize={50} className="min-w-0">
          {questionInfo.question.map(x => {
            if (x.type == currentSection) {
              return <AnserPanel key={x.id} questionData={{
                id: x.id,
                type: x.type,
                words: x.words,
                subQuestions: x.subQuestions
              }} />
            }
          })}
        </Panel>
      </PanelGroup>
    </div>
  );
}
