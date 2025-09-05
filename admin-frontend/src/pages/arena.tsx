import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Calendar, Clock, Star, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/config/utils';
import { toast } from 'sonner';

interface SubQuestion {
  id: string;
  question: string;
  userAnswer: string;
  adminRating?: number;
  adminFeedback?: string;
}

interface Question {
  id: string;
  question: string;
  type: string;
  words: number;
  successMarks: number;
  failureMarks: number;
  userAnswer: string;
  adminRating?: number;
  adminFeedback?: string;
  // New fields for comprehension questions
  title?: string;
  subQuestions?: SubQuestion[];
}

interface SubmissionDetail {
  id: string;
  userName: string;
  userEmail: string;
  testTitle: string;
  submittedAt: string;
  totalScore: number;
  status: 'pending' | 'reviewed' | 'graded';
  totalQuestions: number;
  timeSpent: string;
  questions: Question[];
}

export default function Arena() {

  const { id } = useParams<{ id: string }>();
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
  const [subRatings, setSubRatings] = useState<{ [key: string]: number }>({});
  const [subFeedback, setSubFeedback] = useState<{ [key: string]: string }>({});
  const [submission, setSubmissions] = useState<SubmissionDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const main = async () => {
      const answerDetails = await axios.get(`${BASE_URL}/submission/getOne/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      setSubmissions(answerDetails.data.msg);
    };
    main();
  }, []);

  const handleRatingChange = (questionId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [questionId]: rating }));
  };

  const handleFeedbackChange = (questionId: string, feedbackText: string) => {
    setFeedback(prev => ({ ...prev, [questionId]: feedbackText }));
  };

  const handleSubRatingChange = (subQuestionId: string, rating: number) => {
    setSubRatings(prev => ({ ...prev, [subQuestionId]: rating }));
  };

  const handleSubFeedbackChange = (subQuestionId: string, feedbackText: string) => {
    setSubFeedback(prev => ({ ...prev, [subQuestionId]: feedbackText }));
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-In', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',

      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!submission) {
    return <div className="flex justify-center items-center h-screen">
      Loading...</div>
  } else {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-gray-900">{submission.testTitle}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{submission.userName}</span>
                  <span className="text-gray-400">({submission.userEmail})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(submission.submittedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Time spent: {submission.timeSpent}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
              </span>
              {submission.status === 'graded' && (
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-xl font-bold text-gray-900">{submission.totalScore}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Questions</p>
              <p className="font-medium text-gray-900">{submission.totalQuestions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time Spent</p>
              <p className="font-medium text-gray-900">{submission.timeSpent}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium text-gray-900">{submission.status}</p>
            </div>
          </div>
        </div>

        {/* Questions and Answers */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Questions and Responses</h2>

          {submission.questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                      Question {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">{question.type}</span>
                  </div>
                  {question.type === 'COMPREHENSION' ? (
                    <>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{question.title || 'Comprehension Question'}</h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-gray-800 leading-relaxed">{question.question}</p>
                      </div>
                    </>
                  ) : (
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{question.question}</h3>
                  )}
                  <p className="text-sm text-gray-600">
                    Success marks: {question.successMarks} | Failure marks: {question.failureMarks}
                  </p>
                </div>
              </div>

              {question.type === 'COMPREHENSION' ? (
                /* Comprehension Question with Sub-questions */
                <div className="space-y-6">
                  {question.subQuestions && question.subQuestions.length > 0 ? (
                    question.subQuestions.map((subQ, subIndex) => (
                      <div key={subQ.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                        {/* Sub-question */}
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                              Sub-question {subIndex + 1}
                            </span>
                          </div>
                          <p className="text-gray-900 font-medium text-lg leading-relaxed">{subQ.question}</p>
                        </div>

                        {/* User Answer for Sub-question */}
                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                            <span>Student Response:</span>
                          </h5>
                          <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                            {subQ.userAnswer ? (
                              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{subQ.userAnswer}</p>
                            ) : (
                              <p className="text-gray-400 italic">No answer provided by the student for this sub-question.</p>
                            )}
                          </div>
                        </div>

                        {/* Admin Rating for Sub-question */}
                        <div className="border-t border-gray-200 pt-3">
                          <h5 className="font-medium text-gray-900 mb-2">Rating & Feedback</h5>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Rating */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rating (out of {Math.floor(question.successMarks / (question.subQuestions?.length || 1))} marks)
                              </label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  min="0"
                                  max={Math.floor(question.successMarks / (question.subQuestions?.length || 1))}
                                  value={subRatings[subQ.id] ?? subQ.adminRating ?? ''}
                                  onChange={(e) => handleSubRatingChange(subQ.id, parseInt(e.target.value))}
                                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <span className="text-gray-600">/ {Math.floor(question.successMarks / (question.subQuestions?.length || 1))}</span>
                              </div>
                            </div>

                          </div>

                          {/* Feedback */}
                          <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Feedback
                            </label>
                            <textarea
                              value={subFeedback[subQ.id] ?? subQ.adminFeedback ?? ''}
                              onChange={(e) => handleSubFeedbackChange(subQ.id, e.target.value)}
                              placeholder="Provide feedback for this sub-question..."
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* Current Feedback Display */}
                          {subQ.adminFeedback && (
                            <div className="mt-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                              <div className="flex items-start space-x-2">
                                <MessageSquare className="w-3 h-3 text-green-600 mt-0.5" />
                                <div>
                                  <p className="text-xs font-medium text-green-900">Current Feedback:</p>
                                  <p className="text-xs text-green-800">{subQ.adminFeedback}</p>
                                  {subQ.adminRating && (
                                    <p className="text-xs text-green-700 mt-1">
                                      Current Rating: {subQ.adminRating}/{Math.floor(question.successMarks / (question.subQuestions?.length || 1))} marks
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    /* No sub-questions found */
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-yellow-600">⚠️</span>
                        <p className="text-yellow-800 font-medium">
                          This comprehension question has no sub-questions to display.
                        </p>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        Comprehension questions should have individual sub-questions for students to answer.
                        Please check if this question was created properly.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Regular Question (Essay/Letter) */
                <>
                  {/* User Answer */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                      <span>Student Response:</span>
                      {question.userAnswer ? (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {question.userAnswer.length} characters
                        </span>
                      ) : (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          No answer provided
                        </span>
                      )}
                    </h4>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
                      {question.userAnswer ? (
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{question.userAnswer}</p>
                      ) : (
                        <p className="text-gray-400 italic">No answer provided by the student.</p>
                      )}
                    </div>
                  </div>

                  {/* Admin Rating Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Admin Rating & Feedback</h4>

                    {/* Rating */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (out of {question.successMarks} marks)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          max={question.successMarks}
                          value={ratings[question.id] ?? question.adminRating ?? ''}
                          onChange={(e) => handleRatingChange(question.id, parseInt(e.target.value))}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <span className="text-gray-600">/ {question.successMarks}</span>
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Feedback
                      </label>
                      <textarea
                        value={feedback[question.id] ?? question.adminFeedback ?? ''}
                        onChange={(e) => handleFeedbackChange(question.id, e.target.value)}
                        placeholder="Provide detailed feedback for the student..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>


                    {/* Current Feedback Display */}
                    {question.adminFeedback && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Current Feedback:</p>
                            <p className="text-sm text-blue-800">{question.adminFeedback}</p>
                            {question.adminRating && (
                              <p className="text-sm text-blue-700 mt-1">
                                Current Rating: {question.adminRating}/{question.successMarks} marks
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Overall Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Final Actions</h3>
              <p className="text-gray-600">Complete the review process for this submission</p>
            </div>
            <div className="flex space-x-3">
              <button onClick={async () => {
                setLoading(true);
                const feedbacks: any = [];
                const rating: any = [];
                const subFeedbacks: any = [];
                const subRating: any = [];

                for (const [key, value] of Object.entries(feedback)) {
                  feedbacks.push({ key, value });
                }

                for (const [key, value] of Object.entries(ratings)) {
                  rating.push({ key, value });
                }

                for (const [key, value] of Object.entries(subFeedback)) {
                  subFeedbacks.push({ key, value });
                }

                for (const [key, value] of Object.entries(subRatings)) {
                  subRating.push({ key, value });
                }

                try {
                  await axios.post(`${BASE_URL}/feedback/grade`, {
                    feedbacks,
                    rating,
                    subFeedbacks: subFeedbacks.length > 0 ? subFeedbacks : undefined,
                    subRating: subRating.length > 0 ? subRating : undefined,
                    id
                  }, {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    }
                  });
                  setLoading(false);
                  toast.success("graded successfully");
                  await new Promise(r => setTimeout(r, 1500));
                  navigate("/submissions");
                } catch (err) {
                  toast.error("error occured while grading, try again");
                  console.log(err);
                }
              }} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                {loading ?
                  <span className="loading loading-dots loading-lg"></span>
                  : "Mark as Graded"
                }</button>
            </div>
          </div>
        </div>
      </div >
    );
  }
};


