'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export default function Pagination({ currentPage, hasNextPage, hasPreviousPage }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (!hasNextPage && !hasPreviousPage && currentPage === 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center space-x-6 py-12">
            <button
                onClick={() => router.push(createPageUrl(currentPage - 1))}
                disabled={!hasPreviousPage}
                className="flex items-center justify-center px-6 py-3 rounded-full bg-primary-50 text-primary-700 font-semibold transition-colors hover:bg-primary-100 disabled:pointer-events-none disabled:opacity-50"
            >
                &larr; <span className="ml-2 hidden sm:inline">Sebelumnya</span>
            </button>

            <span className="text-sm font-bold text-gray-500 bg-surface-variant px-4 py-2 rounded-full">
                Halaman {currentPage}
            </span>

            <button
                onClick={() => router.push(createPageUrl(currentPage + 1))}
                disabled={!hasNextPage}
                className="flex items-center justify-center px-6 py-3 rounded-full bg-primary-600 text-white font-semibold shadow-elevation-1 transition-all hover:bg-primary-700 hover:shadow-elevation-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
            >
                <span className="mr-2 hidden sm:inline">Selanjutnya</span> &rarr;
            </button>
        </div>
    );
}
