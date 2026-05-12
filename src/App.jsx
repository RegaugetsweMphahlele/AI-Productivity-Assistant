import React, { useState } from 'react';
import { 
  Loader2, Copy, Check, Sparkles, Send, Layout, Cpu, Globe, 
  ChevronLeft, ChevronRight, Mail, FileText, Calendar, Search, 
  MessageSquare, LayoutDashboard, ShieldCheck, Zap, Activity
} from 'lucide-react';

// --- HIGH-ENERGY VIBRANT IMAGERY ---
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1635776062127-d365bbbb278a?q=80&w=1200&auto=format&fit=crop", // Vibrant Mesh
  email: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", // Violet Flow
  meeting: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop", // Multi-color Abstract
  planner: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&auto=format&fit=crop", // Cyan Waves
  research: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop", // Neon Geometry
};

const simulateAI = async () => {
  await new Promise(r => setTimeout(r, 1500));
  return "## INTELLIGENCE SYNTHESIS COMPLETE\n\nStrategic analysis for CAPACITI AI Accelerator 2025:\n\n- Primary Goal: Neural Workflow Integration\n- Projected Efficiency: +34% operational gain\n- Risk Mitigation: Protocol 2.5 Active\n\n[Output Verified by Neural Link]";
};

// --- MODERN UI COMPONENTS ---

const SidebarItem = ({ active, icon: Icon, label, onClick, collapsed }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 relative group ${
      active ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {active && (
      <div className="absolute inset-0 bg-indigo-600 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-400/30" />
    )}
    <Icon className={`w-5 h-5 shrink-0 relative z-10 ${active ? 'text-white' : 'group-hover:text-indigo-400'}`} />
    {!collapsed && <span className="text-xs font-black uppercase tracking-widest relative z-10">{label}</span>}
  </button>
);

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');

  const runAI = async () => {
    if (!input) return;
    setLoading(true);
    const res = await simulateAI();
    setResult(res);
    setLoading(false);
  };

  const tools = [
    { id: 'email', title: 'Email Architect', img: IMAGES.email, desc: 'Professional Synthesis' },
    { id: 'meeting', title: 'Synthesizer', img: IMAGES.meeting, desc: 'Executive Briefings' },
    { id: 'planner', title: 'Priority Bot', img: IMAGES.planner, desc: 'Strategic Scheduling' },
    { id: 'research', title: 'Data Analyst', img: IMAGES.research, desc: 'Deep-dive Intelligence' },
  ];

  return (
    <div className="h-screen bg-[#050505] text-white font-sans flex overflow-hidden selection:bg-indigo-500">
      
      {/* VIBRANT GLOW BACKDROPS */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(79,70,229,0.15)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(6,182,212,0.15)_0%,_transparent_50%)]" />
      </div>

      {/* COLLAPSIBLE SIDEBAR */}
      <aside className={`transition-all duration-500 ease-in-out flex flex-col border-r border-white/10 relative z-50 ${collapsed ? 'w-20' : 'w-72'} bg-black/40 backdrop-blur-3xl`}>
        <div className="p-8 flex items-center justify-between">
          {!collapsed && (
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-xl tracking-tighter uppercase italic">Capaciti<span className="text-indigo-500">.AI</span></span>
             </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-500">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto no-scrollbar">
           <SidebarItem active={tab === 'home'} icon={LayoutDashboard} label="Hub Overview" collapsed={collapsed} onClick={() => {setTab('home'); setResult('');}} />
           <div className={`pt-6 pb-2 px-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ${collapsed ? 'hidden' : 'block'}`}>Protocols</div>
           <SidebarItem active={tab === 'email'} icon={Mail} label="Email Bot" collapsed={collapsed} onClick={() => {setTab('email'); setInput(''); setResult('');}} />
           <SidebarItem active={tab === 'meeting'} icon={FileText} label="Synthesizer" collapsed={collapsed} onClick={() => {setTab('meeting'); setInput(''); setResult('');}} />
           <SidebarItem active={tab === 'planner'} icon={Calendar} label="Architect" collapsed={collapsed} onClick={() => {setTab('planner'); setInput(''); setResult('');}} />
           <SidebarItem active={tab === 'research'} icon={Search} label="Analyst" collapsed={collapsed} onClick={() => {setTab('research'); setInput(''); setResult('');}} />
        </nav>

        <div className="p-8 border-t border-white/5">
           <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">AI Core Online</span>}
           </div>
        </div>
      </aside>

      {/* VIEWPORT CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        
        {/* HEADER BAR */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 shrink-0">
          <div className="flex items-center gap-3">
             <ShieldCheck className="w-4 h-4 text-indigo-500" />
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Neural Link // Mode: {tab.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-indigo-500/10 rounded-full border border-indigo-500/20 flex items-center justify-center">
                <Sparkles size={16} className="text-indigo-400" />
             </div>
          </div>
        </header>

        {/* DYNAMIC WORKSPACE */}
        <div className="flex-1 p-10 overflow-hidden">
          
          {tab === 'home' ? (
            <div className="h-full flex flex-col space-y-8 animate-in fade-in zoom-in duration-700">
               {/* Hero Banner */}
               <div className="relative h-2/5 rounded-[3rem] overflow-hidden group border border-white/10 shadow-2xl shrink-0">
                  <img src={IMAGES.hero} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-10 left-12">
                    <h1 className="text-7xl font-black tracking-tighter leading-none mb-2 italic">Intelligence <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Perfected.</span></h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">CAPACITI Workplace Synthesis Accelerator // 2025</p>
                  </div>
               </div>

               {/* Tool Hub (Vibrant Image Cards) */}
               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-0">
                  {tools.map(tool => (
                    <button 
                      key={tool.id} 
                      onClick={() => setTab(tool.id)}
                      className="relative rounded-[2.5rem] overflow-hidden group border border-white/10 transition-all hover:border-indigo-500 shadow-xl"
                    >
                      <img src={tool.img} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" alt={tool.title} />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
                      <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-1">{tool.title}</h3>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{tool.desc}</p>
                      </div>
                    </button>
                  ))}
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col lg:flex-row gap-8 animate-in slide-in-from-right-10 duration-500">
               {/* INPUT SECTION */}
               <div className="flex-1 flex flex-col space-y-6">
                  <div className="shrink-0 space-y-1">
                    <div className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">Input Protocol Active</div>
                    <h2 className="text-5xl font-black tracking-tighter italic uppercase">{tab} Module</h2>
                  </div>

                  <div className="flex-1 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl backdrop-blur-xl">
                    <textarea 
                      className="flex-1 w-full p-10 bg-transparent border-none text-xl font-medium focus:ring-0 outline-none placeholder:text-slate-700 resize-none no-scrollbar"
                      placeholder={`Paste data for ${tab} analysis...`}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="p-8 bg-black/40 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Ready for neural synthesis</span>
                      <button 
                        onClick={runAI}
                        disabled={loading}
                        className="px-12 py-5 bg-indigo-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3 shadow-xl shadow-indigo-500/20"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap size={14} />}
                        Execute Algorithm
                      </button>
                    </div>
                  </div>
               </div>

               {/* OUTPUT SECTION */}
               <div className={`flex-1 flex flex-col space-y-4 transition-opacity duration-1000 ${result || loading ? 'opacity-100' : 'opacity-20'}`}>
                  <div className="flex items-center justify-between px-6 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Synthesized Intel</span>
                    {result && (
                      <button onClick={() => navigator.clipboard.writeText(result)} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors flex items-center gap-2">
                        <Copy size={12} /> Copy Output
                      </button>
                    )}
                  </div>

                  <div className="flex-1 bg-indigo-600/5 border border-indigo-500/20 rounded-[3.5rem] p-12 relative overflow-hidden flex flex-col shadow-2xl backdrop-blur-2xl">
                    {loading && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-10">
                        <div className="text-center space-y-4 animate-pulse">
                          <Cpu className="w-12 h-12 text-indigo-400 mx-auto" />
                          <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Processing Neural Pathways...</div>
                        </div>
                      </div>
                    )}
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                       <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-indigo-100 italic opacity-90">
                        {result || "// Waiting for neural data input command..."}
                       </pre>
                    </div>
                  </div>
                  
                  {result && (
                    <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-[0.4em] text-center shrink-0 shadow-lg">
                        Verified Output // High Fidelity Mode // CAPACITI Sync
                    </div>
                  )}
               </div>
            </div>
          )}
        </div>

        {/* STATUS FOOTER */}
        <footer className="h-14 border-t border-white/5 flex items-center justify-between px-12 text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] shrink-0">
           <div className="flex items-center gap-3 italic">
             <Globe size={12} className="text-indigo-500" /> Neural Network Ver. 2025.04
           </div>
           <div>Skills Accelerator Assistant // Secure Mode</div>
        </footer>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}