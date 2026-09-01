const { useState, useEffect, useRef } = React;

const API_BASE = "";

// Native React SVG Icon component with high-fidelity icons
function Icon({ name, className = "w-4 h-4" }) {
  const icons = {
    bot: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="10" rx="3" strokeWidth="2" />
        <circle cx="12" cy="5" r="2" strokeWidth="2" />
        <path d="M12 7v4" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" strokeLinecap="round" />
        <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    user: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="7" r="4" strokeWidth="2"/>
      </svg>
    ),
    sparkles: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    database: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="2" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" strokeWidth="2" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeWidth="2" />
      </svg>
    ),
    layers: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="12 2 2 7 12 12 22 7 12 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="2 17 12 22 22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="2 12 12 17 22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "shield-check": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9 12 11 14 15 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="20" x2="12" y2="4" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" y1="20" x2="6" y2="14" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    table: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="18" height="18" x="3" y="3" rx="2" strokeWidth="2"/>
        <path d="M3 9h18" strokeWidth="2"/>
        <path d="M3 15h18" strokeWidth="2"/>
        <path d="M9 3v18" strokeWidth="2"/>
        <path d="M15 3v18" strokeWidth="2"/>
      </svg>
    ),
    code: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    terminal: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="4 17 10 11 4 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" x2="20" y1="19" y2="19" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    mic: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" strokeWidth="2"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" x2="12" y1="19" y2="22" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    send: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    copy: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" strokeWidth="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" strokeWidth="2"/>
      </svg>
    ),
    download: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round"/>
        <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" x2="12" y1="15" y2="3" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    chevronDown: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    chevronRight: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    trash: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 6h18" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="2"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeWidth="2"/>
      </svg>
    ),
    history: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    upload: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round"/>
        <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    zap: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    check: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    external: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeWidth="2" strokeLinecap="round"/>
        <polyline points="15 3 21 3 21 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="10" y1="14" x2="21" y2="3" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  };

  return icons[name] || (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    </svg>
  );
}

// Preset Prompts Catalog
const PROMPTS = {
  college_records: [
    { title: "Top 5 CGPA Students", query: "Show me the top 5 students with highest CGPA", icon: "sparkles" },
    { title: "Attendance < 75%", query: "List all students with attendance less than 75%", icon: "zap" },
    { title: "Avg CGPA by Dept", query: "What is the average CGPA per department?", icon: "chart" },
    { title: "Faculty by Salary", query: "List all faculty ordered by salary", icon: "table" },
    { title: "Search Arun", query: "Show details of student named Arun", icon: "user" }
  ],
  ecommerce_store: [
    { title: "Top 5 Expensive Products", query: "What are the top 5 most expensive products?", icon: "sparkles" },
    { title: "Revenue by Order Status", query: "Total orders and revenue by order status", icon: "chart" },
    { title: "Memberships Breakdown", query: "Customer count by membership tier", icon: "table" }
  ],
  healthcare: [
    { title: "Top Experienced Doctors", query: "List doctors by experience years", icon: "sparkles" },
    { title: "Patient Blood Groups", query: "Show patient count by blood group", icon: "chart" },
    { title: "Billing Status Total", query: "Total billing amount by payment status", icon: "table" }
  ]
};

function App() {
  const [databases, setDatabases] = useState([]);
  const [activeDb, setActiveDb] = useState("college_records");
  const [schemaData, setSchemaData] = useState(null);
  const [activeView, setActiveView] = useState("agent"); // 'agent', 'schema', 'history', 'settings'
  const [canvasTab, setCanvasTab] = useState("visuals"); // 'visuals', 'table', 'sql'
  
  // Multi-Turn Chat Messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "agent",
      timestamp: "Just now",
      text: "Hello! I am your **Neura X Database Intelligence Agent**.\n\nAsk me any question in plain English about your connected databases, and I'll generate schema-validated SQL, execute it safely in a read-only sandbox, and visualize the findings.",
      isInitial: true
    }
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [directSqlMode, setDirectSqlMode] = useState(false);
  const [expandedReasoning, setExpandedReasoning] = useState({});
  const [tableSearch, setTableSearch] = useState("");
  const [chartTypeOverride, setChartTypeOverride] = useState(null);

  // Settings & History
  const [queryHistory, setQueryHistory] = useState([]);
  const [settingsData, setSettingsData] = useState({
    llm_provider: "offline",
    has_gemini_key: false,
    has_openai_key: false,
    model_name: "gemini-2.5-flash",
    gemini_key_input: "",
    openai_key_input: ""
  });
  const [uploadStatus, setUploadStatus] = useState(null);

  const chatBottomRef = useRef(null);
  const chartCanvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Init
  useEffect(() => {
    fetchDatabases();
    fetchSettings();
    fetchHistory();
  }, []);

  useEffect(() => {
    if (activeDb) {
      fetchSchema(activeDb);
    }
  }, [activeDb]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAnalyzing]);

  // Chart Rendering in Canvas
  useEffect(() => {
    if (currentResult && currentResult.chart && chartCanvasRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      try {
        const ctx = chartCanvasRef.current.getContext('2d');
        const targetType = chartTypeOverride || currentResult.chart.type;
        chartInstanceRef.current = new Chart(ctx, {
          type: targetType,
          data: currentResult.chart.data,
          options: {
            ...currentResult.chart.options,
            animation: { duration: 600 },
            responsive: true,
            maintainAspectRatio: false
          }
        });
      } catch (err) {
        console.error("Canvas Chart Render Error:", err);
      }
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [currentResult, canvasTab, chartTypeOverride, activeView]);

  const fetchDatabases = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/databases`);
      if (res.ok) setDatabases(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchSchema = async (dbId) => {
    try {
      const res = await fetch(`${API_BASE}/api/databases/${dbId}/schema`);
      if (res.ok) setSchemaData(await res.json());
    } catch (e) { console.error(e); }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/settings`);
      if (res.ok) setSettingsData(prev => ({ ...prev, ...await res.json() }));
    } catch (e) { console.error(e); }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`);
      if (res.ok) setQueryHistory(await res.json());
    } catch (e) { console.error(e); }
  };

  // Submit Query to Agent
  const handleSendQuery = async (queryText = inputQuery) => {
    const textToRun = (queryText || "").trim();
    if (!textToRun || isAnalyzing) return;

    const userMsgId = Date.now();
    const userMsg = {
      id: userMsgId,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToRun
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");
    setIsAnalyzing(true);
    setChartTypeOverride(null);

    try {
      const payload = {
        question: textToRun,
        database_id: activeDb,
        provider: settingsData.llm_provider,
        api_key: settingsData.llm_provider === "gemini" ? settingsData.gemini_key_input : settingsData.openai_key_input,
        model_name: settingsData.model_name,
        custom_sql: directSqlMode ? textToRun : null
      };

      const res = await fetch(`${API_BASE}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Query execution encountered an issue.");
      }

      setCurrentResult(data);
      setExpandedReasoning(prev => ({ ...prev, [userMsgId + 1]: true }));

      const agentMsg = {
        id: userMsgId + 1,
        sender: "agent",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.natural_answer,
        result: data
      };

      setMessages(prev => [...prev, agentMsg]);
      fetchHistory();
    } catch (err) {
      const errorMsg = {
        id: userMsgId + 1,
        sender: "agent",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
        text: `⚠️ **Agent Error**: ${err.message}`
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Voice Interaction
  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is supported in Chrome, Edge, and Safari.");
      return;
    }
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInputQuery(transcript);
      setIsListening(false);
      handleSendQuery(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // Exports
  const exportCSV = () => {
    if (!currentResult || !currentResult.rows.length) return;
    const cols = currentResult.columns;
    const rows = currentResult.rows;
    let csv = cols.join(",") + "\n";
    rows.forEach(r => {
      csv += cols.map(c => {
        let v = r[c] === null || r[c] === undefined ? "" : String(r[c]);
        return (v.includes(",") || v.includes('"')) ? `"${v.replace(/"/g, '""')}"` : v;
      }).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dataset_${activeDb}_${Date.now()}.csv`;
    a.click();
  };

  const exportJSON = () => {
    if (!currentResult || !currentResult.rows.length) return;
    const blob = new Blob([JSON.stringify(currentResult.rows, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dataset_${activeDb}_${Date.now()}.json`;
    a.click();
  };

  // CSV Importer
  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setUploadStatus("Importing CSV into SQLite engine...");
    try {
      const res = await fetch(`${API_BASE}/api/databases/upload-csv`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);
      setUploadStatus(`✅ Imported table '${data.table_name}' (${data.row_count} rows). Ready to query!`);
      await fetchDatabases();
      setActiveDb(data.database_id);
    } catch (err) {
      setUploadStatus(`❌ ${err.message}`);
    }
  };

  const activePresets = PROMPTS[activeDb] || PROMPTS.college_records;

  // Filtered rows in Studio Table
  const studioFilteredRows = currentResult && currentResult.rows
    ? currentResult.rows.filter(row => {
        if (!tableSearch) return true;
        return Object.values(row).some(v => String(v).toLowerCase().includes(tableSearch.toLowerCase()));
      })
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#06080e] text-slate-100 bg-grid-pattern selection:bg-cyan-500 selection:text-white">
      
      {/* Top Header Command Bar */}
      <header className="glass-nav sticky top-0 z-50 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Status */}
        <div className="flex items-center space-x-3.5">
          <div className="agent-avatar-glow w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Icon name="bot" className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight gradient-text-agent">NEURA X</span>
              <span className="bg-cyan-500/10 text-cyan-400 text-[11px] px-2 py-0.5 rounded-full font-bold border border-cyan-500/25 tracking-wide">
                AI AGENT PS7
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Autonomous Database Question-Answering & Intelligence</p>
          </div>
        </div>

        {/* Center: Database Selector with status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-[#0e1424] border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
            <Icon name="database" className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-xs text-slate-400 mr-2 font-medium">Target DB:</span>
            <select
              value={activeDb}
              onChange={(e) => {
                setActiveDb(e.target.value);
                setCurrentResult(null);
              }}
              className="bg-transparent text-xs font-semibold text-cyan-200 outline-none cursor-pointer"
            >
              {databases.map(db => (
                <option key={db.id} value={db.id} className="bg-[#0b0f19] text-slate-200">
                  {db.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden lg:flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-semibold">
            <Icon name="shield-check" className="w-3.5 h-3.5" />
            <span>Read-Only Sandbox</span>
          </div>
        </div>

        {/* View Navigator Buttons */}
        <nav className="flex items-center space-x-1 bg-[#0b0f19] p-1 rounded-xl border border-slate-800/80">
          {[
            { id: 'agent', label: 'Agent Chat', icon: 'bot' },
            { id: 'schema', label: 'Schema Catalog', icon: 'table' },
            { id: 'history', label: 'Audit Trail', icon: 'history' },
            { id: 'settings', label: 'Config & Data', icon: 'settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon name={tab.icon} className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* VIEW 1: AGENT CHAT & LIVE STUDIO CANVAS */}
        {activeView === 'agent' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
            
            {/* Left / Center: Agent Conversational Stream */}
            <div className={`flex flex-col h-[calc(100vh-64px)] border-r border-slate-800/60 bg-[#06080e]/90 ${currentResult ? 'lg:col-span-6 xl:col-span-5' : 'lg:col-span-12 max-w-4xl mx-auto w-full border-r-0'}`}>
              
              {/* Chat Stream Header */}
              <div className="px-6 py-3 border-b border-slate-800/60 flex items-center justify-between bg-[#090d16]/80 backdrop-blur">
                <div className="flex items-center space-x-2">
                  <Icon name="sparkles" className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Agent Conversation Stream</span>
                </div>
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: Date.now(),
                        sender: "agent",
                        timestamp: "Just now",
                        text: "Conversation cleared. Ask me any new question about the active database!",
                        isInitial: true
                      }
                    ]);
                    setCurrentResult(null);
                  }}
                  className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-800/40 transition"
                  title="Reset conversation"
                >
                  <Icon name="trash" className="w-3 h-3" />
                  <span>Reset Chat</span>
                </button>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 animate-message ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'agent' && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/20">
                        <Icon name="bot" className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`max-w-[85%] space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      
                      {/* Message Bubble */}
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-tr-sm shadow-md'
                            : msg.isError
                            ? 'bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded-tl-sm'
                            : 'glass-panel text-slate-100 rounded-tl-sm shadow-xl'
                        }`}
                      >
                        <div className="whitespace-pre-line font-normal">
                          {msg.text}
                        </div>

                        {/* Timestamp & badges */}
                        <div className={`mt-2 flex items-center space-x-2 text-[10px] ${msg.sender === 'user' ? 'text-cyan-100/70 justify-end' : 'text-slate-400'}`}>
                          <span>{msg.timestamp}</span>
                          {msg.result && (
                            <>
                              <span>•</span>
                              <span className="text-cyan-400 font-mono">{msg.result.execution_time_ms}ms</span>
                              <span>•</span>
                              <span className="text-emerald-400 font-semibold">{msg.result.row_count} rows</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Agent Reasoning & Tool Steps Accordion */}
                      {msg.result && (
                        <div className="glass-panel rounded-xl overflow-hidden border border-slate-800/80 text-xs">
                          <button
                            onClick={() => setExpandedReasoning(prev => ({ ...prev, [msg.id]: !prev[msg.id] }))}
                            className="w-full px-3.5 py-2 flex items-center justify-between bg-slate-900/60 hover:bg-slate-900 transition text-slate-300 font-medium"
                          >
                            <span className="flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                              <span className="font-semibold text-cyan-300">Agent Reasoning & Execution Steps</span>
                            </span>
                            <Icon name={expandedReasoning[msg.id] ? "chevronDown" : "chevronRight"} className="w-3.5 h-3.5 text-slate-400" />
                          </button>

                          {expandedReasoning[msg.id] && (
                            <div className="p-3.5 space-y-3 bg-[#0a0e1a]/90 font-mono text-[11px] border-t border-slate-800/60 text-slate-300">
                              
                              {/* Step 1: Intent & Entities */}
                              <div className="flex items-start space-x-2">
                                <span className="text-cyan-400">1.</span>
                                <div>
                                  <span className="text-slate-400">Intent Detected: </span>
                                  <span className="text-cyan-300 font-bold">{msg.result.intent}</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {msg.result.entities?.map((ent, i) => (
                                      <span key={i} className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300">
                                        {ent}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Step 2: Generated Safe SQL */}
                              <div className="flex items-start space-x-2">
                                <span className="text-indigo-400">2.</span>
                                <div className="w-full">
                                  <span className="text-slate-400">Generated Safe SQL:</span>
                                  <div className="mt-1 p-2 rounded bg-slate-950 text-cyan-300 border border-slate-800/80 flex items-center justify-between">
                                    <span className="overflow-x-auto">{msg.result.sanitized_sql}</span>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(msg.result.sanitized_sql);
                                        alert("Copied SQL!");
                                      }}
                                      className="ml-2 text-slate-400 hover:text-white p-1"
                                      title="Copy SQL"
                                    >
                                      <Icon name="copy" className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Step 3: Security Validation & Execution */}
                              <div className="flex items-start space-x-2">
                                <span className="text-emerald-400">3.</span>
                                <div>
                                  <span className="text-slate-400">Sandbox Status: </span>
                                  <span className="text-emerald-400 font-bold">100% Read-Only Enforced</span>
                                  <span className="text-slate-500"> • Engine: {msg.result.provider_used}</span>
                                </div>
                              </div>

                            </div>
                          )}
                        </div>
                      )}

                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                        <Icon name="user" className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Shimmer loading state when Agent is processing */}
                {isAnalyzing && (
                  <div className="flex items-start space-x-3 animate-message">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                      <Icon name="bot" className="w-4 h-4" />
                    </div>
                    <div className="glass-panel p-4 rounded-2xl max-w-sm space-y-2 thinking-shimmer">
                      <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-300">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                        <span>Agent Reasoning & Querying Database...</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded w-48"></div>
                      <div className="h-2 bg-slate-800 rounded w-32"></div>
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Bottom Command Prompt Box */}
              <div className="p-4 border-t border-slate-800/80 bg-[#070a12]/95 backdrop-blur space-y-3">
                
                {/* Categorized Prompt Chips */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase whitespace-nowrap">Suggested:</span>
                  {activePresets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(p.query)}
                      className="text-[11px] bg-slate-900/80 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-800 hover:border-cyan-500/40 transition flex items-center space-x-1"
                    >
                      <Icon name={p.icon} className="w-3 h-3 text-cyan-400" />
                      <span>{p.title}</span>
                    </button>
                  ))}
                </div>

                {/* Main Input Bar */}
                <div className="relative flex items-center bg-[#0c1220] border border-slate-700/70 rounded-2xl px-4 py-3 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 transition shadow-2xl">
                  
                  {/* Mode Badge Indicator */}
                  <button
                    onClick={() => setDirectSqlMode(!directSqlMode)}
                    className={`mr-2.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide transition border ${
                      directSqlMode
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                    }`}
                  >
                    {directSqlMode ? 'RAW SQL' : 'NATURAL AI'}
                  </button>

                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
                    placeholder={directSqlMode ? "Enter SELECT SQL query..." : "Ask your database anything in plain English..."}
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none font-normal"
                    disabled={isAnalyzing}
                  />

                  {/* Voice Button */}
                  <button
                    onClick={handleVoiceToggle}
                    title="Voice Input (Speech-to-Text)"
                    className={`p-2 rounded-xl transition mr-1 flex items-center justify-center ${
                      isListening
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60'
                    }`}
                  >
                    {isListening ? (
                      <div className="flex items-center space-x-0.5">
                        <span className="w-1 bg-rose-400 wave-bar-1 rounded"></span>
                        <span className="w-1 bg-rose-400 wave-bar-2 rounded"></span>
                        <span className="w-1 bg-rose-400 wave-bar-3 rounded"></span>
                      </div>
                    ) : (
                      <Icon name="mic" className="w-4 h-4" />
                    )}
                  </button>

                  {/* Send Button */}
                  <button
                    onClick={() => handleSendQuery()}
                    disabled={isAnalyzing || !inputQuery.trim()}
                    className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white p-2 rounded-xl shadow-md shadow-cyan-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                  >
                    <Icon name="send" className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

            {/* Right: Live Studio Canvas (Dynamic Charts, Interactive Grid, SQL Inspector) */}
            {currentResult && (
              <div className="lg:col-span-6 xl:col-span-7 flex flex-col h-[calc(100vh-64px)] bg-[#080c16] overflow-hidden">
                
                {/* Studio Canvas Header */}
                <div className="px-6 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-[#0a0f1d]">
                  
                  {/* Canvas Tabs */}
                  <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    {[
                      { id: 'visuals', label: 'Visual Analytics', icon: 'chart' },
                      { id: 'table', label: 'Data Grid', icon: 'table' },
                      { id: 'sql', label: 'SQL Inspector', icon: 'code' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setCanvasTab(tab.id)}
                        className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                          canvasTab === tab.id
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Icon name={tab.icon} className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Export Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={exportCSV}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700/80 flex items-center space-x-1.5 transition font-medium"
                    >
                      <Icon name="download" className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={exportJSON}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700/80 flex items-center space-x-1.5 transition font-medium"
                    >
                      <span>JSON</span>
                    </button>
                  </div>

                </div>

                {/* Studio Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* KPI Summary Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-panel p-4 rounded-xl space-y-1">
                      <span className="text-[11px] text-slate-400 font-semibold uppercase">Total Rows</span>
                      <p className="text-xl font-extrabold text-cyan-300 font-mono">{currentResult.row_count}</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl space-y-1">
                      <span className="text-[11px] text-slate-400 font-semibold uppercase">Execution Time</span>
                      <p className="text-xl font-extrabold text-amber-400 font-mono">{currentResult.execution_time_ms} ms</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl space-y-1">
                      <span className="text-[11px] text-slate-400 font-semibold uppercase">Security Mode</span>
                      <p className="text-xs font-bold text-emerald-400 mt-1">Read-Only Safe</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl space-y-1">
                      <span className="text-[11px] text-slate-400 font-semibold uppercase">Engine</span>
                      <p className="text-xs font-bold text-slate-300 truncate mt-1">{currentResult.provider_used}</p>
                    </div>
                  </div>

                  {/* TAB 1: VISUAL ANALYTICS */}
                  {canvasTab === 'visuals' && (
                    <div className="glass-panel rounded-2xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                        <div>
                          <h3 className="font-bold text-sm text-slate-100">{currentResult.chart ? currentResult.chart.title : "Visual Analytics"}</h3>
                          <p className="text-xs text-slate-400">Automated visualization generated by the AI agent</p>
                        </div>

                        {/* Chart Type Selector */}
                        {currentResult.chart && (
                          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                            {['bar', 'line', 'doughnut'].map(t => (
                              <button
                                key={t}
                                onClick={() => setChartTypeOverride(t)}
                                className={`px-2.5 py-0.5 rounded capitalize transition ${
                                  (chartTypeOverride || currentResult.chart.type) === t
                                    ? 'bg-cyan-500 text-white font-bold'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {currentResult.chart ? (
                        <div className="w-full h-80 relative">
                          <canvas ref={chartCanvasRef}></canvas>
                        </div>
                      ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-2">
                          <Icon name="chart" className="w-8 h-8 text-slate-600" />
                          <p className="text-xs">No numeric chart dimensions found for this particular query.</p>
                          <button onClick={() => setCanvasTab('table')} className="text-xs text-cyan-400 font-semibold hover:underline">
                            View Data Grid instead →
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: DATA GRID STUDIO */}
                  {canvasTab === 'table' && (
                    <div className="glass-panel rounded-2xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Filter records..."
                          value={tableSearch}
                          onChange={(e) => setTableSearch(e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 w-64 outline-none focus:border-cyan-500"
                        />
                        <span className="text-xs text-slate-400 font-mono">
                          Showing {studioFilteredRows.length} of {currentResult.row_count} records
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-[420px]">
                        <table className="w-full text-left text-xs border-collapse font-mono">
                          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider sticky top-0 border-b border-slate-800">
                            <tr>
                              {currentResult.columns.map((col, idx) => (
                                <th key={idx} className="p-3 font-semibold whitespace-nowrap">
                                  {col.replace('_', ' ')}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 bg-[#090d16]/60">
                            {studioFilteredRows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-800/40 transition">
                                {currentResult.columns.map((col, cIdx) => (
                                  <td key={cIdx} className="p-3 text-slate-300 whitespace-nowrap">
                                    {row[col] !== null && row[col] !== undefined ? String(row[col]) : <span className="text-slate-600">NULL</span>}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: SQL INSPECTOR */}
                  {canvasTab === 'sql' && (
                    <div className="glass-panel rounded-2xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-sm text-slate-100 flex items-center space-x-2">
                          <Icon name="terminal" className="w-4 h-4 text-cyan-400" />
                          <span>Generated SQL & Execution Sandbox</span>
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(currentResult.sanitized_sql);
                            alert("SQL copied to clipboard!");
                          }}
                          className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-lg border border-slate-700 flex items-center space-x-1 transition"
                        >
                          <Icon name="copy" className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </button>
                      </div>

                      <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-sm overflow-x-auto leading-relaxed">
                        {currentResult.sanitized_sql}
                      </pre>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                          <span className="text-slate-500 font-semibold">TARGET SCHEMA</span>
                          <p className="text-slate-200 font-mono font-medium">{currentResult.database_id}</p>
                        </div>
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                          <span className="text-slate-500 font-semibold">SECURITY RESTRICTION</span>
                          <p className="text-emerald-400 font-mono font-medium">Read-Only Enforced</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            )}

          </div>
        )}

        {/* VIEW 2: SCHEMA CATALOG EXPLORER */}
        {activeView === 'schema' && (
          <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-100 flex items-center space-x-3">
                  <Icon name="table" className="w-7 h-7 text-cyan-400" />
                  <span>Database Schema & Metadata Catalog</span>
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Active Database: <span className="text-cyan-400 font-bold">{schemaData?.database_name}</span> ({schemaData?.tables.length || 0} relational tables)
                </p>
              </div>
            </div>

            {schemaData && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schemaData.tables.map((table) => (
                  <div key={table.name} className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4 hover:border-cyan-500/40 transition">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="database" className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-bold text-slate-100 font-mono text-sm">{table.name}</h3>
                      </div>
                      <span className="text-xs bg-slate-900 text-slate-400 border border-slate-800 px-2.5 py-0.5 rounded-full font-mono">
                        {table.row_count} rows
                      </span>
                    </div>

                    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                      {table.columns.map((col) => (
                        <div key={col.name} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-slate-950/70 border border-slate-800/50 font-mono">
                          <span className="text-slate-300 font-medium">{col.name}</span>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-slate-500 text-[11px]">{col.type}</span>
                            {col.is_primary_key && (
                              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1 rounded font-bold">PK</span>
                            )}
                            {col.foreign_key && (
                              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-1 rounded" title={`References ${col.foreign_key}`}>FK</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {table.sample_rows && table.sample_rows.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 block mb-1 font-bold uppercase tracking-wider">Sample Record:</span>
                        <pre className="text-[10px] bg-slate-950 p-2.5 rounded-lg text-slate-400 overflow-x-auto border border-slate-900 font-mono">
                          {JSON.stringify(table.sample_rows[0], null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: AUDIT TRAIL */}
        {activeView === 'history' && (
          <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-100 flex items-center space-x-3">
                  <Icon name="history" className="w-7 h-7 text-indigo-400" />
                  <span>Query Audit Trail & Security Telemetry</span>
                </h2>
                <p className="text-sm text-slate-400 mt-1">Chronological trace of questions, generated SQL, latency, and sandbox security guardrails.</p>
              </div>

              <button
                onClick={async () => {
                  await fetch(`${API_BASE}/api/history`, { method: "DELETE" });
                  fetchHistory();
                }}
                className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3.5 py-2 rounded-xl transition font-medium"
              >
                Clear History
              </button>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">User Question</th>
                      <th className="p-3.5">Generated Safe SQL</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Latency</th>
                      <th className="p-3.5">Rows</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {queryHistory.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-500 font-sans">
                          No audit telemetry recorded yet.
                        </td>
                      </tr>
                    ) : (
                      queryHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/30 transition">
                          <td className="p-3.5 text-slate-500 whitespace-nowrap">{item.timestamp}</td>
                          <td className="p-3.5 text-slate-200 font-sans max-w-xs truncate font-medium">{item.question}</td>
                          <td className="p-3.5 text-cyan-400 max-w-md truncate">{item.sql || "N/A"}</td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' :
                              item.status === 'BLOCKED_SECURITY' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-400 whitespace-nowrap">{item.execution_time_ms} ms</td>
                          <td className="p-3.5 text-slate-300">{item.row_count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: SETTINGS & DATA IMPORT */}
        {activeView === 'settings' && (
          <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-2xl font-extrabold text-slate-100 flex items-center space-x-3">
                <Icon name="settings" className="w-7 h-7 text-cyan-400" />
                <span>Engine Configurations & Data Importer</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">Configure LLM providers, API keys, and import custom CSV datasets into SQLite.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* LLM Engine Card */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                  <Icon name="sparkles" className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-sm text-slate-100">AI Model Provider</h3>
                </div>

                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await fetch(`${API_BASE}/api/settings`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        llm_provider: settingsData.llm_provider,
                        gemini_api_key: settingsData.gemini_key_input || undefined,
                        openai_api_key: settingsData.openai_key_input || undefined,
                        model_name: settingsData.model_name
                      })
                    });
                    if (res.ok) {
                      alert("Settings updated!");
                      fetchSettings();
                    }
                  } catch (err) { alert(err.message); }
                }} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Active AI Engine</label>
                    <select
                      value={settingsData.llm_provider}
                      onChange={(e) => setSettingsData({ ...settingsData, llm_provider: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
                    >
                      <option value="offline">Smart Heuristic Engine (100% Zero-Setup / Offline)</option>
                      <option value="gemini">Google Gemini API (Gemini 2.5 Flash / 1.5 Pro)</option>
                      <option value="openai">OpenAI API (GPT-4o / GPT-4o-mini)</option>
                      <option value="ollama">Local Ollama (Llama 3 / CodeLlama)</option>
                    </select>
                  </div>

                  {settingsData.llm_provider === 'gemini' && (
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Gemini API Key</label>
                      <input
                        type="password"
                        placeholder="AIzaSy..."
                        value={settingsData.gemini_key_input}
                        onChange={(e) => setSettingsData({ ...settingsData, gemini_key_input: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
                      />
                    </div>
                  )}

                  {settingsData.llm_provider === 'openai' && (
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">OpenAI API Key</label>
                      <input
                        type="password"
                        placeholder="sk-..."
                        value={settingsData.openai_key_input}
                        onChange={(e) => setSettingsData({ ...settingsData, openai_key_input: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20"
                  >
                    Save Engine Configuration
                  </button>
                </form>
              </div>

              {/* CSV Importer */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                  <Icon name="upload" className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-100">Upload CSV Dataset</h3>
                </div>

                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 text-center space-y-3 transition">
                  <Icon name="table" className="w-10 h-10 text-cyan-400 mx-auto" />
                  <div>
                    <p className="text-xs font-semibold text-slate-200">Select any CSV file</p>
                    <p className="text-[11px] text-slate-500">Auto-creates an SQLite table and loads into the AI Agent</p>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
                  />
                </div>

                {uploadStatus && (
                  <p className="text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-cyan-300 font-mono">
                    {uploadStatus}
                  </p>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}

// Render React Root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
