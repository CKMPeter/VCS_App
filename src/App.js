import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./components/mainPage";
import { Checkin } from "./components/checkin";
import { Table } from "./components/table";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/checkin" element={<Checkin />} />
        <Route path="/detail" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default App;