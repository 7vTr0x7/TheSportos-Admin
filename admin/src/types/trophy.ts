export interface Trophy {
  _id?: string;
  name: string;
  image_url: string;
}

export interface TrophyResponse {
  success: boolean;
  trophies: Trophy[];
}
