import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BookReadPage.css"

function BookReadPage({books}){
    const { bookId } = useParams();
    const readingBook = books.find((book) => book.id === Number(bookId));
    const [pageIndex, setPageIndex] = useState(0);

    if (!readingBook) {
    return <p>Book not found</p>;
    }

    return(
        <div className="reading-page">
            {readingBook.content}
        </div>
    );

}

export default BookReadPage;