import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import api from '../api/axios';
import { UserRound } from 'lucide-react';
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      dispatch(logout());
    } catch (error) {
      console.error('Logout error', error);
    }
  };
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-blue-600">🚆</span> RailStream
            </Link>
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
              <Link to="/search" className="hover:text-primary transition">Search</Link>
              <Link to="/schedule" className="hover:text-primary transition">Schedule</Link>
              <Link to="/stations" className="hover:text-primary transition">Stations</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {userInfo ? (
              <div className="flex items-center gap-4">
                {userInfo.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-primary transition">Dashboard</Link>
                )}
                <Link to="/profile" className="text-sm font-medium text-slate-600 hover:text-primary transition">My Bookings</Link>
                <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700 transition">Log Out</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md bg-blue-700 hover:bg-blue-900 transition"><UserRound /></Link>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
