import { useState } from "react";

function TreeDotMenu({ books = [], collections }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return <button className="menuButton">⋮</button>;
}
