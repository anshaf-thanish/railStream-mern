import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight, Clock, ShieldCheck, DollarSign, Train } from 'lucide-react';
const Home = () => {
  const [stations, setStations] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const { data } = await api.get('/stations');
        setStations(data);
      } catch (error) {
        console.error('Failed to fetch stations', error);
      }
    };
    fetchStations();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    if (origin && destination && date) {
      navigate(`/search?startStationId=${origin}&endStationId=${destination}&date=${date}`);
    }
  };
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-slate-50 pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-primary mb-6"
          >
            Redefining National Travel with Precision
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 mb-12"
          >
            Experience the next generation of railway logistics. Seamless segment-based booking for an uninterrupted journey across the continent.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100"
          >
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <label className="flex items-center text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  <MapPin size={14} className="mr-1" /> Origin
                </label>
                <select 
                  value={origin} 
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select Station</option>
                  {stations.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
              <div className="md:col-span-1">
                <label className="flex items-center text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  <MapPin size={14} className="mr-1" /> Destination
                </label>
                <select 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select Station</option>
                  {stations.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
              <div className="md:col-span-1">
                <label className="flex items-center text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  <Calendar size={14} className="mr-1" /> Travel Date
                </label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <label className="flex items-center text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  <Users size={14} className="mr-1" /> Passengers
                </label>
                <select 
                  value={passengers} 
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                </select>
              </div>
              <div className="md:col-span-1 flex items-end">
                <button type="submit" className="w-full bg-primary hover:bg-blue-900 bg-blue-700 text-white font-medium p-3 rounded-lg flex items-center justify-center transition shadow-lg shadow-blue-500/30">
                  Search <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-gradient-to-r from-blue-100/40 to-slate-100/40 blur-3xl -z-10 rounded-full"></div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Segment Booking?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              RailStream's innovative Segment Management System allows travelers to customize every leg of their trip. Whether you're optimizing for speed or scenic value, our precision scheduling ensures guaranteed connections and premium comfort across every mile.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl mr-4">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Precision Timing</h3>
                  <p className="text-sm text-slate-500">Real-time tracking of all connecting segments.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl mr-4">
                  <Train size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Custom Comfort</h3>
                  <p className="text-sm text-slate-500">Switch coach classes per travel segment.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl mr-4">
                  <DollarSign size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Price Optimization</h3>
                  <p className="text-sm text-slate-500">Identify the best value across multi-line routes.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl mr-4">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Guaranteed Transfers</h3>
                  <p className="text-sm text-slate-500">Our delay protection covers all booked segments.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
             <div className="w-full h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative">
                {/* Placeholder for high quality image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent z-10 mix-blend-multiply"></div>
                <img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2000&auto=format&fit=crop" alt="Train interior" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
