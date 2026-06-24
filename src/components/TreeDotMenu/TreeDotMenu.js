import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./TreeDotMenu.css";

function TreeDotMenu({
  type,
  book,
  moveBookToTrash,
  restoreBook,
  deleteBookForever,
  openBookEditModal,
}) {
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  let options;

  if (type === "book") {
    options = [
      { label: "Delete book", onClick: () => moveBookToTrash(book.id) },
      { label: "Edit book", to: `/books/${book.id}/edit` },
      { label: "Change collection" },
    ];
  } else if (type === "deleted book") {
    options = [
      { label: "restore book", onClick: () => restoreBook(book.id) },
      {
        label: "delete book permanently",
        onClick: () => deleteBookForever(book.id),
      },
    ];
  } else if (type === "collection") {
    options = [{ label: "Rename" }, { label: "Delete" }];
  }

  const handleOnClick = (option)=> {
    option.onClick?.();
    setIsOpen(false);
  };

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
          {options.map((option) =>
            option.to ? (              
              <Link to={option.to} key={option.label} className="menu-option">
                {option.label}
              </Link>
            ) : (
              <button onClick={option.onClick} key={option.label} className="menu-option">
                {option.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default TreeDotMenu;
