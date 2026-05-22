import BookRow from "./BookRow";

function BookList({ books = [], 
  collections, 
  istrashed,
  moveBookToTrash,
  deleteBookForever, 
  limit = null, 
  compact 

}) {
  const displayBooks = books.filter((book) => book.isTrashed === false);

  if (displayBooks.length === 0) {
    return <p>No books yet</p>;
  }

  return (
    <div>
      <BookRow 
        displayBooks={displayBooks}
        moveBookToTrash={moveBookToTrash}
        deleteBookForever={deleteBookForever}
      />
    </div>

  );
}

export default BookList;
