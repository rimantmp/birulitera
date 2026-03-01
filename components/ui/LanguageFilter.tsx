'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const LANGUAGES = [
    { code: '', label: 'Semua Bahasa' },
    { code: 'id', label: 'Indonesia' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'es', label: 'Spanish' },
    { code: 'nl', label: 'Dutch' },
    { code: 'ru', label: 'Russian' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ja', label: 'Japanese' },
];

export default function LanguageFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentLang = searchParams.get('languages') || '';

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;

        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (newLang) {
                params.set('languages', newLang);
            } else {
                params.delete('languages');
            }

            // Reset to page 1 when filter changes
            params.set('page', '1');

            router.replace(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <div className="relative h-full flex items-center">
            <select
                value={currentLang}
                onChange={handleLanguageChange}
                disabled={isPending}
                className="block w-full h-full min-h-[56px] appearance-none rounded-full border-0 bg-transparent py-4 pl-6 pr-12 text-gray-900 shadow-elevation-1 focus-within:shadow-elevation-2 focus:ring-0 sm:text-base sm:leading-6 font-medium disabled:opacity-50 transition-shadow duration-300"
            >
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5 text-primary-500">
                {isPending ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600"></div>
                ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                )}
            </div>
        </div>
    );
}
