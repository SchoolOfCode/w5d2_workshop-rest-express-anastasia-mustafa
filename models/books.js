import { books, authors } from "../libs/data.js";
import { query } from "../db/index.js";

export async function getBooks() {
  const books = await query ('SELECT * FROM books;');
  return books.rows;
}
//SELECT * FROM books WHERE Title = 
export async function searchBooksByTitle(searchTerm) {
  const title = await query(`SELECT * FROM books WHERE title LIKE '%'||$1||'%';`,[searchTerm]);
  // return books.filter(function (book) {
  //   return book.title.toLowerCase().includes(searchTerm.toLowerCase());
 // });
 return title.rows;
}

export async function searchBooksByAuthor(searchTerm) {
  //add author's first and last name, create authors table
  const response = await query(`SELECT * FROM books WHERE LIKE '%'||$1||'%';`,[searchTerm]);
return response.rows;
}

//   const authorNamesMatchingSearchTerm = authors.filter(function (author) {
//     const authorName = `${author.first_name} ${author.last_name}`;
//     return authorName.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   const authorIdsMatchingSearchTerm = authorNamesMatchingSearchTerm.map(
//     function (author) {
//       return author.id;
//     }
//   );

//   return books.filter(function (book) {
//     return authorIdsMatchingSearchTerm.includes(book.author_id);
//   });
// }

export async function getBookById(id) {
  const bookId = await query(`SELECT * FROM books WHERE Book_id = ($1)`,[id] )
  // const found = books.find(function (book) {
  //   return book.id === id;
  // });
  // return found;
  return bookId.rows
}

export async function createBook(book) {
  const newBook = await query(`INSERT INTO books (Title) VALUES ($1) RETURNING *`, [book])
  // books.push(book);
  // return books[books.length - 1];
  return newBook.rows;
}
//INSERT INTO users (first_name) VALUES ('Bob') RETURNING *;

export async function updateBookById(id, updates) {
  const updatedBook = await query(`UPDATE books SET title = ($1) WHERE book_id = ($2) RETURNING *;`,[updates, id])
  // const foundIndex = books.findIndex(function (book) {
  //   return book.id === id;
  // });
  // books[foundIndex] = updates;
  // return books[foundIndex];
  return updatedBook.rows;
}

export async function deleteBookById(id) {
  const deletedBook = await query (`DELETE FROM books WHERE book_id = $1 RETURNING *`, [id])
  // const foundIndex = books.findIndex(function (book) {
  //   return book.id === id;
  // });
  // const item = books[foundIndex];
  // books.splice(foundIndex, 1);
  // return item;
return deletedBook.rows;
}
//DELETE FROM users WHERE user_id = 4 RETURNING *;
