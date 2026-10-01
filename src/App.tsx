/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, NavigationTab } from './components/Navbar';
import { MobileDrawer } from './components/MobileDrawer';
import { Footer } from './components/Footer';
import { LiveTicker } from './components/LiveTicker';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { MatchCenterModal } from './components/MatchCenterModal';
import { HomeView } from './views/HomeView';
import { FixturesView } from './views/FixturesView';
import { StandingsView } from './views/StandingsView';
import { BracketsView } from './views/BracketsView';
import { TeamsView } from './views/TeamsView';
import { StatsView } from './views/StatsView';
import { 
  INITIAL_MATCHES, 
  STANDINGS_DATA, 
  TEAMS_DATA,
  TOP_SCORERS, 
  Match, 
  Team,
  Standing 
} from './data/tournamentData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('chipkizi_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [teams, setTeams] = useState<Team[]>(TEAMS_DATA);
  const [standings, setStandings] = useState<Standing[]>(STANDINGS_DATA);
  const [selectedMatchForAdmin, setSelectedMatchForAdmin] = useState<string | undefined>(undefined);
  const [selectedMatchForCenter, setSelectedMatchForCenter] = useState<Match | null>(null);
  const [isMatchCenterOpen, setIsMatchCenterOpen] = useState<boolean>(false);

  const handleOpenMatchCenter = (match: Match) => {
    setSelectedMatchForCenter(match);
    setIsMatchCenterOpen(true);
  };

  // Handle score update from the admin modal
  const handleUpdateMatch = (updatedMatch: Match) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m))
    );

    // If Match Center was viewing this match, update it too
    if (selectedMatchForCenter?.id === updatedMatch.id) {
      setSelectedMatchForCenter(updatedMatch);
    }

    // If match finished, recalculate or update standings if in group stage
    if (updatedMatch.status === 'FINISHED' && updatedMatch.group && updatedMatch.homeScore !== undefined && updatedMatch.awayScore !== undefined) {
      setStandings((prev) => {
        return prev.map((item) => {
          if (item.team === updatedMatch.homeTeam) {
            const isWin = (updatedMatch.homeScore ?? 0) > (updatedMatch.awayScore ?? 0);
            const isDraw = updatedMatch.homeScore === updatedMatch.awayScore;
            return {
              ...item,
              mp: item.mp + 1,
              w: isWin ? item.w + 1 : item.w,
              d: isDraw ? item.d + 1 : item.d,
              l: !isWin && !isDraw ? item.l + 1 : item.l,
              gf: item.gf + (updatedMatch.homeScore ?? 0),
              ga: item.ga + (updatedMatch.awayScore ?? 0),
              gd: item.gd + ((updatedMatch.homeScore ?? 0) - (updatedMatch.awayScore ?? 0)),
              pts: isWin ? item.pts + 3 : isDraw ? item.pts + 1 : item.pts,
              form: [isWin ? 'W' : isDraw ? 'D' : 'L', ...item.form.slice(0, 4)],
            };
          }
          if (item.team === updatedMatch.awayTeam) {
            const isWin = (updatedMatch.awayScore ?? 0) > (updatedMatch.homeScore ?? 0);
            const isDraw = updatedMatch.homeScore === updatedMatch.awayScore;
            return {
              ...item,
              mp: item.mp + 1,
              w: isWin ? item.w + 1 : item.w,
              d: isDraw ? item.d + 1 : item.d,
              l: !isWin && !isDraw ? item.l + 1 : item.l,
              gf: item.gf + (updatedMatch.awayScore ?? 0),
              ga: item.ga + (updatedMatch.homeScore ?? 0),
              gd: item.gd + ((updatedMatch.awayScore ?? 0) - (updatedMatch.homeScore ?? 0)),
              pts: isWin ? item.pts + 3 : isDraw ? item.pts + 1 : item.pts,
              form: [isWin ? 'W' : isDraw ? 'D' : 'L', ...item.form.slice(0, 4)],
            };
          }
          return item;
        });
      });
    }
  };

  // Add new registered team from Admin
  const handleAddTeam = (newTeam: Team) => {
    setTeams((prev) => [newTeam, ...prev]);

    // Also add to standings table if not already present
    const existing = standings.find((s) => s.team === newTeam.name);
    if (!existing) {
      const newStanding: Standing = {
        team: newTeam.name,
        group: newTeam.group,
        category: newTeam.category,
        mp: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
        form: [],
      };
      setStandings((prev) => [...prev, newStanding]);
    }
  };

  // Reassign team group
  const handleUpdateTeamGroup = (teamId: string, newGroup: string) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, group: newGroup } : t))
    );
    setStandings((prev) =>
      prev.map((s) => {
        const teamObj = teams.find((t) => t.id === teamId);
        if (teamObj && s.team === teamObj.name) {
          return { ...s, group: newGroup };
        }
        return s;
      })
    );
  };

  // Generate round-robin fixtures for a group
  const handleGenerateFixtures = (groupName: string) => {
    const groupTeams = teams.filter((t) => t.group === groupName);
    if (groupTeams.length < 2) return;

    const newMatches: Match[] = [];
    const timestamp = Date.now();

    for (let i = 0; i < groupTeams.length - 1; i += 2) {
      const t1 = groupTeams[i];
      const t2 = groupTeams[i + 1] || groupTeams[0];
      newMatches.push({
        id: `match-gen-${timestamp}-${i}`,
        category: 'U15 Boys',
        stage: 'Group Stage',
        matchday: 'Matchday 4',
        round: `${groupName} · Matchday 4`,
        group: groupName,
        homeTeam: t1.name,
        awayTeam: t2.name,
        status: 'UPCOMING',
        date: 'Tomorrow',
        time: `${14 + i}:30 EAT`,
        pitch: `Pitch ${(i % 4) + 1} · TGT Arusha`,
      });
    }

    setMatches((prev) => [...newMatches, ...prev]);
  };

  // Recalculate standings from finished matches
  const handleRecalculateStandings = () => {
    const freshStandings: Record<string, Standing> = {};

    // Initialize with 0s
    standings.forEach((s) => {
      freshStandings[s.team] = {
        ...s,
        mp: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
        form: [],
      };
    });

    // Compute from finished matches
    matches.filter((m) => m.status === 'FINISHED' && m.group).forEach((m) => {
      if (m.homeScore === undefined || m.awayScore === undefined) return;
      const isHomeWin = m.homeScore > m.awayScore;
      const isAwayWin = m.awayScore > m.homeScore;
      const isDraw = m.homeScore === m.awayScore;

      // Home
      if (freshStandings[m.homeTeam]) {
        const item = freshStandings[m.homeTeam];
        item.mp += 1;
        if (isHomeWin) { item.w += 1; item.pts += 3; item.form.push('W'); }
        else if (isDraw) { item.d += 1; item.pts += 1; item.form.push('D'); }
        else { item.l += 1; item.form.push('L'); }
        item.gf += m.homeScore;
        item.ga += m.awayScore;
        item.gd = item.gf - item.ga;
      }

      // Away
      if (freshStandings[m.awayTeam]) {
        const item = freshStandings[m.awayTeam];
        item.mp += 1;
        if (isAwayWin) { item.w += 1; item.pts += 3; item.form.push('W'); }
        else if (isDraw) { item.d += 1; item.pts += 1; item.form.push('D'); }
        else { item.l += 1; item.form.push('L'); }
        item.gf += m.awayScore;
        item.ga += m.homeScore;
        item.gd = item.gf - item.ga;
      }
    });

    setStandings(Object.values(freshStandings));
  };

  const handleOpenScoreReporter = (match: Match) => {
    setSelectedMatchForAdmin(match.id);
    if (isAdminAuthenticated) {
      setIsAdminModalOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleDirectAdminOpen = () => {
    setSelectedMatchForAdmin(undefined);
    if (isAdminAuthenticated) {
      setIsAdminModalOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginModalOpen(false);
    setIsAdminModalOpen(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('chipkizi_admin_auth');
      localStorage.removeItem('chipkizi_admin_email');
    } catch {
      // ignore
    }
    setIsAdminAuthenticated(false);
    setIsAdminModalOpen(false);
    setIsAdminLoginModalOpen(false);
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* 1. Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAdmin={handleDirectAdminOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isAdminAuthenticated={isAdminAuthenticated}
        onLogout={handleLogout}
      />

      {/* Responsive Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAdmin={handleDirectAdminOpen}
        isAdminAuthenticated={isAdminAuthenticated}
        onLogout={handleLogout}
      />

      {/* Live Match Center Ticker */}
      <LiveTicker
        matches={matches}
        onSelectMatch={handleOpenMatchCenter}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={setCurrentTab}
            matches={matches}
            standings={standings}
            topScorers={TOP_SCORERS}
            onOpenAdmin={(matchId) => {
              setSelectedMatchForAdmin(matchId);
              if (isAdminAuthenticated) {
                setIsAdminModalOpen(true);
              } else {
                setIsAdminLoginModalOpen(true);
              }
            }}
            isAdminAuthenticated={isAdminAuthenticated}
          />
        )}

        {currentTab === 'fixtures' && (
          <FixturesView
            matches={matches}
            onSelectMatch={handleOpenMatchCenter}
            onOpenScoreReporter={isAdminAuthenticated ? handleOpenScoreReporter : undefined}
            isAdminAuthenticated={isAdminAuthenticated}
          />
        )}

        {currentTab === 'standings' && (
          <StandingsView standings={standings} />
        )}

        {currentTab === 'brackets' && (
          <BracketsView onSelectMatch={handleOpenMatchCenter} />
        )}

        {currentTab === 'teams' && (
          <TeamsView teams={teams} />
        )}

        {currentTab === 'stats' && (
          <StatsView />
        )}
      </main>

      {/* 2. Global Tournament Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Match Center Detail Modal */}
      <MatchCenterModal
        match={selectedMatchForCenter}
        isOpen={isMatchCenterOpen}
        onClose={() => setIsMatchCenterOpen(false)}
        onOpenAdminScore={isAdminAuthenticated ? (m) => {
          setSelectedMatchForAdmin(m.id);
          setIsAdminModalOpen(true);
        } : undefined}
      />

      {/* Secure Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Comprehensive Admin Dashboard & Tournament Control Panel */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen && isAdminAuthenticated}
        onClose={() => setIsAdminModalOpen(false)}
        matches={matches}
        teams={teams}
        standings={standings}
        onUpdateMatch={handleUpdateMatch}
        onAddTeam={handleAddTeam}
        onUpdateTeamGroup={handleUpdateTeamGroup}
        onGenerateFixtures={handleGenerateFixtures}
        onRecalculateStandings={handleRecalculateStandings}
        onLogout={handleLogout}
        selectedMatchId={selectedMatchForAdmin}
      />
    </div>
  );
}
