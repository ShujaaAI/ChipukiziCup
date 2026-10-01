import React, { useState } from 'react';
import { 
  Trophy, 
  Info, 
  ChevronRight, 
  Award, 
  CheckCircle2, 
  Flame, 
  Shield, 
  TrendingUp,
  BarChart3,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Standing, TEAMS_DATA } from '../data/tournamentData';

interface StandingsViewProps {
  standings: Standing[];
}

export const StandingsView: React.FC<StandingsViewProps> = ({ standings }) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            Official Tournament Tables
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Group Stage Standings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Top 2 teams from each group earn automatic qualification to the Championship Knockout Stage
          </p>
        </div>

        {/* Division Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl self-start md:self-auto">
          {divisions.map((div) => (
            <button
              key={div.id}
              onClick={() => setSelectedDivision(div.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDivision === div.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {div.label}
            </button>
          ))}
        </div>
      </div>

      {/* Group Navigation Tabs (Group A, Group B, Group C, Group D) */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mr-1 shrink-0">
            Groups:
          </span>
          {groups.map((grp) => {
            const isActive = selectedGroup === grp;
            return (
              <button
                key={grp}
                onClick={() => setSelectedGroup(grp)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-950/30'
                    : 'bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/15 hover:text-white'
                }`}
              >
                {grp === 'All' ? 'All Groups View' : grp}
              </button>
            );
          })}
        </div>

        {/* Qualification Badge Kicker */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Knockouts (Top 2)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Shield Cup (3rd)</span>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="space-y-8">
        {groupNames.map((grpName) => {
          const groupTeams = filteredStandings
            .filter((s) => s.group === grpName)
            .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);

          const totalGoals = groupTeams.reduce((acc, t) => acc + t.gf, 0);

          return (
            <div
              key={grpName}
              className="rounded-2xl bg-slate-900/70 border border-white/10 overflow-hidden shadow-xl"
            >
              {/* Table Header Banner */}
              <div className="px-6 py-4 bg-slate-950/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {grpName} · {selectedDivision} Boys
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
                    Matchday 3 Completed
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="font-mono">
                    <strong className="text-emerald-400">{totalGoals}</strong> total goals scored
                  </span>
                </div>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 bg-black/30 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4 w-12 text-center">Pos</th>
                      <th className="py-3.5 px-4 min-w-[200px]">Team</th>
                      <th className="py-3.5 px-3 text-center" title="Matches Played">P</th>
                      <th className="py-3.5 px-3 text-center" title="Won">W</th>
                      <th className="py-3.5 px-3 text-center" title="Drawn">D</th>
                      <th className="py-3.5 px-3 text-center" title="Lost">L</th>
                      <th className="py-3.5 px-3 text-center" title="Goals For">GF</th>
                      <th className="py-3.5 px-3 text-center" title="Goals Against">GA</th>
                      <th className="py-3.5 px-3 text-center" title="Goal Difference">GD</th>
                      <th className="py-3.5 px-4 text-center font-bold text-emerald-400 bg-emerald-500/5" title="Points">Pts</th>
                      <th className="py-3.5 px-6 text-center min-w-[150px]" title="Form in last 5 matches">Form Guide</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {groupTeams.map((team, idx) => {
                      const pos = idx + 1;
                      const isKnockout = pos <= 2;
                      const isShield = pos === 3;
                      const teamInfo = getTeamInfo(team.team);

                      return (
                        <tr
                          key={team.team}
                          className={`transition-colors group ${
                            isKnockout
                              ? 'bg-emerald-950/10 hover:bg-emerald-900/20'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          {/* Position with Color-coded Qualification Marker */}
                          <td className="py-3.5 px-4 text-center font-mono font-bold">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs ${
                                isKnockout
                                  ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                                  : isShield
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'text-slate-400 bg-white/5'
                              }`}
                            >
                              {pos}
                            </span>
                          </td>

                          {/* Team Name & Crest */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-sm shrink-0">
                                {teamInfo?.flag || '⚽'}
                              </div>

                              <div className="min-w-0">
                                <div className="font-bold text-white text-xs sm:text-sm group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                                  <span className="truncate">{team.team}</span>
                                  {isKnockout && (
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                                      Q
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400 truncate">
                                  {teamInfo ? `${teamInfo.city}, ${teamInfo.country}` : 'East Africa Academy'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Stats: P, W, D, L, GF, GA, GD, Pts */}
                          <td className="py-3.5 px-3 text-center font-mono text-slate-300 tabular-nums">
                            {team.mp}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-slate-300 tabular-nums">
                            {team.w}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-slate-300 tabular-nums">
                            {team.d}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-slate-300 tabular-nums">
                            {team.l}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-slate-400 tabular-nums">
                            {team.gf}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-slate-400 tabular-nums">
                            {team.ga}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono font-bold tabular-nums text-slate-200">
                            {team.gd > 0 ? `+${team.gd}` : team.gd}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-black text-sm text-emerald-400 tabular-nums bg-emerald-500/5">
                            {team.pts}
                          </td>

                          {/* Form Guide (Last 5 matches with W, D, L colored badges) */}
                          <td className="py-3.5 px-6 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {team.form.map((res, fIdx) => {
                                const isWin = res === 'W';
                                const isDraw = res === 'D';
                                const isLoss = res === 'L';

                                return (
                                  <span
                                    key={fIdx}
                                    title={`Match ${fIdx + 1}: ${isWin ? 'Win' : isDraw ? 'Draw' : 'Loss'}`}
                                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shadow-sm ${
                                      isWin
                                        ? 'bg-emerald-500 text-slate-950 font-black'
                                        : isDraw
                                        ? 'bg-slate-700 text-slate-200'
                                        : 'bg-rose-600 text-white'
                                    }`}
                                  >
                                    {res}
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer: Legend & Rules */}
              <div className="px-6 py-3.5 bg-black/40 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>Positions 1–2: Qualify for Cup Quarter-Finals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Position 3: Advances to Shield Cup Semi-Finals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <span>Position 4: Placement Consolation Matches</span>
                  </div>
                </div>

                <div className="text-slate-500 font-mono text-[10px]">
                  Tiebreakers: PTS &gt; GD &gt; GF &gt; Head-to-Head &gt; Fair Play
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
