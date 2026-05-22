import { useState } from "react";
import "./TreeDotMenu.css";

function TreeDotMenu({
  type, 
  bookId,
  moveBookToTrash,
  deleteBookForever,
}) {
  const [isOpen, setIsOpen] = useState(false);

  let options;

  if (type === "book") {
    options = [
      {
        label: "Delete book",
        onClick: () => moveBookToTrash(bookId),
      },
      {
        label: "Change collection",
      },
    ];
  }
  if (type === "collection") {
    options = [
      {
        labe:"Rename",
      }, 
      {
        label: "Delete",
      }
    ];
  }  

  return (
    <div className="menuContainer">
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