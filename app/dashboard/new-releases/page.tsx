import Pagination from '@/app/ui/new-releases/pagination';
import Table from '@/app/ui/new-releases/table';
import { lusitana } from '@/app/ui/fonts';
import { NewReleaseTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchTMDBNewReleases } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'New Releases',
};

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const newReleases = await fetchTMDBNewReleases(currentPage);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${lusitana.className} text-2xl`}>New Releases</h1>
      </div>
      <Suspense key={currentPage} fallback={<NewReleaseTableSkeleton />}>
        <Table movies={newReleases?.results ?? []} currentPage={currentPage} />
      </Suspense>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={newReleases?.total_pages} />
      </div>
    </div>
  );
}
