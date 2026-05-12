import React, { useState } from 'react';
import { Loader2, Copy, Check, Sparkles, Send, Command, Layout, Cpu, Globe } from 'lucide-react';

// --- IMAGERY ASSETS (Modern Abstract Renders) ---
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
  email: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400&auto=format&fit=crop",
  meeting: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
  planner: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=400&auto=format&fit=crop",
  research: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop",
};

const simulateAI = async () => {
  await new Promise(r => setTimeout(r, 1500));
  return "## SYNTHESIS COMPLETE\n\nBased on your objectives, I have generated a high-fidelity strategy. The core focus is on cross-functional alignment and resource optimization for the CAPACITI project.\n\n- Milestone 1: Data Integration\n- Milestone 2: Stakeholder Review\n- Milestone 3: Deployment Phase";
};

// --- COMPONENTS ---

const GlassCard = ({ children, className = "" }) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl ${className}`}>
    {children}
  </div>
);

const NavItem = ({ active, label, onClick, id }) => (
  <button 
    onClick={onClick}
    className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-500 ${
      active ? 'text-white' : 'text-slate-400 hover:text-slate-200'
    }`}
  >
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full -z-10 blur-sm opacity-50 animate-pulse" />
    )}
    {active && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full -z-10" />}
    {label}
  </button>
);

// --- MAIN APPLICATION ---

export default function App() {
  const [tab, setTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');

  const runAI = async () => {
    setLoading(true);
    const res = await simulateAI();
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
      </div>

      {/* HEADER / NAV */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <GlassCard className="px-3 py-2 flex items-center gap-1 bg-black/40">
          <div className="flex items-center gap-2 px-4 mr-4 border-r border-white/10">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest italic">Capaciti.AI</span>
          </div>
          <NavItem id="home" label="Hub" active={tab === 'home'} onClick={() => setTab('home')} />
          <NavItem id="email" label="Email" active={tab === 'email'} onClick={() => setTab('email')} />
          <NavItem id="meeting" label="Meeting" active={tab === 'meeting'} onClick={() => setTab('meeting')} />
          <NavItem id="planner" label="Planner" active={tab === 'planner'} onClick={() => setTab('planner')} />
          <NavItem id="research" label="Research" active={tab === 'research'} onClick={() => setTab('research')} />
        </GlassCard>
      </nav>

      {/* MAIN CONTENT */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {tab === 'home' ? (
          <div className="space-y-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {/* HERO SECTION */}
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden group">
              <img src={IMAGES.hero} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" alt="Hero" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <h1 className="text-7xl font-bold tracking-tighter mb-4 leading-none">
                  Intelligence <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Unbound.</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-xl font-medium">
                  Experience the next generation of workplace synthesis for the CAPACITI Skills Accelerator.
                </p>
              </div>
            </div>

            {/* FEATURE FLOW (No Blocks) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { id: 'email', title: 'Smart Email Bot', img: IMAGES.email, desc: 'Sophisticated correspondence synthesis.' },
                { id: 'meeting', title: 'Meeting Synthesizer', img: IMAGES.meeting, desc: 'Abstract notes to executive clarity.' },
                { id: 'planner', title: 'Workplace Architect', img: IMAGES.planner, desc: 'Strategic scheduling via AI logic.' },
                { id: 'research', title: 'Data Analyst', img: IMAGES.research, desc: 'Deep dive market research insights.' }
              ].map(item => (
                <div 
                  key={item.id} 
                  onClick={() => setTab(item.id)}
                  className="relative h-64 rounded-[2.5rem] overflow-hidden cursor-pointer group hover:ring-2 ring-cyan-500/50 transition-all duration-500"
                >
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                  <div className="relative p-10 h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2 transition-transform duration-500 group-hover:translate-x-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-10 duration-700">
            
            {/* INPUT PANEL */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="text-cyan-400 text-xs font-black uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> System Activation
                </div>
                <h2 className="text-5xl font-bold tracking-tighter capitalize">{tab} Module</h2>
              </div>

              <GlassCard className="p-2 overflow-hidden">
                <textarea 
                  className="w-full h-80 p-8 bg-transparent border-none text-xl font-medium focus:ring-0 outline-none placeholder:text-slate-600 resize-none"
                  placeholder={`Provide context for the ${tab} algorithm...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="p-4 bg-white/5 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Input Ready</span>
                  <button 
                    onClick={runAI}
                    disabled={loading}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-cyan-400 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Execute
                  </button>
                </div>
              </GlassCard>
            </div>

            {/* OUTPUT PANEL */}
            <div className={`space-y-6 transition-all duration-1000 ${result ? 'opacity-100' : 'opacity-20'}`}>
              <div className="flex items-center justify-between px-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Synthesized Intelligence</span>
                {result && (
                  <button onClick={() => navigator.clipboard.writeText(result)} className="text-xs hover:text-cyan-400 flex items-center gap-2 transition-colors">
                    <Copy className="w-3 h-3" /> Copy Output
                  </button>
                )}
              </div>

              <GlassCard className="p-10 min-h-[450px] relative overflow-hidden">
                {loading && (
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-10">
                    <div className="text-center space-y-4">
                      <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto" />
                      <div className="text-xs font-black uppercase tracking-widest text-cyan-400">Processing Neural Pathways...</div>
                    </div>
                  </div>
                )}
                <div className="prose prose-invert max-w-none">
                   <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-slate-300 italic">
                    {result || "// System idling. Waiting for input command..."}
                   </pre>
                </div>
              </GlassCard>

              {result && (
                <div className="px-6 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400/80 leading-relaxed uppercase tracking-wider">
                  Algorithm: GPT-4-Synthesis-Link // Mode: High Precision // Context: ${tab}_Protocol
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
        <div className="flex items-center gap-4">
          <Globe className="w-3 h-3" /> 
          Verifying Protocol 2025.04
        </div>
        <div className="text-right">
          Capaciti AI Assistant // Skills Accelerator
        </div>
      </footer>
    </div>
  );
}