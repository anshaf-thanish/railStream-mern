import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import SeatSelection from './pages/SeatSelection';
import Footer from './components/Footer';
// import Checkout from './pages/Checkout';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import AdminDashboard from './pages/AdminDashboard';


const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/book/:journeyId" element={<SeatSelection />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
        </Routes>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
