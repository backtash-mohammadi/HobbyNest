import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import CommentSection from './components/CommentSection.jsx';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import UseTime from "./components/BackgroundAnimation.jsx";
import { anfangsBenutzer, anfangsBeitraege, anfangsKommentare } from './data/anfangsDaten';
import {useEffect, useState} from "react";
import {ladeListe, speichereListe, STORAGE_KEYS} from "./utils/localStorage.js";
import HobbyDetails from "./components/HobbyDetails.jsx";

function App() {
    const [benutzerListe, setBenutzerListe] = useState(ladeListe(STORAGE_KEYS.BENUTZER) || anfangsBenutzer);
    const [beitraege, setBeitraege] = useState(ladeListe(STORAGE_KEYS.BEITRAEGE) || anfangsBeitraege);
    const [kommentare, setKommentare] = useState(ladeListe(STORAGE_KEYS.KOMMENTARE) || anfangsKommentare);
    // const [currentUser, setCurrentUser] = useState(null);
    const [aktuellerBenutzer, setAktuellerBenutzer] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

    useEffect(() => {
        speichereListe(STORAGE_KEYS.BENUTZER, benutzerListe);
    }, [benutzerListe]);


    useEffect(() => {
        speichereListe(STORAGE_KEYS.BEITRAEGE, beitraege);
    }, [beitraege]);

    useEffect(() => {
        speichereListe(STORAGE_KEYS.KOMMENTARE, kommentare);
    }, [kommentare]);

    useEffect(() => {
        if (aktuellerBenutzer) {
            localStorage.setItem('currentUser', JSON.stringify(aktuellerBenutzer));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [aktuellerBenutzer]);

    function handleLogin(u){
        setAktuellerBenutzer(u);
    }

    function handleLogout(){
        setAktuellerBenutzer(null);
        localStorage.removeItem('currentUser');
    }

    function handleRegistrierung(n){
        setBenutzerListe(prev=>[...prev,n]);
    }

    return (
        <>
            <div className="fixed inset-0 -z-10">
                <UseTime />
            </div>

            <Navbar />
            <Navbar benutzerListe={benutzerListe} onLogin={handleLogin} currentUser={aktuellerBenutzer} onLogout={handleLogout} onRegistrieren={handleRegistrierung}/>
            <Routes>
                <Route path="/" element={<Home benutzern={benutzerListe} beitraege={beitraege} kommentare={kommentare} benutzer={aktuellerBenutzer} />} />
                {beitraege.map(beitrag => (
                    <Route
                        key={beitrag.ueberschrift}
                        path={`/${beitrag.ueberschrift}`}
                        element={<HobbyDetails hobby={beitrag} benutzer={aktuellerBenutzer} benutzern={benutzerListe}/>}
                    />
                ))}
            </Routes>
            <Footer />
        </>
    );
}


export default App
