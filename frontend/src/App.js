import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as BookApi from "./services/BookApi";
import MainLayout from "./layout/MainLayout";
import ReaderLayout from "./layout/ReaderLayout"
import HomePage from "./pages/HomePage/HomePage";  
import BookEditPage from "./pages/BookEditPage/BookEditPage";
import BookReadPage from "./pages/BookReadPage/BookReadPage";
import "./App.css";


function App() {
  //declare variable
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

  // load data
  useEffect(() => {
    async function loadBooks() {
      const newBooks = await BookApi.getBooks();
      setBooks(newBooks);
    }

    loadBooks();
  }, []);

  //function to add a collection to collections
  const addCollection = (name) => {
    const newCollection = {
      id: collections.length + 1,
      name: name,
      createdAt: Date.now(),
      lastUsedAt: Date.now(),
    };

    setCollections((prev) => [...prev, newCollection]);
    return newCollection;
  };

  //function to add a book to books
  const addBook = async (book) => {
    await BookApi.addBook(book);
    const newBooks = await BookApi.getBooks();
    setBooks(newBooks);
  };

  //function to update a book
  const updateBook = async (book) => {
    await BookApi.updateBook(book);
    const newBooks = await BookApi.getBooks();
    setBooks(newBooks);
  };

  //function to move a book from books to deleted books
  const moveBookToTrash = async (bookId) => {
    await BookApi.moveBookToTrash(bookId);
    const newBooks= await BookApi.getBooks
    setBooks(newBooks)
  };

  //function to restore a book
  const restoreBook = async (bookId) => {
    await BookApi.restoreBook(bookId);
    const newBooks = await BookApi.getBooks();
    setBooks(newBooks);
  };

  //delete a book forever
  const deleteBookForever = async (bookId) => {
    const book = books.find(books.id===bookId)
    if (book.isTrashed === false){
      return;
    }
    await BookApi.deleteBookForever(bookId);
    const newBooks = await BookApi.getBooks();
    setBooks(newBooks);
  };

  //function to update progress of book
  const updateBookProgress = async (bookId, inputProgress) => {
    await BookApi.deleteBookForever(bookId, inputProgress);
    const newBooks = await BookApi.getBooks();
    setBooks(newBooks);
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
          <Route
            path="/books/:bookId"
            element={
              <BookReadPage
                books={books}
                updateBookProgress={updateBookProgress}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
