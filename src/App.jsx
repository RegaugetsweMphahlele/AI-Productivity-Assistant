import React, { useState } from 'react';
import { 
  Loader2, Copy, Check, Sparkles, Send, Layout, Cpu, Globe, 
  ChevronLeft, ChevronRight, Mail, FileText, Calendar, Search, 
  MessageSquare, LayoutDashboard, ShieldCheck, Zap
} from 'lucide-react';

// --- IMAGERY ASSETS ---
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
  email: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400&auto=format&fit=crop",
  meeting: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
  planner: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=400&auto=format&fit=crop",
  research: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop",
};

const simulateAI = async () => {
  await new Promise(r => setTimeout(r, 1200));
  return "## STRATEGIC SYNTHESIS\n\nIntelligence processed successfully for the CAPACITI project.\n\n- Key Priority: Cross-functional alignment\n- Efficiency Gain: +22% projected\n- Next Milestone: Protocol Deployment\n\nVerified by Neural Link 2.5";
};

// --- COMPONENTS ---

const GlassContainer = ({ children, className = "" }) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl ${className}`}>
    {children}
  </div>
);

const SidebarItem = ({ active, icon: Icon, label, onClick, collapsed }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 relative group ${
      active ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl border border-cyan-500/30" />
    )}
    <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
    {!collapsed && <span className="text-sm font-bold tracking-tight">{label}</span>}
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

  const menuItems = [
    { id: 'home', label: 'Hub Dashboard', icon: LayoutDashboard },
    { id: 'email', label: 'Email Bot', icon: Mail },
    { id: 'meeting', label: 'Synthesizer', icon: FileText },
    { id: 'planner', label: 'Architect', icon: Calendar },
    { id: 'research', label: 'Analyst', icon: Search },
    { id: 'chat', label: 'Copilot', icon: MessageSquare },
  ];

  return (
    <div className="h-screen bg-[#020617] text-slate-100 font-sans flex overflow-hidden">
      
      {/* AURORA BACKGROUNDS */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
      </div>

      {/* COLLAPSIBLE SIDEBAR */}
      <aside className={`transition-all duration-500 ease-in-out flex flex-col border-r border-white/5 relative z-50 ${collapsed ? 'w-20' : 'w-72'} bg-black/20 backdrop-blur-3xl`}>
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-lg tracking-tighter uppercase">Capaciti<span className="text-cyan-400">.AI</span></span>
             </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto no-scrollbar">
           {menuItems.map(item => (
             <SidebarItem 
               key={item.id}
               id={item.id}
               icon={item.icon}
               label={item.label}
               active={tab === item.id}
               collapsed={collapsed}
               onClick={() => { setTab(item.id); setInput(''); setResult(''); }}
             />
           ))}
        </nav>

        <div className="p-6 border-t border-white/5">
           <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Neural Link Active</span>}
           </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        
        {/* TOP STATUS BAR */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-3">
             <ShieldCheck className="w-4 h-4 text-cyan-400" />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Module // {tab} // Protocol 2.5</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-400/10 rounded-full border border-cyan-400/20">System Optimized</div>
          </div>
        </header>

        {/* CONTENT AREA (Dynamic) */}
        <div className="flex-1 p-8 overflow-hidden">
          
          {tab === 'home' ? (
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-700">
               {/* Hero Section - Fixed Height */}
               <div className="relative rounded-[3rem] overflow-hidden group shadow-2xl h-full border border-white/10">
                  <img src={IMAGES.hero} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12">
                    <h1 className="text-6xl font-bold tracking-tighter mb-4 leading-[0.9]">Intelligence <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Accelerated.</span></h1>
                    <p className="text-sm text-slate-400 max-w-sm font-medium leading-relaxed">Synthesis tools for the 2025 CAPACITI Skills Programme.</p>
                  </div>
               </div>

               {/* Bento Grid Features */}
               <div className="grid grid-cols-2 gap-6 h-full">
                  {[
                    { id: 'email', title: 'Email Bot', img: IMAGES.email },
                    { id: 'meeting', title: 'Synthesizer', img: IMAGES.meeting },
                    { id: 'planner', title: 'Architect', img: IMAGES.planner },
                    { id: 'research', title: 'Analyst', img: IMAGES.research },
                  ].map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => setTab(item.id)}
                      className="relative rounded-[2.5rem] overflow-hidden cursor-pointer group hover:ring-2 ring-cyan-500/50 transition-all duration-500 border border-white/5 shadow-xl"
                    >
                      <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.title} />
                      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all" />
                      <div className="relative p-8 h-full flex items-end">
                        <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col lg:flex-row gap-8 animate-in slide-in-from-right-10 duration-500">
               {/* INPUT AREA */}
               <div className="flex-1 flex flex-col space-y-6 min-h-0">
                  <div className="shrink-0">
                    <div className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                       <Sparkles className="w-3 h-3" /> Execute Protocol
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter capitalize">{tab} Module</h2>
                  </div>

                  <GlassContainer className="flex-1 rounded-[2.5rem] flex flex-col overflow-hidden">
                    <textarea 
                      className="flex-1 w-full p-8 bg-transparent border-none text-lg font-medium focus:ring-0 outline-none placeholder:text-slate-600 resize-none no-scrollbar"
                      placeholder={`Provide primary context for the ${tab} algorithm...`}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="p-6 bg-white/5 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Link Synchronized</span>
                      <button 
                        onClick={runAI}
                        disabled={loading}
                        className="px-10 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3 shadow-lg shadow-white/10"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Generate Intelligence
                      </button>
                    </div>
                  </GlassContainer>
               </div>

               {/* OUTPUT AREA */}
               <div className={`flex-1 flex flex-col space-y-4 min-h-0 transition-opacity duration-1000 ${result || loading ? 'opacity-100' : 'opacity-20'}`}>
                  <div className="flex items-center justify-between px-4 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Intelligence Synthesis</span>
                    {result && (
                      <button onClick={() => navigator.clipboard.writeText(result)} className="text-[10px] font-black uppercase tracking-widest hover:text-cyan-400 flex items-center gap-2 transition-colors">
                        <Copy size={12} /> Copy Output
                      </button>
                    )}
                  </div>

                  <GlassContainer className="flex-1 rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col">
                    {loading && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-10">
                        <div className="text-center space-y-4 animate-pulse">
                          <Cpu className="w-12 h-12 text-cyan-400 mx-auto" />
                          <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Resolving Data Pathways...</div>
                        </div>
                      </div>
                    )}
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                       <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-slate-300 italic">
                        {result || "// Waiting for neural input command..."}
                       </pre>
                    </div>
                  </GlassContainer>
                  
                  {result && (
                    <div className="p-4 rounded-2xl bg-cyan-400/5 border border-cyan-400/20 text-[10px] font-bold text-cyan-400/60 uppercase tracking-widest text-center shrink-0">
                        Engine: GPT-4-OMNI // Mode: Precision Logic // CAPACITI Verified
                    </div>
                  )}
               </div>
            </div>
          )}
        </div>

        {/* FIXED FOOTER */}
        <footer className="h-12 border-t border-white/5 flex items-center justify-between px-10 text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] shrink-0">
           <div className="flex items-center gap-2">
             <Globe size={12} /> Global AI Skills Accelerator // 2025
           </div>
           <div>Secure Intelligence Protocol</div>
        </footer>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}