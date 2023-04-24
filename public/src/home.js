function getTotalBooksCount(books) {
  return books.length;
}


function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books) {
  //use reduce to count books currently checked out
  return books.reduce((count, works)=> {
    const borrowed = works.borrows[0];
    // add to count if book has not been retunred
    if (!borrowed.returned) {
       count ++;
    }
    return count
  }, 0);
}


function getMostCommonGenres(books) {
  //use reduce to count book genres
  const genreCount = books.reduce ((num, works) => {
    const genre = works.genre;
    num[genre] = num[genre] ? num[genre] +1 : 1;
    return num;
  }, {});
  //declare empty array to store sorted genres
  let sorted = [];
  //use for-in loop to loop through obj and push into array
  for (let genre in genreCount) {
    sorted.push({name: genre, count: genreCount[genre]});
  }
  //sort array in decending order based on count
  sorted.sort((a, b)=> b.count - a.count);
  //return 5 max? look up JS slice() method
  return sorted.slice(0, 5);
}


function getMostPopularBooks(books) {
  // Create an array of book objects with name and count properties
  const bookCounts = books.map(book => ({name: book.title, count: book.borrows.length}));
   // Sort the book objects by count in descending order
  const sorted = bookCounts.sort ((a, b)=> b.count - a.count);
  // use slice() to return 5 most popular
  return sorted.slice(0,5);
}


function getMostPopularAuthors(books, authors) {
 //create helper function
 function getTotalBorrows(books, authors) {
  // use reduce() books array to obj that has author's name as key and borrows as value
  let bookCount = books.reduce((num, book)=> {
    //find author obj that matches book authorId
    const author = authors.find(author => author.id === book.authorId);
    //use 'name' property to create key in author obj; if key already exists, add length of borrows array to existing value
   const authorName = `${author.name.first} ${author.name.last}`;
   num[authorName] ? num[authorName] += book.borrows.length : num[authorName] = book.borrows.length;
   return num; 
   }, {});
  return bookCount
  }
 let bookCounts = getTotalBorrows(books, authors)
 //create empty array to push author obj 
  let authorCounts = [];
  // for in loop to iterate over the keys of the bookCounts obj & create array of author counts
  for (let name in bookCounts) {
    authorCounts.push({ name: name, count: bookCounts[name] });
  }
  //sort in decending order and slice() top 5 
  const sortedAuthor = authorCounts.sort((a, b) => b.count - a.count);
  const topFive = sortedAuthor.slice(0, 5);
  //onvert obj to array of obj that have name and count properties
  return topFive.map(author => {
    return { name: author.name, count: author.count }
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
