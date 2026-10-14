import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Clock, 
  Activity, 
  Trophy, 
  ChevronRight, 
  Shield,
  Filter,
  CheckCircle,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { Match, TEAMS_DATA, Standing } from '../data/tournamentData';
import { TournamentSidebar } from '../components/TournamentSidebar';
import { NavigationTab } from '../components/Navbar';

interface FixturesViewProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
  onOpenScoreReporter?: (match: Match) => void;
  isAdminAuthenticated?: boolean;
  onSelectTab?: (tab: NavigationTab) => void;
  standings?: Standing[];
}

export const FixturesView: React.FC<FixturesViewProps> = ({
  matches,
  onSelectMatch,
  onOpenScoreReporter,
  isAdminAuthenticated,
  onSelectTab,
  standings = [],
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
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Breadcrumb & Page Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
              <span>Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-red-600 font-bold">Fixtures & Results</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display uppercase tracking-tight">
              MATCH FIXTURES & LIVE RESULTS
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1 rounded bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow">
              {filteredMatches.length} Matches Found
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN 2-COLUMN STRUCTURE MATCHING REFERENCE IMAGE                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ----------------- LEFT COLUMN (8 Cols / 67%) ----------------- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Crimson Red Ribbon Banner for Fixtures Stage Filter */}
            <div className="bg-[#DC2626] text-white rounded-t-lg px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm overflow-x-auto">
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-black text-sm uppercase tracking-wider font-display">
                  TOURNAMENT STAGES
                </span>
              </div>

              {/* Stage Filter Buttons */}
              <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
                {stages.map((stg) => (
                  <button
                    key={stg}
                    onClick={() => setSelectedStage(stg)}
                    className={`transition-colors py-0.5 cursor-pointer ${
                      selectedStage === stg
                        ? 'text-white font-extrabold underline underline-offset-4'
                        : 'text-red-100 hover:text-white'
                    }`}
                  >
                    {stg === 'All' ? 'All Stages' : stg}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Bar Controls Card */}
            <div className="bg-white border border-slate-200 rounded-b-lg p-4 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search academy name, pitch, or group..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-slate-900 placeholder-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Matchday Select */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                    Day:
                  </span>
                  <select
                    value={selectedMatchday}
                    onChange={(e) => setSelectedMatchday(e.target.value)}
                    className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    {matchdays.map((d) => (
                      <option key={d} value={d}>
                        {d === 'All' ? 'All Matchdays' : d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Segmented Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
                  Status:
                </span>
                {(['ALL', 'LIVE', 'FINISHED', 'UPCOMING'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                      selectedStatus === status
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {status === 'ALL' ? 'All Matches' : status === 'LIVE' ? '🔴 Live Now' : status === 'FINISHED' ? 'Completed' : 'Upcoming'}
                  </button>
                ))}
              </div>
            </div>

            {/* Matches List */}
            {filteredMatches.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-xs">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-extrabold text-slate-800 uppercase font-display">
                  No Fixtures Found
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search criteria, stage filter, or selected matchday to find scheduled games.
                </p>
                <button
                  onClick={() => {
                    setSelectedStage('All');
                    setSelectedMatchday('All');
                    setSelectedStatus('ALL');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded shadow transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMatches.map((match) => {
                  const isLive = match.status === 'LIVE';
                  const isFinished = match.status === 'FINISHED';
                  const isUpcoming = match.status === 'UPCOMING';

                  return (
                    <div
                      key={match.id}
                      onClick={() => onSelectMatch(match)}
                      className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs hover:shadow-md hover:border-red-300 transition-all cursor-pointer group"
                    >
                      {/* Top Match Info Bar */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px]">
                            {match.round}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500 text-[11px] font-medium">
                            {match.category}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isLive ? (
                            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px] tracking-wide uppercase animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              LIVE {match.minute}
                            </span>
                          ) : isFinished ? (
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                              Full Time
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-bold text-[10px] uppercase">
                              Upcoming {match.time}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Scoreboard / Team vs Team */}
                      <div className="grid grid-cols-12 items-center gap-2 py-2">
                        {/* Home Team */}
                        <div className="col-span-5 flex items-center justify-end gap-3 text-right">
                          <span className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-red-600 transition-colors truncate">
                            {match.homeTeam}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                            {getTeamBadge(match.homeTeam)}
                          </div>
                        </div>

                        {/* Score Center */}
                        <div className="col-span-2 flex flex-col items-center justify-center px-1 text-center">
                          {isUpcoming ? (
                            <div className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono font-black text-xs sm:text-sm uppercase">
                              VS
                            </div>
                          ) : (
                            <div className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-wider">
                              {match.homeScore ?? 0} : {match.awayScore ?? 0}
                            </div>
                          )}
                          <span className="text-[10px] font-bold text-slate-400 mt-1 whitespace-nowrap">
                            {match.date}
                          </span>
                        </div>

                        {/* Away Team */}
                        <div className="col-span-5 flex items-center justify-start gap-3 text-left">
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                            {getTeamBadge(match.awayTeam)}
                          </div>
                          <span className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-red-600 transition-colors truncate">
                            {match.awayTeam}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Pitch Details & Admin Trigger */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 mt-2 border-t border-slate-100 text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                            <span className="font-medium">{match.pitch}</span>
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{match.time}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          {/* Admin Only Score Reporter Button */}
                          {isAdminAuthenticated && onOpenScoreReporter && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenScoreReporter(match);
                              }}
                              className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] uppercase tracking-wider transition-colors shadow-xs"
                            >
                              Update Score
                            </button>
                          )}

                          <button
                            onClick={() => onSelectMatch(match)}
                            className="text-red-600 group-hover:text-red-700 font-bold text-xs flex items-center gap-0.5"
                          >
                            <span>Match Details</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* ----------------- RIGHT COLUMN (SIDEBAR, 4 Cols / 33%) ----------------- */}
          <div className="lg:col-span-4">
            <TournamentSidebar
              standings={standings}
              matches={matches}
              onSelectTab={onSelectTab}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
