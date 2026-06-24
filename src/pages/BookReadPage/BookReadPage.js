import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./BookReadPage.css";

function BookReadPage({ books }) {
  const { bookId } = useParams();
  const readingBook = books.find((book) => book.id === Number(bookId));
  const [pages, setPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const readerRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (!readingBook) return;
      if (!readerRef.current) return;
      if (!measureRef.current) return;

      const maxHeight = readerRef.current.clientHeight;

      const newPages = makePagesBySize(
        readingBook.content,
        measureRef.current,
        maxHeight,
      );

      setPages(newPages);
      setPageIndex(0);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [readingBook]);

  return (
    <div className="reading-page">
      <div
        className="left-button"
        onClick={() => {
          if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
          }
        }}
      >
        ◀
      </div>

      <div ref={readerRef} className="reader-content">
        {pages[pageIndex]}
      </div>

      <div ref={measureRef} className="reader-content measure-content" />

      <div
        className="right-button"
        onClick={() => {
          if (pageIndex < pages.length - 1) {
            setPageIndex(pageIndex + 1);
          }
        }}
      >
        ▶
      </div>
    </div>
  );
}

function makePagesBySize(content, measureElement, maxHeight) {
  const words = content.split(" ");
  const newPages = [];
  let currentPage = "";

  for (const word of words) {
    const testPage = currentPage ? currentPage + " " + word : word;

    measureElement.textContent = testPage;

    if (measureElement.scrollHeight > maxHeight) {
      newPages.push(currentPage);
      currentPage = word;
    } else {
      currentPage = testPage;
    }
  }

  if (currentPage) {
    newPages.push(currentPage);
  }

  return newPages;
}

export default BookReadPage;
