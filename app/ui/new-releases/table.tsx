import Image from 'next/image';
import { ViewNewRelease } from '@/app/ui/new-releases/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredNewReleases } from '@/app/lib/data';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';

interface Movie {
  uuid: string;
  imdb_id: string;
  title: string;
  original_title: string;
  original_language: string;
  description: string;
  poster_url: string;
  backdrop_url: string;
  release_date: string;
}

interface Reactions {
  lit: number;
  'sh!t': number;
  plus: number;
  minus: number;
}

interface MovieResponse {
  movie: Movie;
  reactions: Reactions;
}

interface NewReleasesProps {
  newReleases: MovieResponse[];
}

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

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const newReleases = await fetchFilteredNewReleases(query, currentPage);

  interface Movie {
    uuid: string;
    imdb_id: string;
    title: string;
    original_title: string;
    original_language: string;
    description: string;
    poster_url: string;
    backdrop_url: string;
    release_date: string;
  }

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <div className='md:hidden'>
            {newReleases?.map((newRelease) => (
              <div
                key={newRelease.movie.uuid}
                className='mb-2 w-full rounded-md bg-white p-4'
              >
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <div className='mb-2 flex items-center'>
                      <Image
                        src={newRelease.movie.poster_url}
                        className='mr-2 rounded-full'
                        width={28}
                        height={28}
                        alt={`${newRelease.movie.title}'s poster`}
                      />
                      <p>{newRelease.movie.title}</p>
                    </div>
                    <div className='flex items-center'>
                      {getFlagCode(newRelease.movie.original_language) && (
                        <FlagIcon
                          code={
                            getFlagCode(
                              newRelease.movie.original_language
                            ) as FlagIconCode
                          }
                          size={16}
                          className='mr-2'
                        />
                      )}
                      <p className='text-sm text-gray-500'>
                        {newRelease.movie.original_language}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex w-full items-center justify-between pt-4'>
                  <div>
                    <p className='text-xl font-medium'>
                      {newRelease.movie.title}
                    </p>
                    <p>{formatDateToLocal(newRelease.movie.release_date)}</p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <ViewNewRelease id={newRelease.movie.uuid} />
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
                  Language
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Description
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Release Date
                </th>
                <th scope='col' className='relative py-3 pl-6 pr-3'>
                  <span className='sr-only'>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {newReleases?.map((newRelease) => (
                <tr
                  key={newRelease.movie.uuid}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='py-3 pl-6 pr-3'>
                    <div className='flex flex-col justify-center items-center gap-3'>
                      <Image
                        src={newRelease.movie.poster_url}
                        className='rounded-sm'
                        width={96}
                        height={96}
                        alt={`${newRelease.movie.title}'s poster`}
                      />
                      <p className='whitespace-nowrap'>
                        {newRelease.movie.title}
                      </p>
                    </div>
                  </td>
                  <td className='px-3 py-3 text-center'>
                    <div className='flex items-center'>
                      {getFlagCode(newRelease.movie.original_language) && (
                        <FlagIcon
                          code={
                            getFlagCode(
                              newRelease.movie.original_language
                            ) as FlagIconCode
                          }
                          size={16}
                          className='mr-2'
                        />
                      )}
                      {newRelease.movie.original_language}
                    </div>
                  </td>
                  <td className='px-3 py-3'>{newRelease.movie.description}</td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {formatDateToLocal(newRelease.movie.release_date)}
                  </td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <ViewNewRelease id={newRelease.movie.uuid} />
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
