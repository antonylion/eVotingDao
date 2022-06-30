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
  Voter,
} from "./components";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voter" element={<Voter />} />
      </Routes>
      <Footer />
    </Router>,
);
