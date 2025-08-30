import { useNavigate } from "react-router-dom";

export default function DescriptiveTestCard({
  id,
  title,
  questions,
  time,
}: {
  id: string
  title: string;
  questions: number;
  time: number;
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 leading-tight">{title}</h2>
      <div className="border-t border-gray-100 pt-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="font-medium text-gray-500">Questions:</span>
              <span className="font-semibold text-gray-700">{questions}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="font-medium text-gray-500">Time:</span>
              <span className="font-semibold text-gray-700">{time}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="cursor-pointer bg-[#03989e] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#027d85] transition-colors text-sm"
              onClick={() => {
                navigate(`/tests/${id}`);
              }}
            >
              Start
            </button>
            <button
              onClick={() => {
                navigate("/result/" + id);
              }}
              className="cursor-pointer text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors">
              View Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
