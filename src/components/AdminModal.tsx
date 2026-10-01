import React, { useState } from 'react';
import { X, Shield, CheckCircle, AlertCircle, Save, Plus, Trash2, MapPin } from 'lucide-react';
import { Match } from '../data/tournamentData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
  onUpdateMatch: (updatedMatch: Match) => void;
  selectedMatchId?: string;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  matches,
  onUpdateMatch,
  selectedMatchId,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'score' | 'pitches'>('score');
  const [currentMatchId, setCurrentMatchId] = useState<string>(
    selectedMatchId || matches[0]?.id || ''
  );
  
  const currentMatch = matches.find((m) => m.id === currentMatchId) || matches[0];

  const [homeScore, setHomeScore] = useState<number>(currentMatch?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState<number>(currentMatch?.awayScore ?? 0);
  const [status, setStatus] = useState<'LIVE' | 'FINISHED' | 'UPCOMING'>(currentMatch?.status ?? 'UPCOMING');
  const [minute, setMinute] = useState<string>(currentMatch?.minute ?? "65'");
  const [pitch, setPitch] = useState<string>(currentMatch?.pitch ?? 'Pitch 1 · TGT Arusha');
  const [newScorer, setNewScorer] = useState<string>('');
  const [scorers, setScorers] = useState<string[]>(currentMatch?.scorers ?? []);
  const [notification, setNotification] = useState<string | null>(null);

  const handleMatchSelect = (id: string) => {
    setCurrentMatchId(id);
    const m = matches.find((item) => item.id === id);
    if (m) {
      setHomeScore(m.homeScore ?? 0);
      setAwayScore(m.awayScore ?? 0);
      setStatus(m.status);
      setMinute(m.minute ?? "45'");
      setPitch(m.pitch);
      setScorers(m.scorers ?? []);
    }
  };

  const handleAddScorer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScorer.trim()) return;
    setScorers([...scorers, newScorer.trim()]);
    setNewScorer('');
  };

  const handleRemoveScorer = (index: number) => {
    setScorers(scorers.filter((_, idx) => idx !== index));
  };

  const handleSave = () => {
    if (!currentMatch) return;
    const updated: Match = {
      ...currentMatch,
      homeScore,
      awayScore,
      status,
      minute: status === 'FINISHED' ? 'FT' : minute,
      pitch,
      scorers,
    };
    onUpdateMatch(updated);
    setNotification(`Match updated successfully: ${updated.homeTeam} vs ${updated.awayTeam}`);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
                Chipkizi Cup Admin Portal
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                  Match Official Access
                </span>
              </h2>
              <p className="text-xs text-slate-400">Arusha Organizing Committee & Match Commissioner Panel</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 border-b border-white/5 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('score')}
            className={`pb-2.5 border-b-2 transition-all ${
              activeTab === 'score'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Match Score Reporter
          </button>
          <button
            onClick={() => setActiveTab('pitches')}
            className={`pb-2.5 border-b-2 transition-all ${
              activeTab === 'pitches'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Pitch & Venue Status
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {notification && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {activeTab === 'score' ? (
            <div className="space-y-5">
              {/* Select Match Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Target Match
                </label>
                <select
                  value={currentMatchId}
                  onChange={(e) => handleMatchSelect(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {matches.map((m) => (
                    <option key={m.id} value={m.id}>
                      [{m.category}] {m.homeTeam} vs {m.awayTeam} ({m.round} - {m.pitch})
                    </option>
                  ))}
                </select>
              </div>

              {/* Match Score Input Row */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-4">
                <div className="grid grid-cols-5 items-center gap-4">
                  {/* Home */}
                  <div className="col-span-2 text-center space-y-1.5">
                    <span className="text-xs font-bold text-white block truncate">
                      {currentMatch.homeTeam}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={homeScore}
                      onChange={(e) => setHomeScore(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 h-12 mx-auto rounded-xl bg-black/60 border border-white/20 text-center font-mono font-bold text-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Divider */}
                  <div className="text-center font-bold text-slate-500 text-lg">
                    VS
                  </div>

                  {/* Away */}
                  <div className="col-span-2 text-center space-y-1.5">
                    <span className="text-xs font-bold text-white block truncate">
                      {currentMatch.awayTeam}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={awayScore}
                      onChange={(e) => setAwayScore(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 h-12 mx-auto rounded-xl bg-black/60 border border-white/20 text-center font-mono font-bold text-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Match Status & Timing */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Match Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full p-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none"
                    >
                      <option value="UPCOMING">Upcoming</option>
                      <option value="LIVE">Live in Progress</option>
                      <option value="FINISHED">Finished (Full Time)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Clock / Minute</label>
                    <input
                      type="text"
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                      placeholder="e.g. 68', HT, FT"
                      className="w-full p-2 bg-slate-900 border border-white/10 rounded-lg text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Goal Scorers Editor */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Goal Events & Scorers
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. E. Mollel 54' (P)"
                    value={newScorer}
                    onChange={(e) => setNewScorer(e.target.value)}
                    className="flex-1 p-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddScorer}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {scorers.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {scorers.map((s, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/40 border border-white/10 text-xs text-slate-300 font-mono"
                      >
                        <span>⚽ {s}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveScorer(idx)}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Pitch & Venue Status Tab */
            <div className="space-y-4 text-xs">
              <p className="text-slate-400">
                Current operational status of match grounds across Arusha for tournament marshals:
              </p>

              <div className="space-y-2.5">
                {[
                  { name: 'Pitch 1 · TGT Arusha', status: 'Match In Progress', cond: 'Optimal Grass', active: true },
                  { name: 'Pitch 2 · Braeburn Main', status: 'Warm-up Scheduled', cond: 'Synthetic Turf 4G', active: true },
                  { name: 'Pitch 3 · TGT Stadium', status: 'Halftime Maintenance', cond: 'Optimal Grass', active: true },
                  { name: 'Sheikh Amri Abeid', status: 'Preparing for Finals', cond: 'Main Stadium', active: true },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="font-bold text-white block">{p.name}</span>
                        <span className="text-[11px] text-slate-400">{p.cond}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[11px]">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          {activeTab === 'score' && (
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Publish Score Update</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
