import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { User, Calendar, Clock, Star } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Result() {
  const { id } = useParams<{ id: string }>();
  const [submission, setSubmission] = useState<any>({});
  const navigate = useNavigate();
  const auth = useAuth();

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
        const token =await auth.getToken();
        console.log(token);
        const answerDetails = await axios.get(`https://be.mocktest.nagmaniupadhyay.com.np/api/getProblemOne/${id}`,{
          headers: {
            Authorization: token
          }
        });
        console.log(answerDetails.data.msg);
        setSubmission(answerDetails.data.msg);
      } catch (err) {
        alert("please make sure you have submitted the test");
        navigate("/tests");
        console.log(err);
      }
    };
    main();
  }, []);

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

  if (!submission.id) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          loading...
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

              {submission.questions.map((question: any, index: number) => (
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
                        question.subQuestions.map((subQ: any, subIndex: number) => (
                          <div key={subQ.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                            {/* Sub-question */}
                            <div className="mb-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                  Sub-question {subIndex + 1}
                                </span>
                              </div>
                              <p className="text-gray-900 font-medium text-lg">{subQ.question}</p>
                            </div>

                            {/* User Answer for Sub-question */}
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                                <span>Your Response:</span>
                                {subQ.userAnswer ? (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    {subQ.userAnswer.length} characters
                                  </span>
                                ) : (
                                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                    No answer provided
                                  </span>
                                )}
                              </h5>
                              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                                {subQ.userAnswer ? (
                                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{subQ.userAnswer}</p>
                                ) : (
                                  <p className="text-gray-400 italic">No answer provided for this sub-question.</p>
                                )}
                              </div>
                            </div>

                            {/* Admin Rating for Sub-question (Read-only) */}
                            {(subQ.adminRating !== null && subQ.adminRating !== undefined) || subQ.adminFeedback ? (
                              <div className="border-t border-gray-200 pt-3">
                                <h5 className="font-medium text-gray-900 mb-2">Admin Rating & Feedback</h5>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {/* Rating */}
                                  {(subQ.adminRating !== null && subQ.adminRating !== undefined) && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Rating (out of {Math.floor(question.successMarks / (question.subQuestions?.length || 1))} marks)
                                      </label>
                                      <div className="flex items-center space-x-2">
                                        <input
                                          type="number"
                                          disabled
                                          value={subQ.adminRating}
                                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                        <span className="text-gray-600">/ {Math.floor(question.successMarks / (question.subQuestions?.length || 1))}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Feedback */}
                                {subQ.adminFeedback && (
                                  <div className="mt-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Admin Feedback
                                    </label>
                                    <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                                      <p className="text-blue-800 leading-relaxed">{subQ.adminFeedback}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="border-t border-gray-200 pt-3">
                                <div className="bg-yellow-50 rounded-lg p-3 border-l-4 border-yellow-500">
                                  <p className="text-yellow-800 text-sm">This sub-question hasn't been graded yet.</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        /* No sub-questions found */
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-yellow-600">⚠️</span>
                            <p className="text-yellow-800 font-medium">
                              This comprehension question has no sub-questions to display.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Regular Question (Essay/Letter) */
                    <>
                      {/* User Answer */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                          <span>Your Response:</span>
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
                            <p className="text-gray-400 italic">No answer provided.</p>
                          )}
                    </div>
                  </div>

                      {/* Admin Rating Section (Read-only) */}
                      {(question.adminRating !== null && question.adminRating !== undefined) || question.adminFeedback ? (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Admin Rating & Feedback</h4>

                    {/* Rating */}
                          {(question.adminRating !== null && question.adminRating !== undefined) && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (out of {question.successMarks} marks)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          disabled
                          value={question.adminRating}
                                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                        <span className="text-gray-600">/ {question.successMarks}</span>
                      </div>
                    </div>
                          )}

                    {/* Feedback */}
                          {question.adminFeedback && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                Admin Feedback
                      </label>
                              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                <p className="text-blue-800 leading-relaxed whitespace-pre-wrap">{question.adminFeedback}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="border-t border-gray-200 pt-4">
                          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                            <p className="text-yellow-800 text-sm">This question hasn't been graded yet.</p>
                    </div>
                  </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
