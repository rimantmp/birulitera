import { Suspense } from 'react';
import Image from 'next/image';
import { getBooks } from '@/lib/api/gutendex';
import BookCard from '@/components/ui/BookCard';
import Pagination from '@/components/ui/Pagination';
import SearchBar from '@/components/ui/SearchBar';
import LanguageFilter from '@/components/ui/LanguageFilter';

// This is a Server Component. Next.js App Router fetches data on the server by default.
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === 'string' ? Number(resolvedSearchParams.page) : 1;
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined;
  const languages = typeof resolvedSearchParams.languages === 'string' ? resolvedSearchParams.languages : undefined;

  const data = await getBooks({
    page,
    search,
    languages,
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] py-24 px-6 sm:px-12 text-center shadow-elevation-2">
        <div className="absolute inset-0 z-0 bg-primary-950">
          <Image
            src="/hero-bg.png"
            alt="Library background"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-luminosity"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-transparent to-primary-900/80"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
            Jelajahi Literatur Klasik
          </h1>
          <p className="text-lg sm:text-xl text-primary-50 max-w-2xl mx-auto font-medium drop-shadow">
            Akses ribuan koleksi buku dari Project Gutenberg secara gratis tanpa batas.
          </p>

          <div className="pt-8">
            <div className="max-w-2xl mx-auto bg-surface/10 p-2 sm:p-3 rounded-[2.5rem] backdrop-blur-md border border-white/20">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Suspense fallback={<div className="h-14 w-full rounded-full bg-white/20 animate-pulse"></div>}>
                    <SearchBar />
                  </Suspense>
                </div>
                <div className="sm:w-48">
                  <Suspense fallback={<div className="h-14 w-full rounded-full bg-white/20 animate-pulse"></div>}>
                    <LanguageFilter />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 bg-surface px-6 py-4 rounded-3xl shadow-elevation-1 border border-primary-50">
          <h2 className="text-2xl font-bold tracking-tight text-primary-950 flex items-center">
            <span className="w-2 h-8 rounded-full bg-primary-500 mr-3"></span>
            {search ? `Hasil Pencarian: "${search}"` : 'Koleksi Terpopuler'}
            {languages && <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full ml-3">{languages.toUpperCase()}</span>}
          </h2>
          <span className="text-sm font-semibold text-gray-500 bg-surface-variant px-4 py-2 rounded-full">
            {data.count.toLocaleString()} buku tersedia
          </span>
        </div>

        {data.results.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-surface-variant/50">
            <div className="w-20 h-20 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Buku tidak ditemukan</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">Kami tidak dapat menemukan buku yang cocok dengan kriteria pencarian Anda. Coba kata kunci atau bahasa lain.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8">
              {data.results.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            <Suspense fallback={null}>
              <Pagination
                currentPage={page}
                hasNextPage={!!data.next}
                hasPreviousPage={!!data.previous}
              />
            </Suspense>
          </>
        )}
      </section>
    </div>
  );
}
