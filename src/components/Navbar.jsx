import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DialogWithForm } from "./DialogWithForm.jsx";
import { Profil } from "./Profil.jsx";
import { Avatar } from "@material-tailwind/react";
import platzhalterBild from "../assets/platzhalter.webp";


const Navbar = ({
                    benutzerListe,
                    onLogin,
                    currentUser,
                    onLogout,
                    onRegistrieren,
                    onBearbeiten,
                    onSpeichern,
                }) => {
    const [profileOffen, setProfileOffen] = useState(false);
    const toggleProfileOffen = () => setProfileOffen((cur) => !cur);

    return (
        <>
            <nav className="w-full fixed top-0 left-0 bg-[var(--cl-surface0)] text-[var(--cl-text)] z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-[var(--cl-green)]">🌱 HobbyNest</h1>
                    <ul className="flex gap-6 text-sm font-medium">
                        <li>
                            <Link to="/" className="hover:text-[var(--cl-blue)]">Home</Link>
                        </li>
                    </ul>

                    <div className="flex items-center gap-4">
                        {!currentUser && (
                            <DialogWithForm
                                benutzerListe={benutzerListe}
                                onLogin={onLogin}
                                onRegistrieren={onRegistrieren}
                            />
                        )}

                        {currentUser && (
                            <>
                                <p className="text-lg font-medium text-[var(--cl-subtext0)]">
                                    Sie sind angemeldet als {currentUser.benutzername}
                                </p>

                                {/*Avatar */}
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.2 }}
                                    onClick={toggleProfileOffen}
                                    aria-label="Profil öffnen"
                                >
                                    <Avatar
                                        src={currentUser.foto || platzhalterBild}
                                        alt={currentUser.benutzername}
                                        className="h-10 w-10 rounded-full object-cover cursor-pointer"
                                    />
                                </motion.button>

                                {currentUser.rolle === "admin" && (
                                    <Link
                                        to="/admin/benutzer"
                                        className="bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold"
                                    >
                                        Benutzer verwalten
                                    </Link>
                                )}

                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.2 }}
                                    className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold cursor-pointer"
                                    onClick={onLogout}
                                >
                                    Abmelden
                                </motion.button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {profileOffen && currentUser && (
                <Profil
                    aktuellerBenutzer={currentUser}
                    currentUser={currentUser}
                    onBearbeiten={onBearbeiten}
                    onLogout={onLogout}
                    onClose={toggleProfileOffen}
                    onSpeichern={onSpeichern}
                />
            )}
        </>
    );
};

export default Navbar;
