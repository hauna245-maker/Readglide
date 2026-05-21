import { useState, useEffect } from "react";
import Header from "./components/Header/Header";  
import HomePage from "./pages/HomePage";  
import Footer from "./components/Footer/Footer";

function App() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [collections, setCollections] = useState([
    {
      id: 0,
      name: "default",
      createdAt: Date.now(),
      lastUsedAt: Date.now(),
      pinned:false,
    },
  ]);

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

  const addBook = (input) => {
    const newBook = {
      id: books.length + 1,
      title: input.title,
      content: input.content,
      collection: input.collectionId,
      wordCount: input.content.split(" ").length,
      createdAt: Date.now(),
      lastReadAt: null,
      progress: 0,
    };

    setBooks((prev) => [...prev, newBook]);
  };

  return (
    <div
      style={{
        //backgroundColor: "#edeeee",
        backgroundColor: "#e9ecec",
      }}
    >
      <Header />

      <HomePage
        books={books}
        onUpload={addBook}
        collections={collections}
        onAddCollection={addCollection}
        isModalOpen={isModalOpen}
        onUploadClick={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
}

export default App;