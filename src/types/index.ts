export interface ILinkItem {
  doubanId: string | number;
  title: string;
  rate: number
  poster: string
}

export interface IMovieData {
  rating: any
  reviews_count: number
  videos: any[]
  wish_count: number
  original_title: string
  collect_count: number
  alt: string
  id: string | number
  mobile_url: string
  photos_count: number
  title: string
  share_url: string
  tags: string[]
}