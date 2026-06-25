import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./BookReadPage.css";

function BookReadPage({ books, updateBookProgress }) {
  const { bookId } = useParams();
  const readingBook = books.find((book) => book.id === Number(bookId));
  const [pages, setPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const readerRef = useRef(null);
  const measureRef = useRef(null);

  //paginate the content
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
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [readingBook]);

  //update the progress
  useEffect(()=>{
    if (!readingBook) return;
    const currentProgress=calculateProgress(pages, pageIndex, readingBook.wordCount);
    updateBookProgress(readingBook.id, currentProgress);
  }, [readingBook, pages, pageIndex, updateBookProgress])


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


function calculateProgress(pages, pageIndex, totalWordCount) {
  const readPages = pages.slice(0, pageIndex + 1);

  let readWordCount = 0;
  for (const page of readPages) {
    const count = page.trim().split(/\s+/).filter(Boolean).length;
    readWordCount = readWordCount + count;
  }

  if (totalWordCount === 0) return 0;

  return Math.round((readWordCount / totalWordCount) * 100);
}

export default BookReadPage;
