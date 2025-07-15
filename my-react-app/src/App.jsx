import { Routes, Route, Link } from 'react-router-dom';
import Sign from './signup.jsx';
import Dashboard from './dashboard.jsx';
import Login from './login.jsx';
import Data from './note.jsx';
import User from './user.jsx';
import './app.css';
const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Log out</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/data" element={<Data />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
