import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Common layout elements like navigation could go here */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
