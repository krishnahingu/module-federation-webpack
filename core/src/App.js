import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

// Dynamically load the micro frontends
const UserApp = lazy(() => import('user/App'));
const CrewApp = lazy(() => import('crew/App'));

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/user">User</Link>
            </li>
            <li>
              <Link to="/crew">Crew</Link>
            </li>
          </ul>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/user/*"
              element={
                <ErrorBoundary>
                  <UserApp />
                </ErrorBoundary>
              }
            />
            <Route
              path="/crew/*"
              element={
                <ErrorBoundary>
                  <CrewApp />
                </ErrorBoundary>
              }
            />
            <Route path="/" element={<h1>Welcome to the Core App</h1>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;