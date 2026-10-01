import React from 'react';
import { Activity, Clock, ChevronRight } from 'lucide-react';
import { Match } from '../data/tournamentData';

interface LiveTickerProps {
  matches: Match[];
  onSelectMatch?: (match: Match) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ matches, onSelectMatch }) => {
  return (
    <div className="w-full bg-[#0D131F] border-b border-white/5 py-2 px-4 overflow-x-auto select-none">
      <div className="max-w-7xl mx-auto flex items-center gap-3 min-w-max text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold tracking-wide uppercase text-[11px] shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Match Center</span>
        </div>

        <div className="flex items-center gap-4 divide-x divide-white/10 overflow-x-auto py-1">
          {matches.map((m) => (
            <div
              key={m.id}
              onClick={() => onSelectMatch?.(m)}
              className="pl-4 first:pl-0 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2 font-medium">
                <span className="text-slate-300">{m.homeTeam.split(' ')[0]}</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-white font-mono font-bold text-xs tracking-tight">
                  {m.status === 'UPCOMING' ? 'vs' : `${m.homeScore ?? 0} - ${m.awayScore ?? 0}`}
                </span>
                <span className="text-slate-300">{m.awayTeam.split(' ')[0]}</span>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                {m.status === 'LIVE' ? (
                  <span className="text-emerald-400 font-semibold font-mono animate-pulse">
                    {m.minute}
                  </span>
                ) : m.status === 'FINISHED' ? (
                  <span className="text-slate-500 font-mono">FT</span>
                ) : (
                  <span className="text-amber-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 inline" />
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
