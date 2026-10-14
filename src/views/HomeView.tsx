import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Activity, 
  Flame, 
  ChevronRight, 
  Users, 
  Award, 
  Play, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  X, 
  CheckCircle,
  Eye,
  Share2,
  ExternalLink,
  MessageSquare,
  Shield,
  Volume2
} from 'lucide-react';
import { 
  Match, 
  Standing, 
  Scorer, 
  NewsArticle,
  HERO_FEATURE_MAIN,
  HERO_STACKED_ARTICLES,
  TOP_NEWS_ARTICLES,
  LATEST_NEWS_ARTICLES,
  TEAMS_DATA
} from '../data/tournamentData';
import { NavigationTab } from '../components/Navbar';

import heroBannerImg from '../assets/images/chipkizi_hero_banner_1790842748794.jpg';
import trophyImg from '../assets/images/chipkizi_trophy_showcase_1790842762275.jpg';
import matchActionImg from '../assets/images/chipkizi_match_action_1791989011589.jpg';
import playerSpotlightImg from '../assets/images/chipkizi_player_spotlight_1791989031130.jpg';
import celebrationImg from '../assets/images/chipkizi_celebration_1791989049818.jpg';

interface HomeViewProps {
  onSelectTab: (tab: NavigationTab) => void;
  matches: Match[];
  standings: Standing[];
  topScorers: Scorer[];
  onOpenAdmin: (matchId?: string) => void;
  isAdminAuthenticated?: boolean;
  onSelectMatch?: (match: Match) => void;
  selectedCategory?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  matches,
  standings,
  topScorers,
  onOpenAdmin,
  isAdminAuthenticated,
  onSelectMatch,
  selectedCategory,
}) => {
  // Filter for Top News tabs matching reference image
  const [topNewsTab, setTopNewsTab] = useState<string>('All Posts');

  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Modal states for article reader, video highlight, and gallery lightbox
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<string | null>(null);

  // Live countdown timer for NEXT MATCH widget (Days, Hrs, Mins, Secs)
  const [countdown, setCountdown] = useState({
    days: 31,
    hours: 24,
    minutes: 43,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setIsSubscribed(false);
      }, 4000);
    }
  };

  // Top News Filter Tabs matching reference image
  const topNewsCategories = [
    'All Posts',
    'Scores & Fixtures',
    'Tables',
    'Gossip',
    'Transfers',
    'All Teams',
    'Leagues & Cups',
    'FA Cup',
    'FIFA World Cup',
    'European',
    'Women',
  ];

  const filteredTopNews = TOP_NEWS_ARTICLES.filter((item) => {
    if (topNewsTab === 'All Posts') return true;
    if (topNewsTab === 'Tables') return item.category === 'Tables';
    if (topNewsTab === 'Gossip') return item.category === 'Gossip';
    if (topNewsTab === 'European') return item.category === 'European';
    return true;
  });

  // 6 Instagram / Gallery photos matching reference image
  const galleryPhotos = [
    { id: 1, img: matchActionImg, caption: 'Opening Ceremony & Matchday Action at TGT Grounds' },
    { id: 2, img: celebrationImg, caption: 'Winning goal celebration under Sheikh Amri floodlights' },
    { id: 3, img: playerSpotlightImg, caption: 'Player of the Tournament contender holding match ball' },
    { id: 4, img: heroBannerImg, caption: 'Sunset championship match with Mount Meru backdrop' },
    { id: 5, img: trophyImg, caption: 'The official 2026 Chipkizi Cup Gold Trophy presentation' },
    { id: 6, img: matchActionImg, caption: 'U15 Boys semi-final tactical battle' },
  ];

  // Helper to fetch flag/badge
  const getBadge = (teamName: string) => {
    const found = TEAMS_DATA.find((t) => t.name.toLowerCase().includes(teamName.toLowerCase()));
    return found?.flag || '⚽';
  };

  // Standings slice for the PREMIER LEAGUE widget
  const compactStandings = standings.slice(0, 7);

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: 67% Left Banner + 33% Right 3 Stacked Feature Blocks    */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-1.5 sm:gap-2 shadow-sm rounded-lg overflow-hidden">
          
          {/* Main Large Hero Feature (Left 8 Cols / approx 67%) */}
          <div 
            onClick={() => setSelectedArticle(HERO_FEATURE_MAIN)}
            className="lg:col-span-8 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex flex-col justify-end p-6 sm:p-8 overflow-hidden group cursor-pointer bg-slate-950"
          >
            {/* High-Impact Match Photo */}
            <img
              src={matchActionImg}
              alt="Wales and the World Cup Ben Woodburn"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            {/* Dark Scrim Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

            {/* Hero Text Overlay Box */}
            <div className="relative z-10 space-y-3 max-w-2xl">
              {/* Category Tag & Date (Red pill badge like in reference) */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow">
                  {HERO_FEATURE_MAIN.tag}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {HERO_FEATURE_MAIN.date}
                </span>
              </div>

              {/* Huge Bold Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display uppercase tracking-tight leading-[1.08] drop-shadow-md group-hover:text-red-400 transition-colors">
                {HERO_FEATURE_MAIN.title}
              </h1>

              {/* Sub-excerpt */}
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 font-medium drop-shadow">
                {HERO_FEATURE_MAIN.excerpt}
              </p>
            </div>
          </div>

          {/* Right 3 Stacked Feature Blocks (Right 4 Cols / approx 33%) */}
          <div className="lg:col-span-4 flex flex-col gap-1.5 sm:gap-2">
            
            {/* Block 1 (Top): Dark Slate Background */}
            <div 
              onClick={() => setSelectedArticle(HERO_STACKED_ARTICLES[0])}
              className="flex-1 bg-[#111827] text-white p-5 sm:p-6 flex flex-col justify-center border-l-4 border-transparent hover:border-red-500 transition-all cursor-pointer group"
            >
              <div className="text-[11px] text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">
                {HERO_STACKED_ARTICLES[0].date}
              </div>
              <h2 className="text-sm sm:text-base font-extrabold font-display uppercase leading-snug group-hover:text-red-400 transition-colors">
                {HERO_STACKED_ARTICLES[0].title}
              </h2>
            </div>

            {/* Block 2 (Middle): SIGNATURE VIBRANT RED BLOCK (Exactly as in reference image!) */}
            <div 
              onClick={() => setSelectedArticle(HERO_STACKED_ARTICLES[1])}
              className="flex-1 bg-[#DC2626] text-white p-5 sm:p-6 flex flex-col justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer group"
            >
              <div className="text-[11px] text-red-100 font-semibold mb-1.5 uppercase tracking-wider">
                {HERO_STACKED_ARTICLES[1].date}
              </div>
              <h2 className="text-sm sm:text-base font-extrabold font-display uppercase leading-snug text-white drop-shadow-sm group-hover:translate-x-1 transition-transform">
                {HERO_STACKED_ARTICLES[1].title}
              </h2>
            </div>

            {/* Block 3 (Bottom): Dark Slate Background */}
            <div 
              onClick={() => setSelectedArticle(HERO_STACKED_ARTICLES[2])}
              className="flex-1 bg-[#111827] text-white p-5 sm:p-6 flex flex-col justify-center border-l-4 border-transparent hover:border-red-500 transition-all cursor-pointer group"
            >
              <div className="text-[11px] text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">
                {HERO_STACKED_ARTICLES[2].date}
              </div>
              <h2 className="text-sm sm:text-base font-extrabold font-display uppercase leading-snug group-hover:text-red-400 transition-colors">
                {HERO_STACKED_ARTICLES[2].title}
              </h2>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SCORES & FIXTURES HORIZONTAL BAR (Directly under Hero)                  */}
        {/* ========================================================================= */}
        <section className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {matches.slice(0, 4).map((m, idx) => {
              const isLive = m.status === 'LIVE';
              return (
                <div
                  key={m.id || idx}
                  onClick={() => onSelectMatch ? onSelectMatch(m) : onSelectTab('fixtures')}
                  className={`flex flex-col justify-between p-2.5 hover:bg-slate-50 transition-colors cursor-pointer group ${
                    idx > 0 ? 'pt-3 sm:pt-2.5 sm:pl-4' : ''
                  }`}
                >
                  {/* Match Category / Friendly Tag */}
                  <div className="text-center mb-2">
                    <span className="text-[11px] text-slate-400 font-medium capitalize">
                      {isLive ? '🔴 Live 74\'' : m.round || 'Friendly'}
                    </span>
                  </div>

                  {/* Team Crests & Score */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Home Team */}
                    <div className="flex flex-col items-center flex-1 text-center">
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shadow-xs group-hover:scale-105 transition-transform">
                        {getBadge(m.homeTeam)}
                      </div>
                      <span className="text-xs font-bold text-slate-800 mt-1 truncate max-w-[85px]">
                        {m.homeTeam}
                      </span>
                    </div>

                    {/* Score Center */}
                    <div className="flex flex-col items-center px-2">
                      <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-wider">
                        {m.homeScore ?? 0} : {m.awayScore ?? 0}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 whitespace-nowrap">
                        {m.date || '7 July 2026'}
                      </span>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center flex-1 text-center">
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shadow-xs group-hover:scale-105 transition-transform">
                        {getBadge(m.awayTeam)}
                      </div>
                      <span className="text-xs font-bold text-slate-800 mt-1 truncate max-w-[85px]">
                        {m.awayTeam}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TOP NEWS SECTION: Red Header Ribbon + 3-Column Card Grid               */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          
          {/* Crimson Red Ribbon Banner matching reference image */}
          <div className="bg-[#DC2626] text-white rounded-t-lg px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm overflow-x-auto">
            {/* Title */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-black text-sm uppercase tracking-wider font-display">
                TOP NEWS
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium whitespace-nowrap no-scrollbar overflow-x-auto">
              {topNewsCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTopNewsTab(cat)}
                  className={`transition-colors py-0.5 cursor-pointer ${
                    topNewsTab === cat
                      ? 'text-white font-extrabold underline underline-offset-4'
                      : 'text-red-100 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column News Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTopNews.map((article, idx) => {
              // Assign realistic photos
              const cardImg = idx === 0 ? matchActionImg : idx === 1 ? celebrationImg : trophyImg;
              return (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-b-lg border border-slate-200 p-4 space-y-3.5 shadow-xs hover:shadow-md transition-shadow cursor-pointer group"
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded bg-slate-100">
                    <img
                      src={cardImg}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Category Pill Tag & Date */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] uppercase">
                      {article.category || 'Gossip'}
                    </span>
                    <span className="text-slate-400 font-medium text-[11px]">
                      {article.date}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 font-display uppercase leading-tight group-hover:text-red-600 transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. TWO-COLUMN SECTION: Main Stories (Left) & Sidebar Widgets (Right)       */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ----------------- LEFT COLUMN (8 Cols / 67%) ----------------- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header: LATEST NEWS Ribbon (Black bar with red left highlight) */}
            <div className="bg-[#111827] text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between border-l-4 border-red-600 shadow-sm">
              <span className="font-black text-sm uppercase tracking-wider font-display">
                LATEST NEWS
              </span>
            </div>

            {/* List of 3 Article Rows matching reference image */}
            <div className="bg-white border border-slate-200 rounded-b-lg divide-y divide-slate-100 p-2 sm:p-4 shadow-xs space-y-4">
              {LATEST_NEWS_ARTICLES.map((article, idx) => {
                const rowImg = idx === 0 ? matchActionImg : idx === 1 ? playerSpotlightImg : celebrationImg;
                return (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="flex flex-col sm:flex-row gap-4 pt-4 first:pt-0 hover:bg-slate-50 p-2 rounded transition-colors cursor-pointer group"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-full sm:w-44 h-32 rounded overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src={rowImg}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] uppercase">
                          {article.category || 'FA Cup'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {article.date}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 font-display uppercase leading-snug group-hover:text-red-600 transition-colors">
                        {article.title}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FEATURED VIDEO / MATCHDAY HIGHLIGHT BANNER matching reference image */}
            <div 
              onClick={() => setIsVideoModalOpen(true)}
              className="relative min-h-[260px] sm:min-h-[320px] rounded-lg overflow-hidden flex flex-col justify-end p-6 sm:p-8 cursor-pointer group shadow-sm bg-slate-950"
            >
              {/* Cinematic Background Image */}
              <img
                src={heroBannerImg}
                alt="Watch Highlight Match"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Red Circular Play Button Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-600 transition-transform ring-4 ring-white/20">
                <Play className="w-7 h-7 ml-1 fill-current" />
              </div>

              {/* Title & Tag */}
              <div className="relative z-10 space-y-1.5 max-w-xl">
                <span className="text-[11px] text-red-400 font-bold uppercase tracking-wider block">
                  June 30, 2026 · Exclusive Match Highlights
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white font-display uppercase tracking-tight leading-tight group-hover:text-red-400 transition-colors">
                  WATCH RYAN KENT'S STUNNING GOAL V CHESTER
                </h3>
              </div>
            </div>

          </div>

          {/* ----------------- RIGHT COLUMN (SIDEBAR, 4 Cols / 33%) ----------------- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* WIDGET 1: PREMIER LEAGUE / TOURNAMENT STANDINGS WIDGET */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
              {/* Header Bar */}
              <div className="bg-[#111827] text-white px-4 py-2.5 flex items-center justify-between border-l-4 border-red-600">
                <span className="font-black text-xs sm:text-sm uppercase tracking-wider font-display">
                  PREMIER LEAGUE
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  Group Stage
                </span>
              </div>

              {/* Compact Table */}
              <div className="p-3">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-[11px] font-bold uppercase text-slate-400 border-b border-slate-100 pb-2">
                      <th className="py-2 pl-2 w-8">POS</th>
                      <th className="py-2">TEAM</th>
                      <th className="py-2 text-center w-8">W</th>
                      <th className="py-2 text-center w-8">D</th>
                      <th className="py-2 text-center w-8">L</th>
                      <th className="py-2 text-right pr-2 w-10">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {compactStandings.map((team, idx) => (
                      <tr key={team.team} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 pl-2 font-mono font-bold text-slate-500">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 font-semibold text-slate-800 truncate max-w-[130px]">
                          {team.team}
                        </td>
                        <td className="py-2.5 text-center font-mono text-slate-600">
                          {team.w || 32}
                        </td>
                        <td className="py-2.5 text-center font-mono text-slate-600">
                          {team.d || 4}
                        </td>
                        <td className="py-2.5 text-center font-mono text-slate-600">
                          {team.l || 2}
                        </td>
                        <td className="py-2.5 text-right pr-2 font-mono font-black text-slate-900">
                          {team.pts || 100}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Bright Red Button at bottom matching reference image */}
                <div className="mt-4 pt-2">
                  <button
                    onClick={() => onSelectTab('standings')}
                    className="w-full py-2.5 rounded bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider text-center shadow transition-colors cursor-pointer"
                  >
                    View Full Table
                  </button>
                </div>
              </div>
            </div>

            {/* WIDGET 2: SPONSOR / FOUNDATION SPOTLIGHT CARD */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
              <div className="bg-[#111827] text-white px-4 py-2.5 flex items-center justify-between border-l-4 border-red-600">
                <span className="font-black text-xs sm:text-sm uppercase tracking-wider font-display">
                  SPONSOR
                </span>
              </div>

              <div className="relative aspect-[4/5] bg-black overflow-hidden flex flex-col justify-between p-6 text-white group cursor-pointer">
                {/* Image of player holding ball */}
                <img
                  src={playerSpotlightImg}
                  alt="The National League Sponsor"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Badge text on top left */}
                <div className="relative z-10">
                  <h4 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight leading-tight text-white drop-shadow">
                    THE <br /> NATIONAL <br /> LEAGUE
                  </h4>
                </div>

                <div className="relative z-10 pt-4">
                  <span className="text-[11px] font-semibold text-slate-300 block">
                    Official Grassroots Partner · Future Stars
                  </span>
                </div>
              </div>
            </div>

            {/* WIDGET 3: NEXT MATCH COUNTDOWN WIDGET */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
              {/* Header Bar */}
              <div className="bg-[#111827] text-white px-4 py-2.5 flex items-center justify-between border-l-4 border-red-600">
                <span className="font-black text-xs sm:text-sm uppercase tracking-wider font-display">
                  NEXT MATCH
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Pitch 1 · TGT
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Team Badges & Kickoff Date */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                      🇹🇿
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-1">FC Napoli</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-black text-slate-400 text-sm font-display uppercase">VS</span>
                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap mt-0.5">7 July 2026</span>
                    <span className="text-[10px] text-slate-400 capitalize">Friendly</span>
                  </div>

                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                      🇰🇪
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-1">FC Manchester</span>
                  </div>
                </div>

                {/* 4 Countdown Number Boxes matching reference image */}
                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center">
                  <div className="bg-slate-50 rounded p-2 border border-slate-100">
                    <span className="font-mono font-black text-xl text-slate-900 block tabular-nums">
                      {countdown.days}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Days</span>
                  </div>
                  <div className="bg-slate-50 rounded p-2 border border-slate-100">
                    <span className="font-mono font-black text-xl text-slate-900 block tabular-nums">
                      {countdown.hours}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Hrs</span>
                  </div>
                  <div className="bg-slate-50 rounded p-2 border border-slate-100">
                    <span className="font-mono font-black text-xl text-slate-900 block tabular-nums">
                      {countdown.minutes}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Mins</span>
                  </div>
                  <div className="bg-slate-50 rounded p-2 border border-slate-100">
                    <span className="font-mono font-black text-xl text-red-600 block tabular-nums animate-pulse">
                      {countdown.seconds}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Secs</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SIGN UP NOW NEWSLETTER STRIP (Full-width clean white card)             */}
        {/* ========================================================================= */}
        <section className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Header Title */}
            <div className="shrink-0">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display uppercase tracking-tight">
                SIGN UP NOW
              </h3>
            </div>

            {/* Center Explanatory Text */}
            <div className="flex-1 max-w-xl">
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Get access to exclusive pre-sale tickets, scout reports and we'll give you the heads up on events we know you'll enjoy.
              </p>
            </div>

            {/* Right Inline Form */}
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Email address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-64 px-3.5 py-2 rounded border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shrink-0 shadow cursor-pointer"
              >
                {isSubscribed ? 'Subscribed!' : 'Submit'}
              </button>
            </form>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. INSTAGRAM PHOTO FEED (6 Square Photos in a Row)                        */}
        {/* ========================================================================= */}
        <section className="space-y-3">
          {/* Header Bar */}
          <div className="bg-[#111827] text-white px-4 py-2 rounded-t-lg border-l-4 border-red-600 flex items-center justify-between">
            <span className="font-black text-xs sm:text-sm uppercase tracking-wider font-display">
              INSTAGRAM
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              @chipkizicup · #FutureChampions
            </span>
          </div>

          {/* 6 Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedGalleryPhoto(photo.img)}
                className="relative aspect-square rounded overflow-hidden group cursor-pointer bg-slate-900 shadow-xs"
              >
                <img
                  src={photo.img}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-white">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* ARTICLE READER MODAL (Opens when clicking any story)                       */}
      {/* ========================================================================= */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#111827] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px] uppercase">
                  {selectedArticle.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedArticle.date}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display uppercase tracking-tight leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 border-b border-slate-100 pb-3">
                <span>By <strong>{selectedArticle.author}</strong></span>
                <span>·</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {selectedArticle.excerpt}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedArticle.content}
              </p>

              <div className="p-4 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2 mt-4">
                <span className="font-bold text-slate-800 uppercase block">Tournament Matchday Bulletin:</span>
                <p>
                  Official match reports and scout evaluation notes are updated in real-time across all 12 pitches at TGT Arusha and Sheikh Amri Abeid Stadium.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  onSelectTab('fixtures');
                }}
                className="font-bold text-red-600 hover:text-red-700 underline cursor-pointer"
              >
                View Related Match Fixtures →
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-1.5 rounded bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIDEO HIGHLIGHT MODAL (Watch Goal Clip simulation)                         */}
      {/* ========================================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#0B0F17] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="font-extrabold text-sm uppercase tracking-wide">
                  Chipkizi Cup TV · Matchday Highlight Clip
                </span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={heroBannerImg}
                alt="Video clip preview"
                className="w-full h-full object-cover filter brightness-70"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/40">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 ml-1 fill-current" />
                </div>
                <span className="text-white font-bold text-sm tracking-wide bg-black/60 px-4 py-1 rounded-full">
                  Playing: Ryan Kent Goal Clip (03:45 HD)
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 text-slate-300 text-xs flex items-center justify-between">
              <div>
                <strong className="text-white block">Ryan Kent's Screamer from 25 yards</strong>
                <span>Future Stars Academy vs Simba Youth · Matchday 3</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase cursor-pointer"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GALLERY LIGHTBOX MODAL                                                    */}
      {/* ========================================================================= */}
      {selectedGalleryPhoto && (
        <div 
          onClick={() => setSelectedGalleryPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-lg overflow-hidden shadow-2xl">
            <img
              src={selectedGalleryPhoto}
              alt="Gallery Preview"
              className="w-full h-full object-contain max-h-[80vh]"
            />
            <button
              onClick={() => setSelectedGalleryPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
