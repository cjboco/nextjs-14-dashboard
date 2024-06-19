import Image from 'next/image';
import { ViewNewRelease } from '@/app/ui/new-releases/buttons';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';
import { generateRowData } from '@/app/lib/utils';
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
  currentPage,
}: {
  movies: Movie[];
  currentPage: number;
}) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div className='mt-6 flow-root'>
      <div className='w-full flex flex-row justify-between items-center mb-4 text-sm bg-zinc-100 p-2 rounded-md gap-2'>
        <div className='w-1/2 text-center bg-white p-2 rounded-sm'>
          Total Results: {movies.length}
        </div>
        <div className='w-1/2 text-center bg-white p-2 rounded-sm'>
          Page {currentPage}
        </div>
      </div>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <div className='md:hidden'>
            {movies.map((newRelease) => {
              const fakeData = generateRowData(
                newRelease.id,
                new Date(newRelease.release_date)
              );
              return (
                <div
                  key={newRelease.id}
                  className='mb-2 w-full rounded-md bg-white p-4'
                >
                  <div className='flex flex-col w-full items-center justify-between border-b pb-4'>
                    <div className='flex flex-row justify-between items-start gap-4 w-full mb-2 '>
                      <div className='grow w-full flex items-center'>
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
                        <p className='font-medium'>{newRelease.title}</p>
                      </div>
                      <div className='flex items-center justify-end grow-0'>
                        <ViewNewRelease id={newRelease.id.toString()} />
                      </div>
                    </div>
                    <div className='flex flex-col w-full'>
                      <p className='text-sm text-gray-500'>
                        Release Date: {newRelease.release_date}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Trailer Viewed: {formatter.format(newRelease.id)}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Yup: {formatter.format(fakeData[0]) ?? 0}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Lit: {formatter.format(fakeData[1]) ?? 0}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Nope: {formatter.format(fakeData[2]) ?? 0}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Sh!t: {formatter.format(fakeData[3]) ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <table className='hidden min-w-full text-gray-900 md:table rounded-md overflow-hidden'>
            <thead className='rounded-lg text-left text-sm font-normal table-header-group'>
              <tr className='bg-zinc-700'>
                <th
                  scope='col'
                  className='relative py-3 pl-6 pr-3 text-white text-center'
                >
                  <span className='sr-only'>Actions</span>
                </th>
                <th
                  scope='col'
                  className='px-3 py-5 font-medium text-white text-center'
                >
                  Poster
                </th>
                <th
                  scope='col'
                  className='px-4 py-5 font-medium sm:pl-6 text-white'
                >
                  Title
                </th>
                <th
                  scope='col'
                  className='px-3 py-5 font-medium text-white text-center'
                >
                  Release Date
                </th>
                <th
                  scope='col'
                  className='px-3 py-5 font-medium text-white text-center'
                >
                  Trailer Viewed
                </th>
                <th
                  scope='col'
                  className='px-3 py-5 font-medium text-white text-center'
                >
                  Yup
                </th>
                <th
                  scope='col'
                  className='px-3 py-5 font-medium text-white text-center'
                >
                  Lit
                </th>
                <th
                  scope='col'
                  className='px-3 py-5 font-medium text-white text-center'
                >
                  Nope
                </th>
                <th
                  scope='col'
                  className='px-3 py-5 font-medium text-white text-center'
                >
                  Sh!t
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {movies.map((newRelease) => {
                const fakeData = generateRowData(
                  newRelease.id,
                  new Date(newRelease.release_date)
                );
                return (
                  <tr
                    key={newRelease.id}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='py-3 pl-6 pr-3 text-center'>
                      <div className='flex justify-center gap-3'>
                        <ViewNewRelease id={newRelease.id.toString()} />
                      </div>
                    </td>
                    <td className='px-3 py-3 text-center'>
                      <Image
                        src={
                          newRelease?.poster_path
                            ? `https://image.tmdb.org/t/p/w500${newRelease.poster_path}`
                            : '/placeholder.jpg'
                        }
                        className='rounded-sm mx-auto'
                        width={64}
                        height={64}
                        alt={`${newRelease.title}'s poster`}
                      />
                    </td>
                    <td className='py-3 pl-6 pr-3'>
                      <div className='flex items-center gap-3'>
                        <p>{newRelease.title}</p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3 text-center'>
                      {newRelease.release_date}
                    </td>
                    <td className='px-3 py-3 text-center'>
                      {formatter.format(newRelease.id)}
                    </td>
                    <td className='px-3 py-3 text-center'>
                      {formatter.format(fakeData[0]) ?? 0}
                    </td>
                    <td className='px-3 py-3 text-center'>
                      {formatter.format(fakeData[1]) ?? 0}
                    </td>
                    <td className='px-3 py-3 text-center'>
                      {formatter.format(fakeData[2]) ?? 0}
                    </td>
                    <td className='px-3 py-3 text-center'>
                      {formatter.format(fakeData[3]) ?? 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
