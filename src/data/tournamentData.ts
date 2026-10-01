export interface SquadPlayer {
  number: number;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  age: number;
  matchesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  cleanSheets?: number;
  isCaptain?: boolean;
}

export interface DisciplineRecord {
  rank: number;
  name: string;
  team: string;
  country: string;
  flag: string;
  yellowCards: number;
  redCards: number;
  fouls: number;
  category: string;
  matches: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  country: string;
  city: string;
  flag: string;
  badgeColor: string;
  category: string;
  group: string;
  coach: string;
  founded: number;
  squadSize: number;
  trainingGround: string;
  roster: SquadPlayer[];
}

export interface Player {
  number: number;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  isCaptain?: boolean;
}

export interface MatchEvent {
  minute: number;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUB';
  team: 'home' | 'away';
  player: string;
  subPlayer?: string;
  detail?: string;
}

export interface MatchStats {
  possession: [number, number]; // [home, away] %
  shotsOnTarget: [number, number];
  totalShots: [number, number];
  fouls: [number, number];
  corners: [number, number];
  offsides: [number, number];
  saves: [number, number];
}

export interface Match {
  id: string;
  category: string;
  stage: 'Group Stage' | 'Quarter-Finals' | 'Semi-Finals' | 'Final';
  matchday: string; // 'Matchday 1' | 'Matchday 2' | 'Matchday 3' | 'Finals Day'
  round: string;
  group?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'LIVE' | 'FINISHED' | 'UPCOMING';
  minute?: string;
  date: string;
  time: string;
  pitch: string;
  scorers?: string[];
  timeline?: MatchEvent[];
  stats?: MatchStats;
  lineups?: {
    home: {
      formation: string;
      manager: string;
      starting: Player[];
      subs: Player[];
    };
    away: {
      formation: string;
      manager: string;
      starting: Player[];
      subs: Player[];
    };
  };
}

export interface Standing {
  team: string;
  group: string;
  category: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: ('W' | 'D' | 'L')[];
}

export interface Scorer {
  rank: number;
  name: string;
  team: string;
  country: string;
  goals: number;
  assists: number;
  category: string;
  matches: number;
}

const createSquadForTeam = (teamId: string, teamName: string): SquadPlayer[] => {
  const commonSquads: Record<string, SquadPlayer[]> = {
    'fsa-u15': [
      { number: 1, name: 'Hamisi Bakari', position: 'GK', age: 15, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 2 },
      { number: 2, name: 'Rashid Mrema', position: 'DEF', age: 15, matchesPlayed: 3, goals: 0, assists: 1, yellowCards: 1, redCards: 0 },
      { number: 4, name: 'Baraka John', position: 'DEF', age: 14, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 2, redCards: 0 },
      { number: 5, name: 'Juma Saidi', position: 'DEF', age: 15, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, isCaptain: true },
      { number: 3, name: 'Kelvin Mwamba', position: 'DEF', age: 15, matchesPlayed: 3, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
      { number: 6, name: 'Elias Temu', position: 'MID', age: 14, matchesPlayed: 3, goals: 0, assists: 2, yellowCards: 0, redCards: 0 },
      { number: 8, name: 'Said Msuva', position: 'MID', age: 15, matchesPlayed: 3, goals: 0, assists: 1, yellowCards: 1, redCards: 0 },
      { number: 10, name: 'Emmanuel Mollel', position: 'MID', age: 15, matchesPlayed: 3, goals: 6, assists: 3, yellowCards: 0, redCards: 0 },
      { number: 7, name: 'Amani Joseph', position: 'FWD', age: 14, matchesPlayed: 3, goals: 1, assists: 1, yellowCards: 0, redCards: 0 },
      { number: 9, name: 'David Kimaro', position: 'FWD', age: 15, matchesPlayed: 3, goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
      { number: 11, name: 'Yusuf Ali', position: 'FWD', age: 14, matchesPlayed: 3, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
      { number: 12, name: 'Lucas Mbise', position: 'GK', age: 14, matchesPlayed: 1, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 1 },
      { number: 14, name: 'Godfrey Mallya', position: 'DEF', age: 15, matchesPlayed: 2, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { number: 16, name: 'Innocent Tarimo', position: 'MID', age: 14, matchesPlayed: 2, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { number: 19, name: 'Jackson Massawe', position: 'FWD', age: 15, matchesPlayed: 2, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    ],
    'ligi-u15': [
      { number: 1, name: 'David Kamau', position: 'GK', age: 15, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 1 },
      { number: 2, name: 'Collins Wafula', position: 'DEF', age: 15, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 3, redCards: 1 },
      { number: 5, name: 'Kevin Onyango', position: 'DEF', age: 15, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, isCaptain: true },
      { number: 4, name: 'George Makori', position: 'DEF', age: 14, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
      { number: 3, name: 'Meshack Ndungu', position: 'DEF', age: 15, matchesPlayed: 3, goals: 0, assists: 1, yellowCards: 0, redCards: 0 },
      { number: 6, name: 'Victor Wendo', position: 'MID', age: 14, matchesPlayed: 3, goals: 0, assists: 1, yellowCards: 1, redCards: 0 },
      { number: 8, name: 'Samuel Otieno', position: 'MID', age: 15, matchesPlayed: 3, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
      { number: 7, name: 'Dennis Wanyama', position: 'MID', age: 14, matchesPlayed: 3, goals: 0, assists: 1, yellowCards: 0, redCards: 0 },
      { number: 10, name: 'Brian Otieno', position: 'MID', age: 15, matchesPlayed: 3, goals: 5, assists: 1, yellowCards: 0, redCards: 0 },
      { number: 11, name: 'Moses Juma', position: 'FWD', age: 15, matchesPlayed: 3, goals: 1, assists: 1, yellowCards: 0, redCards: 0 },
      { number: 9, name: 'Kelvin Odhiambo', position: 'FWD', age: 14, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { number: 18, name: 'Brian Mwangi', position: 'GK', age: 14, matchesPlayed: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { number: 15, name: 'Peter Ochieng', position: 'MID', age: 15, matchesPlayed: 2, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { number: 17, name: 'Felix Okoth', position: 'DEF', age: 14, matchesPlayed: 1, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    ],
  };

  if (commonSquads[teamId]) {
    return commonSquads[teamId];
  }

  // Generic full squad generator for other clubs
  return [
    { number: 1, name: `${teamName.split(' ')[0]} Keeper`, position: 'GK', age: 15, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 1 },
    { number: 2, name: 'Joshua K.', position: 'DEF', age: 15, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    { number: 4, name: 'Daniel M.', position: 'DEF', age: 14, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: 5, name: 'Captain S.', position: 'DEF', age: 15, matchesPlayed: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, isCaptain: true },
    { number: 3, name: 'Felix O.', position: 'DEF', age: 15, matchesPlayed: 3, goals: 0, assists: 1, yellowCards: 0, redCards: 0 },
    { number: 6, name: 'Martin P.', position: 'MID', age: 14, matchesPlayed: 3, goals: 1, assists: 1, yellowCards: 1, redCards: 0 },
    { number: 8, name: 'Steven L.', position: 'MID', age: 15, matchesPlayed: 3, goals: 1, assists: 2, yellowCards: 0, redCards: 0 },
    { number: 10, name: 'Playmaker T.', position: 'MID', age: 15, matchesPlayed: 3, goals: 3, assists: 2, yellowCards: 0, redCards: 0 },
    { number: 7, name: 'Winger A.', position: 'FWD', age: 14, matchesPlayed: 3, goals: 2, assists: 1, yellowCards: 0, redCards: 0 },
    { number: 9, name: 'Striker B.', position: 'FWD', age: 15, matchesPlayed: 3, goals: 3, assists: 0, yellowCards: 0, redCards: 0 },
    { number: 11, name: 'Forward C.', position: 'FWD', age: 14, matchesPlayed: 3, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
    { number: 12, name: 'Reserve GK', position: 'GK', age: 14, matchesPlayed: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: 14, name: 'Defender E.', position: 'DEF', age: 15, matchesPlayed: 2, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: 15, name: 'Midfielder F.', position: 'MID', age: 14, matchesPlayed: 2, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
  ];
};

export const TEAMS_DATA: Team[] = [
  {
    id: 'fsa-u15',
    name: 'Future Stars Academy',
    shortName: 'FSA Arusha',
    country: 'Tanzania',
    city: 'Arusha',
    flag: '🇹🇿',
    badgeColor: 'from-emerald-600 to-teal-800',
    category: 'U15',
    group: 'Group A',
    coach: 'Alfred Mtui',
    founded: 2009,
    squadSize: 18,
    trainingGround: 'TGT Sports Complex Pitch 1',
    roster: createSquadForTeam('fsa-u15', 'Future Stars Academy'),
  },
  {
    id: 'ligi-u15',
    name: 'Ligi Ndogo SC',
    shortName: 'Ligi Ndogo',
    country: 'Kenya',
    city: 'Nairobi',
    flag: '🇰🇪',
    badgeColor: 'from-red-600 to-rose-900',
    category: 'U15',
    group: 'Group A',
    coach: 'Evans Omondi',
    founded: 2002,
    squadSize: 18,
    trainingGround: 'Ngong Road Grounds, Nairobi',
    roster: createSquadForTeam('ligi-u15', 'Ligi Ndogo SC'),
  },
  {
    id: 'kcca-u15',
    name: 'KCCA Soccer Academy',
    shortName: 'KCCA Juniors',
    country: 'Uganda',
    city: 'Kampala',
    flag: '🇺🇬',
    badgeColor: 'from-amber-500 to-yellow-700',
    category: 'U15',
    group: 'Group A',
    coach: 'Sadiq Ssempigi',
    founded: 2014,
    squadSize: 18,
    trainingGround: 'MTN Omondi Stadium, Lugogo',
    roster: createSquadForTeam('kcca-u15', 'KCCA Soccer Academy'),
  },
  {
    id: 'azam-u15',
    name: 'Azam FC Youth',
    shortName: 'Azam Elite',
    country: 'Tanzania',
    city: 'Dar es Salaam',
    flag: '🇹🇿',
    badgeColor: 'from-blue-600 to-indigo-900',
    category: 'U15',
    group: 'Group A',
    coach: 'Hemed Morocco',
    founded: 2011,
    squadSize: 18,
    trainingGround: 'Azam Complex, Chamazi',
    roster: createSquadForTeam('azam-u15', 'Azam FC Youth'),
  },
  {
    id: 'express-u15',
    name: 'Express Academy',
    shortName: 'Express Kampala',
    country: 'Uganda',
    city: 'Kampala',
    flag: '🇺🇬',
    badgeColor: 'from-red-700 to-amber-900',
    category: 'U15',
    group: 'Group B',
    coach: 'James Odoch',
    founded: 2016,
    squadSize: 18,
    trainingGround: 'Wankulukuku Stadium, Kampala',
    roster: createSquadForTeam('express-u15', 'Express Academy'),
  },
  {
    id: 'simba-u15',
    name: 'Simba SC Juniors',
    shortName: 'Simba B',
    country: 'Tanzania',
    city: 'Dar es Salaam',
    flag: '🇹🇿',
    badgeColor: 'from-red-500 to-red-800',
    category: 'U15',
    group: 'Group B',
    coach: 'Selemani Matola',
    founded: 2013,
    squadSize: 18,
    trainingGround: 'Mo Arena, Bunju',
    roster: createSquadForTeam('simba-u15', 'Simba SC Juniors'),
  },
  {
    id: 'gor-u15',
    name: 'Gor Mahia Youth Academy',
    shortName: 'K\'Ogalo Youth',
    country: 'Kenya',
    city: 'Kisumu',
    flag: '🇰🇪',
    badgeColor: 'from-emerald-500 to-green-900',
    category: 'U15',
    group: 'Group B',
    coach: 'Tom Ogweno',
    founded: 2010,
    squadSize: 18,
    trainingGround: 'Camp Toyoyo, Nairobi',
    roster: createSquadForTeam('gor-u15', 'Gor Mahia Youth Academy'),
  },
  {
    id: 'apr-u15',
    name: 'APR FC Academy',
    shortName: 'APR Kigali',
    country: 'Rwanda',
    city: 'Kigali',
    flag: '🇷🇼',
    badgeColor: 'from-slate-700 to-zinc-950',
    category: 'U15',
    group: 'Group B',
    coach: 'Jean-Claude Ndagijimana',
    founded: 2015,
    squadSize: 18,
    trainingGround: 'Stade de Kigali, Nyamirambo',
    roster: createSquadForTeam('apr-u15', 'APR FC Academy'),
  },
  {
    id: 'braeburn-u15',
    name: 'Braeburn Arusha SC',
    shortName: 'Braeburn',
    country: 'Tanzania',
    city: 'Arusha',
    flag: '🇹🇿',
    badgeColor: 'from-blue-500 to-cyan-800',
    category: 'U15',
    group: 'Group C',
    coach: 'Mark Richardson',
    founded: 2017,
    squadSize: 18,
    trainingGround: 'Braeburn International School Turf',
    roster: createSquadForTeam('braeburn-u15', 'Braeburn Arusha SC'),
  },
  {
    id: 'acacia-u15',
    name: 'Acacia Football Academy',
    shortName: 'Acacia EA',
    country: 'Kenya',
    city: 'Eldoret',
    flag: '🇰🇪',
    badgeColor: 'from-amber-600 to-orange-900',
    category: 'U15',
    group: 'Group C',
    coach: 'Peter Kiprop',
    founded: 2018,
    squadSize: 18,
    trainingGround: 'Kipchoge Keino Grounds, Eldoret',
    roster: createSquadForTeam('acacia-u15', 'Acacia Football Academy'),
  },
];

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'm-101',
    category: 'U15 Boys',
    stage: 'Group Stage',
    matchday: 'Matchday 3',
    round: 'Group Stage · Matchday 3',
    group: 'Group A',
    homeTeam: 'Future Stars Academy',
    awayTeam: 'Ligi Ndogo SC',
    homeScore: 2,
    awayScore: 1,
    status: 'LIVE',
    minute: "74'",
    date: 'Today',
    time: '11:00 EAT',
    pitch: 'Pitch 1 · TGT Arusha',
    scorers: ['E. Mollel 24\'', 'K. Mwamba 51\'', 'B. Otieno 62\''],
    timeline: [
      { minute: 24, type: 'GOAL', team: 'home', player: 'Emmanuel Mollel', detail: 'Curled strike from 20 yards' },
      { minute: 38, type: 'YELLOW_CARD', team: 'away', player: 'Collins Wafula', detail: 'Tactical pulling of shirt' },
      { minute: 51, type: 'GOAL', team: 'home', player: 'Kelvin Mwamba', detail: 'Header off corner delivery' },
      { minute: 58, type: 'SUB', team: 'away', player: 'Dennis Wanyama', subPlayer: 'Peter Ochieng', detail: 'Tactical change' },
      { minute: 62, type: 'GOAL', team: 'away', player: 'Brian Otieno', detail: 'Rebound into top right corner' },
      { minute: 69, type: 'YELLOW_CARD', team: 'home', player: 'Baraka John', detail: 'Late challenge' },
    ],
    stats: {
      possession: [56, 44],
      shotsOnTarget: [7, 4],
      totalShots: [14, 9],
      fouls: [9, 13],
      corners: [6, 3],
      offsides: [2, 1],
      saves: [3, 5],
    },
    lineups: {
      home: {
        formation: '4-3-3 Attacking',
        manager: 'Alfred Mtui',
        starting: [
          { number: 1, name: 'Hamisi Bakari', position: 'GK' },
          { number: 2, name: 'Rashid Mrema', position: 'DEF' },
          { number: 4, name: 'Baraka John', position: 'DEF' },
          { number: 5, name: 'Juma Saidi', position: 'DEF', isCaptain: true },
          { number: 3, name: 'Kelvin Mwamba', position: 'DEF' },
          { number: 6, name: 'Elias Temu', position: 'MID' },
          { number: 8, name: 'Said Msuva', position: 'MID' },
          { number: 10, name: 'Emmanuel Mollel', position: 'MID' },
          { number: 7, name: 'Amani Joseph', position: 'FWD' },
          { number: 9, name: 'David Kimaro', position: 'FWD' },
          { number: 11, name: 'Yusuf Ali', position: 'FWD' },
        ],
        subs: [
          { number: 12, name: 'Lucas Mbise', position: 'GK' },
          { number: 14, name: 'Godfrey Mallya', position: 'DEF' },
          { number: 16, name: 'Innocent Tarimo', position: 'MID' },
          { number: 19, name: 'Jackson Massawe', position: 'FWD' },
        ],
      },
      away: {
        formation: '4-2-3-1 Compact',
        manager: 'Evans Omondi',
        starting: [
          { number: 1, name: 'David Kamau', position: 'GK' },
          { number: 2, name: 'Collins Wafula', position: 'DEF' },
          { number: 5, name: 'Kevin Onyango', position: 'DEF', isCaptain: true },
          { number: 4, name: 'George Makori', position: 'DEF' },
          { number: 3, name: 'Meshack Ndungu', position: 'DEF' },
          { number: 6, name: 'Victor Wendo', position: 'MID' },
          { number: 8, name: 'Samuel Otieno', position: 'MID' },
          { number: 7, name: 'Dennis Wanyama', position: 'MID' },
          { number: 10, name: 'Brian Otieno', position: 'MID' },
          { number: 11, name: 'Moses Juma', position: 'FWD' },
          { number: 9, name: 'Kelvin Odhiambo', position: 'FWD' },
        ],
        subs: [
          { number: 18, name: 'Brian Mwangi', position: 'GK' },
          { number: 15, name: 'Peter Ochieng', position: 'MID' },
          { number: 17, name: 'Felix Okoth', position: 'DEF' },
          { number: 20, name: 'Eric Maina', position: 'FWD' },
        ],
      },
    },
  },
  {
    id: 'm-102',
    category: 'U15 Boys',
    stage: 'Group Stage',
    matchday: 'Matchday 3',
    round: 'Group Stage · Matchday 3',
    group: 'Group A',
    homeTeam: 'Azam FC Youth',
    awayTeam: 'KCCA Soccer Academy',
    homeScore: 3,
    awayScore: 2,
    status: 'FINISHED',
    minute: 'FT',
    date: 'Today',
    time: '09:30 EAT',
    pitch: 'Pitch 2 · Braeburn Main',
    scorers: ['S. Kibwana 12\', 44\'', 'M. Ally 59\'', 'J. Mukasa 33\'', 'R. Okello 80\''],
    timeline: [
      { minute: 12, type: 'GOAL', team: 'home', player: 'Salum Kibwana', detail: 'Breakaway sprint & finish' },
      { minute: 33, type: 'GOAL', team: 'away', player: 'John Mukasa', detail: 'Direct free kick from 25 yards' },
      { minute: 44, type: 'GOAL', team: 'home', player: 'Salum Kibwana', detail: 'Volley from inside penalty box' },
      { minute: 59, type: 'GOAL', team: 'home', player: 'Mohammed Ally', detail: 'Tap-in at far post' },
      { minute: 71, type: 'YELLOW_CARD', team: 'away', player: 'Paul Wasswa', detail: 'Persistent infringement' },
      { minute: 80, type: 'GOAL', team: 'away', player: 'Ronald Okello', detail: 'Header off cross' },
    ],
    stats: {
      possession: [52, 48],
      shotsOnTarget: [8, 6],
      totalShots: [15, 12],
      fouls: [10, 12],
      corners: [7, 5],
      offsides: [3, 2],
      saves: [4, 5],
    },
    lineups: {
      home: {
        formation: '4-3-3',
        manager: 'Hemed Morocco',
        starting: [
          { number: 1, name: 'Zuberi Foba', position: 'GK' },
          { number: 3, name: 'Pascal Msindo', position: 'DEF' },
          { number: 4, name: 'Lusajo Mwaikenda', position: 'DEF', isCaptain: true },
          { number: 5, name: 'Edward Manyama', position: 'DEF' },
          { number: 2, name: 'Nathaniel Chilambo', position: 'DEF' },
          { number: 6, name: 'Sospeter Bajana', position: 'MID' },
          { number: 8, name: 'Tepsi Evans', position: 'MID' },
          { number: 10, name: 'Salum Kibwana', position: 'MID' },
          { number: 7, name: 'Mohammed Ally', position: 'FWD' },
          { number: 9, name: 'Idd Nado', position: 'FWD' },
          { number: 11, name: 'Kipre Junior', position: 'FWD' },
        ],
        subs: [
          { number: 18, name: 'Ali Ahamada', position: 'GK' },
          { number: 14, name: 'Abdulkarim Kiswanya', position: 'DEF' },
          { number: 15, name: 'James Akaminko', position: 'MID' },
        ],
      },
      away: {
        formation: '3-5-2',
        manager: 'Sadiq Ssempigi',
        starting: [
          { number: 1, name: 'Derrick Ochan', position: 'GK' },
          { number: 4, name: 'Filbert Obenchan', position: 'DEF' },
          { number: 5, name: 'Mustafa Mujuzi', position: 'DEF', isCaptain: true },
          { number: 3, name: 'Herbert Achai', position: 'DEF' },
          { number: 2, name: 'Haruna Lukwago', position: 'MID' },
          { number: 6, name: 'Moses Waiswa', position: 'MID' },
          { number: 8, name: 'Ashraf Mugume', position: 'MID' },
          { number: 10, name: 'John Mukasa', position: 'MID' },
          { number: 11, name: 'Brian Majwega', position: 'MID' },
          { number: 9, name: 'Ronald Okello', position: 'FWD' },
          { number: 14, name: 'Sadat Anaku', position: 'FWD' },
        ],
        subs: [
          { number: 12, name: 'Anthony Emojong', position: 'GK' },
          { number: 15, name: 'Paul Wasswa', position: 'MID' },
        ],
      },
    },
  },
  {
    id: 'm-103',
    category: 'U15 Boys',
    stage: 'Group Stage',
    matchday: 'Matchday 3',
    round: 'Group Stage · Matchday 3',
    group: 'Group B',
    homeTeam: 'Express Academy',
    awayTeam: 'Simba SC Juniors',
    homeScore: 1,
    awayScore: 1,
    status: 'FINISHED',
    minute: 'FT',
    date: 'Today',
    time: '09:30 EAT',
    pitch: 'Pitch 3 · TGT Stadium',
    scorers: ['D. Kasozi 40\'', 'A. Mkude 73\''],
    timeline: [
      { minute: 40, type: 'GOAL', team: 'home', player: 'Denis Kasozi', detail: 'Chipped goalkeeper from edge of box' },
      { minute: 55, type: 'YELLOW_CARD', team: 'away', player: 'Shomari Kapombe Jr', detail: 'Late tackle' },
      { minute: 73, type: 'GOAL', team: 'away', player: 'Ally Mkude', detail: 'Low driven shot past near post' },
      { minute: 82, type: 'YELLOW_CARD', team: 'home', player: 'Arthur Kiggundu', detail: 'Time wasting' },
    ],
    stats: {
      possession: [45, 55],
      shotsOnTarget: [4, 5],
      totalShots: [9, 13],
      fouls: [14, 8],
      corners: [3, 7],
      offsides: [1, 3],
      saves: [4, 3],
    },
  },
  {
    id: 'm-104',
    category: 'U15 Boys',
    stage: 'Group Stage',
    matchday: 'Matchday 3',
    round: 'Group Stage · Matchday 3',
    group: 'Group B',
    homeTeam: 'Gor Mahia Youth Academy',
    awayTeam: 'APR FC Academy',
    status: 'UPCOMING',
    date: 'Today',
    time: '14:00 EAT',
    pitch: 'Pitch 1 · TGT Arusha',
  },
  {
    id: 'm-105',
    category: 'U15 Boys',
    stage: 'Quarter-Finals',
    matchday: 'Finals Day',
    round: 'Quarter-Final 1',
    homeTeam: 'Future Stars Academy',
    awayTeam: 'APR FC Academy',
    status: 'UPCOMING',
    date: 'Tomorrow',
    time: '10:00 EAT',
    pitch: 'Pitch 1 · TGT Arusha',
  },
  {
    id: 'm-106',
    category: 'U15 Boys',
    stage: 'Quarter-Finals',
    matchday: 'Finals Day',
    round: 'Quarter-Final 2',
    homeTeam: 'Simba SC Juniors',
    awayTeam: 'Azam FC Youth',
    status: 'UPCOMING',
    date: 'Tomorrow',
    time: '11:45 EAT',
    pitch: 'Pitch 2 · Braeburn Main',
  },
  {
    id: 'm-107',
    category: 'U17 Boys',
    stage: 'Group Stage',
    matchday: 'Matchday 2',
    round: 'Group Stage · Matchday 2',
    group: 'Group A',
    homeTeam: 'Future Stars Academy',
    awayTeam: 'Gor Mahia Youth Academy',
    homeScore: 0,
    awayScore: 0,
    status: 'LIVE',
    minute: "34'",
    date: 'Today',
    time: '11:30 EAT',
    pitch: 'Pitch 4 · Sheikh Amri Abeid',
    timeline: [
      { minute: 18, type: 'YELLOW_CARD', team: 'away', player: 'Austine Odhiambo', detail: 'Handball stoppage' },
    ],
    stats: {
      possession: [51, 49],
      shotsOnTarget: [2, 1],
      totalShots: [5, 4],
      fouls: [6, 7],
      corners: [2, 1],
      offsides: [1, 0],
      saves: [1, 2],
    },
  },
  {
    id: 'm-108',
    category: 'U15 Boys',
    stage: 'Semi-Finals',
    matchday: 'Finals Day',
    round: 'Semi-Final 1',
    homeTeam: 'Winner QF 1',
    awayTeam: 'Winner QF 2',
    status: 'UPCOMING',
    date: 'Sunday',
    time: '09:30 EAT',
    pitch: 'Pitch 1 · TGT Main Stadium',
  },
  {
    id: 'm-109',
    category: 'U15 Boys',
    stage: 'Semi-Finals',
    matchday: 'Finals Day',
    round: 'Semi-Final 2',
    homeTeam: 'Winner QF 3',
    awayTeam: 'Winner QF 4',
    status: 'UPCOMING',
    date: 'Sunday',
    time: '10:45 EAT',
    pitch: 'Pitch 2 · Braeburn Main',
  },
  {
    id: 'm-110',
    category: 'U15 Boys',
    stage: 'Final',
    matchday: 'Finals Day',
    round: 'Grand Final',
    homeTeam: 'Finalist 1',
    awayTeam: 'Finalist 2',
    status: 'UPCOMING',
    date: 'Sunday',
    time: '15:30 EAT',
    pitch: 'Sheikh Amri Abeid Stadium',
  },
];

export const STANDINGS_DATA: Standing[] = [
  // Group A
  {
    team: 'Future Stars Academy',
    group: 'Group A',
    category: 'U15',
    mp: 3,
    w: 2,
    d: 1,
    l: 0,
    gf: 7,
    ga: 2,
    gd: 5,
    pts: 7,
    form: ['W', 'D', 'W', 'W', 'D'],
  },
  {
    team: 'Azam FC Youth',
    group: 'Group A',
    category: 'U15',
    mp: 3,
    w: 2,
    d: 0,
    l: 1,
    gf: 6,
    ga: 4,
    gd: 2,
    pts: 6,
    form: ['W', 'L', 'W', 'W', 'L'],
  },
  {
    team: 'Ligi Ndogo SC',
    group: 'Group A',
    category: 'U15',
    mp: 3,
    w: 1,
    d: 0,
    l: 2,
    gf: 4,
    ga: 6,
    gd: -2,
    pts: 3,
    form: ['L', 'W', 'L', 'D', 'W'],
  },
  {
    team: 'KCCA Soccer Academy',
    group: 'Group A',
    category: 'U15',
    mp: 3,
    w: 0,
    d: 1,
    l: 2,
    gf: 3,
    ga: 8,
    gd: -5,
    pts: 1,
    form: ['L', 'D', 'L', 'L', 'D'],
  },
  // Group B
  {
    team: 'Simba SC Juniors',
    group: 'Group B',
    category: 'U15',
    mp: 3,
    w: 2,
    d: 1,
    l: 0,
    gf: 8,
    ga: 3,
    gd: 5,
    pts: 7,
    form: ['W', 'W', 'D', 'W', 'W'],
  },
  {
    team: 'Express Academy',
    group: 'Group B',
    category: 'U15',
    mp: 3,
    w: 1,
    d: 2,
    l: 0,
    gf: 5,
    ga: 3,
    gd: 2,
    pts: 5,
    form: ['D', 'W', 'D', 'W', 'D'],
  },
  {
    team: 'Gor Mahia Youth Academy',
    group: 'Group B',
    category: 'U15',
    mp: 3,
    w: 1,
    d: 1,
    l: 1,
    gf: 4,
    ga: 4,
    gd: 0,
    pts: 4,
    form: ['L', 'D', 'W', 'L', 'D'],
  },
  {
    team: 'APR FC Academy',
    group: 'Group B',
    category: 'U15',
    mp: 3,
    w: 0,
    d: 0,
    l: 3,
    gf: 1,
    ga: 7,
    gd: -6,
    pts: 0,
    form: ['L', 'L', 'L', 'D', 'L'],
  },
  // Group C
  {
    team: 'Braeburn Arusha SC',
    group: 'Group C',
    category: 'U15',
    mp: 3,
    w: 2,
    d: 1,
    l: 0,
    gf: 6,
    ga: 2,
    gd: 4,
    pts: 7,
    form: ['W', 'D', 'W', 'W', 'D'],
  },
  {
    team: 'Acacia Football Academy',
    group: 'Group C',
    category: 'U15',
    mp: 3,
    w: 2,
    d: 0,
    l: 1,
    gf: 5,
    ga: 3,
    gd: 2,
    pts: 6,
    form: ['W', 'W', 'L', 'W', 'L'],
  },
  {
    team: 'Vipers SC Junior Team',
    group: 'Group C',
    category: 'U15',
    mp: 3,
    w: 1,
    d: 0,
    l: 2,
    gf: 3,
    ga: 5,
    gd: -2,
    pts: 3,
    form: ['L', 'L', 'W', 'L', 'W'],
  },
  {
    team: 'Rayon Sports Academy',
    group: 'Group C',
    category: 'U15',
    mp: 3,
    w: 0,
    d: 1,
    l: 2,
    gf: 2,
    ga: 6,
    gd: -4,
    pts: 1,
    form: ['D', 'L', 'L', 'D', 'L'],
  },
  // Group D
  {
    team: 'Yanga SC Juniors',
    group: 'Group D',
    category: 'U15',
    mp: 3,
    w: 3,
    d: 0,
    l: 0,
    gf: 9,
    ga: 1,
    gd: 8,
    pts: 9,
    form: ['W', 'W', 'W', 'W', 'W'],
  },
  {
    team: 'AFC Leopards Youth',
    group: 'Group D',
    category: 'U15',
    mp: 3,
    w: 1,
    d: 1,
    l: 1,
    gf: 4,
    ga: 4,
    gd: 0,
    pts: 4,
    form: ['W', 'L', 'D', 'L', 'W'],
  },
  {
    team: 'Kampala Junior Stars',
    group: 'Group D',
    category: 'U15',
    mp: 3,
    w: 1,
    d: 0,
    l: 2,
    gf: 3,
    ga: 6,
    gd: -3,
    pts: 3,
    form: ['L', 'W', 'L', 'D', 'L'],
  },
  {
    team: 'Kiyovu Sports Academy',
    group: 'Group D',
    category: 'U15',
    mp: 3,
    w: 0,
    d: 1,
    l: 2,
    gf: 2,
    ga: 7,
    gd: -5,
    pts: 1,
    form: ['L', 'D', 'L', 'L', 'D'],
  },
];

export const TOP_SCORERS: Scorer[] = [
  {
    rank: 1,
    name: 'Emmanuel Mollel',
    team: 'Future Stars Academy',
    country: 'Tanzania',
    goals: 6,
    assists: 3,
    category: 'U15',
    matches: 3,
  },
  {
    rank: 2,
    name: 'Brian Otieno',
    team: 'Ligi Ndogo SC',
    country: 'Kenya',
    goals: 5,
    assists: 1,
    category: 'U15',
    matches: 3,
  },
  {
    rank: 3,
    name: 'Salum Kibwana',
    team: 'Azam FC Youth',
    country: 'Tanzania',
    goals: 4,
    assists: 2,
    category: 'U15',
    matches: 3,
  },
  {
    rank: 4,
    name: 'Denis Kasozi',
    team: 'Express Academy',
    country: 'Uganda',
    goals: 4,
    assists: 0,
    category: 'U15',
    matches: 3,
  },
  {
    rank: 5,
    name: 'Ally Mkude',
    team: 'Simba SC Juniors',
    country: 'Tanzania',
    goals: 3,
    assists: 4,
    category: 'U15',
    matches: 3,
  },
];

export const DISCIPLINE_LEADERBOARD: DisciplineRecord[] = [
  {
    rank: 1,
    name: 'Collins Wafula',
    team: 'Ligi Ndogo SC',
    country: 'Kenya',
    flag: '🇰🇪',
    yellowCards: 3,
    redCards: 1,
    fouls: 11,
    category: 'U15 Boys',
    matches: 3,
  },
  {
    rank: 2,
    name: 'Baraka John',
    team: 'Future Stars Academy',
    country: 'Tanzania',
    flag: '🇹🇿',
    yellowCards: 2,
    redCards: 0,
    fouls: 8,
    category: 'U15 Boys',
    matches: 3,
  },
  {
    rank: 3,
    name: 'Paul Wasswa',
    team: 'KCCA Soccer Academy',
    country: 'Uganda',
    flag: '🇺🇬',
    yellowCards: 2,
    redCards: 0,
    fouls: 9,
    category: 'U15 Boys',
    matches: 3,
  },
  {
    rank: 4,
    name: 'Shomari Kapombe Jr',
    team: 'Simba SC Juniors',
    country: 'Tanzania',
    flag: '🇹🇿',
    yellowCards: 2,
    redCards: 0,
    fouls: 7,
    category: 'U15 Boys',
    matches: 3,
  },
  {
    rank: 5,
    name: 'Arthur Kiggundu',
    team: 'Express Academy',
    country: 'Uganda',
    flag: '🇺🇬',
    yellowCards: 2,
    redCards: 0,
    fouls: 6,
    category: 'U15 Boys',
    matches: 3,
  },
  {
    rank: 6,
    name: 'Austine Odhiambo',
    team: 'Gor Mahia Youth Academy',
    country: 'Kenya',
    flag: '🇰🇪',
    yellowCards: 1,
    redCards: 1,
    fouls: 5,
    category: 'U15 Boys',
    matches: 2,
  },
];

export const TOURNAMENT_CATEGORIES = [
  'U9 Boys',
  'U11 Boys',
  'U13 Boys',
  'U15 Boys',
  'U17 Boys',
  'U20 Boys',
  'U15 Girls',
  'U17 Girls',
];

export const SPONSORS = [
  { name: 'Future Stars Academy', role: 'Host Organization', tier: 'Host' },
  { name: 'Uhlsport', role: 'Official Match Ball', tier: 'Technical' },
  { name: 'Braeburn Arusha', role: 'Official Venue Partner', tier: 'Venue' },
  { name: 'Kilimanjaro Water', role: 'Official Hydration', tier: 'Partner' },
  { name: 'Azam TV', role: 'Official Broadcast', tier: 'Media' },
  { name: 'Arusha City Council', role: 'Civic Partner', tier: 'Patron' },
];
