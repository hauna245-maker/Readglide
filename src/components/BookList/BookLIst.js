function BookList({
    books = [],
    collections,
    limit=null,
    compact,
}){
    
    const displayBooks=books;

    if (displayBooks.length === 0) {
        return <p>No books yet</p>;
    }

    return(
        <div>
            {displayBooks.map((book) => (
                <div
                key={book.id}
                style={{
                    border: "1px solid gray",
                    padding: "8px",
                    marginBottom: "6px",
                    borderRadius: "4px",
                    display: "flex",
                }}
                
                >
                <input type="checkbox" />

                {/* title */}
                <div
                style={{
                    paddingLeft: "12px",
                    cursor: "pointer",
                    flexGrow: 1, 
                }}
                >
                {book.title}
                </div>

                <div
                style={{
                    width: "100px", 
                    //paddingLeft: "0",
                    textAlign: "left",
                    margin: "0 20px",
                    backgroundColor:"skyblue",
                }}
                >
                {book.wordCount} words
                </div>

                <button>⋮</button>
                
                </div>
            ))} 
        </div>
    )
}

export default BookList;