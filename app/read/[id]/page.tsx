import { getBookById } from '@/lib/api/gutendex';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ReadBook({ params }: { params: Promise<{ id: string }> }) {
    let book;
    try {
        const resolvedParams = await params;
        book = await getBookById(resolvedParams.id);
    } catch (err) {
        notFound();
    }

    // Prefer HTML over plain text
    const readUrl =
        book.formats['text/html'] ||
        book.formats['text/plain'] ||
        book.formats['text/html; charset=utf-8'] ||
        book.formats['text/plain; charset=us-ascii'];

    if (!readUrl) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 px-4 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Format tidak tersedia</h2>
                <p className="text-gray-500 max-w-md mx-auto">Buku ini tidak memiliki format bacaan online yang didukung oleh sistem kami (membutuhkan teks atau HTML).</p>
                <Link href={`/book/${book.id}`} className="inline-flex items-center px-6 py-3 rounded-full bg-primary-50 text-primary-700 font-semibold hover:bg-primary-100 transition-colors mt-4">
                    Kembali ke detail buku
                </Link>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-surface-variant flex flex-col font-sans transition-colors duration-500">
            {/* Top Navigation Bar - Designed to be minimally intrusive */}
            <div className="relative z-10 flex h-16 items-center px-4 md:px-6 shadow-elevation-1 shrink-0 bg-surface/90 backdrop-blur-md border-b border-primary-50 transition-transform duration-300">
                <div className="flex items-center w-full justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/book/${book.id}`}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-variant text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-sm"
                            title="Tutup Reader & Kembali"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div className="hidden sm:block">
                            <h1 className="text-sm font-bold text-gray-900 line-clamp-1 leading-tight">{book.title}</h1>
                            <p className="text-xs text-primary-600 font-medium line-clamp-1 mt-0.5">
                                {book.authors.map(a => a.name).join(', ')}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider flex items-center">
                            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Mode Fokus
                        </div>
                    </div>
                </div>
            </div>

            {/* Reader Container */}
            <div className="flex-1 w-full relative mx-auto bg-white shadow-elevation-2 md:my-4 md:rounded-[2rem] md:max-w-4xl overflow-hidden ring-1 ring-black/5">
                {/* 
                   Due to Cross-Origin constraints from inserting external Gutenberg URLs via Iframe,
                   advanced controls like injecting custom CSS (font-size, dark mode) into the iframe body is severely restricted.
                   We construct a clean shell wrapper emphasizing Focus Mode around it.
                 */}
                <iframe
                    src={readUrl}
                    className="absolute inset-0 w-full h-full border-none bg-white p-4 md:p-8"
                    title={`Baca ${book.title}`}
                    sandbox="allow-same-origin allow-scripts"
                />
            </div>
        </div>
    );
}
