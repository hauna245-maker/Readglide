import BookRow from "./BookRow";

function BookList({ books = [], 
  collections, 
  isTrashed,
  moveBookToTrash,
  deleteBookForever, 
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
        moveBookToTrash={moveBookToTrash}
        deleteBookForever={deleteBookForever}
      />
    </div>

  );
}

export default BookList;
