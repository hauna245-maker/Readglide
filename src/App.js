import { useState, useEffect } from "react";
import Header from "./components/Header/Header";  
import HomePage from "./pages/HomePage";  
import Footer from "./components/Footer/Footer";
import BookEditModal from "./components/BookEdit/BookEditModal";

function App() {
  //declare variable
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState([]);
  const [collections, setCollections] = useState([
    {
      id: 0,
      name: "default",
      createdAt: Date.now(),
      lastUsedAt: Date.now(),
      pinned: false,
    },
  ]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isBookEditModalOpen, setIsBookEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("books");
    if (saved) {
      setBooks(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("books", JSON.stringify(books));
  }, [books, isLoaded]);

  //function to add a collection to collections
  const addCollection = (name) => {
    const newCollection = {
      id: collections.length + 1,
      name,
      createdAt: Date.now(),
      lastUsedAt: Date.now(),
    };

    setCollections((prev) => [...prev, newCollection]);
    return newCollection;
  };

  //function to add a book to books
  const addBook = (input) => {
    const nextId = (books[books.length - 1]?.id ?? 0) + 1;

    const newBook = {
      id: nextId,
      title: input.title,
      content: input.content,
      collection: input.collectionId,
      wordCount: input.content.split(" ").length,
      createdAt: Date.now(),
      lastReadAt: null,
      progress: 0,
      isTrashed: false,
    };

    setBooks((prev) => [...prev, newBook]);
  };

  //function to update a book
  const updateBook = (changes) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === changes.id ? changes : book)),
    );
  };

  //function to move a book from books to deleted books
  const moveBookToTrash = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, isTrashed: true } : book,
      ),
    );
  };

  const restoreBook = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, isTrashed: false } : book,
      ),
    );
  };

  //delete a book forever
  const deleteBookForever = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  //function to open BookEditModal
  const openBookEditModal = (book) => {
    setEditingBook(book);
    setIsBookEditModalOpen(true);
  };

  //function to open BookEditModal
  const closeBookEditModal = () => {
    setEditingBook(null);
    setIsBookEditModalOpen(false);
  };

  //actuall output
  return (
    <div
      style={{
        backgroundColor: "#e9ecec",
      }}
    >
      <Header />
      <HomePage
        books={books}
        collections={collections}
        addBook={addBook}
        updateBook={updateBook}
        moveBookToTrash={moveBookToTrash}
        restoreBook={restoreBook}
        deleteBookForever={deleteBookForever}
        addCollection={addCollection}
        isUploadModalOpen={isUploadModalOpen}
        openUploadModal={() => setIsUploadModalOpen(true)}
        closeUploadModal={() => setIsUploadModalOpen(false)}
        openBookEditModal={openBookEditModal}
      />
      <Footer />

      {isBookEditModalOpen && (
        <BookEditModal
          collections={collections}
          editingBook={editingBook}
          updateBook={updateBook}
          addCollection={addCollection}
          closeBookEditModal={closeBookEditModal}
        />
      )}
      :
    </div>
  );
}

export default App;
