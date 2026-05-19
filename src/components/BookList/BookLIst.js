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
                    alignItems: "center",
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
                    width: "120px", 
                    paddingRight: "8    px",
                    textAlign: "right",
                    margin: "0 8px",
                    backgroundColor:"skyblue",
                }}
                >
                {book.wordCount} words
                </div>

                <div
                style={{
                    width: "90px", 
                    paddingLeft: "0",
                    textAlign: "left",
                    margin: "0 8px",
                    backgroundColor:"skyblue",
                }}
                >
                Read : {book.progress} %
                </div>

                <button>⋮</button>
                
                
                </div>
            ))} 
        </div>
    )
}

export default BookList;