import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types';

export default function BookCard({ book }: { book: Book }) {
    const coverUrl = book.formats['image/jpeg'] || '/placeholder-book.jpg';
    const authorName = book.authors.length > 0 ? book.authors[0].name : 'Unknown Author';

    return (
        <div className="group relative flex flex-col rounded-3xl bg-surface shadow-elevation-1 transition-all duration-300 hover:shadow-elevation-3 hover:-translate-y-1 overflow-hidden border border-primary-50">
            <Link href={`/book/${book.id}`} className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                <span className="sr-only">View {book.title}</span>
            </Link>

            <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-variant p-4 flex items-center justify-center">
                {coverUrl !== '/placeholder-book.jpg' ? (
                    <Image
                        src={coverUrl}
                        alt={`Cover of ${book.title}`}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={false}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full text-primary-300 bg-primary-50">
                        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-xs font-semibold">No Cover</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 p-5 gap-1">
                <h3 className="line-clamp-2 font-bold text-gray-900 leading-snug group-hover:text-primary-700 transition-colors" title={book.title}>
                    {book.title}
                </h3>
                <p className="line-clamp-1 text-sm font-medium text-gray-500">{authorName}</p>

                <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-bold text-primary-800">
                        {book.download_count >= 1000 ? `${(book.download_count / 1000).toFixed(1)}k` : book.download_count} DL
                    </span>
                    <span className="text-sm font-bold text-primary-600 group-hover:text-primary-700">
                        Baca &rarr;
                    </span>
                </div>
            </div>
        </div>
    );
}
