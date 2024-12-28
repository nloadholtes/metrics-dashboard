import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

# src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
