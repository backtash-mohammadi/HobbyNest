import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import CommentSection from './components/CommentSection.jsx';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import UseTime from "./components/BackgroundAnimation.jsx";

function App() {
    return (
        <>
            <div className="fixed inset-0 -z-10">
                <UseTime />
            </div>

            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </>
    );
}


export default App
