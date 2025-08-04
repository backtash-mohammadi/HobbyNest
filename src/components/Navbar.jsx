import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DialogWithForm } from "./DialogWithForm.jsx";
import { Profil } from "./Profil.jsx";
import { FaUserCircle } from "react-icons/fa";

// Navbar mit Login-, Profil- und Admin-Navigation
const Navbar = ({
                    benutzerListe,
                    onLogin,
                    currentUser,
                    onLogout,
                    onRegistrieren,
                    onBearbeiten,
                    onSpeichern,
                }) => {
    // Zustand zur Steuerung des Profil-Modals
    const [profileOffen, setProfileOffen] = useState(false);
    const toggleProfileOffen = () => setProfileOffen((cur) => !cur);

    return (
        <>
            <nav className="w-full fixed top-0 left-0 bg-[var(--cl-surface0)] text-[var(--cl-text)] z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-[var(--cl-green)]">🌱 HobbyNest</h1>
                    <ul className="flex gap-6 text-sm font-medium">
                        <li>
                            <Link to="/" className="hover:text-[var(--cl-blue)]">
                                Home
                            </Link>
                        </li>
                    </ul>

                    <div className="flex items-center gap-4">
                        {/* Login/Registrierung */}
                        {!currentUser && (
                            <DialogWithForm
                                benutzerListe={benutzerListe}
                                onLogin={onLogin}
                                onRegistrieren={onRegistrieren}
                            />
                        )}

                        {/* Profil und Admin */}
                        {currentUser && (
                            <>
                                <p className="text-sm font-medium text-[var(--cl-subtext0)]">
                                    Sie sind angemeldet als {currentUser.benutzername}
                                </p>

                                {/* Profil-Icon öffnet Modal */}
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.2 }}
                                    className="text-white text-2xl"
                                    onClick={toggleProfileOffen}
                                    aria-label="Profil öffnen"
                                >
                                    <FaUserCircle />
                                </motion.button>

                                {/* Admin-Link (nur für Admin-Rolle) */}
                                {currentUser.rolle === "admin" && (
                                    <Link
                                        to="/admin/benutzer"
                                        className="bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold"
                                    >
                                        Benutzer verwalten
                                    </Link>
                                )}

                                {/* Abmelden */}
                                <button
                                    type="button"
                                    className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold"
                                    onClick={onLogout}
                                >
                                    Abmelden
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Profil-Modal */}
            {profileOffen && currentUser && (
                <Profil
                    aktuellerBenutzer={currentUser}
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
