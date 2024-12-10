export interface Standing {
  _id?: string;
  club: string;
  imageUrl: string;
  league: string;
  position: number;
  played: string;
  won: number;
  drawn: number;
  lost: number;
  goals: string;
  last5: string[];
  points: number;
}
