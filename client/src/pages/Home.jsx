import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Download, Loader2 } from 'lucide-react';

const Home = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const { data } = await api.get('/public/showcase');
        setSubmissions(data);
      } catch (err) {
        console.error('Failed to fetch showcase', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApproved();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-32 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          RotaGraphics <span className="text-secondary">Competition</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-indigo-100 mb-10">
          Showcase your creativity, compete with the best, and win amazing prizes. 
          Join the ultimate graphic design showdown for university students!
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-white text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all">
            Join Now
          </Link>
          <a href="#showcase" className="bg-indigo-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-indigo-600 transition-all border border-indigo-500">
            View Gallery
          </a>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-12 min-h-[500px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-secondary after:rounded-full">
              Approved Designs
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center text-slate-500 py-16">
              <p className="text-xl">No approved designs yet.</p>
              <p className="mt-2 text-sm">Be the first to get your design showcased!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {submissions.map((sub) => (
                <div key={sub._id} className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden flex-shrink-0">
                    <img 
                      src={sub.designUrl} 
                      alt={`${sub.fullName}'s design`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=PDF+or+Invalid+Image'; }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{sub.fullName}</h3>
                    <p className="text-sm text-slate-500 font-medium mb-4 flex-1">{sub.university}</p>
                    <a 
                      href={sub.designUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" /> View Full Design
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
