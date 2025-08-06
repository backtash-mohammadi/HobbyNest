import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home.jsx';
import { useNavigate } from 'react-router-dom';

import CommentSection from './components/CommentSection.jsx';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
//import UseTime from "./components/BackgroundAnimation.jsx";
import { anfangsBenutzer, anfangsBeitraege, anfangsKommentare } from './data/anfangsDaten';
import {useEffect, useState} from "react";
import {ladeListe, speichereListe, STORAGE_KEYS} from "./utils/localStorage.js";
import { Profil } from "./components/Profil.jsx";
import { AdminBenutzerVerwaltung } from "./components/AdminBenutzerVerwaltung.jsx";
import HobbyDetails from "./components/HobbyDetails.jsx";
import LikeButton from "./components/Like.jsx";
import Like from "./components/Like.jsx";
import CategoryPage from "./components/CategoryPage.jsx";
import NewPost from "./components/NewPost.jsx";

function App() {
    const [benutzerListe, setBenutzerListe] = useState(ladeListe(STORAGE_KEYS.BENUTZER) || anfangsBenutzer);
    const navigate = useNavigate();

    // const [benutzerListe] = useState(ladeListe(STORAGE_KEYS.BENUTZER) || anfangsBenutzer);
    const [beitraege, setBeitraege] = useState(ladeListe(STORAGE_KEYS.BEITRAEGE) || anfangsBeitraege);
    const [kommentare, setKommentare] = useState(ladeListe(STORAGE_KEYS.KOMMENTARE) || anfangsKommentare);
    const [currentUser, setCurrentUser] = useState(null);
    const [aktuellerBenutzer, setAktuellerBenutzer] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);
    const [wasDeleted, setWasDeleted] = useState(false);
    const [bearbeitetBeitrag, setBearbeitetBeitrag] = useState(null);


    useEffect(() => {
        speichereListe(STORAGE_KEYS.BENUTZER, benutzerListe);
    }, [benutzerListe]);


    // useEffect updated to redirect the user to the home page, after the post is removed.
    useEffect(() => {
        speichereListe(STORAGE_KEYS.BEITRAEGE, beitraege);
        if (wasDeleted) {
            setWasDeleted(false); // Reset flag
            navigate('/');        // Redirect to home
        }
        if(bearbeitetBeitrag){
            const URL = `/${bearbeitetBeitrag.ueberschrift}`;
            setBearbeitetBeitrag(null);
            navigate(URL);
        }

    }, [beitraege, wasDeleted, navigate, bearbeitetBeitrag]);

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

    const handleProfilSpeichern = (aktualisierterBenutzer) => {
        setBenutzerListe(prev =>
            prev.map(u => u.id === aktualisierterBenutzer.id ? aktualisierterBenutzer : u)
        );
        setCurrentUser(aktualisierterBenutzer);
    };

    // Delete a pos/Beitrag/hobby from the Beiträge array.
    function handleBeitragLoeschen(beitragId){
        setBeitraege(prev => prev.filter(k => k.id !== beitragId));
        setWasDeleted(true);
    }

    // Modifies the Beitrag/post that was edited in the HobbyDetails component.
    function handleBeitragBearbeiten(aktualisierterBeitrag) {
        setBeitraege(prev =>
            prev.map(b => b.id === aktualisierterBeitrag.id ? aktualisierterBeitrag : b)
        );
        setBearbeitetBeitrag(aktualisierterBeitrag);
    }

    // Add a new Post to the beiträge array.
    function handleBeitragHinzufuegen(neuerBeitrag) {
        setBeitraege(prev => [...prev, neuerBeitrag]);
        navigate(`/${encodeURIComponent(neuerBeitrag.ueberschrift)}`);
    }

    return (
        <>
            {/*<div className="fixed inset-0 -z-10">*/}
            {/*    <UseTime />*/}
            {/*</div>*/}

            <Navbar benutzerListe={benutzerListe} onLogin={handleLogin} currentUser={aktuellerBenutzer} onLogout={handleLogout} onRegistrieren={handleRegistrierung} onSpeichern={handleProfilSpeichern}/>
            <Routes>
                <Route path="/" element={<Home benutzern={benutzerListe} beitraege={beitraege} kommentare={kommentare} benutzer={aktuellerBenutzer} onBeitragHinzufuegen={handleBeitragHinzufuegen}/>} />
                {beitraege.map(beitrag => (
                    <Route
                        key={beitrag.ueberschrift}
                        path={`/${beitrag.ueberschrift}`}
                        element={<HobbyDetails hobby={beitrag} benutzer={aktuellerBenutzer} benutzern={benutzerListe} onBeitragLoeschen={handleBeitragLoeschen} onBeitragBearbeiten={handleBeitragBearbeiten}/>}
                    />
                ))}

                <Route
                    path="/admin/benutzer"
                    element={
                        aktuellerBenutzer?.rolle === "admin" ? (
                            <AdminBenutzerVerwaltung
                                benutzerListe={benutzerListe}
                                currentUser={aktuellerBenutzer}
                                onBenutzerAktualisieren={handleProfilSpeichern}
                            />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />
                <Route
                    path={'/neuerBeitrag'}
                    element={<NewPost author={aktuellerBenutzer} onBeitragHinzufuegen={handleBeitragHinzufuegen}/>}
                />
                <Route
                    path={`/sport`}
                    element={<CategoryPage beitraege={beitraege} kategorie={"sport"} benutzern={benutzerListe}/>}/>
                <Route
                    path={`/kunst`}
                    element={<CategoryPage beitraege={beitraege} kategorie={"kunst"} benutzern={benutzerListe}/>}/>
                <Route
                    path={`/outdoor`}
                    element={<CategoryPage beitraege={beitraege} kategorie={"outdoor"} benutzern={benutzerListe}/>}/>
                <Route
                    path={`/kochen`}
                    element={<CategoryPage beitraege={beitraege} kategorie={"kochen"} benutzern={benutzerListe}/>}/>
                <Route
                    path={`/musik`}
                    element={<CategoryPage beitraege={beitraege} kategorie={"musik"} benutzern={benutzerListe}/>}/>
                <Route
                    path={`/sonstiges`}
                    element={<CategoryPage beitraege={beitraege} kategorie={"sonstiges"} benutzern={benutzerListe}/>}/>

            </Routes>
            <Footer />
        </>
    );
}


export default App
