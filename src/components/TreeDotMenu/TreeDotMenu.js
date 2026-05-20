import { useState } from "react";
import "./TreeDotMenu.css";

function TreeDotMenu({type, book}) {
  const [isOpen, setIsOpen] = useState(false);

  let options;

  if (type === "book") {
    options = ["Delete", "Move"];
  }
  if (type === "collection") {
    options = ["Rename", "Delete"];
  }  

  return (
    <div className="menuContainer">
      <button onClick={() => setIsOpen(!isOpen)} className="menuButton">
        ⋮
      </button>

      {isOpen&&(
        <div className="menuPopup">
          {options.map((option) => (
          <button key={option} className="optionButton">{option}</button>
        ))}
        </div>
      )}
      
    </div>
  );
}

export default TreeDotMenu;