import Image from 'next/image';

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieDetail = ({ movie }: { movie: Movie }) => {
  return (
    <div className=' w-full mx-auto p-4'>
      <div className='flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden p-6'>
        <div className='w-full md:w-1/3'>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className='object-cover'
          />
        </div>
        <div className='w-full md:w-2/3 p-4'>
          <h1 className='text-3xl font-bold mb-2'>{movie.title}</h1>
          <p className='text-gray-700 mb-4'>{movie.tagline}</p>
          <p className='text-gray-700 mb-4'>{movie.overview}</p>
          <div className='mb-4'>
            <h2 className='text-2xl font-semibold'>Genres</h2>
            <ul className='flex flex-wrap'>
              {movie.genres.map((genre) => (
                <li
                  key={genre.id}
                  className='bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2'
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <div className='mb-4'>
            <h2 className='text-2xl font-semibold'>Details</h2>
            <ul className='list-disc list-inside text-gray-700'>
              <li>Release Date: {movie.release_date}</li>
              <li>Runtime: {movie.runtime} minutes</li>
              <li>Budget: ${movie.budget.toLocaleString()}</li>
              <li>Revenue: ${movie.revenue.toLocaleString()}</li>
              <li>Vote Average: {movie.vote_average}</li>
              <li>Vote Count: {movie.vote_count}</li>
            </ul>
          </div>
          <div className='mb-4'>
            <h2 className='text-2xl font-semibold'>Production Companies</h2>
            <ul className='flex flex-wrap'>
              {movie.production_companies.map((company) => (
                <li
                  key={company.id}
                  className='bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2'
                >
                  {company.name}
                </li>
              ))}
            </ul>
          </div>
          <div className='mb-4'>
            <h2 className='text-2xl font-semibold'>Languages</h2>
            <ul className='flex flex-wrap'>
              {movie.spoken_languages.map((language) => (
                <li
                  key={language.iso_639_1}
                  className='bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2'
                >
                  {language.english_name}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={movie.homepage}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 hover:underline'
          >
            Visit Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
