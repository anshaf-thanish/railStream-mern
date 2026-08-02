import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../api/axios';
import { Clock, ArrowRight, Train } from 'lucide-react';
const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const startStationId = searchParams.get('startStationId');
  const endStationId = searchParams.get('endStationId');
  const date = searchParams.get('date');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await api.get(`/search?startStationId=${startStationId}&endStationId=${endStationId}&date=${date}`);
        setResults(data);
      } catch (error) {
        console.error('Failed to fetch search results', error);
      } finally {
        setLoading(false);
      }
    };
    if (startStationId && endStationId && date) {
      fetchResults();
    }
  }, [startStationId, endStationId, date]);
  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center gap-4 text-sm font-medium text-slate-500">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-slate-900">Search Results</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Available Journeys</h1>
      {results.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <Train size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-700 mb-2">No trains found</h2>
          <p className="text-slate-500 mb-6">We couldn't find any trains matching your search criteria. Please try different dates or stations.</p>
          <Link to="/" className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-800 transition">Modify Search</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((journey) => (
            <div key={journey.journeyId} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 flex items-center justify-between w-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{journey.departureTime}</div>
                  <div className="text-sm font-medium text-slate-500">{journey.route.stations[journey.startStationIndex].station.code}</div>
                </div>
                
                <div className="flex-1 px-8 flex flex-col items-center">
                  <div className="flex items-center text-xs text-slate-400 font-semibold mb-1">
                    <Clock size={12} className="mr-1" /> Direct Segment
                  </div>
                  <div className="w-full flex items-center">
                    <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                    <div className="flex-1 border-t-2 border-dashed border-slate-300"></div>
                    <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{journey.train.name}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">--:--</div> {/* Add estimated arrival calculation later */}
                  <div className="text-sm font-medium text-slate-500">{journey.route.stations[journey.endStationIndex].station.code}</div>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Starting From</div>
                <div className="text-2xl font-bold text-primary mb-3">${(journey.basePrice).toFixed(2)}</div>
                <Link 
                  to={`/book/${journey.journeyId}?start=${journey.startStationIndex}&end=${journey.endStationIndex}`}
                  className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-800 transition text-center flex items-center justify-center"
                >
                  Select <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchResults;