import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import AdminPage from './components/AdminPage';

const App = ({ initialData, ...props }) => {
  return (
    <Router>
      <div className="container">
        <h1>
          <img 
            src="https://stratfiresecurity.com/wp-content/uploads/2021/11/logo.png" 
            alt="Logo" 
            style={{ height: "50px" }} 
          /> 
          Note Taking App
        </h1>
        <nav>
          <ul>
            <li key="note-entry">
              <Link to="/">Note Entry</Link>
            </li>
            <li key="view-notes">
              <Link to="/notes">View Notes</Link>
            </li>
            <li key="admin-page">
              <Link to="/admin">Admin Page</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<NoteForm sites={props.sites} {...props} />} />
          <Route path="/notes" element={<NoteList sites={props.sites} {...props} />} />
          <Route path="/admin" element={<AdminPage {...props} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
