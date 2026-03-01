export default function Loading() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-sm font-medium text-gray-500 animate-pulse">Memuat konten...</p>
        </div>
    );
}
