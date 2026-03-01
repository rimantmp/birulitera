Gutendex
Gutendex is a simple, self-hosted web API for serving book catalog information from Project Gutenberg, an online library of free ebooks.

Try it at gutendex.com.

Why?
Project Gutenberg can be a useful source of literature, but its large size makes it difficult to access and analyse it on a large scale. Thus, an API of its catalog information is useful for automating these tasks.

How does it work?
Gutendex uses Django to download catalog data and serve it in a simple JSON REST API.

Project Gutenberg has no such public API of its own, but it publishes nightly archives of complicated XML files. Gutendex downloads these files, stores their data in a database, and publishes the data in a simpler format.
