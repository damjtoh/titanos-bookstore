# Bookstore Inventory Management System

## Overview

This application is a simple inventory management system designed for a bookstore. It allows users to add, view, delete, and update book details such as Title, Author, ISBN, and Price.

## Live demo

The application is hosted on Vercel and can be accessed [here](https://titanos.dami.dev/).

## Getting Started

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (version v18.17.0 (LTS))

### Installation

To set up the application on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone git@github.com:damjtoh/titanos-bookstore.git
```

```bash
cd titanos-bookstore
```

2. Install the dependencies.

```bash
npm i
```

3. Set up the database:

There is two ways to set up the database:

- Using a hosted database (Recommended):

  - I've emailed the database connection string to you. First, you have to rename the `.env.example` file to `.env`. After you have to set the `DATABASE_URL` environment variable to the connection string provided.

- Using a local database:
  - You can set up a local PostgreSQL database using Docker. Run the following command to start the database and following the instructions in the terminal:

```bash
./start-database.sh
```

4. Seed the database with sample data (Optional):

```bash
npm run db-seed
```

## Project Structure

### Front-end

Next.js is biased towards a file-based routing system. And the co-location of files, making it easier to navigate the project structure.

- **`app/`**: Contains the page components for the application, including the API routes.
  - **`schemas.ts`**: Contains zod schemas and TypeScripts types for modeling and validating entities.
  - **`actions.ts`**: Contains server side code that interacts with the database.
  - **`page.tsx`**: Contains the page components for the application.
- **`components/`**: Reusable React UI components.
- **`public/`**: Static files like images and favicon.
- **`server/`** Server-side logic including database interface.
- **`lib/`**: Utility functions.
- **`tests/`**: Test related files.

### Back-end

We are taking advantage of the Next.js Server Side Rendering (SSR) capabilities to build the back-end of the application. And the newly introduced server actions to interact with the frontend. But we also included API handlers to xx the requisites of the project and also make them available to other frontend application such as mobile and desktop applications.
The data is stored in a PostgreSQL database using Prisma as the ORM. The schema could be found in the `prisma/schema.prisma` file.

## Model schemas

### Book

```typescript
type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};
```

### API Documentation

#### List Books

<details>
 <summary><code>GET</code> <code><b>/books</b></code> <code>(list books)</code></summary>

##### Query parameters

> | name   | type     | data type | description                                                                       |
> | ------ | -------- | --------- | --------------------------------------------------------------------------------- |
> | page   | optional | string    | page number                                                                       |
> | sort   | optional | (enum)    | `title-asc`, `title-desc`, `author-asc`, `author-desc`, `price-asc`, `price-desc` |
> | search | optional | string    | filter books by title, author or ISBN                                             |

##### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `200`     | `application/json` | `{total: number; results: Book[];}` |

##### Example cURL

> ```javascript
>  curl -X GET "http://localhost:3000/api/books?sort=title-asc&page=1&search=book" -H "accept: application/json"
> ```

</details>

#### Add Book

<details>
 <summary><code>POST</code> <code><b>/books</b></code> <code>(add a new book)</code></summary>

##### Request body

> | name   | type     | data type | description            |
> | ------ | -------- | --------- | ---------------------- |
> | title  | required | string    |                        |
> | author | required | string    |                        |
> | isbn   | required | string    |                        |
> | price  | required | number    | Must be greater than 0 |

##### Responses

> | http code | content-type       | response              |
> | --------- | ------------------ | --------------------- |
> | `201`     | `application/json` | `Book`                |
> | `400`     | `application/json` | `{errors: string[];}` |

##### Example cURL

> ```javascript
>  curl -X POST "http://localhost:3000/api/books" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"title\": \"string\", \"author\": \"string\", \"isbn\": \"string\", \"price\": 0 }"
> ```

</details>

#### Update Book

<details>
 <summary><code>PUT</code> <code><b>books/:id</b></code> <code>(update a book)</code></summary>

##### Query parameters

> | name | type     | data type | description |
> | ---- | -------- | --------- | ----------- |
> | id   | required | number    |             |

##### Request body

> | name   | type     | data type | description            |
> | ------ | -------- | --------- | ---------------------- |
> | title  | optional | string    |                        |
> | author | optional | string    |                        |
> | isbn   | optional | string    |                        |
> | price  | optional | number    | Must be greater than 0 |

##### Responses

> | http code | content-type       | response              |
> | --------- | ------------------ | --------------------- |
> | `200`     | `application/json` | `Book`                |
> | `400`     | `application/json` | `{errors: string[];}` |

##### Example cURL

> ```javascript
>  curl -X PUT "http://localhost:3000/api/books/1" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"title\": \"string\", \"author\": \"string\", \"isbn\": \"string\", \"price\": 0 }"
> ```

</details>

#### Delete Book

<details>
 <summary><code>DELETE</code> <code><b>books/:id</b></code> <code>(delete a book)</code></summary>

##### Query parameters

> | name | type     | data type | description |
> | ---- | -------- | --------- | ----------- |
> | id   | required | number    |             |

##### Responses

> | http code | content-type       | response       |
> | --------- | ------------------ | -------------- |
> | `204`     | `application/json` | `{id: number}` |

##### Example cURL

> ```javascript
>  curl -X DELETE "http://localhost:3000/api/books/1" -H "accept: application/json"
> ```

</details>

### Third-party Libraries

- [Next.js](https://nextjs.org): Used for server-side rendering and routing.
- [Prisma](https://prisma.io): Used as the ORM for the application.
- [Tailwind CSS](https://tailwindcss.com): Used for styling the application.
- [Vitest](https://tailwindcss.com): Used for testing the application.
- [Zod](https://zod.dev/): Used for schema generation and validation.
- [React hook Form](https://react-hook-form.com/): Used for form status management.
- [Radix UI](https://www.radix-ui.com/): Used for building accessible UI components.

## Testing

To run the integration tests, use the following command:

```bash
npm test
```

## Out of scope

- Authentication and Authorization: The application does not have any form of authentication or authorization.
- E2E Testing: The application does not have any end-to-end tests.
- 100% Test Coverage: The application does not have 100% test coverage.
