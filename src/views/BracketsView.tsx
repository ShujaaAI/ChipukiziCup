import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
  Crown
} from 'lucide-react';
import trophyImg from '../assets/images/chipkizi_trophy_showcase_1790842762275.jpg';
import { Match } from '../data/tournamentData';

interface BracketMatch {
  id: string;
  round: string;
  matchNum: string;
  date: string;
  time: string;
  pitch: string;
  status: 'FINISHED' | 'LIVE' | 'UPCOMING';
  minute?: string;
  homeTeam: {
    name: string;
    flag: string;
    score?: number;
    penalties?: number;
    isWinner?: boolean;
  };
  awayTeam: {
    name: string;
    flag: string;
    score?: number;
    penalties?: number;
    isWinner?: boolean;
  };
}

interface BracketsViewProps {
  onSelectMatch?: (match: Match) => void;
}

export const BracketsView: React.FC<BracketsViewProps> = ({ onSelectMatch }) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('U15');

  // Interactive state: Hovered team to highlight bracket path
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  const quarterFinals: BracketMatch[] = [
    {
      id: 'qf-1',
      round: 'Quarter-Final 1',
      matchNum: 'QF 1',
      date: 'Saturday',
      time: '09:00 EAT',
      pitch: 'Pitch 1 · TGT Arusha',
      status: 'FINISHED',
      homeTeam: { name: 'Future Stars Academy', flag: '🇹🇿', score: 2, isWinner: true },
      awayTeam: { name: 'Ligi Ndogo SC', flag: '🇰🇪', score: 1, isWinner: false },
    },
    {
      id: 'qf-2',
      round: 'Quarter-Final 2',
      matchNum: 'QF 2',
      date: 'Saturday',
      time: '10:45 EAT',
      pitch: 'Pitch 2 · Braeburn Main',
      status: 'FINISHED',
      homeTeam: { name: 'Azam FC Youth', flag: '🇹🇿', score: 3, isWinner: true },
      awayTeam: { name: 'KCCA Soccer Academy', flag: '🇺🇬', score: 2, isWinner: false },
    },
    {
      id: 'qf-3',
      round: 'Quarter-Final 3',
      matchNum: 'QF 3',
      date: 'Saturday',
      time: '14:00 EAT',
      pitch: 'Pitch 1 · TGT Arusha',
      status: 'FINISHED',
      homeTeam: { name: 'Simba SC Juniors', flag: '🇹🇿', score: 2, isWinner: true },
      awayTeam: { name: 'Gor Mahia Youth', flag: '🇰🇪', score: 0, isWinner: false },
    },
    {
      id: 'qf-4',
      round: 'Quarter-Final 4',
      matchNum: 'QF 4',
      date: 'Saturday',
      time: '15:45 EAT',
      pitch: 'Pitch 3 · TGT Stadium',
      status: 'FINISHED',
      homeTeam: { name: 'Express Academy', flag: '🇺🇬', score: 2, isWinner: true },
      awayTeam: { name: 'APR FC Academy', flag: '🇷🇼', score: 1, isWinner: false },
    },
  ];

  const semiFinals: BracketMatch[] = [
    {
      id: 'sf-1',
      round: 'Semi-Final 1',
      matchNum: 'SF 1',
      date: 'Sunday Morning',
      time: '09:30 EAT',
      pitch: 'Pitch 1 · TGT Main Arena',
      status: 'LIVE',
      minute: "54'",
      homeTeam: { name: 'Future Stars Academy', flag: '🇹🇿', score: 1, isWinner: false },
      awayTeam: { name: 'Azam FC Youth', flag: '🇹🇿', score: 1, isWinner: false },
    },
    {
      id: 'sf-2',
      round: 'Semi-Final 2',
      matchNum: 'SF 2',
      date: 'Sunday Morning',
      time: '11:00 EAT',
      pitch: 'Pitch 2 · Braeburn Stadium',
      status: 'UPCOMING',
      homeTeam: { name: 'Simba SC Juniors', flag: '🇹🇿' },
      awayTeam: { name: 'Express Academy', flag: '🇺🇬' },
    },
  ];

  const grandFinal: BracketMatch = {
    id: 'final-1',
    round: 'Grand Championship Final',
    matchNum: 'GRAND FINAL',
    date: 'Sunday Afternoon',
    time: '15:30 EAT',
    pitch: 'Sheikh Amri Abeid National Stadium',
    status: 'UPCOMING',
    homeTeam: { name: 'Winner Semi-Final 1', flag: '🏆' },
    awayTeam: { name: 'Winner Semi-Final 2', flag: '🏆' },
  };

  const thirdPlace: BracketMatch = {
    id: 'third-1',
    round: '3rd Place Bronze Playoff',
    matchNum: 'BRONZE FINAL',
    date: 'Sunday',
    time: '13:15 EAT',
    pitch: 'Pitch 1 · TGT Arusha',
    status: 'UPCOMING',
    homeTeam: { name: 'Runner-up SF 1', flag: '🥉' },
    awayTeam: { name: 'Runner-up SF 2', flag: '🥉' },
  };

  const handleMatchClick = (bm: BracketMatch) => {
    if (onSelectMatch) {
      const matchObj: Match = {
        id: bm.id,
        category: `${selectedDivision} Boys`,
        stage: bm.round.includes('Quarter') ? 'Quarter-Finals' : bm.round.includes('Semi') ? 'Semi-Finals' : 'Final',
        matchday: 'Finals Day',
        round: bm.round,
        homeTeam: bm.homeTeam.name,
        awayTeam: bm.awayTeam.name,
        homeScore: bm.homeTeam.score,
        awayScore: bm.awayTeam.score,
        status: bm.status,
        minute: bm.minute || (bm.status === 'FINISHED' ? 'FT' : undefined),
        date: bm.date,
        time: bm.time,
        pitch: bm.pitch,
      };
      onSelectMatch(matchObj);
    }
  };

  const isTeamHighlighted = (teamName: string) => {
    if (!hoveredTeam) return false;
    return teamName.toLowerCase().includes(hoveredTeam.toLowerCase());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            Championship Ladder & Road to the Final
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Knockout Stage Brackets
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Single elimination bracket from Quarter-Finals to the Grand Final at Sheikh Amri Abeid Stadium
          </p>
        </div>

        {/* Division Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl self-start md:self-auto">
          {['U15', 'U17', 'Girls'].map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDivision === div
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {div === 'Girls' ? 'Girls U17 Cup' : `${div} Boys Division`}
            </button>
          ))}
        </div>
      </div>

      {/* Bracket Tree Canvas */}
      <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 lg:p-8 overflow-x-auto shadow-2xl relative">
        
        {/* Ambient Trophy Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="min-w-[960px] grid grid-cols-12 gap-6 items-center relative z-10">
          
          {/* ================= COLUMN 1: QUARTER-FINALS (4 cols) ================= */}
          <div className="col-span-4 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display">
                Quarter-Finals (Saturday)
              </span>
              <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                Completed
              </span>
            </div>

            <div className="space-y-4">
              {quarterFinals.map((match) => (
                <div
                  key={match.id}
                  onClick={() => handleMatchClick(match)}
                  className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group shadow-md"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/5">
                    <span className="font-semibold text-slate-300 font-mono">{match.matchNum}</span>
                    <span className="font-mono text-emerald-400 font-semibold">{match.pitch.split('·')[0]}</span>
                  </div>

                  <div className="space-y-1.5 py-2">
                    {/* Home Team */}
                    <div
                      onMouseEnter={() => setHoveredTeam(match.homeTeam.name)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                        match.homeTeam.isWinner
                          ? 'bg-emerald-500/10 border border-emerald-500/30'
                          : 'bg-black/20 text-slate-400'
                      } ${isTeamHighlighted(match.homeTeam.name) ? 'ring-1 ring-emerald-400' : ''}`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-sm">{match.homeTeam.flag}</span>
                        <span className={`text-xs font-bold truncate ${match.homeTeam.isWinner ? 'text-white' : 'text-slate-400'}`}>
                          {match.homeTeam.name}
                        </span>
                      </div>
                      <span className={`font-mono font-bold text-sm px-1.5 ${match.homeTeam.isWinner ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {match.homeTeam.score}
                      </span>
                    </div>

                    {/* Away Team */}
                    <div
                      onMouseEnter={() => setHoveredTeam(match.awayTeam.name)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                        match.awayTeam.isWinner
                          ? 'bg-emerald-500/10 border border-emerald-500/30'
                          : 'bg-black/20 text-slate-400'
                      } ${isTeamHighlighted(match.awayTeam.name) ? 'ring-1 ring-emerald-400' : ''}`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-sm">{match.awayTeam.flag}</span>
                        <span className={`text-xs font-bold truncate ${match.awayTeam.isWinner ? 'text-white' : 'text-slate-400'}`}>
                          {match.awayTeam.name}
                        </span>
                      </div>
                      <span className={`font-mono font-bold text-sm px-1.5 ${match.awayTeam.isWinner ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {match.awayTeam.score}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-right text-slate-500 font-mono">
                    Full Time · Click for Match Center →
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= COLUMN 2: SEMI-FINALS (4 cols) ================= */}
          <div className="col-span-4 space-y-12">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display">
                Semi-Finals (Sunday AM)
              </span>
              <span className="text-[11px] text-amber-400 font-mono font-semibold">
                Semi-Final Sunday
              </span>
            </div>

            <div className="space-y-10">
              {semiFinals.map((match) => {
                const isLive = match.status === 'LIVE';

                return (
                  <div
                    key={match.id}
                    onClick={() => handleMatchClick(match)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer group shadow-lg ${
                      isLive
                        ? 'bg-gradient-to-br from-[#152338] to-slate-900 border-emerald-500/50 shadow-emerald-950/40 hover:border-emerald-400'
                        : 'bg-slate-900/90 border-white/15 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/5">
                      <span className="font-semibold text-white font-mono">{match.matchNum}</span>
                      {isLive ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold font-mono text-[10px] animate-pulse">
                          LIVE {match.minute}
                        </span>
                      ) : (
                        <span className="font-mono text-amber-400">{match.time}</span>
                      )}
                    </div>

                    <div className="space-y-2 py-2.5">
                      {/* Home */}
                      <div
                        onMouseEnter={() => setHoveredTeam(match.homeTeam.name)}
                        onMouseLeave={() => setHoveredTeam(null)}
                        className={`flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 transition-all ${
                          isTeamHighlighted(match.homeTeam.name) ? 'ring-1 ring-emerald-400 bg-emerald-500/10' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">{match.homeTeam.flag}</span>
                          <span className="text-xs font-bold text-white truncate">
                            {match.homeTeam.name}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-sm text-white px-1.5">
                          {match.homeTeam.score !== undefined ? match.homeTeam.score : '-'}
                        </span>
                      </div>

                      {/* Away */}
                      <div
                        onMouseEnter={() => setHoveredTeam(match.awayTeam.name)}
                        onMouseLeave={() => setHoveredTeam(null)}
                        className={`flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 transition-all ${
                          isTeamHighlighted(match.awayTeam.name) ? 'ring-1 ring-emerald-400 bg-emerald-500/10' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">{match.awayTeam.flag}</span>
                          <span className="text-xs font-bold text-white truncate">
                            {match.awayTeam.name}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-sm text-white px-1.5">
                          {match.awayTeam.score !== undefined ? match.awayTeam.score : '-'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span className="truncate max-w-[160px]">{match.pitch.split('·')[0]}</span>
                      <span className="text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        Match Center →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= COLUMN 3: GRAND FINAL & 3RD PLACE (4 cols) ================= */}
          <div className="col-span-4 space-y-6">
            
            {/* Grand Final Trophy Card */}
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-display">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Grand Final (15:30 EAT)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                  Azam TV LIVE
                </span>
              </div>

              <div
                onClick={() => handleMatchClick(grandFinal)}
                className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/15 via-[#182338] to-slate-900 border-2 border-amber-500/50 hover:border-amber-400 transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
              >
                {/* Trophy showcase header thumbnail */}
                <div className="relative rounded-2xl overflow-hidden h-28 mb-4 border border-white/10 shadow-inner">
                  <img
                    src={trophyImg}
                    alt="Chipkizi Cup Grand Final Official Championship Trophy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-widest font-display flex items-center gap-1.5">
                      <Crown className="w-4 h-4 text-amber-400" />
                      Chipkizi Cup Champion
                    </span>
                    <span className="text-[10px] text-slate-300">
                      Sheikh Amri Abeid Stadium
                    </span>
                  </div>
                </div>

                <div className="space-y-2 py-1">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇹🇿</span>
                      <span className="text-xs font-bold text-white">Winner Semi-Final 1</span>
                    </div>
                    <span className="font-mono text-slate-400 font-bold text-sm">-</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇹🇿</span>
                      <span className="text-xs font-bold text-white">Winner Semi-Final 2</span>
                    </div>
                    <span className="font-mono text-slate-400 font-bold text-sm">-</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-amber-500/20 text-center text-xs font-semibold text-amber-300 flex items-center justify-center gap-1">
                  <span>Match Details & Broadcast Link</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 3rd Place Bronze Playoff Card */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-1.5 mb-2.5">
                3rd Place Playoff (Bronze Medal)
              </div>
              <div
                onClick={() => handleMatchClick(thirdPlace)}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-white/20 transition-all cursor-pointer text-xs"
              >
                <div className="flex items-center justify-between text-slate-400 pb-1.5 text-[11px]">
                  <span>Sunday 13:15 · Pitch 1</span>
                  <span className="font-mono text-amber-400 font-semibold">Bronze Medal</span>
                </div>
                <div className="text-slate-200 font-medium">
                  Runner-up SF 1 vs Runner-up SF 2
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bracket Pathway Legend */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white">Knockout Rules:</span>
          <span>90 min regular time · Direct to Penalty Shootout in case of draw</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Green Border: Qualified / Advanced</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Gold Badge: Championship Match</span>
          </div>
        </div>
      </div>

    </div>
  );
};
