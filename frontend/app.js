const { useState, useEffect, useRef } = React;

const API_BASE = "";

// Pure React SVG Icon Component (Prevents React DOM mutation errors)
function Icon({ name, className = "w-4 h-4" }) {
  const icons = {
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
    "message-square": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "table-2": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="18" height="18" x="3" y="3" rx="2" strokeWidth="2"/>
        <path d="M3 9h18" strokeWidth="2"/>
        <path d="M3 15h18" strokeWidth="2"/>
        <path d="M9 3v18" strokeWidth="2"/>
        <path d="M15 3v18" strokeWidth="2"/>
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" strokeWidth="2"/>
      </svg>
    ),
    sparkles: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    terminal: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="4 17 10 11 4 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" x2="20" y1="19" y2="19" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    "help-circle": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" x2="12.01" y1="17" y2="17" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    x: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="18" x2="6" y1="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" x2="18" y1="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    mic: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" strokeWidth="2"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" x2="12" y1="19" y2="22" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    "arrow-right": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="5" x2="19" y1="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
        <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "loader-2": (
      <svg className={`${className} animate-spin`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    zap: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    list: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="8" x2="21" y1="6" y2="6" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" x2="21" y1="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" x2="21" y1="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
        <line x1="3" x2="3.01" y1="6" y2="6" strokeWidth="2" strokeLinecap="round"/>
        <line x1="3" x2="3.01" y1="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
        <line x1="3" x2="3.01" y1="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    "code-2": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
    "file-json": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" strokeWidth="2"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4" strokeWidth="2"/>
      </svg>
    ),
    "file-text": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" strokeWidth="2"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4" strokeWidth="2"/>
        <path d="M10 9H8" strokeWidth="2"/>
        <path d="M16 13H8" strokeWidth="2"/>
        <path d="M16 17H8" strokeWidth="2"/>
      </svg>
    ),
    cpu: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="16" height="16" x="4" y="4" rx="2" strokeWidth="2"/>
        <rect width="6" height="6" x="9" y="9" rx="1" strokeWidth="2"/>
        <path d="M15 2v2" strokeWidth="2"/><path d="M15 20v2" strokeWidth="2"/>
        <path d="M2 15h2" strokeWidth="2"/><path d="M2 9h2" strokeWidth="2"/>
        <path d="M20 15h2" strokeWidth="2"/><path d="M20 9h2" strokeWidth="2"/>
        <path d="M9 2v2" strokeWidth="2"/><path d="M9 20v2" strokeWidth="2"/>
      </svg>
    ),
    "upload-cloud": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12v9" strokeWidth="2" strokeLinecap="round"/>
        <path d="m16 16-4-4-4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "file-spreadsheet": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" strokeWidth="2"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4" strokeWidth="2"/>
        <path d="M8 13h8" strokeWidth="2"/>
        <path d="M8 17h8" strokeWidth="2"/>
        <path d="M12 13v8" strokeWidth="2"/>
      </svg>
    ),
    "alert-triangle": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" x2="12" y1="9" y2="13" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" x2="12.01" y1="17" y2="17" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  };

  return icons[name] || (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    </svg>
  );
}

// Sample questions mapped to database IDs
const PRESET_QUERIES = {
  college_records: [
    "Show me the top 5 students with highest CGPA",
    "List all students with attendance less than 75%",
    "What is the average CGPA per department?",
    "Which department has the most students?",
    "List all faculty ordered by salary",
    "Show details of student named Arun"
  ],
  ecommerce_store: [
    "What are the top 5 most expensive products?",
    "Total orders and revenue by order status",
    "Customer count by membership tier",
    "List all smart home products"
  ],
  healthcare: [
    "List doctors by experience years",
    "Show patient count by blood group",
    "List all appointments with diagnosis",
    "Total billing amount by payment status"
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [databases, setDatabases] = useState([]);
  const [activeDb, setActiveDb] = useState("college_records");
  const [schemaData, setSchemaData] = useState(null);
  const [queryHistory, setQueryHistory] = useState([]);
  const [settingsData, setSettingsData] = useState({
    llm_provider: "offline",
    has_gemini_key: false,
    has_openai_key: false,
    model_name: "gemini-2.5-flash",
    gemini_key_input: "",
    openai_key_input: ""
  });

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [viewMode, setViewMode] = useState("both");
  const [tableSearch, setTableSearch] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [customSqlMode, setCustomSqlMode] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

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
    if (currentResult && currentResult.chart && chartRef.current && (activeTab === 'chat' || activeTab === 'analytics')) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      try {
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: currentResult.chart.type,
          data: currentResult.chart.data,
          options: currentResult.chart.options
        });
      } catch (err) {
        console.error("Chart render error:", err);
      }
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [currentResult, activeTab, viewMode]);

  const fetchDatabases = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/databases`);
      if (res.ok) {
        const data = await res.json();
        setDatabases(data);
      }
    } catch (e) {
      console.error("Failed to fetch databases", e);
    }
  };

  const fetchSchema = async (dbId) => {
    try {
      const res = await fetch(`${API_BASE}/api/databases/${dbId}/schema`);
      if (res.ok) {
        const data = await res.json();
        setSchemaData(data);
      }
    } catch (e) {
      console.error("Failed to fetch schema", e);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/settings`);
      if (res.ok) {
        const data = await res.json();
        setSettingsData(prev => ({ ...prev, ...data }));
      }
    } catch (e) {
      console.error("Failed to fetch settings", e);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`);
      if (res.ok) {
        const data = await res.json();
        setQueryHistory(data);
      }
    } catch (e) {
      console.error("Failed to fetch history", e);
    }
  };

  const handleExecuteQuery = async (queryText = inputText) => {
    const textToRun = (queryText || "").trim();
    if (!textToRun) return;

    setIsLoading(true);
    setErrorMessage(null);
    setCurrentResult(null);

    try {
      const payload = {
        question: textToRun,
        database_id: activeDb,
        provider: settingsData.llm_provider,
        api_key: settingsData.llm_provider === "gemini" ? settingsData.gemini_key_input : settingsData.openai_key_input,
        model_name: settingsData.model_name,
        custom_sql: customSqlMode ? textToRun : null
      };

      const res = await fetch(`${API_BASE}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Query execution failed.");
      }

      setCurrentResult(data);
      fetchHistory();
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      handleExecuteQuery(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const exportCSV = () => {
    if (!currentResult || !currentResult.rows.length) return;
    const cols = currentResult.columns;
    const rows = currentResult.rows;
    
    let csvContent = cols.join(",") + "\n";
    rows.forEach(r => {
      const line = cols.map(c => {
        let val = r[c] === null || r[c] === undefined ? "" : String(r[c]);
        if (val.includes(",") || val.includes('"')) {
          val = `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(",");
      csvContent += line + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `query_result_${activeDb}_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    if (!currentResult || !currentResult.rows.length) return;
    const blob = new Blob([JSON.stringify(currentResult.rows, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `query_result_${activeDb}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploadStatus("Uploading & importing dataset into SQLite...");
    try {
      const res = await fetch(`${API_BASE}/api/databases/upload-csv`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Upload failed");
      
      setUploadStatus(`Success! Imported '${data.table_name}' (${data.row_count} rows).`);
      await fetchDatabases();
      setActiveDb(data.database_id);
    } catch (err) {
      setUploadStatus(`Upload Error: ${err.message}`);
    }
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        llm_provider: settingsData.llm_provider,
        gemini_api_key: settingsData.gemini_key_input || undefined,
        openai_api_key: settingsData.openai_key_input || undefined,
        model_name: settingsData.model_name
      };
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Settings saved successfully!");
        fetchSettings();
      }
    } catch (err) {
      alert("Error saving settings: " + err.message);
    }
  };

  const filteredRows = currentResult && currentResult.rows
    ? currentResult.rows.filter(row => {
        if (!tableSearch) return true;
        return Object.values(row).some(val => 
          String(val).toLowerCase().includes(tableSearch.toLowerCase())
        );
      })
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      
      {/* Top Header */}
      <header className="glass-header sticky top-0 z-50 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
            <Icon name="database" className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight gradient-text">NEURA X</span>
              <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-0.5 rounded-full font-semibold border border-cyan-500/20">PS7</span>
            </div>
            <p className="text-xs text-slate-400">Local Database Question-Answering System</p>
          </div>
        </div>

        {/* Database Selector & Sandbox Badge */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
            <Icon name="layers" className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-xs text-slate-400 mr-2">Active DB:</span>
            <select
              value={activeDb}
              onChange={(e) => {
                setActiveDb(e.target.value);
                setCurrentResult(null);
              }}
              className="bg-transparent text-sm font-medium text-slate-200 outline-none cursor-pointer"
            >
              {databases.map(db => (
                <option key={db.id} value={db.id} className="bg-slate-900 text-slate-200">
                  {db.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-medium">
            <Icon name="shield-check" className="w-4 h-4" />
            <span>Safe Read-Only</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'chat', label: 'Ask AI', icon: 'message-square' },
            { id: 'schema', label: 'Schema Catalog', icon: 'table-2' },
            { id: 'history', label: 'Audit Trail', icon: 'clock' },
            { id: 'settings', label: 'Config & Data', icon: 'settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon name={tab.icon} className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">

        {/* TAB 1: ASK ASSISTANT */}
        {activeTab === 'chat' && (
          <div className="space-y-6">
            
            {/* Search Card */}
            <div className="glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden border border-slate-800/80">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                  <Icon name="sparkles" className="w-4 h-4 text-cyan-400" />
                  <span>Ask in Plain English (No SQL Required)</span>
                </label>
                <button
                  onClick={() => setCustomSqlMode(!customSqlMode)}
                  className={`text-xs px-2.5 py-1 rounded-md transition font-medium border ${
                    customSqlMode
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {customSqlMode ? '⚡ Direct SQL Mode' : 'Natural Language Mode'}
                </button>
              </div>

              {/* Input Bar */}
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 transition">
                  <Icon name={customSqlMode ? "terminal" : "help-circle"} className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleExecuteQuery()}
                    placeholder={customSqlMode ? "Enter raw SELECT query..." : "e.g. 'Show me the top 5 students with highest CGPA'"}
                    className="w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none text-base font-normal"
                    disabled={isLoading}
                  />
                  {inputText && (
                    <button onClick={() => setInputText("")} className="text-slate-500 hover:text-slate-300 p-1">
                      <Icon name="x" className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Voice Search Button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  title="Voice Search (Speech-to-Text)"
                  className={`p-3.5 rounded-xl border transition flex items-center justify-center ${
                    isListening
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400 recording-pulse'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50'
                  }`}
                >
                  <Icon name="mic" className="w-5 h-5" />
                </button>

                {/* Submit Button */}
                <button
                  onClick={() => handleExecuteQuery()}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {isLoading ? (
                    <>
                      <Icon name="loader-2" className="w-5 h-5" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Query</span>
                      <Icon name="arrow-right" className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Sample Prompt Pills */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center space-x-2 overflow-x-auto pb-1">
                <span className="text-xs text-slate-500 whitespace-nowrap font-medium">Try asking:</span>
                {(PRESET_QUERIES[activeDb] || PRESET_QUERIES.college_records).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(prompt);
                      handleExecuteQuery(prompt);
                    }}
                    className="text-xs bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 px-3 py-1 rounded-full whitespace-nowrap border border-slate-700/60 transition hover:border-cyan-500/40"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 flex items-start space-x-3 text-rose-300">
                <Icon name="alert-triangle" className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold">Query Blocked or Failed</p>
                  <p className="text-rose-200/80 mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Results */}
            {currentResult && (
              <div className="space-y-6">
                
                {/* 1. Answer Card */}
                <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-cyan-400 shadow-xl space-y-4">
                  
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                      <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs px-2.5 py-1 rounded-md font-medium">
                        Intent: {currentResult.intent}
                      </span>
                      {currentResult.entities && currentResult.entities.map((ent, i) => (
                        <span key={i} className="bg-slate-800 text-slate-300 border border-slate-700 text-xs px-2 py-0.5 rounded-md">
                          {ent}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Icon name="zap" className="w-3.5 h-3.5 text-amber-400" />
                        <span>{currentResult.execution_time_ms} ms</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="list" className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{currentResult.row_count} rows</span>
                      </span>
                      <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-400 font-mono text-[11px]">
                        Engine: {currentResult.provider_used}
                      </span>
                    </div>
                  </div>

                  <div className="text-slate-200 text-base leading-relaxed whitespace-pre-line font-normal">
                    {currentResult.natural_answer}
                  </div>

                  <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 font-mono text-sm space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center space-x-1.5 text-cyan-400 font-semibold">
                        <Icon name="code-2" className="w-4 h-4" />
                        <span>Generated Safe SQL</span>
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentResult.sanitized_sql);
                          alert("SQL copied to clipboard!");
                        }}
                        className="hover:text-white flex items-center space-x-1 text-slate-400 bg-slate-800/60 px-2 py-1 rounded transition"
                      >
                        <Icon name="copy" className="w-3.5 h-3.5" />
                        <span>Copy SQL</span>
                      </button>
                    </div>
                    <p className="text-cyan-300/90 overflow-x-auto py-1">
                      {currentResult.sanitized_sql}
                    </p>
                  </div>
                </div>

                {/* 2. Grid & Charts Container */}
                <div className="glass-panel rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="database" className="w-5 h-5 text-indigo-400" />
                      <h3 className="font-bold text-base text-slate-100">Dataset Output</h3>
                      <span className="text-xs text-slate-400">({currentResult.row_count} records)</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {currentResult.chart && (
                        <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex items-center space-x-1 text-xs">
                          <button
                            onClick={() => setViewMode("both")}
                            className={`px-2.5 py-1 rounded transition ${viewMode === 'both' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                          >
                            Split View
                          </button>
                          <button
                            onClick={() => setViewMode("chart")}
                            className={`px-2.5 py-1 rounded transition ${viewMode === 'chart' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                          >
                            Chart
                          </button>
                          <button
                            onClick={() => setViewMode("table")}
                            className={`px-2.5 py-1 rounded transition ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                          >
                            Table
                          </button>
                        </div>
                      )}

                      <button
                        onClick={exportCSV}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5 transition"
                      >
                        <Icon name="download" className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>

                      <button
                        onClick={exportJSON}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5 transition"
                      >
                        <Icon name="file-json" className="w-3.5 h-3.5" />
                        <span>JSON</span>
                      </button>
                    </div>
                  </div>

                  <div className={`grid gap-6 ${viewMode === 'both' && currentResult.chart ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    
                    {currentResult.chart && (viewMode === 'both' || viewMode === 'chart') && (
                      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[320px]">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 self-start">
                          {currentResult.chart.title}
                        </h4>
                        <div className="w-full h-64 relative">
                          <canvas ref={chartRef}></canvas>
                        </div>
                      </div>
                    )}

                    {(viewMode === 'both' || viewMode === 'table' || !currentResult.chart) && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            placeholder="Filter records..."
                            value={tableSearch}
                            onChange={(e) => setTableSearch(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200 placeholder-slate-500 w-48 outline-none focus:border-cyan-500"
                          />
                          <span className="text-xs text-slate-500">Showing {filteredRows.length} of {currentResult.row_count}</span>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-96">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider sticky top-0 border-b border-slate-800">
                              <tr>
                                {currentResult.columns.map((col, idx) => (
                                  <th key={idx} className="p-3 font-semibold whitespace-nowrap">
                                    {col.replace('_', ' ')}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                              {filteredRows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-800/40 transition">
                                  {currentResult.columns.map((col, cIdx) => (
                                    <td key={cIdx} className="p-3 text-slate-300 font-mono whitespace-nowrap">
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

                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 2: SCHEMA EXPLORER */}
        {activeTab === 'schema' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                <Icon name="table-2" className="w-6 h-6 text-cyan-400" />
                <span>Database Schema & Metadata Catalog</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Active Database: <span className="text-cyan-400 font-semibold">{schemaData?.database_name}</span> ({schemaData?.tables.length || 0} tables)
              </p>
            </div>

            {schemaData && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schemaData.tables.map((table) => (
                  <div key={table.name} className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-lg space-y-4 hover:border-cyan-500/40 transition">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="file-text" className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-bold text-slate-100 font-mono">{table.name}</h3>
                      </div>
                      <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                        {table.row_count} rows
                      </span>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {table.columns.map((col) => (
                        <div key={col.name} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-900/60 border border-slate-800/40 font-mono">
                          <span className="text-slate-300 font-medium">{col.name}</span>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-slate-500">{col.type}</span>
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
                      <div className="pt-2 border-t border-slate-800/60">
                        <span className="text-[11px] text-slate-500 block mb-1 font-semibold uppercase">Sample Record:</span>
                        <pre className="text-[10px] bg-slate-950 p-2 rounded text-slate-400 overflow-x-auto">
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

        {/* TAB 3: AUDIT TRAIL */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
                  <Icon name="clock" className="w-6 h-6 text-indigo-400" />
                  <span>Query Audit Trail & Security Logs</span>
                </h2>
                <p className="text-sm text-slate-400 mt-1">Complete chronological audit trail of executed queries and guardrail actions.</p>
              </div>

              <button
                onClick={async () => {
                  await fetch(`${API_BASE}/api/history`, { method: "DELETE" });
                  fetchHistory();
                }}
                className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-lg transition"
              >
                Clear History
              </button>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Time</th>
                      <th className="p-3">User Question</th>
                      <th className="p-3">Executed SQL</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Latency</th>
                      <th className="p-3">Rows</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {queryHistory.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-6 text-center text-slate-500 font-sans">
                          No audit entries recorded yet.
                        </td>
                      </tr>
                    ) : (
                      queryHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/30 transition">
                          <td className="p-3 text-slate-500 whitespace-nowrap">{item.timestamp}</td>
                          <td className="p-3 text-slate-200 font-sans max-w-xs truncate">{item.question}</td>
                          <td className="p-3 text-cyan-400 max-w-md truncate">{item.sql || "N/A"}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' :
                              item.status === 'BLOCKED_SECURITY' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400 whitespace-nowrap">{item.execution_time_ms} ms</td>
                          <td className="p-3 text-slate-300">{item.row_count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONFIG & DATA IMPORT */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <Icon name="cpu" className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-base text-slate-100">AI Model & LLM Provider</h3>
                  <p className="text-xs text-slate-400">Select model provider or use built-in offline engine.</p>
                </div>
              </div>

              <form onSubmit={saveSettings} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Active Provider</label>
                  <select
                    value={settingsData.llm_provider}
                    onChange={(e) => setSettingsData({ ...settingsData, llm_provider: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
                  >
                    <option value="offline">Built-in Heuristic & Rule Engine (Offline / Zero API Key)</option>
                    <option value="gemini">Google Gemini API (Gemini 2.5 Flash / 1.5 Pro)</option>
                    <option value="openai">OpenAI API (GPT-4o / GPT-4o-mini)</option>
                    <option value="ollama">Local Ollama (Llama 3 / CodeLlama)</option>
                  </select>
                </div>

                {settingsData.llm_provider === 'gemini' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Gemini API Key</label>
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      value={settingsData.gemini_key_input}
                      onChange={(e) => setSettingsData({ ...settingsData, gemini_key_input: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">Leave empty to auto-fallback to offline heuristic engine.</p>
                  </div>
                )}

                {settingsData.llm_provider === 'openai' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">OpenAI API Key</label>
                    <input
                      type="password"
                      placeholder="sk-..."
                      value={settingsData.openai_key_input}
                      onChange={(e) => setSettingsData({ ...settingsData, openai_key_input: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20"
                >
                  Save Provider Settings
                </button>
              </form>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <Icon name="upload-cloud" className="w-6 h-6 text-indigo-400" />
                <div>
                  <h3 className="font-bold text-base text-slate-100">Upload Custom CSV Dataset</h3>
                  <p className="text-xs text-slate-400">Upload any CSV file to instantly query it with AI.</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-8 text-center space-y-3 transition">
                <Icon name="file-spreadsheet" className="w-10 h-10 text-cyan-400 mx-auto" />
                <div>
                  <p className="text-sm font-medium text-slate-200">Select a CSV file to upload</p>
                  <p className="text-xs text-slate-500 mt-0.5">Auto-converted into an SQLite relational table</p>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
                />
              </div>

              {uploadStatus && (
                <p className="text-xs bg-slate-900 p-3 rounded-xl border border-slate-800 text-cyan-300 font-mono">
                  {uploadStatus}
                </p>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between">
        <span>Team NEURA X • HackWithAMYPO 2026 Stage 1</span>
        <span>PS7 — Local Database Question-Answering System</span>
      </footer>

    </div>
  );
}

// Render React App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
