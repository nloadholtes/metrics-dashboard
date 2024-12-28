import React from 'react';
import ProgressDashboard from '../components/ProgressDashboard';
import { Calendar, Settings, User } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Development Metrics</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Calendar className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Date Range Selector */}
          <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Custom Range</option>
              </select>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Compare to previous period
              </button>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Export Data
            </button>
          </div>

          {/* Progress Dashboard Component */}
          <ProgressDashboard />

          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {/* Activity items would go here */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">GitHub Contribution</p>
                    <p className="text-sm text-gray-500">Pushed 3 commits to main</p>
                  </div>
                  <span className="text-sm text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">LinkedIn Post</p>
                    <p className="text-sm text-gray-500">Shared article about Python best practices</p>
                  </div>
                  <span className="text-sm text-gray-500">5h ago</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Upcoming Tasks</h3>
              <div className="space-y-4">
                {/* Task items would go here */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Client Meeting</p>
                    <p className="text-sm text-gray-500">Review project milestones</p>
                  </div>
                  <span className="text-sm text-gray-500">Tomorrow, 2:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Code Review</p>
                    <p className="text-sm text-gray-500">API Integration PR #234</p>
                  </div>
                  <span className="text-sm text-gray-500">Due in 2 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
