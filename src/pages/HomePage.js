import UploadButton from "../components/Upload/UploadButton";
import UploadModal from "../components/Upload/UploadModal";
import BookList from "../components/Book/BookList";
import "./HomePage.css";

function HomePage({
  books,
  onUpload,
  collections,
  onAddCollection,
  moveBookToTrash,
  restoreBook,
  deleteBookForever,
  isModalOpen,
  onUploadClick,
  onClose,
}) {
  return (
    <div className="homePage">
      <UploadButton onClick={onUploadClick} />

      {isModalOpen && (
        <UploadModal
          onClose={onClose}
          onUpload={onUpload}
          collections={collections}
          onAddCollection={onAddCollection}
        />
      )}

      <div className="contentBlock">
        <h2>Books</h2>
        <BookList
          books={books}
          collections={collections}
          isTrashed={false}
          moveBookToTrash={moveBookToTrash}
          restoreBook ={restoreBook}
          deleteBookForever={deleteBookForever}
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