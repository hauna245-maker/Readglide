import { useState } from "react";

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
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="menuButton">
        ⋮
      </button>

      {isOpen&&(
        options.map((option) => (
        <button key={option}>{option}</button>
        ))
      )}
      
    </div>
  );
}

export default TreeDotMenu;