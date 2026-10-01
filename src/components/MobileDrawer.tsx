import React from 'react';
import { X, Shield, MapPin, Calendar, ExternalLink, ChevronRight, Award, Trophy, Lock, LogOut } from 'lucide-react';
import { NavigationTab, NAV_ITEMS } from './Navbar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAdmin: () => void;
  isAdminAuthenticated?: boolean;
  onLogout?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  onOpenAdmin,
  isAdminAuthenticated,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0F172A] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base font-bold text-white font-display">CHIPKIZI CUP</div>
                <div className="text-[11px] text-slate-400">15th Edition · 2026</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Close Navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Tournament Navigation
            </div>
            {NAV_ITEMS.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 font-semibold border-l-2 border-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Quick Details */}
          <div className="mx-4 my-2 p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Arusha, Tanzania (TGT & Braeburn)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>December 2026 · 128 International Teams</span>
            </div>
          </div>
        </div>

        {/* Footer Actions in Drawer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {isAdminAuthenticated ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Open Admin Panel</span>
              </button>
              {onLogout && (
                <button
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out of Admin</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Enter Admin Portal</span>
            </button>
          )}
          
          <div className="text-center text-[11px] text-slate-500">
            Official Platform · chipkizicup.com
          </div>
        </div>
      </div>
    </div>
  );
};
