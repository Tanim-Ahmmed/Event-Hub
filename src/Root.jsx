import { Outlet } from "react-router-dom";
import Navbar from "./pages/shared/Navbar";
import Footer from "./pages/shared/Footer";


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="mx-auto pt-16 max-w-full min-h-screen">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;