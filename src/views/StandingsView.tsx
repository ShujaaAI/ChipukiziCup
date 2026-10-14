import React, { useState } from 'react';
import { 
  Trophy, 
  ChevronRight, 
  Award, 
  CheckCircle2, 
  Flame, 
  Shield, 
  TrendingUp,
  BarChart3,
  Layers,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { Standing, TEAMS_DATA } from '../data/tournamentData';
import { TournamentSidebar } from '../components/TournamentSidebar';
import { NavigationTab } from '../components/Navbar';

interface StandingsViewProps {
  standings: Standing[];
  onSelectTab?: (tab: NavigationTab) => void;
}

export const StandingsView: React.FC<StandingsViewProps> = ({ 
  standings,
  onSelectTab,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [selectedDivision, setSelectedDivision] = useState<string>('U15');

  const groups = ['All', 'Group A', 'Group B', 'Group C', 'Group D'];
  const divisions = [
    { id: 'U15', label: 'U15 Boys Cup' },
    { id: 'U17', label: 'U17 Boys Championship' },
    { id: 'Girls', label: 'U15 & U17 Girls Cup' },
  ];

  const filteredStandings = selectedGroup === 'All'
    ? standings
    : standings.filter((s) => s.group === selectedGroup);

  const groupNames = Array.from(new Set(filteredStandings.map((s) => s.group)));

  const getTeamInfo = (teamName: string) => {
    return TEAMS_DATA.find((t) => t.name.toLowerCase() === teamName.toLowerCase());
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Breadcrumb & Page Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
              <span>Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-red-600 font-bold">Standings & Tables</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display uppercase tracking-tight">
              TOURNAMENT GROUP TABLES
            </h1>
          </div>

          {/* Division Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg shadow-2xs self-start sm:self-auto">
            {divisions.map((div) => (
              <button
                key={div.id}
                onClick={() => setSelectedDivision(div.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                  selectedDivision === div.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {div.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN 2-COLUMN STRUCTURE MATCHING REFERENCE IMAGE                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ----------------- LEFT COLUMN (8 Cols / 67%) ----------------- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Crimson Red Ribbon Banner for Groups Filter */}
            <div className="bg-[#DC2626] text-white rounded-t-lg px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm overflow-x-auto">
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-black text-sm uppercase tracking-wider font-display">
                  GROUP STAGE TABLES
                </span>
              </div>

              {/* Group Tabs */}
              <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
                {groups.map((grp) => (
                  <button
                    key={grp}
                    onClick={() => setSelectedGroup(grp)}
                    className={`transition-colors py-0.5 cursor-pointer ${
                      selectedGroup === grp
                        ? 'text-white font-extrabold underline underline-offset-4'
                        : 'text-red-100 hover:text-white'
                    }`}
                  >
                    {grp === 'All' ? 'All Groups' : grp}
                  </button>
                ))}
              </div>
            </div>

            {/* Standings Group Tables List */}
            <div className="space-y-6">
              {groupNames.map((grpName) => {
                const groupTeams = filteredStandings
                  .filter((s) => s.group === grpName)
                  .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);

                return (
                  <div 
                    key={grpName} 
                    className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs"
                  >
                    {/* Header Bar for Group */}
                    <div className="bg-[#111827] text-white px-4 py-3 flex items-center justify-between border-l-4 border-red-600">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm uppercase tracking-wider font-display">
                          {grpName}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-xs text-slate-300 font-medium">
                          {selectedDivision === 'U15' ? 'U15 Boys Cup' : selectedDivision === 'U17' ? 'U17 Boys' : 'Girls Cup'}
                        </span>
                      </div>
                      <span className="text-[11px] text-amber-400 font-mono font-bold">
                        Top 2 Qualify to Quarter-Finals
                      </span>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200">
                            <th className="py-2.5 pl-4 w-10">POS</th>
                            <th className="py-2.5">TEAM / ACADEMY</th>
                            <th className="py-2.5 text-center w-9">MP</th>
                            <th className="py-2.5 text-center w-9">W</th>
                            <th className="py-2.5 text-center w-9">D</th>
                            <th className="py-2.5 text-center w-9">L</th>
                            <th className="py-2.5 text-center w-10 hidden sm:table-cell">GF</th>
                            <th className="py-2.5 text-center w-10 hidden sm:table-cell">GA</th>
                            <th className="py-2.5 text-center w-10">GD</th>
                            <th className="py-2.5 text-right pr-4 w-12 font-black text-slate-900">PTS</th>
                            <th className="py-2.5 text-center w-24 hidden md:table-cell">FORM</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {groupTeams.map((s, idx) => {
                            const teamInfo = getTeamInfo(s.team);
                            const isChampionship = idx < 2;
                            const isShield = idx === 2;

                            return (
                              <tr 
                                key={s.team}
                                className={`hover:bg-slate-50 transition-colors ${
                                  isChampionship ? 'bg-emerald-50/20' : ''
                                }`}
                              >
                                {/* Position */}
                                <td className="py-3 pl-4 font-mono font-bold">
                                  <div className="flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      isChampionship ? 'bg-emerald-500' : isShield ? 'bg-amber-400' : 'bg-slate-300'
                                    }`} />
                                    <span className={isChampionship ? 'text-slate-900 font-black' : 'text-slate-600'}>
                                      {idx + 1}
                                    </span>
                                  </div>
                                </td>

                                {/* Team Name & Badge */}
                                <td className="py-3 font-semibold text-slate-900">
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-base shrink-0">
                                      {teamInfo?.flag || '⚽'}
                                    </span>
                                    <span className="font-extrabold truncate max-w-[170px] sm:max-w-none">
                                      {s.team}
                                    </span>
                                  </div>
                                </td>

                                <td className="py-3 text-center font-mono text-slate-600 font-medium">{s.mp}</td>
                                <td className="py-3 text-center font-mono text-slate-600">{s.w}</td>
                                <td className="py-3 text-center font-mono text-slate-600">{s.d}</td>
                                <td className="py-3 text-center font-mono text-slate-600">{s.l}</td>
                                <td className="py-3 text-center font-mono text-slate-500 hidden sm:table-cell">{s.gf}</td>
                                <td className="py-3 text-center font-mono text-slate-500 hidden sm:table-cell">{s.ga}</td>
                                <td className="py-3 text-center font-mono font-semibold text-slate-700">
                                  {s.gd > 0 ? `+${s.gd}` : s.gd}
                                </td>
                                
                                {/* Points */}
                                <td className="py-3 text-right pr-4 font-mono font-black text-sm text-slate-900">
                                  {s.pts}
                                </td>

                                {/* Form Guide */}
                                <td className="py-3 text-center hidden md:table-cell">
                                  <div className="flex items-center justify-center gap-1">
                                    {s.form && s.form.length > 0 ? (
                                      s.form.slice(-3).map((f, i) => (
                                        <span
                                          key={i}
                                          className={`w-5 h-5 rounded-full text-[10px] font-mono font-black flex items-center justify-center ${
                                            f === 'W'
                                              ? 'bg-emerald-600 text-white'
                                              : f === 'D'
                                              ? 'bg-amber-400 text-slate-950'
                                              : 'bg-red-500 text-white'
                                          }`}
                                        >
                                          {f}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-slate-300 font-mono">-</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Footer footnote */}
                    <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Cup Knockouts (Rank 1-2)</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span>Shield Knockouts (Rank 3)</span>
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        Official CECAFA Tiebreakers Apply
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Tournament Rules / Scoring Breakdown Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-red-600" />
                <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-900 font-display">
                  Tournament Scoring & Ranking Rules
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Teams receive 3 points for a win, 1 point for a draw, and 0 for a loss. In the event of a tie in points at the end of the group stage, placement is determined by:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block mb-0.5">1. Goal Difference (GD)</span>
                  <span className="text-slate-500 text-[11px]">Superior difference between goals scored and conceded.</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block mb-0.5">2. Goals For (GF)</span>
                  <span className="text-slate-500 text-[11px]">Total number of goals scored across all group matches.</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block mb-0.5">3. Head-to-Head</span>
                  <span className="text-slate-500 text-[11px]">Result between tied teams during their direct match.</span>
                </div>
              </div>
            </div>

          </div>

          {/* ----------------- RIGHT COLUMN (SIDEBAR, 4 Cols / 33%) ----------------- */}
          <div className="lg:col-span-4">
            <TournamentSidebar
              standings={standings}
              showTopScorersInstead={true}
              onSelectTab={onSelectTab}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
