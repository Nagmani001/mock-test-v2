interface SubQuestion {
  id: string;
  question: string;
}

interface QuestionData {
  question: string;
  type: string;
  title?: string;
  subQuestions?: SubQuestion[];
}

export default function QuestionPanel({ questionData }: { questionData: QuestionData }) {
  const isComprehension = questionData.type === 'COMPREHENSION';

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 md:px-6 py-3 md:py-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          Question
        </h2>
      </div>
      <div className="flex-1 p-3 md:p-6 min-h-0">
        <div className="h-full w-full overflow-y-auto resize-none border-0 focus:ring-0 text-gray-700 text-sm md:text-lg leading-relaxed p-3 md:p-6">
          {/* Base question/passage */}
          <div className="mb-4 md:mb-6">
            {questionData.question}
          </div>

          {/* Sub-questions for comprehension */}
          {isComprehension && questionData.subQuestions && questionData.subQuestions.length > 0 && (
            <div className="border-t pt-4 md:pt-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Questions:</h3>
              <div className="space-y-3 md:space-y-4">
                {questionData.subQuestions.map((subQ, index) => (
                  <div key={subQ.id} className="flex items-start space-x-2 md:space-x-3">
                    <span className="text-xs md:text-sm font-bold text-blue-600 mt-1 min-w-[20px] md:min-w-[24px]">
                      {index + 1}.
                    </span>
                    <div className="text-gray-700 text-sm md:text-base">
                      {subQ.question}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
