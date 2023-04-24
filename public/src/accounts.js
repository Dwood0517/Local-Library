function findAccountById(accounts, id) {
  //loop through accounts obj and return obj with maching id
  return accounts.find((user) => user.id === id);
}

function sortAccountsByLastName(accounts) {
  //use sort() to organize accts
  accounts.sort((person1, person2) => person1.name.last < person2.name.last ? -1 : 1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
//get acct id
const acctId= account.id;
//Use reduce to count the number of times accountId appears in any book's borrows array
return books.reduce((num, book) => {
  const timesBorrowed = book.borrows.filter(borrow => borrow.id === acctId).length;
  return num + timesBorrowed;
}, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  // get acct id
  const acctId= account.id;
  //filter out all books currently checked out by acct
  const checkedOut= books.filter((works)=> {
    const recentBorrow = works.borrows[0];
    return !recentBorrow.returned && recentBorrow.id === acctId;
  });
  //map() to add author info to each checked out book obj
 const withAuthorInfo = checkedOut.map((works) => {
  const author = authors.find((author)=> author.id === works.authorId)
  return {...works, author};
 });
 return withAuthorInfo;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
