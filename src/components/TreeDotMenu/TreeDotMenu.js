import { useState } from "react";
import "./TreeDotMenu.css";

function TreeDotMenu({
  type, 
  bookId,
  moveBookToTrash,
  restoreBook,
  deleteBookForever,
}) {
  const [isOpen, setIsOpen] = useState(false);

  let options;

  if (type === "book") {
    options = [
      {label: "Delete book", onClick: () => moveBookToTrash(bookId)},
      {label: "Change collection"},
    ];
  }
  else if (type==="deleted book"){
    options=[
      {label: "restore book", onClick: ()=>restoreBook(bookId)},
      {label: "delete book permanently", onClick:()=>deleteBookForever(bookId)},
    ]
  }
  else if (type === "collection") {
    options = [
      {label:"Rename",}, 
      {label: "Delete",}
    ];
  }  

  return (
    <div className="menuContainer">
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 99,
          }}
        />
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="menuButton">
        ⋮
      </button>

      {isOpen && (
        <div className="menuPopup">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={option.onClick}
              className="optionButton"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeDotMenu;