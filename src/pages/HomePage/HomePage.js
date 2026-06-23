import UploadButton from "../../components/Upload/UploadButton";
import UploadModal from "../../components/Upload/UploadModal";
import BookList from "../../components/Book/BookList";
import "./HomePage.css";

function HomePage({
  books,
  addBook,
  collections,
  addCollection,
  moveBookToTrash,
  restoreBook,
  deleteBookForever,
  isUploadModalOpen,
  openUploadModal,
  closeUploadModal,
  openBookEditModal,
}) {
  return (
    <div className="homepage">
      <UploadButton onClick={openUploadModal} />

      {isUploadModalOpen && (
        <UploadModal
          closeUploadModal={closeUploadModal}
          addBook={addBook}
          collections={collections}
          addCollection={addCollection}
        />
      )}

      <div className="contentBlock">
        <h2>Books</h2>
        <BookList
          books={books}
          collections={collections}
          moveBookToTrash={moveBookToTrash}
          restoreBook={restoreBook}
          deleteBookForever={deleteBookForever}
          openBookEditModal={openBookEditModal}
          isTrashed={false}
          compact={false}
        />
      </div>

      <div className="contentBlock">
        <h2>Deleted Books</h2>
        <BookList
          books={books}
          collections={collections}
          isTrashed={true}
          moveBookToTrash={moveBookToTrash}
          restoreBook={restoreBook}
          deleteBookForever={deleteBookForever}
          compact={false}
        />
      </div>
    </div>
  );
}

export default HomePage;