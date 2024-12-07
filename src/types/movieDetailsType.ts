export interface MovieDetailsProps {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
  Rated?: string;
  Writer?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: Array<{ Source: string; Value: string }>;
  Metascore?: string;
  imdbRating: number;
  imdbVotes?: string;
  imdbID: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;

  runtime: number;
  userRating: number;
}
