import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BookEditPage.css";

function BookEditPage({ books, updateBook, collections, addCollection }) {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const editingBook = books.find((book) => book.id === Number(bookId));
  const [changedBook, setChangedBook] = useState(null);

  useEffect(() => {
    if (editingBook) {
      setChangedBook(editingBook);
    }
  }, [editingBook]);

  if (!changedBook) {
    return <p>Book not found</p>;
  }

  return (
    <div className="BookEditPage">
      <div className="tmp">
        <input
          className="editing-input"
          value={changedBook.title}
          onChange={(e) =>
            setChangedBook({
              ...changedBook,
              title: e.target.value,
            })
          }
        />

        <textarea
          id="content-input"
          className="editing-input"
          value={changedBook.content}
          onChange={(e) =>
            setChangedBook({
              ...changedBook,
              content: e.target.value,
            })
          }
        />
      </div>

      <button
        onClick={() => {
          updateBook(changedBook);
          navigate("/");
        }}
      >
        Save
      </button>

      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default BookEditPage;
