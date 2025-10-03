import './App.css';
import React from 'react';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import {MainPage} from './components/mainPage';
import {Checkin} from './components/checkin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/checkin' element={<Checkin />} />
      </Routes>
    </Router>
  );
}
export default App;
