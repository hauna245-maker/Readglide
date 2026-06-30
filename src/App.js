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

  // load data
  useEffect(() => {
    async function loadBooks() {
      const books = await BookApi.getBooks();
      setBooks(books);
    }

    loadBooks();

    const savedCollections = localStorage.getItem("collections");
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    }

    setIsLoaded(true);
  }, []);

  // save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [books, collections, isLoaded]);

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

    /*
    const nextId = (books[books.length - 1]?.id ?? 0) + 1;
    const newBook = {
      id: nextId,
      title: input.title,
      content: input.content,
      collection: input.collectionId,
      wordCount: input.content.split(/\s+/).filter(Boolean).length,
      createdAt: Date.now(),
      lastReadAt: null,
      maxProgress: 0,
      currentProgress: 0,
      isTrashed: false,
    };
    setBooks((prev) => [...prev, newBook]);
    */
  };

  //function to update a book
  const updateBook = (book) => {
    await BookApi.updateBook(book);
    const newBooks = await BookApi.getBooks();
    setBooks(newBooks);
    
    /*
    changes.wordCount = changes.content.split(/\s+/).filter(Boolean).length;
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === changes.id ? changes : book)),
    );*/
  };

  //function to move a book from books to deleted books
  const moveBookToTrash = (bookId) => {
    await BookApi.moveBookToTrash(bookId);
    const newBooks= await BookApi.getBooks
    setBooks(newBooks)
    /*
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, isTrashed: true } : book,
      ),
    );*/
  };

  //function to restore a book
  const restoreBook = (bookId) => {
    await BookApi.restoreBook(bookId);
    const newBooks = await BookApi.getBooks();
    setBooks(newBooks);

    /*
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, isTrashed: false } : book,
      ),
    );
    */
  };

  //delete a book forever
  const deleteBookForever = (bookId) => {
    await BookApi.deleteBookForever(bookId);
    const newBooks = await BookApi.getBooks();
    setBooks(newBooks);
    
    //setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  //function to update progress of book
  const updateBookProgress = (bookId, inputProgress) => {
    await BookApi.deleteBookForever(bookId, inputProgress);
    const newBooks = await BookApi.getBooks();
    setBooks(newBooks);
    
    /*
    setBooks((prevBooks) =>
      prevBooks.map((book) =>{
          if (book.id !== bookId) return book;
          if (book.maxProgress >= inputProgress) {
            return {
              ...book,
              currentProgress: inputProgress,
              lastReadAt: Date.now(),
            };
          }

          return {
            ...book,
            maxProgress: inputProgress,
            currentProgress: inputProgress,
            lastReadAt: Date.now(),
          };
        }
      ),
    );
    */
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
