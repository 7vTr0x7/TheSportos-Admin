export interface Sponsor {
  _id?: string;
  imageUrl: string;
  linkUrl: string;
}

export interface SponsorResponse {
  success: boolean;
  sponsor: Sponsor[];
}
