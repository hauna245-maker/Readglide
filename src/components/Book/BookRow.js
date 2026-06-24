import { Link } from "react-router-dom";
import TreeDotMenu from "../TreeDotMenu/TreeDotMenu";
import "./BookRow.css"

function BookRow({
  displayBooks=[],
  isTrashed,
  moveBookToTrash,
  restoreBook,
  deleteBookForever,
  openBookEditModal,
}){

  
  const type=(!isTrashed ? "book" : "deleted book")

  return (
    <div>
      {displayBooks.map((book) => (
        <div key={book.id} className="book-row-box">
          <input type="checkbox" />

          {/* title */}
          <div className="book-row-title">
            <Link to={`/books/${book.id}`} className="book-title">
              {book.title}
            </Link>
          </div>

          {/* Word count */}
          <div className="book-row-word-count">
            {book.wordCount} words
          </div>

          {/* Reading Progress */}
          <div className="book-row-progress">
            Read : {book.progress} %
          </div>

          <TreeDotMenu
            type={type}
            book={book}
            moveBookToTrash={moveBookToTrash}
            restoreBook={restoreBook}
            deleteBookForever={deleteBookForever}
            openBookEditModal={openBookEditModal}
          />
        </div>
      ))}
    </div>
  );
}

export default BookRow
