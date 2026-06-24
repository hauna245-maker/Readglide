import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ReaderLayout from "./layout/ReaderLayout"
import HomePage from "./pages/HomePage/HomePage";  
import BookEditPage from "./pages/BookEditPage/BookEditPage";
import BookReadPage from "./pages/BookReadPage/BookReadPage";
import "./App.css";


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
    changes.wordCount=changes.content.split(" ").length;

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

  //function to restore a book
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

  //actuall output
  return (
    <div className="App">
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
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
              />
            }
          />

          <Route
            path="/books/:bookId/edit"
            element={
              <BookEditPage
                books={books}
                collections={collections}
                updateBook={updateBook}
                addCollection={addCollection}
              />
            }
          />
        </Route>
            
        <Route element={<ReaderLayout />}>
          <Route path="/books/:bookId" element={
              <BookReadPage
                books={books} 
              />
            } 
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
