import Breadcrumbs from '@/app/ui/new-releases/breadcrumbs';
import { fetchNewReleaseById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import MovieDetail from '@/app/ui/new-releases/details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'View New Release',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const newRelease = await fetchNewReleaseById(Number(id));

  console.log('newRelease', id, newRelease);

  if (!newRelease) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'NewReleases', href: '/dashboard/new-releases' },
          {
            label: 'Edit NewRelease',
            href: `/dashboard/new-releases/${id}/view`,
            active: true,
          },
        ]}
      />
      <MovieDetail movie={newRelease} />
    </main>
  );
}
