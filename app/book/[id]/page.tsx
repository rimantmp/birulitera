import { getBookById } from '@/lib/api/gutendex';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default async function BookDetail({ params }: { params: Promise<{ id: string }> }) {
    let book;
    try {
        const resolvedParams = await params;
        book = await getBookById(resolvedParams.id);
    } catch (err) {
        notFound();
    }

    const coverUrl = book.formats['image/jpeg'] || '/placeholder-book.jpg';
    const authorNames = book.authors.map(a => a.name).join(', ') || 'Penulis Tidak Diketahui';

    // Find text/html format for reading
    const isReadable = Object.keys(book.formats).some(k => k.startsWith('text/html') || k.startsWith('text/plain'));

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <Link href="/" className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors bg-primary-50 px-4 py-2 rounded-full">
                &larr; <span className="ml-2">Kembali ke Beranda</span>
            </Link>

            <div className="bg-surface rounded-[2.5rem] shadow-elevation-2 border border-primary-50 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Pane - Cover */}
                    <div className="lg:w-1/3 bg-surface-variant p-8 md:p-12 flex flex-col items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-transparent"></div>
                        <div className="relative w-full max-w-sm aspect-[2/3] rounded-2xl overflow-hidden shadow-elevation-4 ring-1 ring-black/5">
                            {coverUrl !== '/placeholder-book.jpg' ? (
                                <Image
                                    src={coverUrl}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    priority
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full w-full text-primary-300 bg-primary-50">
                                    <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <span className="font-semibold">Mala Cover</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Pane - Details */}
                    <div className="lg:w-2/3 p-8 md:p-12 xl:p-16 flex flex-col">
                        <div className="flex-1 space-y-8">
                            <div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
                                    {book.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-primary-700 font-medium">{authorNames}</p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center rounded-full bg-surface-variant px-4 py-1.5 text-sm font-bold text-gray-700">
                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    {book.download_count.toLocaleString()} Unduhan
                                </span>
                                {book.languages.map(lang => (
                                    <span key={lang} className="inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-sm font-bold text-primary-700 uppercase ring-1 ring-inset ring-primary-100">
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                        </svg>
                                        {lang}
                                    </span>
                                ))}
                            </div>

                            {book.subjects.length > 0 && (
                                <div className="bg-primary-50/50 rounded-3xl p-6">
                                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Subjek & Topik Terkait</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {book.subjects.map(subject => (
                                            <span key={subject} className="inline-flex bg-white px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 shadow-sm border border-gray-100">
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100">
                            {isReadable ? (
                                <Link href={`/read/${book.id}`} className="block w-full sm:w-auto">
                                    <Button size="lg" className="w-full sm:w-auto text-lg shadow-elevation-3 hover:shadow-elevation-4 hover:-translate-y-0.5 transition-transform duration-300">
                                        <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Mulai Membaca Sekarang
                                    </Button>
                                </Link>
                            ) : (
                                <div className="flex items-start bg-red-50 p-4 rounded-2xl">
                                    <svg className="w-6 h-6 text-red-500 mr-3 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <div>
                                        <h4 className="text-red-800 font-bold mb-1">Peringatan Ketersediaan</h4>
                                        <p className="text-red-600 text-sm">Maaf, buku ini saat ini tidak memiliki format bacaan online (HTML/Plain Text) yang didukung oleh sistem kami.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
