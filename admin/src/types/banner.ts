export interface Banner {
  _id?: string;
  imageUrl: string;
}

export interface BannerResponse {
  success: boolean;
  banner: Banner[];
}
