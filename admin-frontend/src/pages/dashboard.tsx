import { useNavigate } from 'react-router-dom';
import { Plus, FileText, BarChart3, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/utils';

interface PageData {
  activeUsers: number,
  testCount: number,
  totalSubmissions: number
}
export default function Dashboard() {
  const [pageData, setPageData] = useState<PageData>({
    activeUsers: 0,
    testCount: 0,
    totalSubmissions: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const main = async () => {
      try {
        const data = await axios.get(`${BASE_URL}/info`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        });
        setPageData(data.data);
      } catch (err) {
        navigate("/signin")
        console.log(err);
      }
    }
    main();
  }, []);

  const stats = [
    { label: 'Total Submissions', value: pageData.totalSubmissions, icon: FileText, color: 'bg-blue-500' },
    { label: 'Problems Created', value: pageData.testCount, icon: Plus, color: 'bg-green-500' },
    { label: 'Average Score', value: '78%', icon: BarChart3, color: 'bg-purple-500' },
    { label: 'Active Users', value: pageData.activeUsers, icon: Users, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Admin Portal
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Manage test problems, review submissions, and analyze performance metrics
          all in one comprehensive dashboard.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/createTest')}
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3"
          >
            <Plus className="w-5 h-5" />
            <span>Create Problem</span>
          </button>

          <button
            onClick={() => navigate('/submissions')}
            className="group bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 border border-gray-200"
          >
            <FileText className="w-5 h-5" />
            <span>View Submissions</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New submission received', user: 'John Doe', time: '2 minutes ago', type: 'submission' },
            { action: 'Problem "Advanced Algorithms" created', user: 'Admin', time: '1 hour ago', type: 'problem' },
            { action: 'Submission rated', user: 'Jane Smith', time: '3 hours ago', type: 'rating' },
            { action: 'New user registered', user: 'Mike Johnson', time: '5 hours ago', type: 'user' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-2 h-2 rounded-full ${activity.type === 'submission' ? 'bg-blue-500' :
                activity.type === 'problem' ? 'bg-green-500' :
                  activity.type === 'rating' ? 'bg-purple-500' : 'bg-orange-500'
                }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

