import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import CommentSection from './components/CommentSection.jsx';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </>
    );
}


export default App
