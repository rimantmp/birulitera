export interface Person {
  birth_year: number | null;
  death_year: number | null;
  name: string;
}

export interface Format {
  [mime_type: string]: string;
}

export interface Book {
  id: number;
  title: string;
  subjects: string[];
  authors: Person[];
  summaries: string[];
  translators: Person[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Format;
  download_count: number;
}

export interface BooksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

export interface GetBooksParams {
  page?: number;
  search?: string;
  topic?: string;
  mime_type?: string;
  languages?: string;
}
