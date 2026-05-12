import React, { useState } from 'react';
import { 
  LayoutDashboard, Mail, FileText, Calendar, Search, MessageSquare, 
  Copy, Check, Loader2, Send, ChevronLeft, ChevronRight, 
  ShieldCheck, Zap, Info, Plus, Trash2, Clock
} from 'lucide-react';

// --- MOCK AI ENGINE ---
const simulateAI = async (type, data) => {
  await new Promise(r => setTimeout(r, 1500));
  const responses = {
    email: `Subject: Strategic Follow-up\n\nDear ${data.recipient || 'Team'},\n\nRegarding ${data.subject || 'our project'}, I wanted to align on our current trajectory. Given the ${data.tone || 'Formal'} requirements, I propose we move forward with the plan discussed in ${data.context || 'our last brief'}.\n\nBest regards,\nAI Productivity Assistant`,
    meeting: `## 📝 MEETING SUMMARY\nExecutive overview of the discussion notes provided.\n\n## ✅ KEY DECISIONS\n- Strategic roadmap for Q4 approved.\n- Resource allocation shifted to technical debt.\n\n## 🏃 ACTION ITEMS\n- [ ] Finalize Docs (Sarah | Oct 20)\n- [ ] Security Audit (Tech Team | Oct 22)`,
    planner: `## 📅 STRATEGIC SCHEDULE\n09:00 - 11:00 | DEEP WORK: High Priority Synthesis\n11:30 - 13:00 | OPERATIONS: Team Coordination\n\n## 💡 OPTIMIZATION TIP\nUse the Eisenhower Matrix to delegate low-urgency tasks and reclaim 2 hours of focus time today.`,
    research: `## 🔍 CORE ANALYSIS\nInsights suggest a 35% efficiency increase when implementing the requested protocols.\n\n## 🚀 RECOMMENDATIONS\n- Standardize prompt libraries across departments.\n- Implement bi-weekly synthesis reviews.`,
    chat: "Protocol active. I am your neural workplace assistant. How can I facilitate your objectives today?"
  };
  return responses[type] || "Analysis complete.";
};

// --- SHARED UI COMPONENTS ---

const ActionButton = ({ onClick, icon: Icon, children, loading }) => (
  <button 
    onClick={onClick} 
    disabled={loading} 
    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 shrink-0"
  >
    {loading ? <Loader2 size={18} className="animate-spin" /> : <Icon size={18} />}
    {children}
  </button>
);

const OutputSection = ({ title, content, prompt, loading }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex-1 flex flex-col min-h-0 space-y-4 transition-opacity duration-700 ${content || loading ? 'opacity-100' : 'opacity-20'}`}>
      <div className="flex items-center justify-between px-2 shrink-0">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Synthesized Intel</span>
        {content && (
          <button onClick={copy} className="text-[10px] font-black uppercase text-blue-600 flex items-center gap-1.5 hover:text-blue-800">
            {copied ? <Check size={12}/> : <Copy size={12}/>} {copied ? 'Copied' : 'Copy Output'}
          </button>
        )}
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-8 overflow-hidden shadow-sm flex flex-col relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10 animate-pulse">
            <div className="text-center space-y-2">
              <Zap className="w-8 h-8 text-blue-600 mx-auto animate-bounce" />
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Processing...</div>
            </div>
          </div>
        )}
        <textarea 
          className="flex-1 w-full bg-transparent border-none text-slate-700 text-lg font-medium leading-relaxed outline-none no-scrollbar resize-none"
          value={content}
          readOnly
          placeholder="// Intelligence output will appear here..."
        />
      </div>

      <div className="border border-slate-100 rounded-2xl overflow-hidden shrink-0 bg-slate-50">
        <button onClick={() => setShowPrompt(!showPrompt)} className="w-full flex items-center justify-between px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Prompt Engineering Data {showPrompt ? <ChevronLeft className="rotate-90" size={12}/> : <ChevronLeft className="-rotate-90" size={12}/>}
        </button>
        {showPrompt && <div className="p-5 text-[11px] font-mono text-slate-500 bg-white border-t border-slate-100 leading-relaxed whitespace-pre-wrap">{prompt}</div>}
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function App() {
  const [tab, setTab] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');
  const [emailForm, setEmailForm] = useState({ subject: '', recipient: 'Manager', tone: 'Formal', context: '' });

  const activePrompt = {
    email: `SYSTEM: Executive Communications specialist. DATA: To ${emailForm.recipient} regarding ${emailForm.subject}. TONE: ${emailForm.tone}. CONTEXT: ${emailForm.context}.`,
    meeting: `SYSTEM: Meeting synthesis engine. TASK: Extract summary, decisions, action items from raw notes.`,
    planner: `SYSTEM: Strategic architect. LOGIC: Eisenhower matrix scheduling.`,
    research: `SYSTEM: Senior Analyst. GOAL: Summary, insights, and recommendations for provided topic.`,
    chat: `SYSTEM: Professional AI Workplace assistant.`
  };

  const handleGenerate = async () => {
    setLoading(true);
    const data = tab === 'email' ? emailForm : input;
    const res = await simulateAI(tab, data);
    setResult(res);
    setLoading(false);
  };

  const menuItems = [
    { id: 'home', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'email', icon: Mail, label: 'Email Bot' },
    { id: 'meeting', icon: FileText, label: 'Synthesizer' },
    { id: 'planner', icon: Calendar, label: 'Architect' },
    { id: 'research', icon: Search, label: 'Analyst' },
    { id: 'chat', icon: MessageSquare, label: 'Assistant' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* SIDEBAR - Collapsible Navy Style */}
      <aside className={`transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-slate-900 text-white flex flex-col shrink-0`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"><Zap size={18} fill="white" /></div>
              <span className="font-black text-xl tracking-tighter uppercase italic">Capaciti<span className="text-blue-400">.AI</span></span>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => {setTab(item.id); setResult(''); setInput('');}}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${tab === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN WORKSPACE - No Global Scroll */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 h-full relative">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-3 italic">
            <ShieldCheck size={16} className="text-blue-600" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{tab} protocol active</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-black">RM</div>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-hidden">
          {tab === 'home' ? (
            <div className="h-full flex flex-col justify-center max-w-2xl mx-auto space-y-6 text-center animate-in fade-in zoom-in duration-700">
              <h1 className="text-6xl font-black tracking-tighter italic text-slate-900">Intelligence <span className="text-blue-600">Perfected.</span></h1>
              <p className="text-slate-400 font-medium leading-relaxed">The single integrated AI workstation for the CAPACITI Skills Accelerator. Select a neural module from the sidebar to begin synthesis.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setTab('email')} className="px-8 py-3 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Quick Start</button>
                <button className="px-8 py-3 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest">Documentation</button>
              </div>
            </div>
          ) : (
            <div className="h-full flex gap-10 animate-in slide-in-from-right-10 duration-500">
              
              {/* INPUT AREA */}
              <div className="flex-1 flex flex-col space-y-6 min-h-0">
                <div className="shrink-0">
                  <h2 className="text-4xl font-black tracking-tighter italic uppercase">{tab} module</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Configure parameters for synthesis</p>
                </div>

                <div className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col space-y-6 shadow-sm overflow-hidden">
                  <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
                    {tab === 'email' && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Subject Protocol</label>
                          <input className="w-full px-5 py-3 bg-slate-50 rounded-xl outline-none border border-slate-100 focus:ring-1 focus:ring-blue-600" placeholder="e.g. Q4 Strategy Review" onChange={e => setEmailForm({...emailForm, subject: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recipient Profile</label>
                            <select className="w-full px-5 py-3 bg-slate-50 rounded-xl outline-none border border-slate-100" onChange={e => setEmailForm({...emailForm, recipient: e.target.value})}><option>Manager</option><option>Client</option><option>Team</option></select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tone Synthesis</label>
                            <select className="w-full px-5 py-3 bg-slate-50 rounded-xl outline-none border border-slate-100" onChange={e => setEmailForm({...emailForm, tone: e.target.value})}><option>Formal</option><option>Friendly</option><option>Persuasive</option></select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Contextual Data</label>
                          <textarea className="w-full h-32 px-5 py-3 bg-slate-50 rounded-xl outline-none border border-slate-100 resize-none" placeholder="Provide context..." onChange={e => setEmailForm({...emailForm, context: e.target.value})} />
                        </div>
                      </div>
                    )}
                    {(tab === 'meeting' || tab === 'research' || tab === 'chat') && (
                      <textarea className="w-full h-full bg-slate-50 rounded-2xl p-6 text-sm font-medium outline-none border border-slate-100 resize-none" placeholder={`Provide ${tab} context...`} onChange={e => setInput(e.target.value)} />
                    )}
                    {tab === 'planner' && (
                      <div className="space-y-6">
                        <textarea className="w-full h-40 bg-slate-50 rounded-2xl p-6 text-sm font-medium outline-none border border-slate-100 resize-none" placeholder="List tasks..." onChange={e => setInput(e.target.value)} />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="number" className="px-5 py-3 bg-slate-50 rounded-xl outline-none border border-slate-100" placeholder="Available Hours" />
                          <select className="px-5 py-3 bg-slate-50 rounded-xl outline-none border border-slate-100"><option>Moderate Urgency</option><option>High Urgency</option></select>
                        </div>
                      </div>
                    )}
                  </div>
                  <ActionButton onClick={handleGenerate} loading={loading} icon={Zap}>Execute Generation</ActionButton>
                </div>
              </div>

              {/* OUTPUT AREA */}
              <OutputSection title="Generated Intelligence" content={result} prompt={activePrompt[tab]} loading={loading} />
            </div>
          )}
        </div>

        <footer className="h-12 border-t border-slate-200 bg-white flex items-center px-10 justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0">
          <div className="flex items-center gap-2 italic">
            <Info size={12} />
            Responsible AI: Review intel before deployment.
          </div>
          <span>© 2025 CAPACITI SYSTEMS</span>
        </footer>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}