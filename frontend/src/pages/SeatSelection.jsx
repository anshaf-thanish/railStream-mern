import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Utensils, Wifi, Calendar as CalendarIcon, ArrowRight, Check } from 'lucide-react';
import { useSelector } from 'react-redux';
const SeatSelection = () => {
  const { journeyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const startIdx = searchParams.get('start');
  const endIdx = searchParams.get('end');
  const { userInfo } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [journeyData, setJourneyData] = useState(null);
  const [activeCoach, setActiveCoach] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  useEffect(() => {
    // We would ideally fetch journey details too, using a mock for now for the header
    const fetchJourneyAndCoach = async () => {
      try {
        // Fetch specific journey details (skipping full implementation for brevity)
        setJourneyData({
          startStation: 'Colombo Fort',
          endStation: 'Badulla',
          trainName: 'Podi Menike #1005',
          date: 'October 24, 2024',
          duration: '9h 45m',
          departureTime: '05:55 AM',
          arrivalTime: '03:40 PM',
          coaches: [
            { _id: 'c1', name: '1st Class', type: '1st Class' },
            { _id: 'c2', name: '2nd Class', type: '2nd Class' },
            { _id: 'c3', name: 'Observation', type: 'Observation' }
          ]
        });
        setActiveCoach({ _id: 'c1', name: '1st Class', type: '1st Class' });
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJourneyAndCoach();
  }, [journeyId]);
  useEffect(() => {
    const fetchSeats = async () => {
      if (!activeCoach || !journeyId) return;
      try {
        // Mocking the seat fetching since DB isn't seeded
        // const { data } = await api.get(`/search/seats?journeyId=${journeyId}&coachId=${activeCoach._id}&reqStartIndex=${startIdx}&reqEndIndex=${endIdx}`);
        // setSeats(data.seats);
        
        // Mock data based on the UI design (2 rows of seats)
        const mockSeats = [];
        const rows = ['A', 'B'];
        for (let r of rows) {
          for (let i = 1; i <= 10; i++) {
            let status = 'available';
            if (i === 3 && r === 'A') status = 'booked';
            if (i === 4 && r === 'A') status = 'conflict';
            if (i >= 8 && r === 'A') status = 'booked';
            if (i === 4 && r === 'B') status = 'booked';
            if (i === 5 && r === 'B') status = 'booked';
            
            mockSeats.push({
              seatNumber: `${r}${i}`,
              status: status,
              isWindow: true
            });
          }
        }
        setSeats(mockSeats);
      } catch (error) {
        console.error('Error fetching seats', error);
      }
    };
    fetchSeats();
  }, [activeCoach, journeyId, startIdx, endIdx]);
  const handleSeatClick = (seat) => {
    if (seat.status === 'booked' || seat.status === 'conflict') return;
    if (selectedSeat?.seatNumber === seat.seatNumber) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seat);
    }
  };
  const handleProceed = async () => {
    if (!selectedSeat) return;
    if (!userInfo) {
      navigate('/login?redirect=/book/' + journeyId);
      return;
    }
    
    setBookingLoading(true);
    try {
      // Stub API call
      // await api.post('/bookings', { ... })
      setTimeout(() => {
        setBookingLoading(false);
        navigate('/profile'); // Go to bookings page
      }, 1500);
    } catch (error) {
      console.error(error);
      setBookingLoading(false);
    }
  };
  if (loading || !journeyData) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Journey Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 flex flex-col md:flex-row justify-between items-center shadow-sm">
        <div className="flex-1 flex justify-between items-center w-full md:w-auto">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Departure</div>
            <div className="text-2xl font-bold text-slate-900">{journeyData.startStation}</div>
            <div className="text-sm font-medium text-slate-500">{journeyData.departureTime}</div>
          </div>
          
          <div className="flex flex-col items-center px-8">
            <div className="text-sm font-bold text-primary mb-1">{journeyData.trainName}</div>
            <div className="flex items-center w-32">
              <div className="h-2 w-2 rounded-full bg-slate-300"></div>
              <div className="flex-1 border-t-2 border-dashed border-slate-300"></div>
              <div className="h-2 w-2 rounded-full bg-slate-300"></div>
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">{journeyData.duration}</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Destination</div>
            <div className="text-2xl font-bold text-slate-900">{journeyData.endStation}</div>
            <div className="text-sm font-medium text-slate-500">{journeyData.arrivalTime}</div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-0 md:ml-12 pl-6 border-l border-slate-100 flex items-center bg-blue-50/50 py-3 px-6 rounded-xl border border-blue-100">
          <CalendarIcon className="text-blue-600 mr-3" size={24} />
          <div>
            <div className="text-sm font-bold text-slate-900">{journeyData.date}</div>
            <div className="text-xs text-slate-500">Thursday</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Coach Selection */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Select Coach</h2>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {journeyData.coaches.map(coach => (
                <button
                  key={coach._id}
                  onClick={() => setActiveCoach(coach)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeCoach?._id === coach._id ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {coach.name}
                </button>
              ))}
            </div>
          </div>
          {/* Seat Map Container */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center"><div className="w-5 h-5 rounded bg-green-600 mr-2"></div><span className="text-sm font-medium text-slate-600">Available</span></div>
              <div className="flex items-center"><div className="w-5 h-5 rounded bg-blue-600 mr-2"></div><span className="text-sm font-medium text-slate-600">Selected</span></div>
              <div className="flex items-center"><div className="w-5 h-5 rounded bg-red-600 mr-2"></div><span className="text-sm font-medium text-slate-600">Booked</span></div>
              <div className="flex items-center"><div className="w-5 h-5 rounded bg-warning mr-2"></div><span className="text-sm font-medium text-slate-600">Partial Conflict</span></div>
            </div>
            {/* The Train Coach SVG/Visual */}
            <div className="relative bg-slate-100 rounded-full py-12 px-16 max-w-3xl mx-auto border-[8px] border-slate-200">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-32 bg-slate-200 rounded-r-lg"></div>
              
              <div className="flex flex-col gap-12 relative z-10">
                {/* Row A */}
                <div className="flex gap-4">
                  {seats.filter(s => s.seatNumber.startsWith('A')).map((seat) => (
                    <button
                      key={seat.seatNumber}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'booked' || seat.status === 'conflict'}
                      className={`w-12 h-14 rounded-t-lg rounded-b-sm flex items-center justify-center text-xs font-bold transition-all
                        ${seat.status === 'booked' ? 'bg-red-600 text-white cursor-not-allowed opacity-90' : 
                          seat.status === 'conflict' ? 'bg-warning text-white cursor-not-allowed opacity-90' :
                          selectedSeat?.seatNumber === seat.seatNumber ? 'bg-blue-600 text-white ring-4 ring-blue-200 scale-105 shadow-lg' :
                          'bg-green-600 text-transparent hover:bg-green-500 hover:text-white cursor-pointer shadow-sm'
                        }
                      `}
                    >
                      {seat.status === 'booked' ? 'block' : seat.status === 'conflict' ? 'warn' : seat.seatNumber}
                    </button>
                  ))}
                </div>
                {/* Aisle */}
                <div className="h-1 w-full border-t-2 border-dashed border-slate-300"></div>
                {/* Row B */}
                <div className="flex gap-4">
                  {seats.filter(s => s.seatNumber.startsWith('B')).map((seat) => (
                    <button
                      key={seat.seatNumber}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'booked' || seat.status === 'conflict'}
                      className={`w-12 h-14 rounded-b-lg rounded-t-sm flex items-center justify-center text-xs font-bold transition-all
                        ${seat.status === 'booked' ? 'bg-red-600 text-white cursor-not-allowed opacity-90' : 
                          seat.status === 'conflict' ? 'bg-warning text-white cursor-not-allowed opacity-90' :
                          selectedSeat?.seatNumber === seat.seatNumber ? 'bg-blue-600 text-white ring-4 ring-blue-200 scale-105 shadow-lg' :
                          'bg-green-600 text-transparent hover:bg-green-500 hover:text-white cursor-pointer shadow-sm'
                        }
                      `}
                    >
                      {seat.status === 'booked' ? 'block' : seat.status === 'conflict' ? 'warn' : seat.seatNumber}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-center text-blue-800 font-bold mb-3"><Utensils size={20} className="mr-2"/> Dining Service</div>
              <p className="text-sm text-slate-600 leading-relaxed">Premium 1st class passengers have access to the dining car and inclusive breakfast snacks. Orders can be placed from your seat.</p>
            </div>
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-center text-blue-800 font-bold mb-3"><Wifi size={20} className="mr-2"/> Connectivity</div>
              <p className="text-sm text-slate-600 leading-relaxed">Complimentary high-speed WiFi is available throughout the Podi Menike express for all first-class cabins.</p>
            </div>
          </div>
        </div>
        {/* Booking Summary Sidebar */}
        <div>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm sticky top-24">
            <div className="bg-primary p-6 text-white">
              <h3 className="text-xl font-bold mb-1">Booking Summary</h3>
              <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">{activeCoach?.name} CABIN</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Selected Seats</div>
                {selectedSeat ? (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-3 rounded-lg">
                    <span className="font-bold text-blue-800 text-lg">Seat {selectedSeat.seatNumber}</span>
                    <Check size={18} className="text-blue-600" />
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 border-dashed p-4 rounded-lg flex items-center text-slate-500 italic text-sm">
                    No seats selected yet
                  </div>
                )}
              </div>
              <div className="space-y-3 text-sm text-slate-600 border-b border-slate-100 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Base Fare (x1)</span>
                  <span>LKR 2,450.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Service Fee</span>
                  <span>LKR 120.00</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-slate-900">Total Payable</span>
                <span className="text-2xl font-bold text-slate-900">
                  {selectedSeat ? 'LKR 2,570.00' : 'LKR 0.00'}
                </span>
              </div>
              <button 
                onClick={handleProceed}
                disabled={!selectedSeat || bookingLoading}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all ${selectedSeat && !bookingLoading ? 'bg-primary text-white hover:bg-blue-800 shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
              >
                {bookingLoading ? 'Processing...' : (
                  <>Proceed to Passenger Info <ArrowRight size={18} className="ml-2" /></>
                )}
              </button>
              
              <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed px-4">
                By clicking proceed, you agree to our Terms of Carriage and Refund Policy. Seats are held for 10 minutes.
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-secondary/10 border border-secondary/20 rounded-xl p-5 flex">
             <div className="bg-secondary/20 text-secondary p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 shrink-0">
               ★
             </div>
             <div>
               <div className="font-bold text-green-800 text-sm mb-1">Loyalty Rewards</div>
               <div className="text-xs text-green-700">Earn 450 points with this trip!</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SeatSelection;
