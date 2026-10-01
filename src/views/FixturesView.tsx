import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  Activity, 
  Trophy, 
  ChevronRight, 
  Layers, 
  Sparkles,
  Shield
} from 'lucide-react';
import { Match, TEAMS_DATA } from '../data/tournamentData';

interface FixturesViewProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
  onOpenScoreReporter?: (match: Match) => void;
  isAdminAuthenticated?: boolean;
}

export const FixturesView: React.FC<FixturesViewProps> = ({
  matches,
  onSelectMatch,
  onOpenScoreReporter,
  isAdminAuthenticated,
}) => {
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedMatchday, setSelectedMatchday] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'LIVE' | 'FINISHED' | 'UPCOMING'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const stages = ['All', 'Group Stage', 'Quarter-Finals', 'Semi-Finals', 'Final'];
  const matchdays = ['All', 'Matchday 1', 'Matchday 2', 'Matchday 3', 'Finals Day'];

  const filteredMatches = matches.filter((m) => {
    // Stage Filter
    if (selectedStage !== 'All' && m.stage !== selectedStage) {
      return false;
    }
    // Matchday Filter
    if (selectedMatchday !== 'All' && m.matchday !== selectedMatchday) {
      return false;
    }
    // Status Filter
    if (selectedStatus !== 'ALL' && m.status !== selectedStatus) {
      return false;
    }
    // Search Query
    if (
      searchQuery.trim() &&
      !m.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.pitch.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.round.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const getTeamBadge = (teamName: string) => {
    const found = TEAMS_DATA.find((t) => t.name.toLowerCase() === teamName.toLowerCase());
    return found?.flag || '⚽';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            Tournament Schedule & Match Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Fixtures & Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Comprehensive tournament schedule with real-time match events, analytics, and tactical lineups
          </p>
        </div>

        {/* Live / Status Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl self-start md:self-auto">
          {(['ALL', 'LIVE', 'FINISHED', 'UPCOMING'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedStatus === status
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status === 'ALL' ? 'All Matches' : status === 'LIVE' ? '🔴 Live Now' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Filters: Stages & Matchdays */}
      <div className="space-y-4">
        
        {/* Stage Filter Tabs (All, Group Stage, Quarter-Finals, Semi-Finals, Final) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mr-1 shrink-0">
            Stage:
          </span>
          {stages.map((stg) => {
            const isActive = selectedStage === stg;
            return (
              <button
                key={stg}
                onClick={() => setSelectedStage(stg)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-sm shadow-emerald-950/40'
                    : 'bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/15 hover:text-white'
                }`}
              >
                {stg === 'All' ? 'All Tournament Stages' : stg}
              </button>
            );
          })}
        </div>

        {/* Secondary Row: Matchday Round Selector & Search Input */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Matchday Selector (Matchday 1, 2, 3, Finals Day) */}
          <div className="md:col-span-7 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mr-1 shrink-0">
              Round:
            </span>
            {matchdays.map((day) => {
              const isActive = selectedMatchday === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedMatchday(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white/15 text-white font-bold border border-white/20'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {day === 'All' ? 'All Matchdays' : day}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search academy, pitch, or round..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

        </div>
      </div>

      {/* Active Filter Count & Reset */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white font-mono">{filteredMatches.length}</strong> matches
        </span>
        {(selectedStage !== 'All' || selectedMatchday !== 'All' || selectedStatus !== 'ALL' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedStage('All');
              setSelectedMatchday('All');
              setSelectedStatus('ALL');
              setSearchQuery('');
            }}
            className="text-emerald-400 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Match Cards Grid / List */}
      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/10 space-y-3">
            <Calendar className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white font-display">No matches match your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting the stage, matchday, or search term to discover fixtures.
            </p>
            <button
              onClick={() => {
                setSelectedStage('All');
                setSelectedMatchday('All');
                setSelectedStatus('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Show All Matches
            </button>
          </div>
        ) : (
          filteredMatches.map((match) => {
            const isLive = match.status === 'LIVE';
            const isFinished = match.status === 'FINISHED';
            const isUpcoming = match.status === 'UPCOMING';

            return (
              <div
                key={match.id}
                onClick={() => onSelectMatch(match)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isLive
                    ? 'bg-gradient-to-r from-[#111C2E] via-[#0F172A] to-[#0F172A] border-emerald-500/40 shadow-lg shadow-emerald-950/20 hover:border-emerald-400'
                    : 'bg-slate-900/70 border-white/10 hover:border-white/20 hover:bg-slate-900/90'
                }`}
              >
                {/* 1. Left Match Meta */}
                <div className="md:w-60 space-y-1.5 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      {match.category}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-300 font-medium">
                      {match.round}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate max-w-[200px]">{match.pitch}</span>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{match.date} · {match.matchday}</span>
                  </div>
                </div>

                {/* 2. Middle Scoreboard Lockup */}
                <div className="flex-1 flex items-center justify-between sm:justify-center gap-4 sm:gap-8">
                  
                  {/* Home Team */}
                  <div className="flex-1 flex items-center justify-end gap-3 text-right">
                    <div>
                      <span className="font-bold text-sm sm:text-base text-white block group-hover:text-emerald-300 transition-colors">
                        {match.homeTeam}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                        Home
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-lg shrink-0">
                      {getTeamBadge(match.homeTeam)}
                    </div>
                  </div>

                  {/* Score or Time Box */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 font-mono font-bold text-xl text-white tabular-nums tracking-wider min-w-[96px] text-center shadow-inner">
                      {isUpcoming ? (
                        <span className="text-amber-400 text-xs font-sans font-semibold">
                          {match.time}
                        </span>
                      ) : (
                        `${match.homeScore ?? 0} : ${match.awayScore ?? 0}`
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="mt-1.5">
                      {isLive ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] border border-emerald-500/40 flex items-center gap-1 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          LIVE {match.minute}
                        </span>
                      ) : isFinished ? (
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                          Full Time
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 flex items-center justify-start gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-lg shrink-0">
                      {getTeamBadge(match.awayTeam)}
                    </div>
                    <div>
                      <span className="font-bold text-sm sm:text-base text-white block group-hover:text-emerald-300 transition-colors">
                        {match.awayTeam}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                        Away
                      </span>
                    </div>
                  </div>

                </div>

                {/* 3. Right Action & Match Center Link */}
                <div className="md:w-48 flex items-center md:flex-col md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-white/5 shrink-0 gap-2">
                  <div className="flex items-center gap-1 text-emerald-400 group-hover:text-emerald-300 text-xs font-semibold transition-colors">
                    <span>Match Center</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {match.scorers && match.scorers.length > 0 && (
                    <div className="text-[10px] text-slate-400 font-mono truncate max-w-[170px] text-right hidden sm:block">
                      ⚽ {match.scorers[0]}
                    </div>
                  )}

                  {isAdminAuthenticated && onOpenScoreReporter && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenScoreReporter(match);
                      }}
                      className="text-[11px] text-amber-400/90 hover:text-amber-300 font-mono underline cursor-pointer"
                    >
                      Update Score
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
