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
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { TEAMS_DATA, Team, Standing } from '../data/tournamentData';
import { TeamSquadModal } from '../components/TeamSquadModal';
import { TournamentSidebar } from '../components/TournamentSidebar';
import { NavigationTab } from '../components/Navbar';

interface TeamsViewProps {
  teams?: Team[];
  onSelectTab?: (tab: NavigationTab) => void;
  standings?: Standing[];
}

export const TeamsView: React.FC<TeamsViewProps> = ({ 
  teams = TEAMS_DATA,
  onSelectTab,
  standings = [],
}) => {
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
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Breadcrumb & Page Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
              <span>Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-red-600 font-bold">Teams & Squads</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display uppercase tracking-tight">
              PARTICIPATING TEAMS & ACADEMIES
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1 rounded bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow">
              {filteredTeams.length} Verified Academies
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN 2-COLUMN STRUCTURE MATCHING REFERENCE IMAGE                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ----------------- LEFT COLUMN (8 Cols / 67%) ----------------- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Crimson Red Ribbon Banner for Countries Filter */}
            <div className="bg-[#DC2626] text-white rounded-t-lg px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm overflow-x-auto">
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-black text-sm uppercase tracking-wider font-display">
                  EAST AFRICAN NATIONS
                </span>
              </div>

              {/* Country Tabs */}
              <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
                {countries.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCountry(c)}
                    className={`transition-colors py-0.5 cursor-pointer ${
                      selectedCountry === c
                        ? 'text-white font-extrabold underline underline-offset-4'
                        : 'text-red-100 hover:text-white'
                    }`}
                  >
                    {c === 'All' ? 'All Nations (6)' : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar Card */}
            <div className="bg-white border border-slate-200 rounded-b-lg p-4 shadow-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search academy by name, coach, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-slate-900 placeholder-slate-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Teams Grid (2 columns on medium screens) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTeams.map((team) => {
                const totalGoals = team.roster.reduce((acc, p) => acc + p.goals, 0);

                return (
                  <div
                    key={team.id}
                    onClick={() => handleOpenTeamSquad(team)}
                    className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs hover:shadow-md hover:border-red-300 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                  >
                    {/* Top Row: Crest & Club Name */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Club Crest Flag */}
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${team.badgeColor} border border-slate-200 flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform shrink-0`}
                          >
                            {team.flag}
                          </div>

                          <div>
                            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-red-600 transition-colors font-display leading-tight truncate max-w-[170px]">
                              {team.name}
                            </h3>
                            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                              <span>{team.city}, {team.country}</span>
                            </div>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                          {team.group}
                        </span>
                      </div>

                      {/* Coach & Academy stats box */}
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="text-slate-400">Head Coach:</span>
                          <strong className="text-slate-800">{team.coach}</strong>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="text-slate-400">Roster Registered:</span>
                          <span className="font-mono text-red-600 font-bold">
                            {team.squadSize || team.roster.length} Players
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="text-slate-400">Tournament Goals:</span>
                          <span className="font-mono font-bold text-slate-800">
                            {totalGoals} Goals
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button: View Squad */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenTeamSquad(team);
                        }}
                        className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Squad & Lineup</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* ----------------- RIGHT COLUMN (SIDEBAR, 4 Cols / 33%) ----------------- */}
          <div className="lg:col-span-4">
            <TournamentSidebar
              standings={standings}
              onSelectTab={onSelectTab}
            />
          </div>

        </div>

        {/* Squad Inspection Modal */}
        <TeamSquadModal
          team={selectedTeamForModal}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

      </div>
    </div>
  );
};
