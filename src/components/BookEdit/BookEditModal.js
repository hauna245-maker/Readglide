import { useState } from "react";
import "./BookEditModal.css"

function BookEditModal({
  closeBookEditModal,
  editingBook,
  updateBook,
  collections,
  addCollection,
}) {
    const [changedBook, setChangedBook]= useState(editingBook);
    return (
      <div className="editModalOverlay">
        <div className="editModal">
          <button onClick={closeBookEditModal}>close</button>

          <br />
          <br />
          <br />

          <input
            type="text"
            placeholder="Title"
            value={changedBook.title}
            onChange={(e) => setChangedBook(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Content"
            value={changedBook.content}
            onChange={(e) => setChangedBook(e.target.value)}
          />
        </div>
      </div>
    );
}

export default BookEditModal;
