import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Admin,
  Voter,
  CandReg
} from "./components";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/voter" element={<Voter />} />
        <Route path="/candidate" element={<CandReg />} />
      </Routes>
      <Footer />
    </Router>,
);
