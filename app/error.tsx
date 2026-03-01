'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Terjadi kesalahan!</h2>
            <p className="text-gray-500">Kami tidak dapat memuat data yang diminta saat ini.</p>
            <button
                onClick={() => reset()}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
                Coba lagi
            </button>
        </div>
    );
}
