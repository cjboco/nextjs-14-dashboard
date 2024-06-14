import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function ViewNewRelease({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/new-releases/${id}/view`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <MagnifyingGlassIcon className='w-5' />
    </Link>
  );
}
