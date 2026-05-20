import TreeDotMenu from "../TreeDotMenu/TreeDotMenu"

function BookList({ books = [], collections, limit = null, compact }) {
  const displayBooks = books;

  if (displayBooks.length === 0) {
    return <p>No books yet</p>;
  }

  return (
    <div
      style={
        {
          //border: "1px solid gray",
          //borderRadius: "6px",
          //backgroundColor: "#929292",
        }
      }
    >
      {displayBooks.map((book) => (
        <div
          key={book.id}
          style={{
            //borderBottom: "0.8px solid gray",
            border: "1px solid gray",
            padding: "6px",
            marginBottom: "-1px",
            //borderRadius: "4px",
            alignItems: "center",
            display: "flex",
            backgroundColor: "#f8f7f7",
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

          {/* Word count */}
          <div
            style={{
              width: "120px",
              paddingRight: "8px",
              textAlign: "right",
              marginRight: "40px",
              //backgroundColor: "skyblue",
            }}
          >
            {book.wordCount} words
          </div>

          {/* Reading Progress */}
          <div
            style={{
              width: "90px",
              paddingLeft: "0",
              textAlign: "left",
              marginRight: "0px",
              //backgroundColor: "skyblue",
            }}
          >
            Read : {book.progress} %
          </div>
          
          <TreeDotMenu type="book" book={book}/>
        </div>
      ))}
    </div>
  );
}

export default BookList;
