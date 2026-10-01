import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Activity, 
  Flame, 
  ChevronRight, 
  Users, 
  Award, 
  Play, 
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  BarChart3,
  Layers,
  ChevronLeft,
  Filter
} from 'lucide-react';
import { Match, Standing, Scorer } from '../data/tournamentData';
import { NavigationTab } from '../components/Navbar';
import heroBannerImg from '../assets/images/chipkizi_hero_banner_1790842748794.jpg';
import trophyImg from '../assets/images/chipkizi_trophy_showcase_1790842762275.jpg';

interface HomeViewProps {
  onSelectTab: (tab: NavigationTab) => void;
  matches: Match[];
  standings: Standing[];
  topScorers: Scorer[];
  onOpenAdmin: (matchId?: string) => void;
  isAdminAuthenticated?: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  matches,
  standings,
  topScorers,
  onOpenAdmin,
  isAdminAuthenticated,
}) => {
  const [tickerCategory, setTickerCategory] = useState<string>('ALL');

  // Featured live match (prioritize LIVE, then first match)
  const featuredLiveMatch = matches.find((m) => m.status === 'LIVE') || matches[0];

  // Matches for the horizontal card ticker
  const filteredTickerMatches = matches.filter((m) => {
    if (tickerCategory === 'ALL') return true;
    return m.category === tickerCategory;
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. HERO SECTION: High-impact Visual Banner */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0F17]">
        {/* Cinematic Backdrop Image with Zero-Broken-Image Policy */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBannerImg}
            alt="Chipkizi Cup Youth Football Tournament Championship Match in Arusha"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.45] contrast-110"
          />
          {/* Gradients to guarantee 4.5:1 text contrast and seamless blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/90 to-transparent lg:to-[#0B0F17]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-[#0B0F17]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.18),transparent_60%)]" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tournament Kicker */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  15th Annual Edition · LIVE 2026
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Arusha, Tanzania
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-amber-400 font-medium">Mount Meru Arena</span>
              </div>

              {/* Tagline & Main Title */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 font-display">
                  The Ultimate Grassroots & Elite Football Showdown
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-[1.08] text-balance">
                  Where Future African <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                    Champions Are Born
                  </span>.
                </h1>
              </div>

              {/* Editorial Description */}
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Welcome to East Africa's largest international youth football festival. 
                Over 128 verified academies and 1,800+ players from 6 nations competing across 
                14 tournament grounds for glory, trophies, and professional scouting spotlights.
              </p>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectTab('fixtures')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>View Live Fixtures</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectTab('standings')}
                  className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-white/15 hover:border-white/30 transition-all flex items-center gap-2 shadow-sm"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Group Standings</span>
                </button>

                <button
                  onClick={() => onSelectTab('brackets')}
                  className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-medium text-sm border border-white/10 transition-all flex items-center gap-1.5"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Knockout Brackets</span>
                </button>
              </div>

              {/* Host & Sanctioning Proof Bar */}
              <div className="pt-4 flex items-center gap-4 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Sanctioned by TFF & CECAFA</span>
                <span className="text-slate-600">·</span>
                <span>Organized by Future Stars Academy</span>
              </div>
            </div>

            {/* Right Hero Card: Marquee Match of the Day (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#162032]/95 to-[#0F172A]/95 border border-emerald-500/40 p-6 shadow-2xl shadow-emerald-950/50 backdrop-blur-md">
                
                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-display">
                      Marquee Match · {featuredLiveMatch.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{featuredLiveMatch.round}</span>
                </div>

                {/* Scoreboard Body */}
                <div className="py-6 flex items-center justify-between gap-4">
                  {/* Home Team */}
                  <div className="flex-1 flex flex-col items-center text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 border border-white/20 flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-900/30">
                      🇹🇿
                    </div>
                    <span className="text-sm font-bold text-white leading-tight font-display">
                      {featuredLiveMatch.homeTeam}
                    </span>
                    <span className="text-[11px] text-slate-400">Arusha, TZ</span>
                  </div>

                  {/* Score Display */}
                  <div className="flex flex-col items-center px-2">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                        {featuredLiveMatch.homeScore ?? 0}
                      </span>
                      <span className="text-slate-600 font-bold text-2xl">:</span>
                      <span className="text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                        {featuredLiveMatch.awayScore ?? 0}
                      </span>
                    </div>

                    <div className="mt-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono border border-emerald-500/30 animate-pulse">
                      {featuredLiveMatch.status === 'LIVE' ? `LIVE ${featuredLiveMatch.minute}` : featuredLiveMatch.status}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 flex flex-col items-center text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-rose-900 border border-white/20 flex items-center justify-center text-2xl font-bold shadow-lg shadow-rose-950/30">
                      🇰🇪
                    </div>
                    <span className="text-sm font-bold text-white leading-tight font-display">
                      {featuredLiveMatch.awayTeam}
                    </span>
                    <span className="text-[11px] text-slate-400">Nairobi, KE</span>
                  </div>
                </div>

                {/* Goal Scorers list if available */}
                {featuredLiveMatch.scorers && featuredLiveMatch.scorers.length > 0 && (
                  <div className="pt-3 pb-2.5 px-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                      Match Events & Goals
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                      {featuredLiveMatch.scorers.map((s, i) => (
                        <span key={i} className="flex items-center gap-1 font-mono text-[11px]">
                          ⚽ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Footer */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate max-w-[180px] sm:max-w-none">{featuredLiveMatch.pitch}</span>
                  </div>
                  {isAdminAuthenticated ? (
                    <button
                      onClick={() => onOpenAdmin(featuredLiveMatch.id)}
                      className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Update Match</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectTab('fixtures')}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Match Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE / UPCOMING MATCH TICKER: Horizontal Card-Based Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-display">
                  Live & Featured Match Center
                </h2>
                <p className="text-xs text-slate-400">
                  Today's action across all 14 tournament pitches in Arusha
                </p>
              </div>
            </div>

            {/* Division Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {['ALL', 'U15', 'U17'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTickerCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    tickerCategory === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat === 'ALL' ? 'All Featured' : `${cat} Boys`}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Scrolling Card Track */}
          <div className="overflow-x-auto pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-4 min-w-max">
              {filteredTickerMatches.map((m) => {
                const isLive = m.status === 'LIVE';
                const isFinished = m.status === 'FINISHED';

                return (
                  <div
                    key={m.id}
                    onClick={() => onSelectTab('fixtures')}
                    className={`w-[300px] sm:w-[320px] p-4 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                      isLive
                        ? 'bg-gradient-to-br from-[#131F33] to-[#0E1624] border-emerald-500/40 shadow-lg shadow-emerald-950/30 hover:border-emerald-400'
                        : 'bg-slate-900/80 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-300 font-mono text-[11px]">{m.category}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400 truncate max-w-[130px] text-[11px]">{m.pitch.split('·')[0]}</span>
                      </div>

                      {/* Status indicator */}
                      {isLive ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold font-mono text-[11px] flex items-center gap-1.5 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          LIVE {m.minute}
                        </span>
                      ) : isFinished ? (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold font-mono text-[10px]">
                          FT · FINISHED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold font-mono text-[10px] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {m.time}
                        </span>
                      )}
                    </div>

                    {/* Match Score Line */}
                    <div className="py-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate max-w-[200px]">
                          {m.homeTeam}
                        </span>
                        <span className="font-mono font-bold text-sm text-white tabular-nums">
                          {isFinished || isLive ? m.homeScore : '-'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate max-w-[200px]">
                          {m.awayTeam}
                        </span>
                        <span className="font-mono font-bold text-sm text-white tabular-nums">
                          {isFinished || isLive ? m.awayScore : '-'}
                        </span>
                      </div>
                    </div>

                    {/* Footer Kicker */}
                    <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{m.round}</span>
                      <span className="text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-medium">
                        Match Center <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK STATS OVERVIEW CARDS: 4 Essential Tournament Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Tournament Vital Statistics
            </h2>
            <p className="text-xs text-slate-400">
              Aggregated performance metrics across all 8 age divisions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Total Teams */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#131D2E] to-slate-900 border border-white/10 hover:border-emerald-500/30 transition-all space-y-3 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Teams
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums">
                  128
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  Across 6 East & Central African Nations
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-400">
                <span>100% Registration Quota</span>
                <span className="text-slate-500 font-mono">1,840 Athletes</span>
              </div>
            </div>

            {/* Card 2: Matches Played */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#131D2E] to-slate-900 border border-white/10 hover:border-teal-500/30 transition-all space-y-3 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Matches Played
                </span>
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-teal-300 font-mono tabular-nums">
                  84 <span className="text-lg text-slate-500 font-normal">/ 340</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  Group stages 85% concluded
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-teal-400">
                <span>Matchday 3 in progress</span>
                <span className="text-slate-500 font-mono">14 Pitches Active</span>
              </div>
            </div>

            {/* Card 3: Goals Scored */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#131D2E] to-slate-900 border border-white/10 hover:border-amber-500/30 transition-all space-y-3 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Goals Scored
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Flame className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tabular-nums">
                  268
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  High-scoring 3.19 goals per match
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-amber-400">
                <span>Top Scorer: 6 goals</span>
                <span className="text-slate-500 font-mono">18 Hat-tricks</span>
              </div>
            </div>

            {/* Card 4: Disciplinary: Yellow / Red Cards */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#131D2E] to-slate-900 border border-white/10 hover:border-rose-500/30 transition-all space-y-3 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Disciplinary Cards
                </span>
                <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums flex items-center gap-2">
                  <span className="text-yellow-400">42</span>
                  <span className="text-xs text-slate-500">🟨</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-rose-500">2</span>
                  <span className="text-xs text-slate-500">🟥</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  Fair Play Index: 96.8% positive
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-yellow-400">
                <span>0.52 cards / match</span>
                <span className="text-slate-500 font-mono">FIFA Fair Play</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. QUICK ACCESS GRID: 4 Cards Linking Directly to Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Tournament Hub & Navigation
              </h2>
              <p className="text-xs text-slate-400">
                Jump straight into official standings, tournament ladders, rankings, and timetables
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold hidden sm:inline">
              Instant Access
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Quick Access 1: Group Standings */}
            <div
              onClick={() => onSelectTab('standings')}
              className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between hover:bg-slate-900/90 shadow-lg relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display">
                    Group Standings
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Live tables for Groups A through H across all 8 divisions with goal differentials, points, and form indicators.
                  </p>
                </div>

                {/* Mini Standings Preview */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>1. Future Stars Academy</span>
                    <span className="text-emerald-400 font-bold">7 PTS [Q]</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>2. Azam FC Youth</span>
                    <span className="text-emerald-400 font-bold">6 PTS [Q]</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>View Full Standings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Quick Access 2: Knockout Brackets */}
            <div
              onClick={() => onSelectTab('brackets')}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#141F32]/80 to-slate-900/80 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between hover:bg-slate-900 shadow-lg relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-display">
                    Knockout Brackets
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Interactive elimination tree mapping the path to the Grand Final at Sheikh Amri Abeid Stadium.
                  </p>
                </div>

                {/* Trophy showcase thumbnail */}
                <div className="relative rounded-xl overflow-hidden h-20 border border-white/10">
                  <img
                    src={trophyImg}
                    alt="Chipkizi Cup Official Championship Trophy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] font-bold text-amber-300 font-mono">
                      Grand Final Trophy
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>Explore Brackets</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Quick Access 3: Top Scorers (Golden Boot) */}
            <div
              onClick={() => onSelectTab('stats')}
              className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between hover:bg-slate-900/90 shadow-lg"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Flame className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-display">
                    Top Scorers & Stats
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Golden Boot rankings, Golden Glove clean sheets, Fair Play leaderboard, and individual scouting data.
                  </p>
                </div>

                {/* Top Scorers Snippet */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                  {topScorers.slice(0, 2).map((s) => (
                    <div key={s.rank} className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-300 font-medium">#{s.rank} {s.name.split(' ')[1]}</span>
                      <span className="font-mono font-bold text-amber-400">{s.goals} Goals</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>Leaderboards</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Quick Access 4: Full Schedule & Pitches */}
            <div
              onClick={() => onSelectTab('fixtures')}
              className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-teal-500/40 transition-all cursor-pointer group flex flex-col justify-between hover:bg-slate-900/90 shadow-lg"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors font-display">
                    Full Match Schedule
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Filter by date, pitch assignment (TGT, Braeburn, Sheikh Amri Abeid), category, and live match state.
                  </p>
                </div>

                {/* Venue Badge */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                  <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>3 Tournament Complexes</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Pitches 1–14 fully equipped with official timekeepers
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-teal-400">
                <span>Browse Schedule</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* East African Football Heritage Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#10192A] to-slate-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-mono">
              Scouting & Talent Pathway
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Over 20 International Scouts & Academies in Attendance
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Chipkizi Cup has served as the springboard for numerous professional players representing 
              national teams and top European leagues. All matches recorded and indexed for talent scouting.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('teams')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-colors whitespace-nowrap"
            >
              Browse 128 Teams
            </button>
            <button
              onClick={() => onOpenAdmin()}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors whitespace-nowrap"
            >
              Match Official Portal
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
