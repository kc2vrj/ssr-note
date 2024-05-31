import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import AdminPage from './components/AdminPage';

const App = (props) => {
  return (
    <Router>
      <div className="container">
        <h1>Note Taking App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Note Entry</Link>
            </li>
            <li>
              <Link to="/notes">View Notes</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/admin" element={<AdminPage {...props} />} />
          <Route path="/notes" element={<NoteList {...props} />} />
          <Route path="/" element={<NoteForm {...props} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
