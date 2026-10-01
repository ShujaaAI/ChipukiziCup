import React, { useState } from 'react';
import { 
  Shield, 
  MapPin, 
  Users, 
  Award, 
  Search, 
  Globe, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { TEAMS_DATA, Team } from '../data/tournamentData';
import { TeamSquadModal } from '../components/TeamSquadModal';

interface TeamsViewProps {
  teams?: Team[];
}

export const TeamsView: React.FC<TeamsViewProps> = ({ teams = TEAMS_DATA }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTeamForModal, setSelectedTeamForModal] = useState<Team | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const countries = ['All', 'Tanzania', 'Kenya', 'Uganda', 'Rwanda'];

  const filteredTeams = teams.filter((team) => {
    if (selectedCountry !== 'All' && team.country !== selectedCountry) return false;
    if (
      searchTerm &&
      !team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !team.city.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !team.coach.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleOpenTeamSquad = (team: Team) => {
    setSelectedTeamForModal(team);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            Tournament Academy Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Participating Teams & Squads
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse verified football academies, coaching staff, and official player rosters across East & Central Africa
          </p>
        </div>

        {/* Country Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl overflow-x-auto self-start md:self-auto">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedCountry === c
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {c === 'All' ? 'All Nations (6)' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search academy, manager, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="text-xs text-slate-400 self-end sm:self-auto">
          Showing <strong className="text-white font-mono">{filteredTeams.length}</strong> academies
        </div>
      </div>

      {/* Academy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => {
          const totalGoals = team.roster.reduce((acc, p) => acc + p.goals, 0);

          return (
            <div
              key={team.id}
              onClick={() => handleOpenTeamSquad(team)}
              className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between hover:bg-slate-900/90 shadow-xl space-y-5"
            >
              {/* Top Row: Crest & Club Name */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {/* Club Crest */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${team.badgeColor} border border-white/20 flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform shrink-0`}
                    >
                      {team.flag}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display leading-tight">
                        {team.name}
                      </h3>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{team.city}, {team.country}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-emerald-400">
                    {team.group}
                  </span>
                </div>

                {/* Manager & Club Details */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Head Coach:</span>
                    <strong className="text-white">{team.coach}</strong>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Squad Registered:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {team.squadSize || team.roster.length} Players
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Tournament Goals:</span>
                    <span className="font-mono font-bold text-amber-400">
                      {totalGoals} Goals
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Founded:</span>
                    <span className="font-mono text-slate-400">Year {team.founded}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: "View Squad" */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified Academy
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenTeamSquad(team);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold border border-emerald-500/30 transition-all flex items-center gap-1.5 group-hover:bg-emerald-500 group-hover:text-slate-950"
                >
                  <span>View Squad</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Squad Inspection Modal */}
      <TeamSquadModal
        team={selectedTeamForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};
