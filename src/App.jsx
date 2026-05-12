import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Mail, FileText, Calendar, Search, MessageSquare, 
  Copy, Check, Loader2, Send, ChevronLeft, ChevronRight, 
  ShieldCheck, Zap, Info, Plus, Trash2, Clock, User
} from 'lucide-react';

// --- SEAMLESS AI ENGINE (Now reflects your actual input) ---
const simulateAI = async (type, data) => {
  await new Promise(r => setTimeout(r, 1200));
  
  if (type === 'email') {
    return `Subject: Regarding ${data.subject || 'Our Strategic Goals'}\n\nDear ${data.recipient},\n\nI am writing to you regarding ${data.subject || 'our recent initiative'}. ${data.context || 'Based on our current roadmap, we are looking to optimize our performance.'}\n\nGiven our ${data.tone} tone for this project, I suggest we move forward immediately. \n\nBest regards,\nProfessional AI Assistant`;
  }
  
  if (type === 'meeting') {
    return `## 📝 MEETING SUMMARY\nAnalysis of raw notes: "${data.substring(0, 50)}..."\n\n## ✅ KEY DECISIONS\n- Strategic alignment on provided data points.\n- Project timeline confirmed.\n\n## 🏃 ACTION ITEMS\n- [ ] Process remaining context (Owner: Team | Due: Oct 25)\n- [ ] Review implementation (Owner: Lead | Due: Oct 27)\n\n## 🗓️ NEXT STEPS\n- Final synthesis review on Friday.`;
  }

  if (type === 'planner') {
    return `## 📅 STRATEGIC ARCHITECTURE (EISENHOWER MATRIX)\n\n### 🔴 HIGH URGENCY / IMPORTANT\n- Primary Task: ${data.substring(0, 30)}...\n\n### 🟡 MEDIUM URGENCY\n- Coordination and follow-ups.\n\n## 💡 TIME OPTIMIZATION TIP\nBatch your email and administrative work to the final hour of your day to protect your deep-work windows.`;
  }

  if (type === 'research') {
    return `## 🔍 CORE ANALYSIS\nTOPIC: ${data || 'General Intelligence'}\n\n### 💡 KEY INSIGHTS\n1. Market trends show rapid growth in the sector.\n2. Efficiency gains of 40% observed in current data.\n3. Automation is the primary driver of success.\n\n### 🚀 RECOMMENDATIONS\n- Prioritize high-impact technical debt.\n- Implement bi-weekly research reviews.`;
  }

  return "Protocol Executed.";
};

// --- MAIN APPLICATION ---

export default function App() {
  const [tab, setTab] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  
  // Tool Inputs
  const [emailForm, setEmailForm] = useState({ subject: '', recipient: 'Manager', tone: 'Formal', context: '' });
  const [textInput, setTextInput] = useState('');
  
  // Chat History Logic
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hello! I am your CAPACITI AI Assistant. How can I help you today?' }]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleGenerate = async () => {
    setLoading(true);
    const data = tab === 'email' ? emailForm : textInput;
    const res = await simulateAI(tab, data);
    setResult(res);
    setLoading(false);
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsgs = [...messages, { role: 'user', text: chatInput }];
    setMessages(newMsgs);
    setChatInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setMessages([...newMsgs, { role: 'ai', text: "I have processed your request. Based on workplace best practices, I recommend prioritizing your tasks before drafting the documentation." }]);
    setLoading(false);
  };

  const menuItems = [
    { id: 'email', icon: Mail, label: 'Smart Email Generator' },
    { id: 'meeting', icon: FileText, label: 'Meeting Notes Summarizer' },
    { id: 'planner', icon: Calendar, label: 'AI Task Planner' },
    { id: 'research', icon: Search, label: 'AI Research Assistant' },
    { id: 'chat', icon: MessageSquare, label: 'AI Chatbot Interface' },
  ];

  return (
    <div className="h-screen w-full bg-slate-50 text-slate-900 font-sans flex overflow-hidden">
      
      {/* SIDEBAR - STRICT NAVY STYLE */}
      <aside className={`transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'} bg-[#0F172A] text-white flex flex-col shrink-0`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg"><Zap size={18} fill="white" /></div>
              <span className="font-black text-lg tracking-tighter uppercase italic">Capaciti<span className="text-indigo-400">.AI</span></span>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
          <button onClick={() => {setTab('home'); setResult('');}} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${tab === 'home' ? 'bg-indigo-600' : 'text-slate-400 hover:text-white'}`}>
            <LayoutDashboard size={20}/> {!collapsed && <span className="text-xs font-bold uppercase tracking-widest">Home Hub</span>}
          </button>
          <div className={`pt-6 pb-2 px-6 text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ${collapsed ? 'hidden' : 'block'}`}>Neural Modules</div>
          {menuItems.map(item => (
            <button key={item.id} onClick={() => {setTab(item.id); setResult(''); setTextInput('');}} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${tab === item.id ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              <item.icon size={20}/> {!collapsed && <span className="text-xs font-bold uppercase tracking-widest leading-tight text-left">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* WORKSPACE - NO SCROLL */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-3 italic">
            <ShieldCheck size={16} className="text-indigo-600" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">{tab} module initialized</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 bg-indigo-50 rounded-full border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">RM</div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-hidden relative">
          {tab === 'home' ? (
            <div className="h-full flex flex-col justify-center max-w-2xl mx-auto space-y-8 text-center animate-in fade-in zoom-in duration-700">
               <h1 className="text-6xl font-black tracking-tighter italic text-slate-900 leading-tight">Intelligence <br/><span className="text-indigo-600">Accelerated.</span></h1>
               <p className="text-slate-400 font-medium leading-relaxed">Integrated AI tools for the CAPACITI Skills Programme. Automate emails, meetings, and planning from one secure workstation.</p>
               <div className="flex justify-center gap-4 pt-4">
                  <button onClick={() => setTab('email')} className="px-10 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all">Launch Workspace</button>
               </div>
            </div>
          ) : (
            <div className="h-full flex gap-10 animate-in slide-in-from-right-8 duration-500">
              
              {/* LEFT COLUMN: INPUT */}
              <div className="w-[45%] flex flex-col space-y-6 h-full overflow-hidden">
                <div className="shrink-0">
                  <h2 className="text-3xl font-black tracking-tighter italic uppercase text-slate-900">{tab.replace('-', ' ')}</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">Configure neural parameters</p>
                </div>

                <div className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col shadow-sm overflow-hidden">
                  <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
                    {tab === 'email' && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Topic / Purpose</label>
                          <input className="w-full px-5 py-3 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-1 focus:ring-indigo-600" placeholder="e.g. Project Delivery Delay" onChange={e => setEmailForm({...emailForm, subject: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipient</label>
                             <select className="w-full px-5 py-3 bg-slate-50 rounded-xl outline-none" onChange={e => setEmailForm({...emailForm, recipient: e.target.value})}><option>Client</option><option>Manager</option><option>Team</option></select>
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tone</label>
                             <select className="w-full px-5 py-3 bg-slate-50 rounded-xl outline-none" onChange={e => setEmailForm({...emailForm, tone: e.target.value})}><option>Formal</option><option>Friendly</option><option>Persuasive</option></select>
                           </div>
                        </div>
                        <textarea className="w-full h-32 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none resize-none text-sm" placeholder="Any specific context?" onChange={e => setEmailForm({...emailForm, context: e.target.value})} />
                      </div>
                    )}
                    {tab === 'chat' ? (
                       <div className="h-full flex flex-col">
                          <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pb-4">
                             {messages.map((m, i) => (
                               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm italic font-medium ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'}`}>
                                     {m.text}
                                  </div>
                               </div>
                             ))}
                             <div ref={chatEndRef} />
                          </div>
                          <form onSubmit={handleChat} className="mt-4 flex gap-2 pt-4 border-t">
                             <input className="flex-1 bg-slate-100 px-5 py-3 rounded-full text-sm outline-none" placeholder="Ask your workplace assistant..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
                             <button type="submit" className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all"><Send size={18} /></button>
                          </form>
                       </div>
                    ) : (
                      <textarea 
                        className="w-full h-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm font-medium outline-none resize-none" 
                        placeholder={`Paste input for ${tab} module...`}
                        onChange={e => setTextInput(e.target.value)}
                      />
                    )}
                  </div>
                  {tab !== 'chat' && (
                    <button onClick={handleGenerate} disabled={loading} className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl transition-all">
                      {loading ? <Loader2 size={18} className="animate-spin" /> : <Zap size={16} className="fill-white" />}
                      Generate Synthesis
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: OUTPUT */}
              <div className={`w-[55%] flex flex-col h-full transition-opacity duration-700 ${result || loading ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
                 <div className="flex items-center justify-between px-4 mb-2 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Neural Synthesis</span>
                    {result && <button onClick={() => navigator.clipboard.writeText(result)} className="text-[10px] font-black text-indigo-600 flex items-center gap-2 uppercase tracking-widest hover:text-indigo-800"><Copy size={12}/> Copy</button>}
                 </div>

                 <div className="flex-1 bg-indigo-600/5 border border-indigo-500/20 rounded-[3.5rem] p-10 flex flex-col relative overflow-hidden backdrop-blur-sm">
                    {loading && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-10 animate-pulse">
                         <div className="text-center space-y-2">
                           <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto" />
                           <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Processing Data...</p>
                         </div>
                      </div>
                    )}
                    <textarea 
                      className="flex-1 w-full bg-transparent border-none text-indigo-900 italic font-medium text-lg leading-relaxed outline-none no-scrollbar resize-none" 
                      value={result} 
                      readOnly 
                      placeholder="// System awaiting input execution..."
                    />
                 </div>
                 
                 {result && (
                    <div className="mt-4 p-4 border border-indigo-100 rounded-2xl bg-white shrink-0">
                       <div className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-1 italic">Prompt Engineering Logic</div>
                       <p className="text-[10px] font-mono text-slate-500 leading-tight">SYSTEM: Executive Workplace Synthesis // CONTEXT: {tab.toUpperCase()} // DATA: {tab === 'email' ? emailForm.subject : textInput.substring(0, 30)}...</p>
                    </div>
                 )}
              </div>

            </div>
          )}
        </div>

        <footer className="h-12 border-t border-slate-200 bg-white flex items-center px-10 justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0">
          <div className="flex items-center gap-2 italic">
            <Info size={12} className="text-indigo-400" />
            Responsible AI: Review synthesized content before deployment.
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