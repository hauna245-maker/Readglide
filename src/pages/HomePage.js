import UploadButton from "../components/Upload/UploadButton";
import UploadModal from "../components/Upload/UploadModal";
import BookList from "../components/Book/BookList";

function HomePage({
  books,
  onUpload,
  collections,
  onAddCollection,
  moveBookToTrash,
  deleteBookForver,
  isModalOpen,
  onUploadClick,
  onClose,
}) {
  return (
    <div
      style={{
        width: "1000px",
        minHeight: "520px",
        padding: "20px 40px",
        margin: "0 auto",
        marginTop: "0",
        //backgroundColor: "#edeeee",
      }}
    >

      <UploadButton onClick={onUploadClick}/>

      {isModalOpen && (
        <UploadModal
          onClose={onClose}
          onUpload={onUpload}
          collections={collections}
          onAddCollection={onAddCollection}
        />
      )}

      <h2>Books</h2>

      <BookList 
        books={books} 
        collections={collections}
        isTrashed={false}
        moveBookToTrash={moveBookToTrash}
        deleteBookForver={deleteBookForver}
        compact={false} 
      />

    </div>
  );
}

export default HomePage;