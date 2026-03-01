'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';

export default function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [query, setQuery] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            const currentSearch = searchParams.get('search') || '';
            if (query !== currentSearch) {
                startTransition(() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (query) {
                        params.set('search', query);
                        params.set('page', '1'); // Reset to page 1 on new search
                    } else {
                        params.delete('search');
                    }
                    router.replace(`${pathname}?${params.toString()}`);
                });
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [query, pathname, router, searchParams]);

    return (
        <div className="relative mx-auto w-full max-w-2xl">
            <div className="relative flex items-center shadow-elevation-1 focus-within:shadow-elevation-2 transition-shadow duration-300 rounded-full bg-surface">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
                    <svg className="h-6 w-6 text-primary-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full rounded-full border-0 py-4 pl-14 pr-14 text-gray-900 bg-transparent placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="Cari judul buku, penulis, atau topik..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {isPending && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
