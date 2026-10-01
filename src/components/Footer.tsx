import React from 'react';
import { Trophy, MapPin, Mail, Phone, ExternalLink, Globe, Shield, Award } from 'lucide-react';
import { SPONSORS } from '../data/tournamentData';
import { NavigationTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-[#070A0F] border-t border-white/10 text-slate-400">
      {/* Sponsor Marquee Bar */}
      <div className="border-b border-white/5 py-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold block">
                Official Tournament Partners
              </span>
              <span className="text-sm text-slate-300 font-medium">
                Empowering the next generation of African football talent
              </span>
            </div>

            {/* Sponsor Cards / Placeholders */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center justify-center gap-4 sm:gap-6">
              {SPONSORS.map((s, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2 rounded-lg bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col items-center justify-center min-w-[120px]"
                >
                  <span className="text-xs font-bold text-slate-200 tracking-wide font-display">{s.name}</span>
                  <span className="text-[10px] text-slate-500">{s.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-800 flex items-center justify-center text-white shadow-md">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight font-display">
                  CHIPKIZI <span className="text-emerald-400">CUP</span>
                </span>
                <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                  East Africa's Premier Youth Tournament
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Recognized as the largest international youth football festival in East and Central Africa. 
              Organized annually by Future Stars Academy in Arusha, bringing together over 1,800 boys and girls 
              from 6 African nations.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Arusha, Tanzania</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>15th Edition 2026</span>
              </div>
            </div>
          </div>

          {/* Tournament Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Tournament</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('fixtures')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Fixtures & Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('standings')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Group Standings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('brackets')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Championship Brackets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('teams')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Participating Academies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('stats')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Top Scorers & Stats
                </button>
              </li>
            </ul>
          </div>

          {/* Age Groups & Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>U9 & U11 Mini-Kickers</span>
                <span className="text-[10px] text-slate-500 font-mono">7v7</span>
              </li>
              <li className="flex items-center justify-between">
                <span>U13 Juniors</span>
                <span className="text-[10px] text-slate-500 font-mono">9v9</span>
              </li>
              <li className="flex items-center justify-between">
                <span>U15 Boys Cup</span>
                <span className="text-[10px] text-slate-500 font-mono">11v11</span>
              </li>
              <li className="flex items-center justify-between">
                <span>U17 Boys Championship</span>
                <span className="text-[10px] text-slate-500 font-mono">11v11</span>
              </li>
              <li className="flex items-center justify-between">
                <span>U15 & U17 Girls Cup</span>
                <span className="text-[10px] text-slate-500 font-mono">11v11</span>
              </li>
              <li className="flex items-center justify-between">
                <span>U20 Elite Showcase</span>
                <span className="text-[10px] text-slate-500 font-mono">11v11</span>
              </li>
            </ul>
          </div>

          {/* Venues & Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Host Venues</h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/5">
                <div className="font-semibold text-slate-200">TGT Grounds</div>
                <div className="text-[11px] text-slate-500">Pitches 1–6 · Main Arena & Food Village</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/5">
                <div className="font-semibold text-slate-200">Braeburn Arusha</div>
                <div className="text-[11px] text-slate-500">Pitches 7–10 · Floodlit Synthetic Turf</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/5">
                <div className="font-semibold text-slate-200">Sheikh Amri Abeid Stadium</div>
                <div className="text-[11px] text-slate-500">Grand Finals & Closing Ceremony</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Chipkizi Cup. Organized by Future Stars Academy (Arusha, Tanzania). 
            All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://chipkizicup.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Official Website"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#instagram"
              onClick={(e) => e.preventDefault()}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-emerald-400 hover:bg-white/10 text-xs font-semibold tracking-wider transition-colors"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="#youtube"
              onClick={(e) => e.preventDefault()}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-red-400 hover:bg-white/10 text-xs font-semibold tracking-wider transition-colors"
              aria-label="YouTube"
            >
              YT
            </a>
            <a
              href="#facebook"
              onClick={(e) => e.preventDefault()}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-blue-400 hover:bg-white/10 text-xs font-semibold tracking-wider transition-colors"
              aria-label="Facebook"
            >
              FB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
