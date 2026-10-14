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
import playerSpotlightImg from '../assets/images/chipkizi_player_spotlight_1791989031130.jpg';
import { Match, Standing } from '../data/tournamentData';
import { TournamentSidebar } from '../components/TournamentSidebar';
import { NavigationTab } from '../components/Navbar';

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
  onSelectTab?: (tab: NavigationTab) => void;
  standings?: Standing[];
}

export const BracketsView: React.FC<BracketsViewProps> = ({ 
  onSelectMatch,
  onSelectTab,
  standings = [],
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('U15');
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
    pitch: 'Sheikh Amri Abeid Stadium',
    status: 'UPCOMING',
    homeTeam: { name: 'Winner SF 1 (TBD)', flag: '🏆' },
    awayTeam: { name: 'Winner SF 2 (TBD)', flag: '🏆' },
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
        minute: bm.minute,
        date: bm.date,
        time: bm.time,
        pitch: bm.pitch,
      };
      onSelectMatch(matchObj);
    }
  };

  const renderTeamRow = (team: BracketMatch['homeTeam'], isHome: boolean, isFinished: boolean) => {
    const isHovered = hoveredTeam && hoveredTeam === team.name;
    return (
      <div 
        onMouseEnter={() => setHoveredTeam(team.name)}
        onMouseLeave={() => setHoveredTeam(null)}
        className={`flex items-center justify-between px-3 py-2 text-xs transition-colors ${
          team.isWinner ? 'bg-emerald-50/50 font-bold' : ''
        } ${isHovered ? 'bg-red-50 text-red-700' : ''}`}
      >
        <div className="flex items-center gap-2 truncate pr-2">
          <span className="text-sm shrink-0">{team.flag}</span>
          <span className={`truncate ${team.isWinner ? 'font-extrabold text-slate-900' : 'text-slate-700'}`}>
            {team.name}
          </span>
          {team.isWinner && (
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 inline ml-0.5" />
          )}
        </div>
        <div className="font-mono font-black text-sm shrink-0">
          {team.score !== undefined ? (
            <span className={team.isWinner ? 'text-slate-900' : 'text-slate-500'}>
              {team.score}
            </span>
          ) : (
            <span className="text-slate-300">-</span>
          )}
        </div>
      </div>
    );
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
              <span className="text-red-600 font-bold">Knockout Brackets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display uppercase tracking-tight">
              CHAMPIONSHIP KNOCKOUT BRACKET
            </h1>
          </div>

          {/* Division Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg shadow-2xs self-start sm:self-auto">
            {['U15', 'U17', 'Girls'].map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                  selectedDivision === div
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {div === 'U15' ? 'U15 Boys Cup' : div === 'U17' ? 'U17 Boys' : 'Girls Cup'}
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
            
            {/* Crimson Red Ribbon Banner for Knockout Tree */}
            <div className="bg-[#DC2626] text-white rounded-t-lg px-4 py-2.5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm uppercase tracking-wider font-display">
                  ROAD TO THE FINAL
                </span>
                <span className="text-red-200 text-xs">·</span>
                <span className="text-xs font-bold text-red-100">
                  {selectedDivision === 'U15' ? 'U15 Boys' : selectedDivision === 'U17' ? 'U17 Boys' : 'Girls'} Division
                </span>
              </div>
              <span className="text-xs font-mono text-white/90">
                Single Elimination
              </span>
            </div>

            {/* Bracket Tree Container */}
            <div className="bg-white border border-slate-200 rounded-b-lg p-4 sm:p-6 shadow-xs overflow-x-auto">
              <div className="min-w-[700px] grid grid-cols-3 gap-6 items-center">
                
                {/* 1. QUARTER-FINALS COLUMN */}
                <div className="space-y-4">
                  <div className="bg-[#111827] text-white px-3 py-1.5 rounded text-center font-extrabold text-xs uppercase tracking-wider">
                    Quarter-Finals
                  </div>

                  <div className="space-y-4">
                    {quarterFinals.map((bm) => (
                      <div
                        key={bm.id}
                        onClick={() => handleMatchClick(bm)}
                        className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs hover:shadow-md hover:border-red-400 transition-all cursor-pointer"
                      >
                        <div className="bg-slate-50 px-3 py-1 border-b border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                          <span>{bm.matchNum}</span>
                          <span>{bm.pitch.split('·')[0]}</span>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {renderTeamRow(bm.homeTeam, true, bm.status === 'FINISHED')}
                          {renderTeamRow(bm.awayTeam, false, bm.status === 'FINISHED')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. SEMI-FINALS COLUMN */}
                <div className="space-y-8">
                  <div className="bg-[#111827] text-white px-3 py-1.5 rounded text-center font-extrabold text-xs uppercase tracking-wider">
                    Semi-Finals
                  </div>

                  <div className="space-y-12">
                    {semiFinals.map((bm) => (
                      <div
                        key={bm.id}
                        onClick={() => handleMatchClick(bm)}
                        className={`border rounded-lg overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all cursor-pointer ${
                          bm.status === 'LIVE' ? 'border-red-500 ring-2 ring-red-500/10' : 'border-slate-200 hover:border-red-400'
                        }`}
                      >
                        <div className={`px-3 py-1 border-b flex items-center justify-between text-[10px] font-bold ${
                          bm.status === 'LIVE' ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-500 border-slate-100'
                        }`}>
                          <span>{bm.matchNum}</span>
                          {bm.status === 'LIVE' ? (
                            <span className="uppercase tracking-wider animate-pulse">
                              LIVE {bm.minute}
                            </span>
                          ) : (
                            <span>{bm.time}</span>
                          )}
                        </div>
                        <div className="divide-y divide-slate-100">
                          {renderTeamRow(bm.homeTeam, true, bm.status === 'FINISHED')}
                          {renderTeamRow(bm.awayTeam, false, bm.status === 'FINISHED')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. GRAND FINAL COLUMN */}
                <div className="space-y-6">
                  <div className="bg-red-600 text-white px-3 py-1.5 rounded text-center font-black text-xs uppercase tracking-wider shadow-xs">
                    Grand Final
                  </div>

                  {/* Grand Final Card */}
                  <div
                    onClick={() => handleMatchClick(grandFinal)}
                    className="border-2 border-amber-500/60 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1.5 flex items-center justify-between text-[11px] font-black uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5" />
                        CHAMPIONSHIP FINAL
                      </span>
                      <span>15:30 EAT</span>
                    </div>

                    <div className="p-3 text-center bg-slate-50 border-b border-slate-100">
                      <div className="text-[11px] font-bold text-slate-800">
                        Sheikh Amri Abeid Stadium
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Official Uhlsport Match Ball
                      </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {renderTeamRow(grandFinal.homeTeam, true, false)}
                      {renderTeamRow(grandFinal.awayTeam, false, false)}
                    </div>
                  </div>

                  {/* 3rd Place Match Card */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase text-slate-400 text-center mb-1.5">
                      3rd Place Playoff
                    </div>
                    <div
                      onClick={() => handleMatchClick(thirdPlace)}
                      className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                    >
                      <div className="bg-slate-50 px-3 py-1 border-b border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span>BRONZE MEDAL</span>
                        <span>13:15 EAT</span>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {renderTeamRow(thirdPlace.homeTeam, true, false)}
                        {renderTeamRow(thirdPlace.awayTeam, false, false)}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Stadium & Pitch Venues Guide Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
              <div className="bg-[#111827] text-white px-3 py-2 rounded flex items-center justify-between border-l-4 border-red-600">
                <span className="font-extrabold text-xs uppercase tracking-wider font-display">
                  Official Finals Day Match Locations
                </span>
                <span className="text-[10px] text-slate-400">Arusha, Tanzania</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="p-3 rounded bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>Sheikh Amri Abeid</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    20,000 Capacity Stadium · Grand Finals Arena
                  </div>
                </div>
                <div className="p-3 rounded bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>TGT Grounds</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Pitch 1, 2, 3 & 4 · Quarter & Semi-Finals
                  </div>
                </div>
                <div className="p-3 rounded bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>Braeburn Arusha</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Main Pitch · Shield & Youth Plate Knockouts
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ----------------- RIGHT COLUMN (SIDEBAR, 4 Cols / 33%) ----------------- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* TROPHY SHOWCASE SPOTLIGHT WIDGET */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
              <div className="bg-[#111827] text-white px-4 py-2.5 flex items-center justify-between border-l-4 border-amber-500">
                <span className="font-black text-xs sm:text-sm uppercase tracking-wider font-display flex items-center gap-1.5 text-amber-400">
                  <Trophy className="w-4 h-4" />
                  CHIPKIZI CUP TROPHY
                </span>
                <span className="text-[10px] text-slate-400">2026 Edition</span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={trophyImg}
                  alt="Official Chipkizi Cup Gold Trophy"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-black uppercase tracking-tight text-amber-300">
                    East Africa's Premier Youth Trophy
                  </div>
                  <div className="text-[10px] text-slate-200">
                    Hand-crafted 24k gold leaf cup presented to the Champions
                  </div>
                </div>
              </div>
            </div>

            {/* Reusable Tournament Sidebar */}
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
