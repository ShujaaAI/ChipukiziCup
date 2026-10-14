import React, { useState } from 'react';
import { 
  Trophy, 
  Shield, 
  Menu, 
  X, 
  Lock, 
  LogOut, 
  Search, 
  Facebook, 
  Twitter, 
  Instagram,
  Youtube
} from 'lucide-react';

export type NavigationTab = 'home' | 'fixtures' | 'standings' | 'brackets' | 'teams' | 'stats';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAdmin: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  isAdminAuthenticated?: boolean;
  onLogout?: () => void;
  onSubCategorySelect?: (category: string) => void;
  selectedSubCategory?: string;
  onSearch?: (query: string) => void;
}

export const NAV_ITEMS: { id: NavigationTab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'fixtures', label: 'Fixtures' },
  { id: 'standings', label: 'Standings' },
  { id: 'brackets', label: 'Brackets' },
  { id: 'teams', label: 'Teams' },
  { id: 'stats', label: 'Stats' },
];

export const SUB_NAV_ITEMS = [
  { label: 'Scores & Fixtures', tab: 'fixtures' as NavigationTab },
  { label: 'Tables', tab: 'standings' as NavigationTab },
  { label: 'Gossip', category: 'Gossip' },
  { label: 'Transfers', category: 'Transfers' },
  { label: 'All Teams', tab: 'teams' as NavigationTab },
  { label: 'Leagues & Cups', tab: 'brackets' as NavigationTab },
  { label: 'FA Cup', category: 'FA Cup' },
  { label: 'FIFA World Cup', category: 'FIFA World Cup' },
  { label: 'European', category: 'European' },
  { label: 'Women', category: 'Women' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAdmin,
  isMobileMenuOpen,
  onToggleMobileMenu,
  isAdminAuthenticated,
  onLogout,
  onSubCategorySelect,
  selectedSubCategory,
  onSearch,
}) => {
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchVal);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors shadow-md">
      {/* 1. TOP TIER: Dark Slate Bar with Crest, Nav, Search, Social, Admin */}
      <div className="bg-[#0B0F17] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
            
            {/* Left: Club Crest & Logo Lockup (like FC UNITED) */}
            <button
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-3 text-left group focus:outline-none shrink-0 cursor-pointer"
              aria-label="Chipkizi Cup Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 shadow-md ring-2 ring-white/20 group-hover:scale-105 transition-transform duration-200">
                <Trophy className="w-5 h-5 text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-[#0B0F17]" title="15th Edition" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white font-display uppercase leading-tight">
                  CHIPKIZI <span className="text-red-500">CUP</span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-400 font-medium uppercase">
                  Football News & Tournament
                </span>
              </div>
            </button>

            {/* Center: Main Primary Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`px-3 py-1.5 text-xs xl:text-sm font-semibold tracking-wide transition-colors relative rounded-md cursor-pointer ${
                      isActive
                        ? 'text-red-500 font-bold'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Search, Social Links & Admin Portal */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Bar matching reference image */}
              <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="search..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-32 lg:w-44 xl:w-52 pl-3 pr-8 py-1.5 rounded bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:w-56 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-400 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Social Media Circular Badges (Facebook, Twitter, Instagram/G+) */}
              <div className="hidden sm:flex items-center gap-1.5">
                <a
                  href="#facebook"
                  onClick={(e) => e.preventDefault()}
                  className="w-7 h-7 rounded-full bg-[#3B5998] hover:opacity-90 flex items-center justify-center text-white transition-opacity shadow-sm"
                  title="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5 fill-current" />
                </a>
                <a
                  href="#twitter"
                  onClick={(e) => e.preventDefault()}
                  className="w-7 h-7 rounded-full bg-[#1DA1F2] hover:opacity-90 flex items-center justify-center text-white transition-opacity shadow-sm"
                  title="Twitter / X"
                >
                  <Twitter className="w-3.5 h-3.5 fill-current" />
                </a>
                <a
                  href="#youtube"
                  onClick={(e) => e.preventDefault()}
                  className="w-7 h-7 rounded-full bg-[#EA4335] hover:opacity-90 flex items-center justify-center text-white transition-opacity shadow-sm"
                  title="YouTube / Stream"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Admin Portal / Session Status */}
              {isAdminAuthenticated ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onOpenAdmin}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="hidden xl:inline">Admin Panel</span>
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  {onLogout && (
                    <button
                      onClick={onLogout}
                      className="p-1.5 text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded transition-colors cursor-pointer"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded shadow-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <Lock className="w-3 h-3 text-white" />
                  <span className="hidden sm:inline">Admin Portal</span>
                </button>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={onToggleMobileMenu}
                className="lg:hidden p-2 rounded text-slate-300 hover:text-white hover:bg-white/10"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2. SUB-TIER: Clean Light Strip (Scores & Fixtures | Tables | Gossip | Transfers | etc.) */}
      <div className="bg-[#FFFFFF] text-slate-700 border-b border-slate-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-between py-2 text-xs font-semibold uppercase tracking-wider gap-4 whitespace-nowrap no-scrollbar">
            <div className="flex items-center gap-3 sm:gap-5">
              {SUB_NAV_ITEMS.map((item, idx) => {
                const isCatActive = item.category && selectedSubCategory === item.category;
                const isTabActive = item.tab && currentTab === item.tab;
                const isActive = isCatActive || isTabActive;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (item.tab) {
                        onSelectTab(item.tab);
                      } else if (item.category && onSubCategorySelect) {
                        onSelectTab('home');
                        onSubCategorySelect(item.category);
                      }
                    }}
                    className={`transition-colors py-1 cursor-pointer ${
                      isActive
                        ? 'text-red-600 font-extrabold border-b-2 border-red-600'
                        : 'text-slate-600 hover:text-red-600'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>15TH EDITION · ARUSHA 2026</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


