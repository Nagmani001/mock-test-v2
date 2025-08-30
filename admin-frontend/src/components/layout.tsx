import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Home, FileText, Plus, ArrowLeft } from 'lucide-react';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {!isHomePage && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => navigate('/dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${location.pathname === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => navigate('/submissions')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${location.pathname.startsWith('/submissions')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <FileText className="w-4 h-4" />
                <span>Submissions</span>
              </button>
              <button
                onClick={() => navigate('/createTest')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${location.pathname === '/createTest'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Plus className="w-4 h-4" />
                <span>Create Test</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
