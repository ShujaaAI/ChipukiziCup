import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Award, 
  Shield, 
  Flame, 
  Calendar, 
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Team, SquadPlayer } from '../data/tournamentData';

interface TeamSquadModalProps {
  team: Team | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TeamSquadModal: React.FC<TeamSquadModalProps> = ({
  team,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !team) return null;

  const [positionFilter, setPositionFilter] = useState<string>('ALL');
  const [searchPlayer, setSearchPlayer] = useState<string>('');

  const filteredRoster = team.roster.filter((p) => {
    if (positionFilter !== 'ALL' && p.position !== positionFilter) return false;
    if (searchPlayer && !p.name.toLowerCase().includes(searchPlayer.toLowerCase())) return false;
    return true;
  });

  const totalGoals = team.roster.reduce((acc, p) => acc + p.goals, 0);
  const totalYellows = team.roster.reduce((acc, p) => acc + p.yellowCards, 0);
  const totalReds = team.roster.reduce((acc, p) => acc + p.redCards, 0);
  const avgAge = (team.roster.reduce((acc, p) => acc + p.age, 0) / (team.roster.length || 1)).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#0F172A] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-[#152238] to-slate-900 border-b border-white/10 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Team Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Club Crest */}
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${team.badgeColor} border border-white/20 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shrink-0`}
            >
              {team.flag}
            </div>

            {/* Club Information */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {team.category} Division
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {team.group}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">
                  Est. {team.founded}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display truncate">
                {team.name}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{team.city}, {team.country}</span>
                </div>
                <span className="text-slate-600">·</span>
                <div>
                  <span className="text-slate-400">Coach: </span>
                  <strong className="text-white">{team.coach}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Aggregate Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 text-xs">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-slate-400 text-[11px]">Squad Size</div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">
                {team.roster.length} Players
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-slate-400 text-[11px]">Average Squad Age</div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                {avgAge} yrs
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-slate-400 text-[11px]">Tournament Goals</div>
              <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">
                {totalGoals} Goals
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-slate-400 text-[11px]">Discipline</div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">
                {totalYellows} 🟨 / {totalReds} 🟥
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="p-4 sm:px-6 bg-slate-900 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Position Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['ALL', 'GK', 'DEF', 'MID', 'FWD'].map((pos) => (
              <button
                key={pos}
                onClick={() => setPositionFilter(pos)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  positionFilter === pos
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {pos === 'ALL' ? 'All Squad' : pos}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search player name..."
              value={searchPlayer}
              onChange={(e) => setSearchPlayer(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950/80 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Scrollable Player Roster Table */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 bg-black/40 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4 min-w-[180px]">Player Name</th>
                    <th className="py-3 px-3 text-center">Pos</th>
                    <th className="py-3 px-3 text-center">Age</th>
                    <th className="py-3 px-3 text-center" title="Matches Played">MP</th>
                    <th className="py-3 px-3 text-center font-bold text-amber-400" title="Goals">G</th>
                    <th className="py-3 px-3 text-center" title="Assists">A</th>
                    <th className="py-3 px-3 text-center" title="Cards (Yellow/Red)">Cards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRoster.map((player) => {
                    const posColor = 
                      player.position === 'GK' ? 'text-amber-400 bg-amber-500/10' :
                      player.position === 'DEF' ? 'text-blue-400 bg-blue-500/10' :
                      player.position === 'MID' ? 'text-emerald-400 bg-emerald-500/10' :
                      'text-rose-400 bg-rose-500/10';

                    return (
                      <tr key={player.number} className="hover:bg-white/5 transition-colors">
                        {/* Number */}
                        <td className="py-3 px-4 text-center font-mono font-bold text-slate-400">
                          {player.number}
                        </td>

                        {/* Player Name with Avatar */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-300 font-mono shrink-0">
                              {player.name.charAt(0)}
                            </div>
                            <span className="font-bold text-white text-xs sm:text-sm">
                              {player.name}
                            </span>
                            {player.isCaptain && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-bold font-mono text-[10px]">
                                C
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Position Badge */}
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${posColor}`}>
                            {player.position}
                          </span>
                        </td>

                        {/* Age */}
                        <td className="py-3 px-3 text-center font-mono text-slate-400 tabular-nums">
                          {player.age}
                        </td>

                        {/* Matches Played */}
                        <td className="py-3 px-3 text-center font-mono text-slate-300 tabular-nums">
                          {player.matchesPlayed}
                        </td>

                        {/* Goals */}
                        <td className="py-3 px-3 text-center font-mono font-black text-amber-400 tabular-nums">
                          {player.goals}
                        </td>

                        {/* Assists */}
                        <td className="py-3 px-3 text-center font-mono text-slate-300 tabular-nums">
                          {player.assists}
                        </td>

                        {/* Cards */}
                        <td className="py-3 px-3 text-center font-mono text-[11px] tabular-nums">
                          {player.yellowCards > 0 || player.redCards > 0 ? (
                            <span>
                              {player.yellowCards > 0 && <span className="text-yellow-400 mr-1">{player.yellowCards}🟨</span>}
                              {player.redCards > 0 && <span className="text-rose-500">{player.redCards}🟥</span>}
                            </span>
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div>
            Training Facility: <strong className="text-slate-200">{team.trainingGround}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors"
          >
            Close Roster
          </button>
        </div>

      </div>
    </div>
  );
};
