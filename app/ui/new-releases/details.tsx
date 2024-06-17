import Image from 'next/image';
import type { MovieDetails } from '@/app/lib/types';

const MovieDetail = ({ movie }: { movie: MovieDetails }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div className=' w-full mx-auto p-4'>
      <div className='flex flex-col  bg-white shadow-md rounded-lg overflow-hidden p-6'>
        <div className='flex flex-col md:flex-row'>
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
        <div className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>Engagement Stats</h2>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b text-left bg-gray-100 rounded-tl-lg'>
                  Metric
                </th>
                <th className='py-2 px-4 border-b text-center bg-gray-100 rounded-tr-lg'>
                  Count
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='py-2 px-4 border-b'>Trailer Views</td>
                <td className='py-2 px-4 border-b text-center'>
                  {formatter.format(movie.metrics.trailer)}
                </td>
              </tr>
              <tr>
                <td className='py-2 px-4 border-b'>Yup</td>
                <td className='py-2 px-4 border-b text-center'>
                  {formatter.format(movie.metrics.yup)}
                </td>
              </tr>
              <tr>
                <td className='py-2 px-4 border-b'>Lit</td>
                <td className='py-2 px-4 border-b text-center'>
                  {formatter.format(movie.metrics.lit)}
                </td>
              </tr>
              <tr>
                <td className='py-2 px-4 border-b'>Nope</td>
                <td className='py-2 px-4 border-b text-center'>
                  {formatter.format(movie.metrics.nope)}
                </td>
              </tr>
              <tr>
                <td className='py-2 px-4 border-b'>Sh!t</td>
                <td className='py-2 px-4 border-b text-center'>
                  {formatter.format(movie.metrics.shit)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
