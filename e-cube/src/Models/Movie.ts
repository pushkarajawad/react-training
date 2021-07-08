export interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  director: string;
  stars: string;
  plot: string;
  currency: string;
  prices: MoviePrices;
}

export interface MoviePrices {
  normal: number;
  superior: number;
  sofa: number;
}

export interface Transaction{
  movieId:number,
  price:number
  currency:string;
  userId:string;
  id:string;
}
