import React, { useState } from 'react';

interface GeneratedLink {
  id: string;
  prefix: string;
  guestName: string;
  url: string;
}

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState<GeneratedLink | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedFullId, setCopiedFullId] = useState<string | null>(null);

  const prefixes = [
    'Mr.',
    'Mrs.',
    'Miss',
    'Mr. & Mrs.',
    'Family',
    'Dear'
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const fullName = `${prefix} ${guestName.trim()}`;
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/?to=${encodeURIComponent(fullName)}`;
    
    setGeneratedLink({
      id: crypto.randomUUID(),
      prefix,
      guestName: guestName.trim(),
      url,
    });
  };

  const getFullMessage = (link: GeneratedLink) => {
    return `Dear ${link.prefix} ${link.guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link.url}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Ashan & Subhashini`;
  };

  const handleCopyLinkOnly = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink.url);
      setCopiedId(generatedLink.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyFullMessage = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(getFullMessage(generatedLink));
      setCopiedFullId(generatedLink.id);
      setTimeout(() => setCopiedFullId(null), 2000);
    } catch (err) {
      console.error('Failed to copy full message', err);
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Generator Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            LINK GENERATOR
          </h1>

          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Select Prefix</label>
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                >
                  {prefixes.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Guest Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sanjaya"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm active:scale-[0.99] flex justify-center items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Generate Link
            </button>
          </form>
        </div>

        {/* Generated Message Output */}
        {generatedLink && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Generated Invitation Message
            </h2>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-6">
              <pre className="whitespace-pre-wrap font-sans text-slate-700 text-sm leading-relaxed">
                {getFullMessage(generatedLink)}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleCopyLinkOnly}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                {copiedId === generatedLink.id ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied Link!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy Link Only
                  </>
                )}
              </button>

              <button
                onClick={handleCopyFullMessage}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-50 border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                {copiedFullId === generatedLink.id ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied Message!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Copy Full Message
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


