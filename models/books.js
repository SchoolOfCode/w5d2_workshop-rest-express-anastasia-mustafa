import { books, authors } from "../libs/data.js";
import { query } from "../db/index.js";

export async function getBooks() {
  const response = await query ('SELECT * FROM books;');
  return response.rows;
}
//SELECT * FROM books WHERE Title = 
export async function searchBooksByTitle(searchTerm) {
  const response = await query(`SELECT * FROM books WHERE title LIKE '%'||$1||'%';`,[searchTerm]);
  // return books.filter(function (book) {
  //   return book.title.toLowerCase().includes(searchTerm.toLowerCase());
 // });
 return response.rows;
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
  const response = await query(`SELECT * FROM books WHERE Book_id = ($1)`,[id] )
  // const found = books.find(function (book) {
  //   return book.id === id;
  // });
  // return found;
  return response.rows
}

export function createBook(book) {
  books.push(book);
  return books[books.length - 1];
}

export function updateBookById(id, updates) {
  const foundIndex = books.findIndex(function (book) {
    return book.id === id;
  });
  books[foundIndex] = updates;
  return books[foundIndex];
}

export function deleteBookById(id) {
  const foundIndex = books.findIndex(function (book) {
    return book.id === id;
  });
  const item = books[foundIndex];
  books.splice(foundIndex, 1);
  return item;
}
