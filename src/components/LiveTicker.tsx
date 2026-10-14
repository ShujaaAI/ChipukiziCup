import React from 'react';
import { Activity, Clock, ChevronRight } from 'lucide-react';
import { Match } from '../data/tournamentData';

interface LiveTickerProps {
  matches: Match[];
  onSelectMatch?: (match: Match) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ matches, onSelectMatch }) => {
  return (
    <div className="w-full bg-[#111827] border-b border-slate-800 py-2 px-4 overflow-x-auto select-none shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center gap-3 min-w-max text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600 text-white font-extrabold tracking-wider uppercase text-[10px] shrink-0 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>MATCH TICKER</span>
        </div>

        <div className="flex items-center gap-4 divide-x divide-slate-800 overflow-x-auto py-0.5">
          {matches.map((m) => (
            <div
              key={m.id}
              onClick={() => onSelectMatch?.(m)}
              className="pl-4 first:pl-0 flex items-center gap-3 cursor-pointer hover:opacity-85 transition-opacity"
            >
              <div className="flex items-center gap-2 font-medium">
                <span className="text-slate-200 font-bold">{m.homeTeam.split(' ')[0]}</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono font-black text-xs tracking-tight">
                  {m.status === 'UPCOMING' ? 'vs' : `${m.homeScore ?? 0} : ${m.awayScore ?? 0}`}
                </span>
                <span className="text-slate-200 font-bold">{m.awayTeam.split(' ')[0]}</span>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                {m.status === 'LIVE' ? (
                  <span className="text-red-400 font-black font-mono animate-pulse">
                    {m.minute}
                  </span>
                ) : m.status === 'FINISHED' ? (
                  <span className="text-slate-400 font-mono font-bold">FT</span>
                ) : (
                  <span className="text-amber-400 font-mono flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3 inline text-amber-400" />
                    {m.time.split(' ')[0]}
                  </span>
                )}
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 text-[10px]">{m.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
