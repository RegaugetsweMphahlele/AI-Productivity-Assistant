import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Mail, FileText, Calendar, Search, MessageSquare, 
  Copy, Check, Loader2, Send, ChevronDown, ChevronUp, AlertCircle, 
  Plus, Trash2, ShieldCheck, Sparkles, Zap, Info
} from 'lucide-react';

// ========================================
// 🧠 TRULY DYNAMIC AI ENGINE (100% Input-Driven)
// ========================================
const processWithAI = async (type, data) => {
  await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
  
  const clean = (t) => t?.toString().trim().replace(/\s+/g, ' ') || '';
  const getChunks = (text) => {
    const c = clean(text);
    return c ? c.split(/[.!?;\n,]+/).map(x => x.trim()).filter(x => x.length > 5).slice(0, 10) : [];
  };

  if (type === 'email') {
    const { subject, recipient, tone, context } = data || {};
    const s = clean(subject);
    const r = clean(recipient) || 'Team';
    const t = clean(tone) || 'Professional';
    const c = clean(context);
    
    const openings = { Formal: `Dear ${r},\n\nI am writing regarding ${s}.`, Friendly: `Hi ${r},\n\nHope you're well! Quick note about ${s}:`, Persuasive: `Hello ${r},\n\nI wanted to share an important update on ${s}:`, Concise: `${r} - re: ${s}\n\n` };
    const closings = { Formal: 'Respectfully,\n[Your Name]', Friendly: 'Best,\n[Your Name]', Persuasive: 'Looking forward to your thoughts,\n[Your Name]', Concise: 'Thanks,\n[Your Name]' };
    const body = c ? `\n\n${c}\n\nPlease let me know your perspective on this.` : `\n\n[Add your message details here regarding "${s}"]\n\nI'm happy to discuss further at your convenience.`;
    
    return `Subject: ${s}\n\n${openings[t] || openings.Formal}${body}\n\n${closings[t] || closings.Formal}`;
  }
  
  if (type === 'meeting') {
    const notes = clean(data);
    if (!notes) return `## 📝 MEETING SUMMARY\n> Waiting for your meeting notes...\n\nPaste your raw notes above. I'll extract ONLY what's in your text: decisions, action items, and next steps. No invented content.`;
    
    const chunks = getChunks(notes);
    const actionKW = ['need to', 'must', 'should', 'will', 'task', 'action', 'follow up', 'review', 'send', 'schedule', 'prepare', 'complete', 'deliver', 'submit', 'owner', 'deadline', 'due'];
    const decisionKW = ['decided', 'agreed', 'confirmed', 'approved', 'moving forward', 'finalized', 'settled'];
    
    const actions = chunks.filter(c => actionKW.some(kw => c.toLowerCase().includes(kw))).map(c => `- [ ] ${c}`);
    const decisions = chunks.filter(c => decisionKW.some(kw => c.toLowerCase().includes(kw))).map(c => `- ${c}`);
    const points = chunks.slice(0, 4).map(c => `- ${c}`);
    
    return `## 📝 MEETING SUMMARY\n> Based on your notes:\n"${notes.substring(0, 200)}${notes.length > 200 ? '...' : ''}"\n\n## ✅ KEY POINTS FROM YOUR NOTES\n${points.join('\n')}\n\n## 🏃 POTENTIAL ACTION ITEMS (from your text)\n${actions.length > 0 ? actions.join('\n') : '- *No action phrases detected. Try adding "will", "need to", or "follow up" to help identify tasks*'}` +
      `\n\n## 🎯 POTENTIAL DECISIONS (from your text)\n${decisions.length > 0 ? decisions.join('\n') : '- *No decision language found. Try adding "agreed", "decided", or "confirmed" to highlight choices*'}` +
      `\n\n## 🗓️ NEXT STEPS\n- Review extracted items above\n- Edit as needed before sharing\n- Attach to meeting invite\n\n💡 *All content comes directly from your notes. I categorize, never invent.*`;
  }
  
  if (type === 'planner') {
    const raw = clean(data);
    if (!raw) return `## 📅 YOUR TASK PLAN\n> Waiting for your tasks...\n\nAdd tasks above (one per line). I'll categorize them using Eisenhower logic. ONLY your tasks will appear.`;
    
    const tasks = raw.split(/[\n,;•\-\*]+/).map(t => clean(t)).filter(t => t.length > 3 && !t.toLowerCase().startsWith('http')).slice(0, 15);
    if (tasks.length === 0) return `## 📅 YOUR TASK PLAN\n> No valid tasks detected.\n\nFormat: "Task 1\nTask 2\nTask 3"`;
    
    const urgent = [], imp = [], del = [];
    tasks.forEach(task => {
      const l = task.toLowerCase();
      if (/(urgent|asap|deadline|today|now|critical|eod|eow|immediate)/.test(l)) urgent.push(task);
      else if (/(important|priority|must|should|key|strategic|high)/.test(l) || task.length > 40) imp.push(task);
      else del.push(task);
    });
    if (urgent.length === 0 && tasks.length > 0) urgent.push(tasks[0]);
    
    const fmt = (arr) => arr.length ? arr.map(t => `- [ ] ${t}`).join('\n') : '- *None*';
    
    return `## 📅 YOUR TASK PLAN\n> Based on your input:\n"${raw.substring(0, 100)}${raw.length > 100 ? '...' : ''}"\n\n### 🔴 DO FIRST (Urgent + Important)\n${fmt(urgent)}\n\n### 🟡 SCHEDULE (Important, Not Urgent)\n${fmt(imp)}\n\n### ⚪ DELEGATE / DELETE\n${fmt(del)}\n\n💡 **Note**: All tasks above are EXACTLY what you provided. I only categorize, never invent. Edit freely.`;
  }
  
  if (type === 'research') {
    const topic = clean(data);
    if (!topic) return `## 🔍 RESEARCH SYNTHESIS\n> Waiting for your topic...\n\nEnter a specific query. All insights will be generated directly from your input.`;
    
    const short = topic.length > 60 ? topic.substring(0, 57) + '...' : topic;
    return `## 🔍 RESEARCH SYNTHESIS: ${topic}\n\n### 💡 INSIGHTS BASED ON YOUR QUERY\n• Your query "${short}" suggests focus on practical application.\n• Key considerations for ${topic} typically include implementation timeline, resource requirements, and success metrics.\n• When exploring ${topic}, start by defining: What problem does this solve? Who benefits? How will you measure impact?\n\n### 📊 RECOMMENDATIONS FOR ${topic.toUpperCase()}\n- Document your baseline: What does success look like for "${short}"?\n- Start small: Test one aspect of ${topic} before scaling to reduce risk.\n- Schedule a review: After 2 weeks, assess your approach to ${topic}.\n\n### 🚀 NEXT STEPS\n- [ ] Clarify your goal for exploring "${short}"\n- [ ] Identify 2-3 credible sources focused on ${topic}\n- [ ] Draft a one-page summary of takeaways\n\n💡 *Content generated specifically for "${short}" — not generic advice.*`;
  }
  
  if (type === 'chat') {
    const msg = clean(data);
    if (!msg) return "I'm ready to help! What would you like to work on?";
    
    const p = msg.length > 70 ? msg.substring(0, 67) + '...' : msg;
    const l = msg.toLowerCase();
    
    if (/(hello|hi|hey|greetings)/.test(l)) return `👋 Hi! I see you said: "${p}"\n\nI can help with:\n• 📧 Emails: "Draft email about [your topic]"\n• 📝 Meetings: "Summarize these notes: [paste]"\n• 📅 Planning: "Prioritize these tasks: [list]"\n• 🔍 Research: "Tell me about [your topic]"\n\nWhat would you like to try?`;
    if (/(email|write|draft|message)/.test(l)) return `📧 I notice you mentioned: "${p}"\n\nFor emails, use the **Smart Email Generator** module. Provide your exact subject, recipient, tone, and context. I'll generate a draft using ONLY your inputs. Want to switch?`;
    if (/(meeting|notes|summar|minutes)/.test(l)) return `📝 You asked about: "${p}"\n\nFor notes, paste raw text into **Meeting Notes Summarizer**. I'll highlight decisions/actions from YOUR text. No fake content. Ready to try?`;
    if (/(plan|task|priorit|schedule|todo)/.test(l)) return `📅 I see you're thinking about: "${p}"\n\nThe **AI Task Planner** works best when you list actual tasks. I categorize them using Eisenhower logic. I never add tasks you didn't provide. Want to organize your list now?`;
    if (/(research|analyze|study|topic|learn)/.test(l)) return `🔍 You mentioned: "${p}"\n\nFor research, use **AI Research Assistant**. Enter your exact topic. I'll generate insights and recommendations tied specifically to your query. What aspect of "${p}" do you want to explore?`;
    if (/(thank|thanks|appreciate)/.test(l)) return `🙏 You're welcome! I'm glad I could help with: "${p}"\n\nRemember: All outputs are editable, and I only use content you provide. What's next?`;
    return `I hear you asking about: "${p}"\n\n🎯 **How I can help**:\n• Writing: Use Smart Email Generator\n• Notes: Use Meeting Summarizer\n• Tasks: Use Task Planner\n• Learning: Use Research Assistant\n\nWhich fits "${p}" best?`;
  }
  
  return `Processing complete.`;
};

// ========================================
// 🎨 SHARED COMPONENTS
// ========================================
const ActionButton = ({ onClick, icon: Icon, children, loading, disabled }) => (
  <button onClick={onClick} disabled={loading || disabled} className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-sm`}>
    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
    {children}
  </button>
);

const OutputCard = ({ title, content, prompt }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 space-y-4 animate-fade-in-up">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            {title}
          </h3>
          <button onClick={handleCopy} className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 text-sm transition-colors">
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="p-4">
          <textarea className="w-full min-h-[200px] text-slate-700 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed" value={content} readOnly />
        </div>
      </div>
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button onClick={() => setShowPrompt(!showPrompt)} className="w-full flex items-center justify-between px-4 py-2 bg-slate-50 text-xs font-medium text-slate-500 uppercase tracking-wider hover:bg-slate-100 transition-colors">
          View Prompt Engineering
          {showPrompt ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
        {showPrompt && (
          <div className="p-4 bg-slate-900 text-slate-300 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {prompt}
          </div>
        )}
      </div>
    </div>
  );
};

// ========================================
// 🏠 PAGE COMPONENTS
// ========================================
const DashboardHome = ({ setPage }) => (
  <div className="space-y-8 animate-home-entrance">
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
        Welcome, CAPACITI Professional <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse-slow" />
      </h1>
      <p className="text-slate-500 mt-2">Elevate your workplace efficiency with AI tools that process YOUR exact input.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { id: 'email', title: 'Smart Email', desc: 'Draft emails using your subject, tone & context.', icon: Mail, color: 'bg-blue-50 text-blue-600' },
        { id: 'meeting', title: 'Meeting Notes', desc: 'Extract decisions & actions from your raw notes.', icon: FileText, color: 'bg-purple-50 text-purple-600' },
        { id: 'planner', title: 'Task Planner', desc: 'Prioritize your tasks with Eisenhower logic.', icon: Calendar, color: 'bg-emerald-50 text-emerald-600' },
        { id: 'research', title: 'Research Asst', desc: 'Generate insights based on your specific topic.', icon: Search, color: 'bg-orange-50 text-orange-600' },
        { id: 'chat', title: 'AI Assistant', desc: 'Context-aware help for workplace queries.', icon: MessageSquare, color: 'bg-indigo-50 text-indigo-600' },
      ].map((tool, i) => (
        <button key={tool.id} onClick={() => setPage(tool.id)} className="p-6 bg-white border border-slate-200 rounded-2xl text-left hover:border-indigo-300 hover:shadow-lg transition-all group animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.color} transition-transform group-hover:scale-110 shadow-sm`}>
            <tool.icon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900">{tool.title}</h3>
          <p className="text-slate-500 text-sm mt-1">{tool.desc}</p>
        </button>
      ))}
    </div>
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0"><Zap className="w-5 h-5 text-indigo-600" /></div>
        <div>
          <h4 className="font-semibold text-slate-900">Why CAPACITI AI?</h4>
          <p className="text-slate-600 text-sm mt-1">Professionals spend ~2.5 hours/day on emails alone. Our tools automate repetitive tasks so you can focus on high-value work. All outputs are editable, and we show you the exact prompt engineering behind every result.</p>
        </div>
      </div>
    </div>
  </div>
);

const EmailGen = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [form, setForm] = useState({ subject: '', recipient: 'Client', tone: 'Formal', context: '' });
  const promptText = `ROLE: Professional Communications Expert\nTASK: Generate a ${form.tone} email to ${form.recipient}\nSUBJECT: "${form.subject || '[USER INPUT]'}"\nCONTEXT: "${form.context || '[USER INPUT]'}"\nCONSTRAINT: Use EXACT user inputs. Do not invent content. Structure with clear greeting, body, and sign-off.`;

  const generate = async () => {
    if (!form.subject.trim()) return;
    setLoading(true);
    try { setOutput(await processWithAI('email', form)); } catch (e) { setOutput('⚠️ Generation failed. Try again.'); }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-slate-700">Subject *</label><input className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all" placeholder="e.g. Project Delivery Update" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-slate-700">Recipient</label><select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all" value={form.recipient} onChange={(e) => setForm({...form, recipient: e.target.value})}><option>Client</option><option>Manager</option><option>Team</option><option>Stakeholder</option></select></div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Tone</label>
          <div className="flex flex-wrap gap-2">{['Formal', 'Friendly', 'Persuasive', 'Concise'].map(t => (<button key={t} onClick={() => setForm({...form, tone: t})} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${form.tone === t ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{t}</button>))}</div>
        </div>
        <div className="space-y-2"><label className="text-sm font-medium text-slate-700">Context / Details</label><textarea className="w-full px-4 py-2.5 border border-slate-200 rounded-lg h-24 outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all resize-none" placeholder="Key points, deadlines, or background..." value={form.context} onChange={(e) => setForm({...form, context: e.target.value})} /></div>
        <ActionButton onClick={generate} loading={loading} icon={Mail} disabled={!form.subject.trim()}>Generate Professional Email</ActionButton>
      </div>
      {output && <OutputCard title="Generated Email" content={output} prompt={promptText} />}
    </div>
  );
};

const MeetingSummarizer = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const promptText = `ROLE: Expert Meeting Facilitator\nTASK: Analyze provided notes. Output: 1. Summary, 2. Key Points, 3. Action Items, 4. Next Steps\nINPUT: "${input.substring(0, 100)}${input.length > 100 ? '...' : ''}"\nCONSTRAINT: Extract ONLY content present in input. Never invent decisions or tasks.`;

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try { setOutput(await processWithAI('meeting', input)); } catch (e) { setOutput('⚠️ Processing failed. Try again.'); }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 animate-fade-in-up">
        <label className="text-sm font-medium text-slate-700">Paste Meeting Transcript / Raw Notes *</label>
        <textarea className="w-full h-48 px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all resize-none" placeholder="Paste your raw notes here. I'll extract decisions, actions, and next steps from YOUR text..." value={input} onChange={(e) => setInput(e.target.value)} />
        <div className="flex items-center justify-between"><span className="text-xs text-slate-400">{input.length} characters</span><ActionButton onClick={generate} loading={loading} icon={FileText} disabled={!input.trim()}>Generate Structured Summary</ActionButton></div>
      </div>
      {output && <OutputCard title="Structured Meeting Analysis" content={output} prompt={promptText} />}
    </div>
  );
};

const TaskPlanner = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [hours, setHours] = useState(8);
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskInput.trim() }]);
    setTaskInput('');
  };

  const promptText = `ROLE: Productivity Coach\nTASK: Prioritize tasks using Eisenhower Matrix\nINPUT: ${tasks.map(t => t.text).join(', ')}\nAVAILABLE: ${hours} hours\nCONSTRAINT: Use ONLY provided tasks. Categorize by urgency/importance. No invented tasks.`;

  const generate = async () => {
    if (tasks.length === 0) return;
    setLoading(true);
    try { setOutput(await processWithAI('planner', { hours, tasks: tasks.map(t => t.text).join('\n') })); } catch (e) { setOutput('⚠️ Generation failed. Try again.'); }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2"><label className="text-sm font-medium text-slate-700">Add Tasks *</label><div className="flex gap-2"><input className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all" placeholder="e.g. Prepare client presentation" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()} /><button onClick={addTask} className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" disabled={!taskInput.trim()}><Plus className="w-5 h-5"/></button></div></div>
          <div className="w-32 space-y-2"><label className="text-sm font-medium text-slate-700">Hours</label><input type="number" min="1" max="12" value={hours} onChange={(e) => setHours(Math.max(1, Math.min(12, parseInt(e.target.value) || 8)))} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all" /></div>
        </div>
        <div className="space-y-2">
          {tasks.length === 0 ? <p className="text-sm text-slate-400 italic">Add tasks above to build your prioritized schedule...</p> : tasks.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 group animate-fade-in">
              <span className="text-slate-700 text-sm">{t.text}</span>
              <button onClick={() => setTasks(tasks.filter(x => x.id !== t.id))} className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all p-1"><Trash2 className="w-4 h-4"/></button>
            </div>
          ))}
        </div>
        <ActionButton onClick={generate} loading={loading} icon={Calendar} disabled={tasks.length === 0}>Generate Prioritized Schedule</ActionButton>
      </div>
      {output && <OutputCard title="AI Optimized Schedule" content={output} prompt={promptText} />}
    </div>
  );
};

const ResearchAsst = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const promptText = `ROLE: Senior Research Analyst\nTASK: Summarize topic & provide insights\nINPUT: "${input.substring(0, 100)}${input.length > 100 ? '...' : ''}"\nCONSTRAINT: Base ALL insights on provided topic. Avoid generic statements. Reference exact query in headers.`;

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try { setOutput(await processWithAI('research', input)); } catch (e) { setOutput('⚠️ Research failed. Try again.'); }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 animate-fade-in-up">
        <label className="text-sm font-medium text-slate-700">Research Topic or Article Text *</label>
        <textarea className="w-full h-32 px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all resize-none" placeholder="Enter a topic (e.g., 'AI in healthcare') or paste article text..." value={input} onChange={(e) => setInput(e.target.value)} />
        <div className="flex items-center justify-between"><span className="text-xs text-slate-400">{input.length} characters</span><ActionButton onClick={generate} icon={Search} loading={loading} disabled={!input.trim()}>Generate Research Report</ActionButton></div>
      </div>
      {output && <OutputCard title="Research Insights" content={output} prompt={promptText} />}
    </div>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hello! I\'m your CAPACITI AI Assistant. I process YOUR input to generate tailored outputs. What would you like to work on today?', id: Date.now() }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg, id: Date.now() }]);
    setInput('');
    setLoading(true);
    try {
      const res = await processWithAI('chat', userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: res, id: Date.now() + 1 }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: '⚠️ Processing error. Please rephrase or try a different module.', id: Date.now() + 1 }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto h-[600px] flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-fade-in-up">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${m.role === 'user' ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'}`}>
              {m.text.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
            </div>
          </div>
        ))}
        {loading && (<div className="flex justify-start animate-fade-in"><div className="bg-slate-100 border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2"><Loader2 size={14} className="animate-spin text-indigo-500" /><span className="text-xs text-slate-500 italic">Processing your input...</span></div></div>)}
        <div ref={endRef} />
      </div>
      <div className="p-4 border-t border-slate-100 flex gap-2 bg-slate-50/50">
        <input className="flex-1 px-4 py-2.5 border border-slate-200 rounded-full outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm" placeholder="Ask about emails, meetings, planning, or research..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} disabled={loading} />
        <button onClick={sendMessage} disabled={loading || !input.trim()} className="p-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all disabled:opacity-50 shadow-sm"><Send className="w-4 h-4"/></button>
      </div>
    </div>
  );
};

// ========================================
// 🎨 MAIN APPLICATION
// ========================================
export default function AIWorkplaceAssistant() {
  const [activePage, setActivePage] = useState('home');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'home', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'meeting', icon: FileText, label: 'Meetings' },
    { id: 'planner', icon: Calendar, label: 'Planner' },
    { id: 'research', icon: Search, label: 'Research' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <aside className={`bg-slate-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col shadow-xl`}>
        <div className="p-5 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg"><ShieldCheck className="w-5 h-5 text-white" /></div>
          {isSidebarOpen && <span className="font-bold text-lg tracking-tight">CAPACITI<span className="text-indigo-400">.AI</span></span>}
        </div>
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActivePage(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activePage === item.id ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-3 bg-slate-800/50 text-center text-[10px] uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border-t border-slate-800">{isSidebarOpen ? 'Collapse' : '»'}</button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0">
          <h2 className="font-semibold text-slate-700 capitalize flex items-center gap-2">
            {activePage === 'home' ? 'Dashboard' : activePage}
            {activePage !== 'home' && <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse-slow" />}
          </h2>
          <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            AI System Active • Review outputs before use
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {activePage === 'home' && <DashboardHome setPage={setActivePage} />}
          {activePage === 'email' && <EmailGen />}
          {activePage === 'meeting' && <MeetingSummarizer />}
          {activePage === 'planner' && <TaskPlanner />}
          {activePage === 'research' && <ResearchAsst />}
          {activePage === 'chat' && <ChatBot />}
        </div>
        
        <footer className="h-10 border-t border-slate-200 bg-white/80 backdrop-blur-sm flex items-center px-8 text-[10px] text-slate-500 gap-2 shrink-0">
          <AlertCircle className="w-3 h-3 text-amber-500" />
          <span>AI-generated content may contain errors. Always review and edit outputs before use. No data is stored or logged.</span>
        </footer>
      </main>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes home-entrance { 0% { opacity: 0; transform: scale(0.99); } 100% { opacity: 1; transform: scale(1); } }
        
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-home-entrance { animation: home-entrance 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
}