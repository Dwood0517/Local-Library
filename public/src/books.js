function findAuthorById(authors, id) {
  return authors.find((author)=> author.id === id);
}

function findBookById(books, id) {
  return books.find((title)=> title.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //assign 2 arrays to store books borrowed status
 const checkedOut = [];
 const returned = [];
 //use destructuring assignment
 books.forEach((works)=> {
const [recentTransaction] = works.borrows;
 recentTransaction.returned ? returned.push(works) : checkedOut.push(works);
 });
 return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  //use map() to create a new array of objects and find the corresponding account object from the provided accounts array
const borrowers= book.borrows.map((transaction)=> {
 const account = accounts.find((num)=> num.id === transaction.id);
 return {...transaction, ...account};
});
//slice 10 or fewer results 
return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
