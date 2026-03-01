import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-4 z-50 w-full px-4 mb-4">
            <div className="container mx-auto max-w-7xl">
                <div className="flex h-16 items-center px-6 rounded-3xl bg-surface/90 backdrop-blur-md shadow-elevation-1 border border-primary-50">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src="/logo.png"
                            alt="BiruLitera Logo"
                            width={40}
                            height={40}
                            className="w-auto h-8 object-contain"
                            priority
                        />
                        <span className="text-xl font-bold text-primary-900 tracking-tight hidden sm:block">
                            BiruLitera
                        </span>
                    </Link>
                    <div className="flex flex-1 items-center justify-end">
                        <nav className="flex items-center space-x-2">
                            <Link href="/" className="px-4 py-2 text-sm font-semibold rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors">
                                Beranda
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
