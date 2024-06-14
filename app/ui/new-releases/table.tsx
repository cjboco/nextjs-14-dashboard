import Image from 'next/image';
import { ViewNewRelease } from '@/app/ui/new-releases/buttons';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';
import type { Movie } from '@/app/lib/types';

const getFlagCode = (language: string): FlagIconCode | undefined => {
  const languageToCountryCode: { [key: string]: FlagIconCode } = {
    en: 'US',
    es: 'ES',
    fr: 'FR',
    de: 'DE',
    it: 'IT',
    zh: 'CN',
    ja: 'JP',
    ko: 'KR',
    ca: 'CA',
    // Add other language to country code mappings as needed
  };

  return languageToCountryCode[language];
};

export default async function NewestReleasesTable({
  movies,
  query,
  currentPage,
}: {
  movies: Movie[];
  query: string;
  currentPage: number;
}) {
  return (
    <div className='mt-6 flow-root'>
      <div className='w-full flex flex-col md:flex-row md:justify-between justifty-center items-start mb-4'>
        <p className='md:w-1/3'>
          Showing releases from{' '}
          {movies.length > 0 ? movies[0].release_date : ''} to{' '}
          {movies.length > 0 ? movies[movies.length - 1].release_date : ''}
        </p>
        <p className='md:w-1/3 md:text-center'>
          Total Results: {movies.length}
        </p>
        <p className='md:w-1/3 md:text-right'>Page {currentPage}</p>
      </div>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <div className='md:hidden'>
            {movies.map((newRelease) => (
              <div
                key={newRelease.id}
                className='mb-2 w-full rounded-md bg-white p-4'
              >
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <div className='mb-2 flex items-center'>
                      <Image
                        src={
                          newRelease?.poster_path
                            ? `https://image.tmdb.org/t/p/w500${newRelease.poster_path}`
                            : '/placeholder.jpg'
                        }
                        className='mr-2 rounded-sm'
                        width={28}
                        height={28}
                        alt={`${newRelease.title}'s poster`}
                      />
                      <p>{newRelease.title}</p>
                    </div>
                    <div className='flex items-center'>
                      {getFlagCode(newRelease.original_language) && (
                        <FlagIcon
                          code={
                            getFlagCode(
                              newRelease.original_language
                            ) as FlagIconCode
                          }
                          size={16}
                          className='mr-2'
                        />
                      )}
                      <p className='text-sm text-gray-500'>
                        {newRelease.release_date}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {newRelease.vote_average} / 10
                      </p>
                      <p className='text-sm text-gray-500'>
                        {newRelease.popularity}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex w-full items-center justify-between pt-4'>
                  <div>
                    <p className='text-xl font-medium'>{newRelease.title}</p>
                    <p>{newRelease.release_date}</p>
                    <p>{newRelease.overview}</p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <ViewNewRelease id={newRelease.id.toString()} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                  Title
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Release Date
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Overview
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Vote Average
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Popularity
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Language
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Poster
                </th>
                <th scope='col' className='relative py-3 pl-6 pr-3'>
                  <span className='sr-only'>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {movies.map((newRelease) => (
                <tr
                  key={newRelease.id}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='py-3 pl-6 pr-3'>
                    <div className='flex items-center gap-3'>
                      <p>{newRelease.title}</p>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {newRelease.release_date}
                  </td>
                  <td className='px-3 py-3'>{newRelease.overview}</td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {newRelease.vote_average} / 10
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {newRelease.popularity}
                  </td>
                  <td className='px-3 py-3 text-center'>
                    <div className='flex flex-col justify-center items-center uppercase gap-1'>
                      {getFlagCode(newRelease.original_language) && (
                        <FlagIcon
                          code={
                            getFlagCode(
                              newRelease.original_language
                            ) as FlagIconCode
                          }
                          size={16}
                        />
                      )}
                      {newRelease.original_language}
                    </div>
                  </td>
                  <td className='px-3 py-3'>
                    <Image
                      src={
                        newRelease?.poster_path
                          ? `https://image.tmdb.org/t/p/w500${newRelease.poster_path}`
                          : '/placeholder.jpg'
                      }
                      className='rounded-sm'
                      width={64}
                      height={64}
                      alt={`${newRelease.title}'s poster`}
                    />
                  </td>
                  <td className='py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <ViewNewRelease id={newRelease.id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
