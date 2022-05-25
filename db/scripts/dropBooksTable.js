import {query} from "../index.js";

const sqlString = 'DROP TABLE IF EXISTS books;';

async function createBooksTable(){
    const res = await query(sqlString);
    console.log(res.command, "Dropped books table")
}

createBooksTable();