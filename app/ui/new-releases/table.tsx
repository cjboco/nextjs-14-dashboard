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
  currentPage,
}: {
  movies: Movie[];
  currentPage: number;
}) {
  class PRNG {
    private seed: number;

    constructor(seed: number) {
      this.seed = seed;
    }

    random(): number {
      // xorshift32 algorithm
      this.seed ^= this.seed << 13;
      this.seed ^= this.seed >> 17;
      this.seed ^= this.seed << 5;
      return (this.seed >>> 0) / 0xffffffff;
    }
  }

  function dateToSeed(date: Date): number {
    return date.getTime();
  }

  function generateRowData(fixedNumber: number, date: Date): number[] {
    const seed = dateToSeed(date);
    const prng = new PRNG(seed);

    const row: number[] = [];
    for (let j = 0; j < 4; j++) {
      // Generate 4 columns of data
      const generatedNumber = Math.floor(fixedNumber * prng.random() * 0.5); // Ensure it's a fraction of the fixed number
      row.push(generatedNumber);
    }
    return row;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div className='mt-6 flow-root'>
      <div className='w-full flex flex-col md:flex-row md:justify-between justifty-center items-center mb-4 text-sm bg-zinc-100 p-2 rounded-md gap-2'>
        <div className='md:w-1/2 text-center bg-white p-2 rounded-sm'>
          Total Results: {movies.length}
        </div>
        <div className='md:w-1/2 text-center bg-white p-2 rounded-sm'>
          Page {currentPage}
        </div>
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
                        {newRelease.vote_average} / 10
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
                  </div>
                  <div className='flex justify-end gap-2'>
                    <ViewNewRelease id={newRelease.id.toString()} />
                  </div>
                </div>
              </div>
            ))}
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
                  className='px-4 py-5 font-medium sm:pl-6 text-white'
                >
                  Title
                </th>
                <th
                  scope='col'
                  className='px-3 py-5 font-medium text-white text-center'
                >
                  Poster
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
                    <td className='py-3 pl-6 pr-3'>
                      <div className='flex items-center gap-3'>
                        <p>{newRelease.title}</p>
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
