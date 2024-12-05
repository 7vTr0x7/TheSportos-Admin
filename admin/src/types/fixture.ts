// Goals Schema
interface Goal {
  player: string;
  assist: string;
}

// Featured Player Schema
interface FeaturedPlayer {
  name: string;
  imageUrl: string;
  club: string;
  stats: {
    goals: string;
    assists: string;
    rank: string;
  };
  position: string;
}

// Player Schema
interface Player {
  number: number;
  name: string;
  imageUrl: string;
  position: string;
}

// Match Schema
interface Match {
  _id: string;
  competition: string;
  league_logo_url?: string;
  date: string; // ISO string format
  month: string;
  stadium: string;
  team1: {
    name: string;
    logo_url?: string;
  };
  team2: {
    name: string;
    logo_url?: string;
  };
  status: string;
  time?: string;
  FT: boolean;
  score: {
    team1: number;
    team2: number;
  };
  penalties: boolean;
  pens: {
    team1: number;
    team2: number;
  };
  timeLeft: {
    daysLeft?: number;
    hoursLeft?: number;
  };
  matchType: string;
  headToHead: {
    played: number;
    wins: {
      team1: number;
      team2: number;
    };
    homeWins: {
      team1: number;
      team2: number;
    };
    awayWins: {
      team1: number;
      team2: number;
    };
  };
  previousResult: {
    team1: {
      name: string;
      score: number;
    };
    team2: {
      name: string;
      score: number;
    };
  };
  goals: {
    team1: Goal[];
    team2: Goal[];
  };
  bestDefender?: string;
  bestMidfielder?: string;
  featuredPlayer?: FeaturedPlayer;
  teamLineup: {
    team1: {
      name: string;
      lineup: Player[];
    };
    team2: {
      name: string;
      lineup: Player[];
    };
  };
}

interface MatchesResponse {
  success: boolean;
  matches: Match[];
}
