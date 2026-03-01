import { BooksResponse, Book, GetBooksParams } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gutendex.com';

export async function getBooks(params?: GetBooksParams): Promise<BooksResponse> {
    const url = new URL(`${API_BASE_URL}/books`);

    if (params) {
        if (params.page) url.searchParams.append('page', params.page.toString());
        if (params.search) url.searchParams.append('search', params.search);
        if (params.topic) url.searchParams.append('topic', params.topic);
        if (params.mime_type) url.searchParams.append('mime_type', params.mime_type);
        if (params.languages) url.searchParams.append('languages', params.languages);
    }

    try {
        const res = await fetch(url.toString(), {
            // Use ISR for cached data, revalidate every hour
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch books: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export async function getBookById(id: string | number): Promise<Book> {
    const url = `${API_BASE_URL}/books/${id}`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch book ${id}: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching book ${id}:`, error);
        throw error;
    }
}
