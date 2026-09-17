import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('resources');

  // ⚡ Updated with the real Discord OAuth URL for DangerousX
  // Replace 'YOUR_CLIENT_ID' with your actual Discord application client ID
  // and 'YOUR_ENCODED_REDIRECT_URI' with your encoded callback URL (e.g., https://yourdomain.com/api/callback)
  const DISCORD_OAUTH_URL =
    'https://discord.com/api/oauth2/authorize?client_id=1542916030685511740&redirect_uri=https://moonwalkervault.dpdns.org//auth/discord/callback&response_type=code&scope=identify%20guilds';

  const [authStep, setAuthStep] = useState('loggedOut'); // 'loggedOut', 'authenticating', 'loggedIn'
  const [userProfile, setUserProfile] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fact of the day widget state
  const [factOpen, setFactOpen] = useState(true);
  const [factIndex, setFactIndex] = useState(0);

  const mjFacts = [
    "Michael Jackson invented and patented a special pair of anti-gravity leaning shoes used during his 'Smooth Criminal' live performances.",
    "The legendary short film for 'Thriller' was selected for the National Film Preservation Board registry by the Library of Congress in 2009.",
    "During the 'Dangerous World Tour', Michael personally designed and coordinated massive multi-tiered pyrotechnic stage layouts.",
    "The multi-track vocal stems for 'Billie Jean' feature iconic acapella layers recorded in single, uninterrupted vocal takes.",
    "Michael's signature glittering rhinestone glove was originally a custom golf glove he modified by hand.",
  ];

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % mjFacts.length);
  };

  const resourcesData = [
    {
      id: 1,
      title: 'Dangerous Tour 4K Stage FX & Lighting Overlays',
      category: 'Overlays',
      size: '1.2 GB',
      type: 'Video Pack',
      date: '2026-06',
    },
    {
      id: 2,
      title: 'Invincible Era Studio Vocal Acapella Stems',
      category: 'Audio Stems',
      size: '480 MB',
      type: 'Audio Multi-track',
      date: '2026-07',
    },
    {
      id: 3,
      title: 'Thriller Cinematic Color Grading LUTs',
      category: 'Presets',
      size: '35 MB',
      type: '.cube / .xmp',
      date: '2026-05',
    },
    {
      id: 4,
      title: 'Smooth Criminal Custom Font & Title Typography',
      category: 'Typography',
      size: '12 MB',
      type: '.otf / .ttf',
      date: '2026-08',
    },
    {
      id: 5,
      title: 'HIStory Album Art PSD Mockup & Textures',
      category: 'Graphics',
      size: '850 MB',
      type: 'Photoshop PSD',
      date: '2026-06',
    },
    {
      id: 6,
      title: 'Bad Tour Live Guitar & Synth Soundfonts',
      category: 'Audio Stems',
      size: '210 MB',
      type: '.sf2 Soundfont',
      date: '2026-07',
    },
  ];

  const categories = [
    'All',
    'Audio Stems',
    'Overlays',
    'Presets',
    'Typography',
    'Graphics',
  ];

  const filteredResources = resourcesData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Discord Login redirection (Live OAuth vs CodePen Fallback Simulation)
  const handleDiscordLogin = (
    isLiveRedirect = false,
    simulateHasRole = true
  ) => {
    if (isLiveRedirect) {
      // This triggers the exact real-world redirect to Discord's OAuth authorization screen shown in your screenshot
      window.location.href = DISCORD_OAUTH_URL;
      return;
    }

    // Fallback simulation for local/testing environment
    setAuthStep('authenticating');
    setTimeout(() => {
      setUserProfile({
        username: simulateHasRole ? 'MoonwalkerPro#0001' : 'GuestUser#9982',
        avatar: simulateHasRole ? '👑' : '👤',
        hasLeakerRole: simulateHasRole,
        roleId: simulateHasRole ? '1540748020037976206' : null,
      });
      setAuthStep('loggedIn');
    }, 1200);
  };

  const handleLogout = () => {
    setUserProfile(null);
    setAuthStep('loggedOut');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Floating Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20">
        {/* Brand Logo Pill */}
        <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/80 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
          <span className="font-bold tracking-wider text-white text-sm font-serif italic flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Moonwalker Vault{' '}
            <span className="text-[10px] text-amber-400 font-mono">
              Vault Hub
            </span>
          </span>
        </div>

        {/* Center Navigation Pill Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 p-1.5 rounded-full backdrop-blur-md shadow-lg">
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'resources'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            📁 Resources
          </button>
          <button
            onClick={() => setActiveTab('leaks')}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'leaks'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ⚡ Leaks & Drops
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'requests'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            💬 Requests
          </button>
          <button
            onClick={() => setActiveTab('editors')}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'editors'
                ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            👥 Editors
          </button>
        </nav>

        {/* Right Side: Explorer & Discord Auth State */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('resources')}
            className="w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-all shadow-md backdrop-blur-md"
            title="Explore Hub"
          >
            🧭
          </button>

          {authStep === 'loggedOut' && (
            <button
              onClick={() => handleDiscordLogin(true)}
              className="px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-all flex items-center gap-2 shadow-lg shadow-zinc-100/10 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.15c2.65-27.28-4.41-51.1-19.13-72.15ZM42.45,65.69c-6.18,0-11.28-5.7-11.28-12.73s5.02-12.73,11.28-12.73c6.3,0,11.43,5.75,11.28,12.73C53.73,60,48.75,65.69,42.45,65.69Zm42.24,0c-6.18,0-11.28-5.7-11.28-12.73s5.02-12.73,11.28-12.73c6.3,0,11.43,5.75,11.28,12.73C95.73,60,90.75,65.69,84.69,65.69Z" />
              </svg>
              Login with Discord
            </button>
          )}

          {authStep === 'authenticating' && (
            <div className="px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono animate-pulse">
              Authenticating & checking roles...
            </div>
          )}

          {authStep === 'loggedIn' && (
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-full">
              <span className="text-sm">{userProfile.avatar}</span>
              <span className="text-xs font-semibold text-white">
                {userProfile.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-[10px] text-zinc-500 hover:text-red-400 ml-2 font-mono cursor-pointer"
              >
                [Logout]
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-10 z-10">
        {/* Hero Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-zinc-900/60 via-zinc-900/30 to-zinc-900/60 border border-zinc-800/80 p-8 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono">
                🧤 Moonwalker Vault Edition
              </span>
              <span className="text-xs text-zinc-500 font-mono">v2.4.0</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              Welcome to Moonwalker Vault
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Your elite hub for professional editing presets, isolated studio
              stems, rare community drops, and custom resources—curated,
              organized, and built for creators.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('resources')}
                className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                Browse Vault Resources
              </button>
              <button
                onClick={() => setActiveTab('leaks')}
                className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-sm border border-zinc-700/60 transition-all flex items-center gap-2 group cursor-pointer"
              >
                View Classified Leaks{' '}
                <span className="group-hover:translate-x-1 transition-transform text-amber-400">
                  →
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 border border-zinc-700/50 flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-xl group p-6 text-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-500/10 to-transparent animate-pulse pointer-events-none"></div>
              <span className="text-3xl mb-2">⚡</span>
              <span className="text-xl font-serif italic font-bold tracking-widest text-zinc-100 drop-shadow-[0_0_15px_rgba(255,191,0,0.3)]">
                Moonwalker Vault
              </span>
              <span className="text-[10px] font-mono text-amber-400/80 mt-1 uppercase tracking-wider">
                OAuth Bot Hub
              </span>
            </div>
          </div>
        </div>

        {/* Tab Controls & Filter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-zinc-950 font-semibold shadow-md shadow-amber-500/10'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search assets, stems, presets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 transition-all placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Content Feed */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {activeTab === 'resources' || activeTab === 'leaks' ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <span>📂</span> {selectedCategory} Vault Assets (
                    {filteredResources.length})
                  </h2>
                  <span className="text-xs text-zinc-500 font-mono">
                    Secure Server Node 04
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredResources.map((item) => (
                    <div
                      key={item.id}
                      className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between gap-4 backdrop-blur-sm group"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] px-2.5 py-1 rounded-md bg-zinc-800/80 text-amber-400 font-mono border border-zinc-700/50">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-400 font-mono">
                          {item.type} • {item.size}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{' '}
                          Verified File
                        </span>
                        <button
                          onClick={() =>
                            alert(`Downloading secure asset: ${item.title}`)
                          }
                          className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-all shadow-sm cursor-pointer"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredResources.length === 0 && (
                    <div className="col-span-full py-16 text-center bg-zinc-900/30 border border-zinc-800/80 rounded-2xl">
                      <p className="text-zinc-500 text-sm">
                        No matching resources found in this category.
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : activeTab === 'requests' ? (
              <div className="flex flex-col gap-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                  💬 Community Asset Requests
                </h2>
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-sm">
                  <p className="text-xs text-zinc-400">
                    Looking for a specific live tour audio recording, plugin
                    preset, or custom overlay? Submit your request to the
                    community curators.
                  </p>
                  <input
                    type="text"
                    placeholder="Request title..."
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                  />
                  <textarea
                    placeholder="Provide details or reference links..."
                    rows="3"
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 resize-none"
                  ></textarea>
                  <button
                    onClick={() =>
                      alert('Request submitted successfully to the curators!')
                    }
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                  👥 Verified Curators & Editors
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-zinc-950 font-bold text-lg">
                      D
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Moonwalker Vault Admin
                      </h3>
                      <p className="text-xs text-amber-400 font-mono">
                        Lead Bot Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Protected Leaker Hub Panel */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              🛡️ Leaker Hub Access
            </h2>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-xl pointer-events-none"></div>

              {authStep !== 'loggedIn' ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center mx-auto text-xl shadow-inner">
                    🔒
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-white">
                      Upload Panel Locked
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Requires Discord verification via{' '}
                      <span className="text-white font-medium">
                        Moonwalker Vault
                      </span>{' '}
                      to detect Role ID{' '}
                      <span className="text-amber-400 font-mono text-[10px]">
                        1540748020037976206
                      </span>
                      .
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    {/* Live Redirect button opening the real OAuth Screen */}
                    <button
                      onClick={() => handleDiscordLogin(true)}
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 127.14 96.36"
                      >
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.15c2.65-27.28-4.41-51.1-19.13-72.15ZM42.45,65.69c-6.18,0-11.28-5.7-11.28-12.73s5.02-12.73,11.28-12.73c6.3,0,11.43,5.75,11.28,12.73C53.73,60,48.75,65.69,42.45,65.69Zm42.24,0c-6.18,0-11.28-5.7-11.28-12.73s5.02-12.73,11.28-12.73c6.3,0,11.43,5.75,11.28,12.73C95.73,60,90.75,65.69,84.69,65.69Z" />
                      </svg>
                      Connect with Moonwalker Vault
                    </button>

                    {/* Sandbox testing simulation buttons */}
                    <button
                      onClick={() => handleDiscordLogin(false, true)}
                      className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 font-medium text-[11px] border border-zinc-700 transition-all cursor-pointer"
                    >
                      [Sandbox] Simulate with Leaker Role
                    </button>
                  </div>
                </div>
              ) : userProfile.hasLeakerRole ? (
                <div className="flex flex-col gap-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-800">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>{' '}
                      Role Detected: Leaker
                    </span>
                    <span className="text-zinc-500 font-mono text-[10px]">
                      ID: 1540...
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300">
                    Publish exclusive drop to vault:
                  </p>

                  <input
                    type="text"
                    placeholder="Resource Title..."
                    className="w-full bg-black/50 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                  />

                  <select className="w-full bg-black/50 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500">
                    <option>Audio Stems</option>
                    <option>Overlays & FX</option>
                    <option>Presets / LUTs</option>
                    <option>Typography</option>
                    <option>Graphics</option>
                  </select>

                  <textarea
                    placeholder="Download link / password..."
                    rows="2"
                    className="w-full bg-black/50 border border-zinc-800 rounded-xl p-3.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 resize-none"
                  ></textarea>

                  <button
                    onClick={() => alert('New leak successfully published!')}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
                  >
                    🚀 Publish to Vault
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-xl text-red-400">
                    ⛔
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-white">
                      Access Denied
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Connected via DangerousX (
                      <span className="text-zinc-200">
                        {userProfile.username}
                      </span>
                      ), but the required{' '}
                      <span className="text-amber-400 font-mono text-[10px]">
                        Leaker Role
                      </span>{' '}
                      was missing.
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs border border-zinc-700 transition-all cursor-pointer"
                  >
                    Try Another Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Fact of the Day Widget */}
      {factOpen && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-zinc-900/95 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>💡</span> MJ Fact of the Day
            </span>
            <button
              onClick={() => setFactOpen(false)}
              className="text-zinc-500 hover:text-zinc-300 text-xs font-mono cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            "{mjFacts[factIndex]}"
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-zinc-500 font-mono">
              Fact {factIndex + 1} of {mjFacts.length}
            </span>
            <button
              onClick={nextFact}
              className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-[10px] font-semibold border border-zinc-700/50 transition-all cursor-pointer"
            >
              Next Fact →
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-zinc-900 text-xs text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
        <span>© 2026 Moonwalker Vault. All rights reserved.</span>
        <span className="font-mono text-[10px]">
          Secured via DangerousX Bot OAuth
        </span>
      </footer>
    </div>
  );
}
