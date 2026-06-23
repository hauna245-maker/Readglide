import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import "./MainLayout.css"


function MainLayout() {
  return (
    <div>
      <Header />
      <div className="mainPage">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;