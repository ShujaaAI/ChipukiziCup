import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Shield, 
  Flame, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Match, Standing, Scorer, TEAMS_DATA, TOP_SCORERS } from '../data/tournamentData';
import playerSpotlightImg from '../assets/images/chipkizi_player_spotlight_1791989031130.jpg';

interface TournamentSidebarProps {
  onSelectTab?: (tab: 'home' | 'fixtures' | 'standings' | 'brackets' | 'teams' | 'stats') => void;
  standings?: Standing[];
  matches?: Match[];
  hideStandings?: boolean;
  showTopScorersInstead?: boolean;
}

export const TournamentSidebar: React.FC<TournamentSidebarProps> = ({
  onSelectTab,
  standings = [],
  matches = [],
  hideStandings = false,
  showTopScorersInstead = false,
}) => {
  // Live countdown timer for NEXT MATCH widget (Days, Hrs, Mins, Secs)
  const [countdown, setCountdown] = useState({
    days: 31,
    hours: 24,
    minutes: 43,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getBadge = (teamName: string) => {
    const found = TEAMS_DATA.find((t) => t.name.toLowerCase().includes(teamName.toLowerCase()));
    return found?.flag || '⚽';
  };

  const compactStandings = standings.slice(0, 6);

  return (
    <aside className="space-y-6">
      
      {/* WIDGET 1: STANDINGS OR TOP SCORERS */}
      {!hideStandings && !showTopScorersInstead && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          {/* Header Bar */}
          <div className="bg-[#111827] text-white px-4 py-2.5 flex items-center justify-between border-l-4 border-red-600">
            <span className="font-black text-xs sm:text-sm uppercase tracking-wider font-display">
              PREMIER LEAGUE
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">
              Group Stage
            </span>
          </div>

          {/* Compact Table */}
          <div className="p-3">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-[11px] font-bold uppercase text-slate-400 border-b border-slate-100 pb-2">
                  <th className="py-2 pl-2 w-8">POS</th>
                  <th className="py-2">TEAM</th>
                  <th className="py-2 text-center w-8">W</th>
                  <th className="py-2 text-center w-8">D</th>
                  <th className="py-2 text-center w-8">L</th>
                  <th className="py-2 text-right pr-2 w-10">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {compactStandings.map((team, idx) => (
                  <tr key={team.team} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 pl-2 font-mono font-bold text-slate-500">
                      {idx + 1}
                    </td>
                    <td className="py-2 font-semibold text-slate-800 truncate max-w-[125px]">
                      {team.team}
                    </td>
                    <td className="py-2 text-center font-mono text-slate-600">
                      {team.w}
                    </td>
                    <td className="py-2 text-center font-mono text-slate-600">
                      {team.d}
                    </td>
                    <td className="py-2 text-center font-mono text-slate-600">
                      {team.l}
                    </td>
                    <td className="py-2 text-right pr-2 font-mono font-black text-slate-900">
                      {team.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Bright Red Button at bottom matching reference image */}
            <div className="mt-3 pt-1">
              <button
                onClick={() => onSelectTab?.('standings')}
                className="w-full py-2.5 rounded bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider text-center shadow transition-colors cursor-pointer"
              >
                View Full Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ALTERNATIVE WIDGET: TOP SCORERS LEADERBOARD (when on standings page) */}
      {showTopScorersInstead && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          <div className="bg-[#111827] text-white px-4 py-2.5 flex items-center justify-between border-l-4 border-red-600">
            <span className="font-black text-xs sm:text-sm uppercase tracking-wider font-display">
              GOLDEN BOOT
            </span>
            <span className="text-[10px] text-amber-400 uppercase font-mono font-bold">
              Top Scorers
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-100">
            {TOP_SCORERS.slice(0, 5).map((sc, idx) => (
              <div key={sc.rank} className="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    idx === 0 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sc.rank}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-800 truncate">
                      {sc.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {getBadge(sc.team)} {sc.team}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-black text-xs text-red-600">
                    {sc.goals}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">goals</span>
                </div>
              </div>
            ))}

            <div className="mt-3 pt-2">
              <button
                onClick={() => onSelectTab?.('stats')}
                className="w-full py-2.5 rounded bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider text-center shadow transition-colors cursor-pointer"
              >
                Full Statistics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WIDGET 2: SPONSOR / FOUNDATION SPOTLIGHT CARD */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="bg-[#111827] text-white px-4 py-2.5 flex items-center justify-between border-l-4 border-red-600">
          <span className="font-black text-xs sm:text-sm uppercase tracking-wider font-display">
            OFFICIAL PARTNER
          </span>
          <span className="text-[10px] text-slate-400 uppercase">
            Sponsor
          </span>
        </div>

        <div className="relative aspect-[4/5] bg-black overflow-hidden flex flex-col justify-between p-6 text-white group cursor-pointer">
          {/* Image of player holding ball */}
          <img
            src={playerSpotlightImg}
            alt="The National League Sponsor"
            className="absolute inset-0 w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Badge text on top left */}
          <div className="relative z-10">
            <h4 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight leading-tight text-white drop-shadow">
              THE <br /> NATIONAL <br /> LEAGUE
            </h4>
          </div>

          <div className="relative z-10 pt-4">
            <span className="text-[11px] font-semibold text-slate-200 block">
              Official Youth Talent Partner · Future Stars
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Empowering 1,200+ young African athletes in Arusha
            </span>
          </div>
        </div>
      </div>

      {/* WIDGET 3: NEXT MATCH COUNTDOWN WIDGET */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        {/* Header Bar */}
        <div className="bg-[#111827] text-white px-4 py-2.5 flex items-center justify-between border-l-4 border-red-600">
          <span className="font-black text-xs sm:text-sm uppercase tracking-wider font-display">
            NEXT MATCH
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            U15 Cup
          </span>
        </div>

        <div className="p-4 space-y-4">
          {/* Teams facing off */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                {getBadge('Future Stars Academy')}
              </div>
              <span className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                Future Stars
              </span>
            </div>

            <div className="flex flex-col items-center px-1">
              <span className="font-mono text-base font-black text-red-600 uppercase tracking-widest">
                VS
              </span>
              <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                Tomorrow
              </span>
            </div>

            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                {getBadge('Azam FC Youth')}
              </div>
              <span className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                Azam FC
              </span>
            </div>
          </div>

          {/* Match Location & Time */}
          <div className="text-center space-y-0.5 border-t border-b border-slate-100 py-2">
            <div className="text-xs font-extrabold text-slate-900 uppercase">
              Championship Quarter-Final
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>Pitch 1 · TGT Grounds Arusha</span>
            </div>
          </div>

          {/* Countdown Boxes */}
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 text-center mb-1.5">
              Kick-off Countdown
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="bg-[#111827] text-white p-1.5 rounded">
                <span className="block font-mono text-sm sm:text-base font-black text-white">
                  {String(countdown.days).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                  Days
                </span>
              </div>
              <div className="bg-[#111827] text-white p-1.5 rounded">
                <span className="block font-mono text-sm sm:text-base font-black text-white">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                  Hrs
                </span>
              </div>
              <div className="bg-[#111827] text-white p-1.5 rounded">
                <span className="block font-mono text-sm sm:text-base font-black text-white">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                  Mins
                </span>
              </div>
              <div className="bg-[#111827] text-white p-1.5 rounded">
                <span className="block font-mono text-sm sm:text-base font-black text-red-400">
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                  Secs
                </span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => onSelectTab?.('fixtures')}
            className="w-full py-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Match Details & Lineups</span>
            <ChevronRight className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      </div>

    </aside>
  );
};
