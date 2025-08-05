import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DialogWithForm } from "./DialogWithForm.jsx";
import { Profil } from "./Profil.jsx";
import { Avatar } from "@material-tailwind/react";
import platzhalterBild from "../assets/platzhalter.webp";

// Navbar component: Main navigation bar at the top of the app
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
    // Toggles the user profile dialog open/close
    const toggleProfileOffen = () => setProfileOffen((cur) => !cur);

    return (
        <>
            {/* Main Navbar */}
            <nav className="w-full fixed top-0 left-0 bg-[var(--cl-surface0)] text-[var(--cl-text)] z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* Left side: Home button and Logo */}
                    <div className="flex items-center gap-4">
                        {/* Home Button - modern style, goes to homepage */}
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}>
                            <Link
                            to="/"
                            className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded-2xl font-bold shadow hover:bg-[var(--cl-green)] transition-colors duration-200"
                        >
                            Home
                        </Link>
                        </motion.div>
                        {/* App Logo/Branding */}
                        <h1 className="text-xl font-bold text-[var(--cl-green)]">🌱 HobbyNest</h1>
                    </div>

                    {/* Right side: User/Session area */}
                    <div className="flex items-center gap-4">
                        {/* Login/Register dialog for non-logged-in users */}
                        {!currentUser && (
                            <DialogWithForm
                                benutzerListe={benutzerListe}
                                onLogin={onLogin}
                                onRegistrieren={onRegistrieren}
                            />
                        )}

                        {/* User area for logged-in users */}
                        {currentUser && (
                            <>
                                {/* Display logged-in user's name */}
                                <p className="text-lg font-medium text-[var(--cl-subtext0)]">
                                    Sie sind angemeldet als {currentUser.benutzername}
                                </p>

                                {/* User Avatar/Profile button */}
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

                                {/* Admin only: Manage users button */}
                                {currentUser.rolle === "admin" && (
                                    <Link
                                        to="/admin/benutzer"
                                        className="bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold"
                                    >
                                        Benutzer verwalten
                                    </Link>
                                )}

                                {/* Logout button */}
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

            {/* User Profile dialog/popup */}
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
