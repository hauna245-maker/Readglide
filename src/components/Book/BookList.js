import BookRow from "./BookRow";

function BookList({ books = [], 
  collections, 
  isTrashed,
  moveBookToTrash,
  restoreBook,
  deleteBookForever, 
  openBookEditModal,
  limit = null, 
  compact 

}) {
  const displayBooks = books.filter((book) => book.isTrashed === isTrashed);

  if (displayBooks.length === 0) {
    return <p>No books yet</p>;
  }

  return (
    <div>
      <BookRow
        displayBooks={displayBooks}
        isTrashed={isTrashed}
        moveBookToTrash={moveBookToTrash}
        restoreBook={restoreBook}
        deleteBookForever={deleteBookForever}
        openBookEditModal={openBookEditModal}
      />
    </div>
  );
}

export default BookList;
