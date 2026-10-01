import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  Calendar, 
  Users, 
  Layers, 
  Settings, 
  Save, 
  Plus, 
  Trash2, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Activity, 
  Flame, 
  RefreshCw,
  Trophy,
  Search,
  ArrowRight,
  Sparkles,
  Download,
  LogOut
} from 'lucide-react';
import { Match, Team, Standing, MatchEvent, SquadPlayer } from '../data/tournamentData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
  teams: Team[];
  standings: Standing[];
  onUpdateMatch: (updatedMatch: Match) => void;
  onAddTeam: (newTeam: Team) => void;
  onUpdateTeamGroup: (teamId: string, newGroup: string) => void;
  onGenerateFixtures: (group: string) => void;
  onRecalculateStandings: () => void;
  onLogout: () => void;
  selectedMatchId?: string;
}

type AdminSection = 'scores' | 'teams_groups' | 'settings';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  matches,
  teams,
  standings,
  onUpdateMatch,
  onAddTeam,
  onUpdateTeamGroup,
  onGenerateFixtures,
  onRecalculateStandings,
  onLogout,
  selectedMatchId,
}) => {
  if (!isOpen) return null;

  const [activeSection, setActiveSection] = useState<AdminSection>('scores');
  const [currentMatchId, setCurrentMatchId] = useState<string>(
    selectedMatchId || matches[0]?.id || ''
  );

  // Score Updater Form State
  const currentMatch = matches.find((m) => m.id === currentMatchId) || matches[0];
  const [homeScore, setHomeScore] = useState<number>(currentMatch?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState<number>(currentMatch?.awayScore ?? 0);
  const [status, setStatus] = useState<'LIVE' | 'FINISHED' | 'UPCOMING'>(currentMatch?.status ?? 'UPCOMING');
  const [minute, setMinute] = useState<string>(currentMatch?.minute ?? "45'");
  const [pitch, setPitch] = useState<string>(currentMatch?.pitch ?? 'Pitch 1 · TGT Arusha');
  const [timelineEvents, setTimelineEvents] = useState<MatchEvent[]>(currentMatch?.timeline ?? []);
  
  // New Event Form State
  const [newEventType, setNewEventType] = useState<'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUB'>('GOAL');
  const [newEventTeam, setNewEventTeam] = useState<'home' | 'away'>('home');
  const [newEventPlayer, setNewEventPlayer] = useState<string>('');
  const [newEventMinute, setNewEventMinute] = useState<number>(45);
  const [newEventDetail, setNewEventDetail] = useState<string>('');

  // Add Team Form State
  const [newTeamName, setNewTeamName] = useState<string>('');
  const [newTeamShortName, setNewTeamShortName] = useState<string>('');
  const [newTeamCountry, setNewTeamCountry] = useState<string>('Tanzania');
  const [newTeamCity, setNewTeamCity] = useState<string>('');
  const [newTeamCoach, setNewTeamCoach] = useState<string>('');
  const [newTeamCategory, setNewTeamCategory] = useState<string>('U15');
  const [newTeamGroup, setNewTeamGroup] = useState<string>('Group A');
  const [newTeamFounded, setNewTeamFounded] = useState<number>(2015);

  // Group fixture generation state
  const [targetGroupForFixtures, setTargetGroupForFixtures] = useState<string>('Group A');

  // Pitches Manager State
  const [pitchStatuses, setPitchStatuses] = useState<{ id: string; name: string; status: 'ACTIVE' | 'MAINTENANCE' | 'FLOODLIT' }[]>([
    { id: 'p-1', name: 'Pitch 1 · TGT Grounds Main', status: 'ACTIVE' },
    { id: 'p-2', name: 'Pitch 2 · Braeburn Synthetic Turf', status: 'ACTIVE' },
    { id: 'p-3', name: 'Pitch 3 · TGT Stadium Complex', status: 'ACTIVE' },
    { id: 'p-4', name: 'Pitch 4 · Sheikh Amri Abeid Stadium', status: 'FLOODLIT' },
    { id: 'p-5', name: 'Pitch 5 · TGT Training Area B', status: 'ACTIVE' },
    { id: 'p-6', name: 'Pitch 6 · Braeburn Field 2', status: 'MAINTENANCE' },
  ]);

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelectMatch = (id: string) => {
    setCurrentMatchId(id);
    const m = matches.find((item) => item.id === id);
    if (m) {
      setHomeScore(m.homeScore ?? 0);
      setAwayScore(m.awayScore ?? 0);
      setStatus(m.status);
      setMinute(m.minute ?? (m.status === 'FINISHED' ? 'FT' : "45'"));
      setPitch(m.pitch);
      setTimelineEvents(m.timeline ?? []);
    }
  };

  // Add Event (Goal/Card)
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventPlayer.trim()) return;

    const event: MatchEvent = {
      minute: newEventMinute,
      type: newEventType,
      team: newEventTeam,
      player: newEventPlayer.trim(),
      detail: newEventDetail.trim() || undefined,
    };

    setTimelineEvents([...timelineEvents, event]);
    
    // If it's a goal, optionally increment score
    if (newEventType === 'GOAL') {
      if (newEventTeam === 'home') setHomeScore((prev) => prev + 1);
      else setAwayScore((prev) => prev + 1);
    }

    setNewEventPlayer('');
    setNewEventDetail('');
    showToast(`Added ${newEventType} for ${event.player}`);
  };

  const handleRemoveEvent = (index: number) => {
    const ev = timelineEvents[index];
    if (ev.type === 'GOAL') {
      if (ev.team === 'home') setHomeScore((prev) => Math.max(0, prev - 1));
      else setAwayScore((prev) => Math.max(0, prev - 1));
    }
    setTimelineEvents(timelineEvents.filter((_, i) => i !== index));
  };

  // Save Match Score
  const handleSaveScore = () => {
    if (!currentMatch) return;
    
    // Generate simple scorers list for quick rendering
    const scorersList = timelineEvents
      .filter((e) => e.type === 'GOAL')
      .map((e) => `${e.player} ${e.minute}'`);

    const updated: Match = {
      ...currentMatch,
      homeScore,
      awayScore,
      status,
      minute: status === 'FINISHED' ? 'FT' : minute,
      pitch,
      timeline: timelineEvents,
      scorers: scorersList,
    };

    onUpdateMatch(updated);
    showToast(`Score updated: ${updated.homeTeam} ${homeScore} - ${awayScore} ${updated.awayTeam}`);
  };

  // Register New Team
  const handleRegisterTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim() || !newTeamCity.trim()) return;

    const flagMap: Record<string, string> = {
      Tanzania: '🇹🇿',
      Kenya: '🇰🇪',
      Uganda: '🇺🇬',
      Rwanda: '🇷🇼',
      Burundi: '🇧🇮',
      Zanzibar: '🇹🇿',
    };

    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: newTeamName.trim(),
      shortName: newTeamShortName.trim() || newTeamName.trim().slice(0, 10),
      country: newTeamCountry,
      city: newTeamCity.trim(),
      flag: flagMap[newTeamCountry] || '⚽',
      badgeColor: 'from-emerald-600 to-slate-900',
      category: newTeamCategory,
      group: newTeamGroup,
      coach: newTeamCoach.trim() || 'Head Coach',
      founded: Number(newTeamFounded) || 2018,
      squadSize: 18,
      trainingGround: `${newTeamCity} Sports Complex`,
      roster: [
        { number: 1, name: `${newTeamName.split(' ')[0]} Keeper`, position: 'GK', age: 15, matchesPlayed: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
        { number: 5, name: 'Team Captain', position: 'DEF', age: 15, matchesPlayed: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0, isCaptain: true },
        { number: 9, name: 'Lead Striker', position: 'FWD', age: 15, matchesPlayed: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
        { number: 10, name: 'Playmaker', position: 'MID', age: 15, matchesPlayed: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      ],
    };

    onAddTeam(newTeam);
    setNewTeamName('');
    setNewTeamShortName('');
    setNewTeamCity('');
    setNewTeamCoach('');
    showToast(`Successfully registered ${newTeam.name} into ${newTeam.group}`);
  };

  const handleTogglePitchStatus = (pitchId: string) => {
    setPitchStatuses((prev) =>
      prev.map((p) => {
        if (p.id !== pitchId) return p;
        const nextStatus = p.status === 'ACTIVE' ? 'FLOODLIT' : p.status === 'FLOODLIT' ? 'MAINTENANCE' : 'ACTIVE';
        return { ...p, status: nextStatus };
      })
    );
    showToast('Updated pitch operational condition');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Dimmed Backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Admin Panel Card */}
      <div className="relative w-full max-w-5xl bg-[#0B0F17] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-4 flex flex-col max-h-[94vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white font-display">
                  Chipkizi Cup Tournament Administration
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold border border-amber-500/30">
                  Authorized Match Commissioner
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Arusha Organizing Committee · Live Competition Management System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="End admin session and sign out"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Logout</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in shrink-0">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Admin Navigation & Content Layout */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
          {/* Left Admin Sidebar */}
          <div className="w-full md:w-64 bg-slate-950/70 border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 hidden md:block">
              Tournament Modules
            </div>

            <button
              onClick={() => setActiveSection('scores')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap w-full ${
                activeSection === 'scores'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Manage Matches & Scores</span>
            </button>

            <button
              onClick={() => setActiveSection('teams_groups')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap w-full ${
                activeSection === 'teams_groups'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Manage Teams & Groups</span>
            </button>

            <button
              onClick={() => setActiveSection('settings')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap w-full ${
                activeSection === 'settings'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Tournament Settings</span>
            </button>
          </div>

          {/* Right Main Body View Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            
            {/* ================= SECTION 1: MANAGE MATCHES / SCORES ================= */}
            {activeSection === 'scores' && (
              <div className="space-y-6">
                
                {/* Match Selector Dropdown */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                  <label className="block text-xs font-bold text-white uppercase tracking-wider">
                    Select Target Fixture to Officiate
                  </label>
                  <select
                    value={currentMatchId}
                    onChange={(e) => handleSelectMatch(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    {matches.map((m) => (
                      <option key={m.id} value={m.id}>
                        [{m.category}] {m.homeTeam} vs {m.awayTeam} · {m.round} ({m.status === 'LIVE' ? `LIVE ${m.minute}` : m.status})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Scoreboard Editor Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141F33] to-slate-900 border border-amber-500/30 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        {currentMatch.category} · {currentMatch.round}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{currentMatch.pitch}</span>
                  </div>

                  {/* Dual Score Incrementers */}
                  <div className="grid grid-cols-5 items-center gap-4">
                    {/* Home Team */}
                    <div className="col-span-2 text-center space-y-2">
                      <span className="font-bold text-sm text-white block truncate">
                        {currentMatch.homeTeam}
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setHomeScore((s) => Math.max(0, s - 1))}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={0}
                          value={homeScore}
                          onChange={(e) => setHomeScore(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 h-12 rounded-xl bg-black/60 border border-white/20 text-center font-mono font-black text-2xl text-white focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => setHomeScore((s) => s + 1)}
                          className="w-8 h-8 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-center font-bold text-slate-500 text-lg">
                      VS
                    </div>

                    {/* Away Team */}
                    <div className="col-span-2 text-center space-y-2">
                      <span className="font-bold text-sm text-white block truncate">
                        {currentMatch.awayTeam}
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAwayScore((s) => Math.max(0, s - 1))}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={0}
                          value={awayScore}
                          onChange={(e) => setAwayScore(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 h-12 rounded-xl bg-black/60 border border-white/20 text-center font-mono font-black text-2xl text-white focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => setAwayScore((s) => s + 1)}
                          className="w-8 h-8 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Match Status & Timing Settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Match Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white font-medium focus:outline-none"
                      >
                        <option value="UPCOMING">Upcoming (Scheduled)</option>
                        <option value="LIVE">Live in Progress</option>
                        <option value="FINISHED">Finished (Full Time)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Match Clock / Minute</label>
                      <input
                        type="text"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        placeholder="e.g. 74', HT, FT"
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white font-mono focus:outline-none"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Venue Pitch</label>
                      <input
                        type="text"
                        value={pitch}
                        onChange={(e) => setPitch(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Action Save Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleSaveScore}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Publish Score & Status Update</span>
                    </button>
                  </div>
                </div>

                {/* Match Events Logger (Goals, Yellow & Red Cards, Subs) */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Live Event Recorder (Goals, Cards, Substitutions)
                  </h4>

                  <form onSubmit={handleAddEvent} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Type</label>
                      <select
                        value={newEventType}
                        onChange={(e) => setNewEventType(e.target.value as any)}
                        className="w-full p-2 bg-slate-950 border border-white/15 rounded-lg text-white"
                      >
                        <option value="GOAL">Goal (⚽)</option>
                        <option value="YELLOW_CARD">Yellow Card (🟨)</option>
                        <option value="RED_CARD">Red Card (🟥)</option>
                        <option value="SUB">Substitution (🔄)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Team</label>
                      <select
                        value={newEventTeam}
                        onChange={(e) => setNewEventTeam(e.target.value as any)}
                        className="w-full p-2 bg-slate-950 border border-white/15 rounded-lg text-white"
                      >
                        <option value="home">Home: {currentMatch.homeTeam.split(' ')[0]}</option>
                        <option value="away">Away: {currentMatch.awayTeam.split(' ')[0]}</option>
                      </select>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-slate-400 mb-1">Player Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Emmanuel Mollel"
                        value={newEventPlayer}
                        onChange={(e) => setNewEventPlayer(e.target.value)}
                        className="w-full p-2 bg-slate-950 border border-white/15 rounded-lg text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Minute</label>
                      <input
                        type="number"
                        min={1}
                        max={120}
                        value={newEventMinute}
                        onChange={(e) => setNewEventMinute(parseInt(e.target.value) || 1)}
                        className="w-full p-2 bg-slate-950 border border-white/15 rounded-lg text-white font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-end">
                      <button
                        type="submit"
                        className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Event</span>
                      </button>
                    </div>
                  </form>

                  {/* Events Logged Table */}
                  {timelineEvents.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase">
                        Current Match Timeline Events ({timelineEvents.length})
                      </div>
                      <div className="space-y-1.5">
                        {timelineEvents.map((ev, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono font-bold text-amber-400">{ev.minute}'</span>
                              <span>{ev.type === 'GOAL' ? '⚽' : ev.type === 'RED_CARD' ? '🟥' : ev.type === 'YELLOW_CARD' ? '🟨' : '🔄'}</span>
                              <span className="font-bold text-white">{ev.player}</span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                ({ev.team === 'home' ? currentMatch.homeTeam : currentMatch.awayTeam})
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveEvent(idx)}
                              className="text-slate-500 hover:text-rose-400 p-1"
                              title="Delete event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ================= SECTION 2: MANAGE TEAMS & GROUPS ================= */}
            {activeSection === 'teams_groups' && (
              <div className="space-y-6">
                
                {/* Register New Academy Form */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[#121E30] to-slate-900 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Register New Football Academy
                    </h3>
                    <span className="text-xs text-slate-400">Official Tournament Registration</span>
                  </div>

                  <form onSubmit={handleRegisterTeam} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Academy / Club Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Serengeti Boys Academy"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Short Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Serengeti"
                        value={newTeamShortName}
                        onChange={(e) => setNewTeamShortName(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Country</label>
                      <select
                        value={newTeamCountry}
                        onChange={(e) => setNewTeamCountry(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white focus:outline-none"
                      >
                        <option value="Tanzania">Tanzania (🇹🇿)</option>
                        <option value="Kenya">Kenya (🇰🇪)</option>
                        <option value="Uganda">Uganda (🇺🇬)</option>
                        <option value="Rwanda">Rwanda (🇷🇼)</option>
                        <option value="Burundi">Burundi (🇧🇮)</option>
                        <option value="Zanzibar">Zanzibar (🇹🇿)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Home City</label>
                      <input
                        type="text"
                        placeholder="e.g. Mwanza"
                        value={newTeamCity}
                        onChange={(e) => setNewTeamCity(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Head Coach</label>
                      <input
                        type="text"
                        placeholder="e.g. Boniface Pawasa"
                        value={newTeamCoach}
                        onChange={(e) => setNewTeamCoach(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Division Category</label>
                      <select
                        value={newTeamCategory}
                        onChange={(e) => setNewTeamCategory(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white focus:outline-none"
                      >
                        <option value="U9">U9 Mini-Kickers</option>
                        <option value="U11">U11 Juniors</option>
                        <option value="U13">U13 Boys</option>
                        <option value="U15">U15 Boys Cup</option>
                        <option value="U17">U17 Boys Championship</option>
                        <option value="U20">U20 Elite Showcase</option>
                        <option value="Girls U15">Girls U15 Cup</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Initial Group Placement</label>
                      <select
                        value={newTeamGroup}
                        onChange={(e) => setNewTeamGroup(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white focus:outline-none"
                      >
                        <option value="Group A">Group A</option>
                        <option value="Group B">Group B</option>
                        <option value="Group C">Group C</option>
                        <option value="Group D">Group D</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Founded Year</label>
                      <input
                        type="number"
                        min={1950}
                        max={2026}
                        value={newTeamFounded}
                        onChange={(e) => setNewTeamFounded(parseInt(e.target.value) || 2018)}
                        className="w-full p-2.5 bg-slate-950 border border-white/15 rounded-xl text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Register & Assign Academy</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Registered Teams Table */}
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/60">
                  <div className="px-6 py-3.5 bg-slate-950 border-b border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase">
                      Current Registered Academies ({teams.length})
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      All 6 Nations
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 bg-black/20 font-bold uppercase text-[11px]">
                          <th className="py-3 px-4">Club Academy</th>
                          <th className="py-3 px-4">Country & City</th>
                          <th className="py-3 px-4">Division</th>
                          <th className="py-3 px-4">Group</th>
                          <th className="py-3 px-4">Head Coach</th>
                          <th className="py-3 px-4 text-center">Squad Size</th>
                          <th className="py-3 px-4 text-right">Reassign Group</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {teams.map((t) => (
                          <tr key={t.id} className="hover:bg-white/5">
                            <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                              <span>{t.flag}</span>
                              <span>{t.name}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-300">
                              {t.city}, {t.country}
                            </td>
                            <td className="py-3 px-4 font-mono text-emerald-400">
                              {t.category}
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-amber-400">
                              {t.group}
                            </td>
                            <td className="py-3 px-4 text-slate-300">
                              {t.coach}
                            </td>
                            <td className="py-3 px-4 text-center font-mono">
                              {t.squadSize || 18}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <select
                                value={t.group}
                                onChange={(e) => onUpdateTeamGroup(t.id, e.target.value)}
                                className="px-2 py-1 rounded bg-slate-950 border border-white/15 text-[11px] text-white focus:outline-none"
                              >
                                <option value="Group A">Group A</option>
                                <option value="Group B">Group B</option>
                                <option value="Group C">Group C</option>
                                <option value="Group D">Group D</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tournament Table Engine & Fixture Generator */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#121B2C] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white font-display">
                      Tournament Table Engine
                    </h3>
                    <p className="text-xs text-slate-400">
                      Sync standings from completed match cards and generate round-robin fixture pairings
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onRecalculateStandings();
                        showToast('Recalculated all group standings and goal differentials');
                      }}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Recalculate Table Points</span>
                    </button>
                  </div>
                </div>

                {/* Group Generator Box */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Automatic Fixture Generation
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Round-Robin Algorithm
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    Generate pairings for newly added teams or matchdays across tournament pitches:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <select
                      value={targetGroupForFixtures}
                      onChange={(e) => setTargetGroupForFixtures(e.target.value)}
                      className="p-2.5 bg-slate-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none w-full sm:w-48"
                    >
                      <option value="Group A">Group A</option>
                      <option value="Group B">Group B</option>
                      <option value="Group C">Group C</option>
                      <option value="Group D">Group D</option>
                    </select>

                    <button
                      onClick={() => {
                        onGenerateFixtures(targetGroupForFixtures);
                        showToast(`Generated round-robin fixtures for ${targetGroupForFixtures}`);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Generate Group Fixtures</span>
                    </button>
                  </div>
                </div>

                {/* Group Summary Preview Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Group A', 'Group B', 'Group C', 'Group D'].map((grp) => {
                    const grpTeams = teams.filter((t) => t.group === grp);
                    return (
                      <div key={grp} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs font-mono">{grp}</span>
                          <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                            {grpTeams.length} Clubs
                          </span>
                        </div>
                        <div className="space-y-1">
                          {grpTeams.map((t, idx) => (
                            <div key={t.id} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-black/30">
                              <span className="text-slate-300 truncate">{idx + 1}. {t.name}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{t.country}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* ================= SECTION 4: TOURNAMENT SETTINGS ================= */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                
                {/* General Settings */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
                    Tournament Global Parameters
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Tournament Title</label>
                      <input
                        type="text"
                        readOnly
                        value="Chipkizi Cup 2026 (15th Annual Edition)"
                        className="w-full p-2.5 bg-slate-950 border border-white/10 rounded-xl text-slate-300 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Host Organization</label>
                      <input
                        type="text"
                        readOnly
                        value="Future Stars Academy (Arusha, Tanzania)"
                        className="w-full p-2.5 bg-slate-950 border border-white/10 rounded-xl text-slate-300 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Official Ball Partner</label>
                      <input
                        type="text"
                        readOnly
                        value="Uhlsport Match Pro FIFA Inspected"
                        className="w-full p-2.5 bg-slate-950 border border-white/10 rounded-xl text-slate-300 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Match Half Duration</label>
                      <input
                        type="text"
                        readOnly
                        value="2 x 40 Minutes (10 min Halftime)"
                        className="w-full p-2.5 bg-slate-950 border border-white/10 rounded-xl text-slate-300 font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Pitch Facility Management */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Pitch & Grounds Maintenance Status
                    </h3>
                    <span className="text-xs text-slate-400">Click badge to toggle state</span>
                  </div>

                  <div className="space-y-2.5">
                    {pitchStatuses.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-white">{p.name}</span>
                        </div>

                        <button
                          onClick={() => handleTogglePitchStatus(p.id)}
                          className={`px-3 py-1 rounded-lg font-mono font-bold text-[11px] transition-all ${
                            p.status === 'ACTIVE'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : p.status === 'FLOODLIT'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {p.status}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Export / System Backup */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      Tournament Data Export
                    </h4>
                    <p className="text-xs text-slate-400">
                      Download complete match records, scores, cards, and team rosters
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ matches, teams, standings }, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", "chipkizi_cup_2026_data.json");
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                      showToast('Downloaded official tournament data export (JSON)');
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export JSON Backup</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
