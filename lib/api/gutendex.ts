import { BooksResponse, Book, GetBooksParams } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gutendex.com';

async function fetchWithRetry(url: string, attempt = 1): Promise<Response> {
    try {
        const res = await fetch(url, {
            // Use ISR for cached data, revalidate every hour
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(15000),
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }

        return res;
    } catch (error) {
        if (attempt < 3) {
            console.warn(`Fetch attempt ${attempt} failed, retrying...`, error);
            await new Promise((r) => setTimeout(r, attempt * 1000));
            return fetchWithRetry(url, attempt + 1);
        }
        throw error;
    }
}

export async function getBooks(params?: GetBooksParams): Promise<BooksResponse> {
    const url = new URL(`${API_BASE_URL}/books`);

    if (params) {
        if (params.page) url.searchParams.append('page', params.page.toString());
        if (params.search) url.searchParams.append('search', params.search);
        if (params.topic) url.searchParams.append('topic', params.topic);
        if (params.mime_type) url.searchParams.append('mime_type', params.mime_type);
        if (params.languages) url.searchParams.append('languages', params.languages);
    }

    const res = await fetchWithRetry(url.toString());
    return await res.json();
}

export async function getBookById(id: string | number): Promise<Book> {
    const url = `${API_BASE_URL}/books/${id}`;

    const res = await fetchWithRetry(url);
    return await res.json();
}
