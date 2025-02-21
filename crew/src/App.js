import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const HomePage = () => <h1>Crew Home Page</h1>;
const DashboardPage = () => <h1>Crew Dashboard Page</h1>;
const Header = lazy(() => import('core/Header'));
// import ErrorBoundary from './ErrorBoundary';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Suspense fallback={<div>Loading Header...</div>}>
            <Header />
          </Suspense>
          <h1>Micro Frontend 1</h1>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;