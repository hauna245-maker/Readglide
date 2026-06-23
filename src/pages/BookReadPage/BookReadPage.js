import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BookReadPage.css"

function BookReadPage({books}){
    const { bookId } = useParams();
    const readingBook = books.find((book) => book.id === Number(bookId));

    return(
        <div>

        </div>
    );

}

export default BookReadPage;