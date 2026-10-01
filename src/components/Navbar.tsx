import React from 'react';
import { Trophy, Shield, Menu, X, ArrowUpRight, Lock, LogOut } from 'lucide-react';

export type NavigationTab = 'home' | 'fixtures' | 'standings' | 'brackets' | 'teams' | 'stats';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAdmin: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  isAdminAuthenticated?: boolean;
  onLogout?: () => void;
}

export const NAV_ITEMS: { id: NavigationTab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'fixtures', label: 'Fixtures' },
  { id: 'standings', label: 'Standings' },
  { id: 'brackets', label: 'Brackets' },
  { id: 'teams', label: 'Teams' },
  { id: 'stats', label: 'Stats' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAdmin,
  isMobileMenuOpen,
  onToggleMobileMenu,
  isAdminAuthenticated,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Brand Wordmark with Football Crest */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
            aria-label="Chipkizi Cup Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-800 shadow-lg shadow-emerald-500/20 ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-200">
              {/* Football / Tournament Icon */}
              <div className="w-5 h-5 rounded-full border-2 border-white/90 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-[#0B0F17]" title="15th Edition" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-display flex items-center gap-1.5">
                CHIPKIZI <span className="text-emerald-400">CUP</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Arusha · Tanzania
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Text with active underlines) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3.5 py-2 text-sm font-medium transition-all duration-150 relative whitespace-nowrap rounded-lg ${
                    isActive
                      ? 'text-emerald-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Admin Portal + Mobile Toggle) */}
          <div className="flex items-center gap-3">
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 rounded-lg shadow-sm transition-all duration-200 whitespace-nowrap group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admin Panel</span>
                  <Shield className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors border border-rose-500/20"
                    title="Sign out of Admin Session"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-slate-900 hover:bg-slate-800 border border-amber-500/40 hover:border-amber-400 rounded-lg shadow-sm hover:shadow-amber-500/10 transition-all duration-200 whitespace-nowrap group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Portal</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-200" />
              ) : (
                <Menu className="w-6 h-6 text-slate-200" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

