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
  ChevronRight,
  MapPin,
  Clock
} from 'lucide-react';
import { TOP_SCORERS, DISCIPLINE_LEADERBOARD, Scorer, DisciplineRecord, Standing } from '../data/tournamentData';
import { TournamentSidebar } from '../components/TournamentSidebar';
import { NavigationTab } from '../components/Navbar';

interface StatsViewProps {
  onSelectTab?: (tab: NavigationTab) => void;
  standings?: Standing[];
}

export const StatsView: React.FC<StatsViewProps> = ({
  onSelectTab,
  standings = [],
}) => {
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
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Breadcrumb & Page Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
              <span>Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-red-600 font-bold">Tournament Statistics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display uppercase tracking-tight">
              PLAYER LEADERBOARDS & AWARDS
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1 rounded bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow">
              Official Match Records
            </span>
          </div>
        </div>

        {/* 4 Feature Stat Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Golden Boot Leader */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 font-mono">
                Golden Boot Leader
              </span>
              <div className="w-6 h-6 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-xs font-black text-amber-800 font-mono">
                EM
              </div>
              <div className="truncate">
                <div className="text-sm font-extrabold text-slate-900 truncate">Emmanuel Mollel</div>
                <div className="text-[10px] text-slate-500 truncate">🇹🇿 Future Stars Academy</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-red-600 font-black font-mono text-base">6 Goals</span>
              <span className="text-slate-400 text-[11px]">3 Matches · 3 Assists</span>
            </div>
          </div>

          {/* Card 2: Assist Master */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs hover:border-teal-400 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 font-mono">
                Assist Master
              </span>
              <div className="w-6 h-6 rounded bg-teal-50 text-teal-700 flex items-center justify-center">
                <Target className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-xs font-black text-teal-800 font-mono">
                AM
              </div>
              <div className="truncate">
                <div className="text-sm font-extrabold text-slate-900 truncate">Ally Mkude</div>
                <div className="text-[10px] text-slate-500 truncate">🇹🇿 Simba SC Juniors</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-teal-700 font-black font-mono text-base">4 Assists</span>
              <span className="text-slate-400 text-[11px]">3 Goals scored</span>
            </div>
          </div>

          {/* Card 3: Golden Glove Leader */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 font-mono">
                Golden Glove
              </span>
              <div className="w-6 h-6 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-xs font-black text-emerald-800 font-mono">
                HB
              </div>
              <div className="truncate">
                <div className="text-sm font-extrabold text-slate-900 truncate">Hamisi Bakari</div>
                <div className="text-[10px] text-slate-500 truncate">🇹🇿 Future Stars Academy</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-black font-mono text-base">3 Clean Sheets</span>
              <span className="text-slate-400 text-[11px]">0 Goals Conceded</span>
            </div>
          </div>

          {/* Card 4: Tournament Totals */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 font-mono">
                Tournament Totals
              </span>
              <div className="w-6 h-6 rounded bg-slate-100 text-slate-600 flex items-center justify-center">
                <Trophy className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">48 Goals</div>
              <div className="text-[11px] text-slate-500">Across 15 Group Matches</div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-red-600 font-bold font-mono">3.20 goals / match</span>
              <span className="text-slate-500 text-[11px]">18 Scorers</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MAIN 2-COLUMN STRUCTURE MATCHING REFERENCE IMAGE                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ----------------- LEFT COLUMN (8 Cols / 67%) ----------------- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Crimson Red Ribbon Banner for Categories */}
            <div className="bg-[#DC2626] text-white rounded-t-lg px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm overflow-x-auto">
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-black text-sm uppercase tracking-wider font-display">
                  AWARD CATEGORIES
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('scorers')}
                  className={`transition-colors py-0.5 cursor-pointer flex items-center gap-1 ${
                    activeTab === 'scorers'
                      ? 'text-white font-extrabold underline underline-offset-4'
                      : 'text-red-100 hover:text-white'
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  <span>Top Scorers (Golden Boot)</span>
                </button>

                <button
                  onClick={() => setActiveTab('discipline')}
                  className={`transition-colors py-0.5 cursor-pointer flex items-center gap-1 ${
                    activeTab === 'discipline'
                      ? 'text-white font-extrabold underline underline-offset-4'
                      : 'text-red-100 hover:text-white'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>Discipline & Cards</span>
                </button>

                <button
                  onClick={() => setActiveTab('goalkeepers')}
                  className={`transition-colors py-0.5 cursor-pointer flex items-center gap-1 ${
                    activeTab === 'goalkeepers'
                      ? 'text-white font-extrabold underline underline-offset-4'
                      : 'text-red-100 hover:text-white'
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  <span>Golden Glove</span>
                </button>
              </div>
            </div>

            {/* Filter Search Card */}
            <div className="bg-white border border-slate-200 rounded-b-lg p-3 sm:p-4 shadow-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search player name or academy..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-slate-900 placeholder-slate-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* ================= TABLE 1: TOP SCORERS ================= */}
            {activeTab === 'scorers' && (
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
                <div className="bg-[#111827] text-white px-4 py-3 flex items-center justify-between border-l-4 border-red-600">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span className="font-extrabold text-sm uppercase tracking-wide font-display">
                      Uhlsport Golden Boot Leaderboard
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-mono font-bold">
                    Official Matchday 3 Tally
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
                        <th className="py-2.5 pl-4 w-12 text-center">RANK</th>
                        <th className="py-2.5">PLAYER NAME</th>
                        <th className="py-2.5">ACADEMY</th>
                        <th className="py-2.5 text-center w-16">MATCHES</th>
                        <th className="py-2.5 text-center w-16">ASSISTS</th>
                        <th className="py-2.5 text-right pr-6 w-20 font-black text-slate-900">GOALS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredScorers.map((player) => (
                        <tr key={player.rank} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 pl-4 text-center font-mono font-bold">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded font-black text-xs ${
                                player.rank === 1
                                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                                  : player.rank === 2
                                  ? 'bg-slate-200 text-slate-800'
                                  : player.rank === 3
                                  ? 'bg-amber-700 text-white'
                                  : 'text-slate-500 bg-slate-100'
                              }`}
                            >
                              {player.rank}
                            </span>
                          </td>

                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-700 font-mono shrink-0">
                                {player.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <span className="font-extrabold text-slate-900 block truncate">
                                  {player.name}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {player.category}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3">
                            <span className="font-semibold text-slate-800">
                              {player.team}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {player.country}
                            </span>
                          </td>

                          <td className="py-3 text-center font-mono text-slate-600">{player.matches}</td>
                          <td className="py-3 text-center font-mono text-slate-600">{player.assists}</td>
                          <td className="py-3 text-right pr-6 font-mono font-black text-base text-red-600">
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
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
                <div className="bg-[#111827] text-white px-4 py-3 flex items-center justify-between border-l-4 border-red-600">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-extrabold text-sm uppercase tracking-wide font-display">
                      Tournament Disciplinary Records
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Yellow = 1 pt · Red = 3 pts
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
                        <th className="py-2.5 pl-4 w-12 text-center">RANK</th>
                        <th className="py-2.5">PLAYER NAME</th>
                        <th className="py-2.5">ACADEMY</th>
                        <th className="py-2.5 text-center w-16">MATCHES</th>
                        <th className="py-2.5 text-center w-16 text-amber-600 font-black">YELLOW 🟨</th>
                        <th className="py-2.5 text-center w-16 text-red-600 font-black">RED 🟥</th>
                        <th className="py-2.5 text-right pr-6 w-20 font-black text-slate-900">POINTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredDiscipline.map((item) => (
                        <tr key={item.rank} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 pl-4 text-center font-mono font-bold text-slate-600">
                            {item.rank}
                          </td>

                          <td className="py-3">
                            <span className="font-extrabold text-slate-900 block">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {item.category}
                            </span>
                          </td>

                          <td className="py-3 font-semibold text-slate-800">
                            {item.team}
                          </td>

                          <td className="py-3 text-center font-mono text-slate-600">{item.matches}</td>
                          <td className="py-3 text-center font-mono font-bold text-amber-600">{item.yellowCards}</td>
                          <td className="py-3 text-center font-mono font-bold text-red-600">{item.redCards}</td>
                          <td className="py-3 text-right pr-6 font-mono font-black text-slate-900">
                            {item.yellowCards * 1 + item.redCards * 3} pts
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
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
                <div className="bg-[#111827] text-white px-4 py-3 flex items-center justify-between border-l-4 border-red-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="font-extrabold text-sm uppercase tracking-wide font-display">
                      Golden Glove Clean Sheets
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">
                    Goalkeeper Rankings
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
                        <th className="py-2.5 pl-4 w-12 text-center">RANK</th>
                        <th className="py-2.5">GOALKEEPER</th>
                        <th className="py-2.5">ACADEMY</th>
                        <th className="py-2.5 text-center w-16">MATCHES</th>
                        <th className="py-2.5 text-center w-20">CONCEDED</th>
                        <th className="py-2.5 text-center w-20">SAVE %</th>
                        <th className="py-2.5 text-right pr-6 w-24 font-black text-emerald-700">CLEAN SHEETS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {topGoalkeepers.map((gk) => (
                        <tr key={gk.rank} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 pl-4 text-center font-mono font-bold text-slate-600">
                            {gk.rank}
                          </td>

                          <td className="py-3">
                            <span className="font-extrabold text-slate-900 block">
                              {gk.name}
                            </span>
                          </td>

                          <td className="py-3">
                            <span className="font-semibold text-slate-800">
                              {gk.flag} {gk.team}
                            </span>
                          </td>

                          <td className="py-3 text-center font-mono text-slate-600">{gk.matches}</td>
                          <td className="py-3 text-center font-mono text-slate-600">{gk.goalsConceded}</td>
                          <td className="py-3 text-center font-mono font-bold text-slate-700">{gk.saveRate}</td>
                          <td className="py-3 text-right pr-6 font-mono font-black text-emerald-600 text-sm">
                            {gk.cleanSheets} Clean
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* ----------------- RIGHT COLUMN (SIDEBAR, 4 Cols / 33%) ----------------- */}
          <div className="lg:col-span-4">
            <TournamentSidebar
              standings={standings}
              onSelectTab={onSelectTab}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
