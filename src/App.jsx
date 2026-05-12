import React, { useState } from 'react';
import { 
  LayoutDashboard, Mail, FileText, Calendar, Search, MessageSquare, 
  Copy, Check, Loader2, Send, ChevronRight, AlertCircle, 
  Plus, Trash2, Command, ArrowRight, ArrowUpRight
} from 'lucide-react';

// --- STARK MOCK ENGINE ---
const simulateAI = async (type) => {
  await new Promise(r => setTimeout(r, 1000));
  const responses = {
    email: "SUBJECT: STRATEGIC UPDATE\n\nMESSAGE: We have finalized the roadmap for the upcoming quarter. The core focus remains on AI integration and process optimization.\n\nNEXT STEPS: Review attached documents and confirm by EOD.\n\nSENT VIA CAPACITI AI",
    meeting: "NOTES SYNTHESIS\n\nDECISIONS:\n- Workflow automation approved.\n- Deadline set for Oct 24.\n\nACTION ITEMS:\n- Design System Audit [Team A]\n- Backend Integration [Team B]",
    planner: "08:00 — ARCHITECTURE REVIEW\n11:00 — OPERATIONAL SYNC\n14:00 — DEEP WORK SESSION\n\nPRIORITY: HIGH IMPACT TASKS ONLY.",
    research: "CORE INSIGHTS:\n1. Automation efficiency is up 34%.\n2. Cognitive load reduced via structured AI prompts.\n\nRECOMMENDATION: Scale high-context LLM usage.",
    chat: "SYSTEM ACTIVE. HOW CAN I ASSIST YOUR WORKFLOW?"
  };
  return responses[type] || "COMPLETE.";
};

// --- MODERNIST UI COMPONENTS ---

const NavButton = ({ active, icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 transition-all duration-200 group border-b border-white/10 ${
      active ? 'bg-white text-black' : 'bg-black text-white hover:bg-zinc-900'
    }`}
  >
    <div className="flex items-center gap-4">
      <Icon className={`w-5 h-5 ${active ? 'text-black' : 'text-white'}`} />
      <span className="text-xs font-bold uppercase tracking-[0.2em]">{label}</span>
    </div>
    {active ? <ArrowRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white" />}
  </button>
);

const StarkButton = ({ onClick, loading, children }) => (
  <button 
    onClick={onClick}
    disabled={loading}
    className="group flex items-center justify-center gap-3 px-8 py-5 bg-black text-white hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
  >
    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Command className="w-5 h-5" />}
    <span className="text-sm font-black uppercase tracking-widest">{children}</span>
  </button>
);

// --- MAIN APPLICATION ---

export default function App() {
  const [tab, setTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const triggerAI = async () => {
    if (!input && tab !== 'home') return;
    setLoading(true);
    const res = await simulateAI(tab);
    setResult(res);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-white text-black font-sans selection:bg-blue-600 selection:text-white">
      
      {/* SIDEBAR - SOLID BLACK */}
      <aside className="w-80 bg-black flex flex-col border-r border-black shrink-0 overflow-hidden">
        <div className="p-10 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-none flex items-center justify-center text-white">
              <Command className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">CAPACITI</span>
          </div>
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">AI Skills Accelerator</div>
        </div>

        <nav className="flex-1">
          <NavButton active={tab === 'home'} icon={LayoutDashboard} label="Hub" onClick={() => {setTab('home'); setResult('');}} />
          <NavButton active={tab === 'email'} icon={Mail} label="Email Bot" onClick={() => {setTab('email'); setResult('');}} />
          <NavButton active={tab === 'meeting'} icon={FileText} label="Synthesizer" onClick={() => {setTab('meeting'); setResult('');}} />
          <NavButton active={tab === 'planner'} icon={Calendar} label="Architect" onClick={() => {setTab('planner'); setResult('');}} />
          <NavButton active={tab === 'research'} icon={Search} label="Analyst" onClick={() => {setTab('research'); setResult('');}} />
          <NavButton active={tab === 'chat'} icon={MessageSquare} label="Assistant" onClick={() => {setTab('chat'); setResult('');}} />
        </nav>

        <div className="p-10 border-t border-white/10">
          <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Current Session</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Neural Link Active</span>
          </div>
        </div>
      </aside>

      {/* WORKSPACE - STARK WHITE */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* Header Bar */}
        <header className="h-24 border-b border-black flex items-center justify-between px-12 shrink-0">
          <div className="text-xs font-black uppercase tracking-[0.5em] text-black/30">
            {tab === 'home' ? 'Global Overview' : `Module // ${tab}`}
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 border border-black text-[10px] font-black uppercase tracking-widest">Protocol 2.5</div>
             <div className="px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest">Secure</div>
          </div>
        </header>

        {/* Content - Pure Black and White */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-12 py-20">
            
            {tab === 'home' ? (
              <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <section className="space-y-6">
                  <h1 className="text-8xl font-black tracking-tighter leading-[0.8] text-black">
                    AI <br/> WORKPLACE <br/> <span className="text-blue-600">PRODUCTIVITY.</span>
                  </h1>
                  <p className="text-xl font-medium max-w-xl leading-relaxed text-black/60">
                    High-precision intelligence tools for modern workplace synthesis. Select a protocol from the sidebar to begin.
                  </p>
                </section>

                <div className="grid grid-cols-2 gap-px bg-black border border-black">
                  {[
                    { id: 'email', title: 'Email Bot', desc: 'Professional correspondence engineering.' },
                    { id: 'meeting', title: 'Synthesizer', desc: 'Raw notes to executive summaries.' },
                    { id: 'planner', title: 'Architect', desc: 'Strategic scheduling and priorities.' },
                    { id: 'research', title: 'Analyst', desc: 'Deep data summarization.' }
                  ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className="bg-white p-12 text-left hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                    >
                      <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{item.title}</h3>
                      <p className="text-sm font-bold opacity-60 group-hover:opacity-100">{item.desc}</p>
                      <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        Launch <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                
                {/* Inputs */}
                <div className="space-y-10">
                  <div className="space-y-2 border-l-4 border-black pl-6">
                    <h2 className="text-4xl font-black tracking-tighter uppercase">{tab} Protocol</h2>
                    <p className="text-sm font-bold text-black/40 uppercase tracking-widest">Data Input Required</p>
                  </div>
                  
                  <textarea 
                    className="w-full h-80 p-8 border-2 border-black rounded-none text-lg font-bold focus:ring-0 focus:border-blue-600 outline-none transition-all placeholder:text-black/10"
                    placeholder={`Paste ${tab} data here...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  <StarkButton onClick={triggerAI} loading={loading}>
                    Process Data
                  </StarkButton>
                </div>

                {/* Outputs */}
                <div className={`space-y-10 transition-all duration-500 ${result ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4'}`}>
                  <div className="flex items-center justify-between border-b-2 border-black pb-4">
                    <span className="text-xs font-black uppercase tracking-[0.3em]">Synthesized Output</span>
                    {result && (
                      <button onClick={handleCopy} className="text-xs font-black uppercase flex items-center gap-2 hover:text-blue-600 transition-colors">
                        {copied ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Success' : 'Copy'}
                      </button>
                    )}
                  </div>

                  <div className="bg-black text-white p-10 min-h-[400px]">
                    {loading ? (
                      <div className="space-y-4">
                        <div className="h-6 w-full bg-white/20 animate-pulse" />
                        <div className="h-6 w-2/3 bg-white/20 animate-pulse" />
                        <div className="h-6 w-3/4 bg-white/20 animate-pulse" />
                      </div>
                    ) : (
                      <pre className="text-xl font-bold leading-relaxed whitespace-pre-wrap font-sans italic">
                        {result || '// Waiting for system execution...'}
                      </pre>
                    )}
                  </div>

                  {result && (
                    <div className="border border-black p-6">
                      <div className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-30">Prompt Engineering Metadata</div>
                      <div className="text-[11px] font-bold font-mono leading-relaxed uppercase">
                        ROLE: EXECUTIVE_SYNTHESIZER <br/>
                        OBJECTIVE: HIGH_PRECISION_ANALYSIS <br/>
                        CONTEXT: {input.substring(0, 20)}...
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Footer Bar */}
        <footer className="h-16 border-t border-black flex items-center justify-between px-12 shrink-0 bg-white">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">AI verification required before implementation.</span>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em]">©2025 CAPACITI SYSTEMS</div>
        </footer>
      </main>
    </div>
  );
}