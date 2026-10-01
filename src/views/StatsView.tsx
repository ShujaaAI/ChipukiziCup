import React, { useState } from 'react';
import { 
  Flame, 
  Shield, 
  Award, 
  Trophy, 
  Zap, 
  AlertTriangle, 
  Search, 
  Users,
  Target,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { TOP_SCORERS, DISCIPLINE_LEADERBOARD, Scorer, DisciplineRecord } from '../data/tournamentData';

export const StatsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scorers' | 'discipline' | 'goalkeepers'>('scorers');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredScorers = TOP_SCORERS.filter((s) => {
    if (!searchTerm) return true;
    return s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.team.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredDiscipline = DISCIPLINE_LEADERBOARD.filter((d) => {
    if (!searchTerm) return true;
    return d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.team.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const topGoalkeepers = [
    { rank: 1, name: 'Hamisi Bakari', team: 'Future Stars Academy', flag: '🇹🇿', matches: 3, cleanSheets: 3, goalsConceded: 0, saveRate: '100%' },
    { rank: 2, name: 'David Kamau', team: 'Ligi Ndogo SC', flag: '🇰🇪', matches: 3, cleanSheets: 2, goalsConceded: 2, saveRate: '88%' },
    { rank: 3, name: 'Zuberi Foba', team: 'Azam FC Youth', flag: '🇹🇿', matches: 3, cleanSheets: 1, goalsConceded: 3, saveRate: '82%' },
    { rank: 4, name: 'Derrick Ochan', team: 'KCCA Soccer Academy', flag: '🇺🇬', matches: 3, cleanSheets: 1, goalsConceded: 4, saveRate: '79%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            Player Leaderboards & Fair Play
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Tournament Statistics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official rankings for the Uhlsport Golden Boot, tournament discipline records, and Golden Glove clean sheets
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-white/10 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Updated after Matchday 3</span>
        </div>
      </div>

      {/* 4 Feature Highlight Banner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Golden Boot Leader */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1E2518] to-slate-900 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">
              Golden Boot Leader
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-sm font-black text-amber-300 font-mono">
              EM
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">Emmanuel Mollel</div>
              <div className="text-[11px] text-slate-400">Future Stars Academy (TZ)</div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-black text-base">6 Goals</span>
            <span className="text-slate-400">3 Matches · 3 Assists</span>
          </div>
        </div>

        {/* Top Playmaker */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#182330] to-slate-900 border border-teal-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 font-mono">
              Assist Master
            </span>
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-sm font-black text-teal-300 font-mono">
              AM
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">Ally Mkude</div>
              <div className="text-[11px] text-slate-400">Simba SC Juniors (TZ)</div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-teal-300 font-black text-base">4 Assists</span>
            <span className="text-slate-400">3 Goals scored</span>
          </div>
        </div>

        {/* Golden Glove Leader */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#162922] to-slate-900 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Golden Glove
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-sm font-black text-emerald-300 font-mono">
              HB
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">Hamisi Bakari</div>
              <div className="text-[11px] text-slate-400">Future Stars Academy (TZ)</div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-black text-base">3 Clean Sheets</span>
            <span className="text-slate-400">0 Goals Conceded</span>
          </div>
        </div>

        {/* Tournament Goals Summary */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Tournament Totals
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/5 text-slate-300 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white font-mono tabular-nums">48 Goals</div>
            <div className="text-xs text-slate-400 mt-1">In 15 Group Stage Fixtures</div>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>3.20 goals / match</span>
            <span className="text-emerald-400">18 Scorers</span>
          </div>
        </div>

      </div>

      {/* Tab Switcher & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('scorers')}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'scorers'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Top Scorers (Golden Boot)</span>
          </button>

          <button
            onClick={() => setActiveTab('discipline')}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'discipline'
                ? 'bg-rose-600 text-white font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Disciplinary & Cards</span>
          </button>

          <button
            onClick={() => setActiveTab('goalkeepers')}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'goalkeepers'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Golden Glove</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search player or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-slate-900/90 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* ================= TABLE 1: TOP SCORERS ================= */}
      {activeTab === 'scorers' && (
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 overflow-hidden shadow-xl">
          <div className="px-6 py-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Official Golden Boot Leaderboard
                </h3>
                <p className="text-[11px] text-slate-400">
                  U15 Boys Division · Sponsored by Uhlsport Match Ball
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 hidden sm:inline">
              Minimum 1 Match Played
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 bg-black/30 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 w-12 text-center">Rank</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Player Name</th>
                  <th className="py-3.5 px-4 min-w-[180px]">Club Academy</th>
                  <th className="py-3.5 px-4 text-center">Matches</th>
                  <th className="py-3.5 px-4 text-center">Assists</th>
                  <th className="py-3.5 px-6 text-right font-black text-amber-400 bg-amber-500/5">
                    Goals
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredScorers.map((player) => (
                  <tr key={player.rank} className="hover:bg-white/5 transition-colors group">
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs ${
                          player.rank === 1
                            ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                            : player.rank === 2
                            ? 'bg-slate-300 text-slate-950 font-bold'
                            : player.rank === 3
                            ? 'bg-amber-700 text-white font-bold'
                            : 'text-slate-400 bg-white/5'
                        }`}
                      >
                        {player.rank}
                      </span>
                    </td>

                    {/* Player Name with Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-teal-500/20 border border-white/15 flex items-center justify-center text-xs font-bold text-white font-mono shrink-0">
                          {player.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-bold text-white text-xs sm:text-sm group-hover:text-amber-300 transition-colors">
                            {player.name}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-mono">
                            {player.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Team */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-300">
                        {player.team}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {player.country}
                      </span>
                    </td>

                    {/* Matches */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-300 tabular-nums">
                      {player.matches}
                    </td>

                    {/* Assists */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-300 tabular-nums">
                      {player.assists}
                    </td>

                    {/* Goals */}
                    <td className="py-3.5 px-6 text-right font-mono font-black text-base text-amber-400 tabular-nums bg-amber-500/5">
                      {player.goals}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TABLE 2: DISCIPLINE & CARDS ================= */}
      {activeTab === 'discipline' && (
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 overflow-hidden shadow-xl">
          <div className="px-6 py-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Tournament Disciplinary Record
                </h3>
                <p className="text-[11px] text-slate-400">
                  Fair Play points and sanctions recorded by match commissioners
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Yellow = 1 pt · Red = 3 pts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 bg-black/30 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 w-12 text-center">Rank</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Player Name</th>
                  <th className="py-3.5 px-4 min-w-[180px]">Club Academy</th>
                  <th className="py-3.5 px-4 text-center">Matches</th>
                  <th className="py-3.5 px-4 text-center font-bold text-yellow-400">Yellow (🟨)</th>
                  <th className="py-3.5 px-4 text-center font-bold text-rose-500">Red (🟥)</th>
                  <th className="py-3.5 px-4 text-center font-mono">Total Fouls</th>
                  <th className="py-3.5 px-6 text-right font-bold text-slate-300">Sanction Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDiscipline.map((item) => (
                  <tr key={item.rank} className="hover:bg-white/5 transition-colors group">
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-400">
                      {item.rank}
                    </td>

                    {/* Player */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-rose-300 font-mono shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <span className="font-bold text-white text-xs sm:text-sm group-hover:text-rose-300 transition-colors">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    {/* Club */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span className="font-medium text-slate-300">{item.team}</span>
                      </div>
                    </td>

                    {/* Matches */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-400 tabular-nums">
                      {item.matches}
                    </td>

                    {/* Yellow Cards */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-yellow-400 tabular-nums text-sm">
                      {item.yellowCards}
                    </td>

                    {/* Red Cards */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-rose-500 tabular-nums text-sm">
                      {item.redCards}
                    </td>

                    {/* Fouls */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-300 tabular-nums">
                      {item.fouls}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-6 text-right">
                      {item.redCards > 0 || item.yellowCards >= 3 ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono font-bold text-[10px] border border-rose-500/30">
                          1 Match Ban
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px] font-mono">
                          Eligible
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TABLE 3: GOLDEN GLOVE ================= */}
      {activeTab === 'goalkeepers' && (
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 overflow-hidden shadow-xl">
          <div className="px-6 py-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Golden Glove (Top Goalkeepers)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Clean sheets and shutout percentage in the tournament
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              Clean Sheet Ranking
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 bg-black/30 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 w-12 text-center">Rank</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Goalkeeper</th>
                  <th className="py-3.5 px-4 min-w-[180px]">Club Academy</th>
                  <th className="py-3.5 px-4 text-center">Matches</th>
                  <th className="py-3.5 px-4 text-center">Goals Conceded</th>
                  <th className="py-3.5 px-4 text-center">Save Success</th>
                  <th className="py-3.5 px-6 text-right font-black text-emerald-400 bg-emerald-500/5">
                    Clean Sheets
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topGoalkeepers.map((gk) => (
                  <tr key={gk.rank} className="hover:bg-white/5 transition-colors group">
                    <td className="py-3.5 px-4 text-center font-mono font-bold">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${
                        gk.rank === 1 ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 bg-white/5'
                      }`}>
                        {gk.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white text-xs sm:text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-mono text-emerald-300 font-bold">
                          {gk.name.charAt(0)}
                        </div>
                        <span>{gk.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {gk.team} ({gk.flag})
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-300 tabular-nums">
                      {gk.matches}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-400 tabular-nums">
                      {gk.goalsConceded}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-300 tabular-nums">
                      {gk.saveRate}
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono font-black text-base text-emerald-400 tabular-nums bg-emerald-500/5">
                      {gk.cleanSheets}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
