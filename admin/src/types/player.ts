export interface TeamStats {
  imageUrl: string;
  teamName: string;
  startDate: Date;
  stats: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
  };
}

interface FixtureTeam {
  name: string;
  logo_url: string;
}

export interface RecentFixture {
  competition: string;
  league_logo_url: string;
  date: string;
  stadium: string;
  team1: FixtureTeam;
  team2: FixtureTeam;
  score: {
    team1: number;
    team2: number;
  };
}
interface PlayerProfile {
  dateOfBirth: Date;
  preferredFoot: 'Left' | 'Right' | 'Both';
  location: string;
  preferredPosition: string;
}

export interface SinglePlayer {
  _id?: string;
  name: string;
  flagImageUrl: string;
  imageUrl: string;
  number: number;
  country: string;
  email: string;
  position: string;
  playerProfile: PlayerProfile;
  teamsPlayedFor: TeamStats[];
  recentFixtures?: RecentFixture[];
}

export interface PlayerResponse {
  success: boolean;
  players: SinglePlayer[];
}
