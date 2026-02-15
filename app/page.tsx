// @ts-nocheck
"use client";
import { useState } from 'react';
import { buildGym } from '../utils/builder';

export default function Home() {
  const [ceiling, setCeiling] = useState(96);
  const [liftStyle, setLiftStyle] = useState("general");
  const [brandPref, setBrandPref] = useState("any");
  const [selectedCats, setSelectedCats] = useState({
    racks: true, barbells: true, plates: true, benches: true, 
    dumbbells: false, cardio: false, flooring: false
  });
  const [results, setResults] = useState(null);
  const [activeTier, setActiveTier] = useState("value");

  const handleBuild = () => {
    const activeCategories = Object.keys(selectedCats).filter(key => selectedCats[key]);
    if (activeCategories.length === 0) {
      alert("Please select at least one piece of equipment!");
      return;
    }
    const tiers = buildGym(ceiling, activeCategories, liftStyle, brandPref);
    setResults(tiers);
  };

  const toggleCat = (cat) => {
    setSelectedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    // MODERN BACKGROUND: Animated gradient mesh effect
    <div className="min-h-screen font-sans text-gray-900 pb-20 bg-fixed bg-slate-50" 
         style={{
           backgroundImage: `radial-gradient(at 0% 0%, hsla(210,100%,93%,1) 0, transparent 50%), 
                             radial-gradient(at 50% 0%, hsla(225,100%,90%,1) 0, transparent 50%), 
                             radial-gradient(at 100% 0%, hsla(210,100%,93%,1) 0, transparent 50%)`
         }}>
      
      {/* HEADER: Transparent glass effect */}
      <header className="backdrop-blur-md bg-blue-900/90 text-white p-8 shadow-2xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">FitMySpace</h1>
          <p className="text-blue-200 mt-2 font-medium tracking-wide">Premium Home Gym Architect</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 mt-8">
        
        {/* INPUT SECTION: White card with soft glow */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-white mb-10 transition-all hover:shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block font-bold text-sm uppercase tracking-widest text-gray-500 mb-3">Ceiling Height</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={ceiling} onChange={(e) => setCeiling(Number(e.target.value))}
                  className="w-full bg-gray-100/50 border-none p-4 rounded-2xl text-xl font-bold focus:ring-4 focus:ring-blue-500/20 transition outline-none"
                />
                <span className="absolute right-4 top-4 font-bold text-gray-400 italic">IN</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-sm uppercase tracking-widest text-gray-500 mb-3">Preferred Brand</label>
              <select 
                value={brandPref}
                onChange={(e) => setBrandPref(e.target.value)}
                className="w-full bg-gray-100/50 border-none p-4 rounded-2xl text-lg font-bold focus:ring-4 focus:ring-blue-500/20 transition outline-none appearance-none cursor-pointer"
              >
                <option value="any">Mix & Match</option>
                <option value="Titan Fitness">Titan (Budget)</option>
                <option value="REP Fitness">REP (Value)</option>
                <option value="Rogue Fitness">Rogue (Premium)</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block font-bold text-sm uppercase tracking-widest text-gray-500 mb-3">Training Objective</label>
            <select 
              value={liftStyle}
              onChange={(e) => setLiftStyle(e.target.value)}
              className="w-full bg-gray-100/50 border-none p-4 rounded-2xl text-lg font-bold focus:ring-4 focus:ring-blue-500/20 transition outline-none appearance-none cursor-pointer"
            >
              <option value="general">Hybrid Athlete (General)</option>
              <option value="powerlifting">Strength / Powerlifting</option>
              <option value="crossfit">Conditioning / CrossFit</option>
            </select>
          </div>

          <div className="mb-10">
            <label className="block font-bold text-sm uppercase tracking-widest text-gray-500 mb-4 text-center">Equipment Checklist</label>
            <div className="flex flex-wrap justify-center gap-3">
              {['racks', 'barbells', 'plates', 'benches', 'dumbbells', 'cardio', 'flooring'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCat(cat)}
                  className={`px-5 py-3 rounded-full border-2 font-bold capitalize transition-all duration-300 ${
                    selectedCats[cat] 
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-300' 
                      : 'border-gray-200 bg-white text-gray-400 hover:border-blue-300 hover:text-blue-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleBuild}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-5 rounded-2xl font-black text-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-200 uppercase italic tracking-tighter"
          >
            Engineer My Build
          </button>
        </div>

        {/* RESULTS SECTION */}
        {results && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            <div className="flex p-1 bg-gray-200/50 backdrop-blur-md rounded-2xl mb-8 max-w-md mx-auto">
              {['budget', 'value', 'premium'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`flex-1 py-3 rounded-xl font-bold capitalize transition-all ${
                    activeTier === tier 
                      ? 'bg-white text-blue-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white">
              <div className={`p-8 text-center text-white bg-gradient-to-br ${
                activeTier === 'premium' ? 'from-gray-800 to-black' : activeTier === 'value' ? 'from-blue-600 to-blue-900' : 'from-emerald-500 to-emerald-700'
              }`}>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] opacity-80 mb-2">{results[activeTier].name}</h2>
                <div className="text-5xl font-black tracking-tighter">${results[activeTier].total}</div>
              </div>
              
              <div className="p-8 space-y-8">
                {results[activeTier].items.map((item, index) => (
                  <ResultItem key={index} item={item} />
                ))}
              </div>
              
              <div className="p-8 pt-0">
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition shadow-xl uppercase italic">
                  Checkout All Equipment
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ResultItem({ item }) {
  return (
    <div className="group flex flex-col md:flex-row items-center bg-gray-50/50 rounded-3xl p-6 transition-all hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100">
      <div className="w-full md:w-32 h-32 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-inner mb-6 md:mb-0 md:mr-8 border border-gray-100">
        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
      </div>

      <div className="flex-grow text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
           <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-1 rounded-md uppercase tracking-wider w-fit mx-auto md:mx-0">
             {item.type}
           </span>
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.brand}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.name}</h3>
      </div>

      <div className="text-center md:text-right mt-6 md:mt-0 md:ml-8 min-w-[140px]">
        <div className="text-2xl font-black text-gray-900 mb-3 tracking-tighter">${item.price}</div>
        <a 
          href={item.affiliateLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-colors"
        >
          Details
        </a>
      </div>
    </div>
  );
}