import React from 'react';

export default function Footer() {
    return (
        <footer className="mt-auto py-8">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="rounded-3xl bg-surface-variant p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-center text-sm font-medium text-gray-500 md:text-left">
                        &copy; {new Date().getFullYear()} <span className="font-bold text-primary-800">BiruLitera</span>. Focus on reading.
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                        Data provided by <a href="https://gutendex.com" target="_blank" rel="noreferrer" className="text-primary-600 hover:text-primary-800 transition-colors rounded-full px-2 py-1 hover:bg-primary-50">Gutendex API</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
}
