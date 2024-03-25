import { db } from "~/server/db";

const EXAMPLE_BOOKS = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "978-1786892737",
    price: 12.99,
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    isbn: "978-0735219090",
    price: 15.6,
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "978-0735211292",
    price: 11.98,
  },
  {
    title: "Educated",
    author: "Tara Westover",
    isbn: "978-0399590504",
    price: 13.99,
  },
  {
    title: "The Four Winds",
    author: "Kristin Hannah",
    isbn: "978-1250178602",
    price: 17.39,
  },
  {
    title: "The Vanishing Half",
    author: "Brit Bennett",
    isbn: "978-0525536291",
    price: 16.2,
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    isbn: "978-1250301697",
    price: 14.29,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "978-0062315007",
    price: 10.29,
  },
  {
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    isbn: "978-0765387561",
    price: 13.99,
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    isbn: "978-1524763138",
    price: 11.89,
  },
  {
    title: "The Boy, the Mole, the Fox and the Horse",
    author: "Charlie Mackesy",
    isbn: "978-0062976581",
    price: 14.99,
  },
  {
    title: "The Guest List",
    author: "Lucy Foley",
    isbn: "978-0062868930",
    price: 12.99,
  },
];

async function main() {
  await Promise.all(
    EXAMPLE_BOOKS.map((book) =>
      db.book.upsert({
        where: { isbn: book.isbn },
        update: {},
        create: { ...book },
      }),
    ),
  );
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
