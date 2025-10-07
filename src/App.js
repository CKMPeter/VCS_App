import './App.css';
import React from 'react';
import {Route, Routes, HashRouter as Router} from 'react-router-dom';
import {MainPage} from './components/mainPage';
import {Checkin} from './components/checkin';
import {Table} from './components/table';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/checkin' element={<Checkin />} />
        <Route path='/detail' element={<Table />}/>
      </Routes>
    </Router>
  );
}
export default App;
