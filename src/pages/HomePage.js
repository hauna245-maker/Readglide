import UploadButton from "../components/Upload/UploadButton";
import UploadModal from "../components/Upload/UploadModal";

function HomePage({
  books,
  onUpload,
  collections,
  onAddCollection,
  isModalOpen,
  onUploadClick,
  onClose,
}) {
  return (
    <div style={{ padding: "0 50px" }}>
      <h1>My Reading App</h1>

      <UploadButton onClick={onUploadClick} />

      {isModalOpen && (
        <UploadModal
          onClose={onClose}
          onUpload={onUpload}
          collections={collections}
          onAddCollection={onAddCollection}
        />
      )}

      <h2>Books</h2>

      {books.length === 0 ? (
        <p>No books yet</p>
      ) : (
        books.map((book) => (
          <div key={book.id}>
            {book.title} ({book.wordCount} words)
          </div>
        ))
      )}
    </div>
  );
}

export default HomePage;