import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Activity, 
  Shield, 
  Users, 
  BarChart3, 
  Flame, 
  Award,
  ChevronRight,
  Share2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Match, MatchEvent, Player } from '../data/tournamentData';

interface MatchCenterModalProps {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminScore?: (match: Match) => void;
}

export const MatchCenterModal: React.FC<MatchCenterModalProps> = ({
  match,
  isOpen,
  onClose,
  onOpenAdminScore,
}) => {
  if (!isOpen || !match) return null;

  const [activeTab, setActiveTab] = useState<'timeline' | 'stats' | 'lineups'>('timeline');

  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const isUpcoming = match.status === 'UPCOMING';

  const defaultStats = match.stats || {
    possession: [50, 50],
    shotsOnTarget: [4, 4],
    totalShots: [10, 10],
    fouls: [8, 8],
    corners: [4, 4],
    offsides: [1, 1],
    saves: [3, 3],
  };

  const defaultTimeline: MatchEvent[] = match.timeline || (
    match.scorers ? match.scorers.map((s, idx) => ({
      minute: 20 + idx * 25,
      type: 'GOAL' as const,
      team: idx % 2 === 0 ? 'home' as const : 'away' as const,
      player: s.split(' ')[0],
      detail: 'Goal scored'
    })) : []
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#0F172A] border border-emerald-500/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Bar Navigation */}
        <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-400 font-mono text-[11px] uppercase tracking-wider">
              {match.category}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-medium">{match.round}</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenAdminScore && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAdminScore(match);
                }}
                className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 font-semibold text-[11px] transition-colors"
              >
                Score Official
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Match Center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scoreboard Hero Area */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#152136] via-[#0F172A] to-[#0F172A] border-b border-white/10 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-36 bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Teams and Score Lockup */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            
            {/* Home Team */}
            <div className="flex-1 flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 border border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-lg shadow-emerald-950/40">
                🇹🇿
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-white font-display leading-tight">
                  {match.homeTeam}
                </h3>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  Home Side
                </span>
              </div>
            </div>

            {/* Scoreboard Center */}
            <div className="flex flex-col items-center px-2 sm:px-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums tracking-tight">
                  {isUpcoming ? '-' : (match.homeScore ?? 0)}
                </span>
                <span className="text-slate-600 font-bold text-2xl sm:text-3xl">:</span>
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums tracking-tight">
                  {isUpcoming ? '-' : (match.awayScore ?? 0)}
                </span>
              </div>

              {/* Status Badge */}
              <div className="mt-2.5">
                {isLive ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/40 flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    LIVE {match.minute}
                  </span>
                ) : isFinished ? (
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono font-bold text-xs border border-white/10">
                    Full Time
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-mono font-bold text-xs border border-amber-500/30 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {match.date} · {match.time}
                  </span>
                )}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-900 border border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-lg shadow-rose-950/40">
                🇰🇪
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-white font-display leading-tight">
                  {match.awayTeam}
                </h3>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  Away Side
                </span>
              </div>
            </div>

          </div>

          {/* Venue and Official Metadata */}
          <div className="mt-6 pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{match.pitch}</span>
            </div>
            <span className="text-slate-700">·</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Ref: J. Mrema (Tanzania)</span>
            </div>
            <span className="text-slate-700">·</span>
            <div>
              <span>24°C Sunny Arusha</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 bg-slate-900 border-b border-white/10 flex items-center gap-6 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Match Timeline</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'stats'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Match Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('lineups')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'lineups'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Lineups & Squads</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: MATCH TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {defaultTimeline.length === 0 ? (
                <div className="p-10 text-center text-slate-400 text-xs">
                  <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  No events logged for this fixture yet. Match begins at {match.time}.
                </div>
              ) : (
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  {defaultTimeline.map((event, idx) => {
                    const isHome = event.team === 'home';
                    const isGoal = event.type === 'GOAL';
                    const isYellow = event.type === 'YELLOW_CARD';
                    const isRed = event.type === 'RED_CARD';
                    const isSub = event.type === 'SUB';

                    return (
                      <div key={idx} className="relative flex items-start gap-4 text-xs group">
                        {/* Minute Circle Pin */}
                        <div className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[10px] z-10 border ${
                          isGoal
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : isRed
                            ? 'bg-rose-600 text-white border-rose-400'
                            : isYellow
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-slate-800 text-slate-300 border-white/20'
                        }`}>
                          {event.minute}'
                        </div>

                        {/* Event Content Card */}
                        <div className="flex-1 p-3.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-white/15 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-base">
                                {isGoal ? '⚽' : isRed ? '🟥' : isYellow ? '🟨' : '🔄'}
                              </span>
                              <span className="font-bold text-white text-sm">
                                {event.player}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 font-mono text-slate-400">
                                {isHome ? match.homeTeam.split(' ')[0] : match.awayTeam.split(' ')[0]}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                              {event.type.replace('_', ' ')}
                            </span>
                          </div>

                          {event.subPlayer && (
                            <div className="text-[11px] text-slate-400 mt-1 font-mono">
                              Replacing: <span className="text-slate-300">{event.subPlayer}</span>
                            </div>
                          )}

                          {event.detail && (
                            <p className="text-[11px] text-slate-400 mt-1">
                              {event.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MATCH STATS BARS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Possession Dominance */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="text-emerald-400">{defaultStats.possession[0]}%</span>
                  <span className="uppercase tracking-wider text-[11px] text-slate-400">Ball Possession</span>
                  <span className="text-rose-400">{defaultStats.possession[1]}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 flex overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500" 
                    style={{ width: `${defaultStats.possession[0]}%` }}
                  />
                  <div 
                    className="h-full bg-rose-500 transition-all duration-500" 
                    style={{ width: `${defaultStats.possession[1]}%` }}
                  />
                </div>
              </div>

              {/* Stat Comparison Metric Rows */}
              <div className="space-y-4">
                {[
                  { label: 'Shots on Target', home: defaultStats.shotsOnTarget[0], away: defaultStats.shotsOnTarget[1] },
                  { label: 'Total Goal Attempts', home: defaultStats.totalShots[0], away: defaultStats.totalShots[1] },
                  { label: 'Fouls Committed', home: defaultStats.fouls[0], away: defaultStats.fouls[1] },
                  { label: 'Corner Kicks', home: defaultStats.corners[0], away: defaultStats.corners[1] },
                  { label: 'Offsides', home: defaultStats.offsides[0], away: defaultStats.offsides[1] },
                  { label: 'Goalkeeper Saves', home: defaultStats.saves[0], away: defaultStats.saves[1] },
                ].map((item, idx) => {
                  const total = (item.home + item.away) || 1;
                  const homePct = (item.home / total) * 100;
                  const awayPct = (item.away / total) * 100;

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-white tabular-nums w-8 text-left">
                          {item.home}
                        </span>
                        <span className="font-medium text-slate-400 text-xs">
                          {item.label}
                        </span>
                        <span className="font-mono font-bold text-white tabular-nums w-8 text-right">
                          {item.away}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 h-2">
                        {/* Home Bar (fills from right to left) */}
                        <div className="h-full bg-slate-800/80 rounded-l overflow-hidden flex justify-end">
                          <div 
                            className="h-full bg-emerald-400/90 rounded-l transition-all duration-500"
                            style={{ width: `${homePct}%` }}
                          />
                        </div>
                        {/* Away Bar (fills from left to right) */}
                        <div className="h-full bg-slate-800/80 rounded-r overflow-hidden flex justify-start">
                          <div 
                            className="h-full bg-rose-400/90 rounded-r transition-all duration-500"
                            style={{ width: `${awayPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LINEUPS & SQUADS */}
          {activeTab === 'lineups' && (
            <div className="space-y-6">
              {match.lineups ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Home Lineup */}
                  <div className="space-y-4 p-4 rounded-xl bg-slate-900/80 border border-white/10">
                    <div className="border-b border-white/10 pb-3">
                      <div className="text-sm font-bold text-white font-display">
                        {match.homeTeam}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                        <span>Formation: <strong className="text-emerald-400">{match.lineups.home.formation}</strong></span>
                        <span>Coach: {match.lineups.home.manager}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Starting Eleven
                      </div>
                      {match.lineups.home.starting.map((p) => (
                        <div key={p.number} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 font-mono font-bold text-slate-400 text-center">
                              {p.number}
                            </span>
                            <span className="font-semibold text-white">
                              {p.name}
                            </span>
                            {p.isCaptain && (
                              <span className="text-[10px] px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-bold font-mono">
                                C
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            {p.position}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subs */}
                    {match.lineups.home.subs && match.lineups.home.subs.length > 0 && (
                      <div className="pt-3 border-t border-white/5 space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Substitutes Bench
                        </div>
                        {match.lineups.home.subs.map((p) => (
                          <div key={p.number} className="flex items-center justify-between py-1 px-2 text-xs text-slate-400">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-slate-500 w-4">{p.number}</span>
                              <span>{p.name}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">{p.position}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Away Lineup */}
                  <div className="space-y-4 p-4 rounded-xl bg-slate-900/80 border border-white/10">
                    <div className="border-b border-white/10 pb-3">
                      <div className="text-sm font-bold text-white font-display">
                        {match.awayTeam}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                        <span>Formation: <strong className="text-rose-400">{match.lineups.away.formation}</strong></span>
                        <span>Coach: {match.lineups.away.manager}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Starting Eleven
                      </div>
                      {match.lineups.away.starting.map((p) => (
                        <div key={p.number} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 font-mono font-bold text-slate-400 text-center">
                              {p.number}
                            </span>
                            <span className="font-semibold text-white">
                              {p.name}
                            </span>
                            {p.isCaptain && (
                              <span className="text-[10px] px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-bold font-mono">
                                C
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-rose-400 font-bold">
                            {p.position}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subs */}
                    {match.lineups.away.subs && match.lineups.away.subs.length > 0 && (
                      <div className="pt-3 border-t border-white/5 space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Substitutes Bench
                        </div>
                        {match.lineups.away.subs.map((p) => (
                          <div key={p.number} className="flex items-center justify-between py-1 px-2 text-xs text-slate-400">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-slate-500 w-4">{p.number}</span>
                              <span>{p.name}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">{p.position}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  Official squad sheets will be confirmed by both team managers 30 minutes prior to kickoff.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Official Chipkizi Cup Match System</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
