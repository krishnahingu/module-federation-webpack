import React , { Suspense, lazy }  from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Button = lazy(() => import('core/Button'));
const HomePage = () => <h1>User Home Page</h1>;
const ProfilePage = () => <h1>User Profile Page</h1>;

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
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <div>
        <h1>Micro Frontend 2</h1>
        <Suspense fallback={<div>Loading Button...</div>}>
          <Button onClick={()=>alert("afsdf")}>Click Me</Button>
        </Suspense>      
        </div>
        <button onClick={()=>alert()} > click measdf d</button>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;