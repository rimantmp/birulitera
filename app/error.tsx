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
        // Log lengkap ke console browser untuk analisa
        console.error('[BiruLitera Error]', {
            name: error.name,
            message: error.message,
            digest: error.digest,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
        });
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

            {/* Panel debug — hapus setelah dianalisa */}
            <pre className="mt-6 max-w-2xl w-full text-left text-xs bg-gray-100 text-gray-700 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`name: ${error.name}
message: ${error.message}
digest: ${error.digest ?? '-'}
url: ${typeof window !== 'undefined' ? window.location.href : '-'}`}
            </pre>
        </div>
    );
}
