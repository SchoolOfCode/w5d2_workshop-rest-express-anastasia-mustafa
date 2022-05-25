import { query } from '../index.js';

const sqlString = `CREATE TABLE IF NOT EXISTS books (book_id INT GENERATED ALWAYS AS IDENTITY, author_id INT, title TEXT);`;
     //add publish dates
async function createBooksTable() {
    const res = await query(sqlString);
    console.log('created books table');
}

createBooksTable();