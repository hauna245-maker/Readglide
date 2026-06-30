import { Link } from "react-router-dom";
import "./Header.css";

function Header({}){
    return(
        <div className="header">
         <div className="headerContent">
            <Link to="/" className="header-logo">
            Readglide
            </Link>
         </div>
        </div> 
    );
}

export default Header;