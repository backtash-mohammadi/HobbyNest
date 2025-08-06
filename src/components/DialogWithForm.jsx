import React, { useState } from "react";
import bcrypt from "bcryptjs";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import RoleToggle from "./RoleToggle.jsx";
import { Registrierung } from "./Registrierung.jsx";

// Dialog-Komponente mit Login- und Registrierungs-Logik
export function DialogWithForm({ benutzerListe, onLogin, onRegistrieren }) {
    // Zustände für Login-Dialog
    const [offen, setOffen] = useState(false);
    const toggleOffen = () => setOffen(cur => !cur);
    // Zustände für Registrierungs-Dialog
    const [regOffen, setRegOffen] = useState(false);
    const toggleRegOffen = () => setRegOffen(cur => !cur);
    // Zustände für Login-Form
    const [bn, setBn] = useState("");
    const [pw, setPw] = useState("");
    const [fehler, setFehler] = useState("");

    // Login-Handler
    const handleAnmeldung = (e) => {
        e.preventDefault();
        const benutzer = benutzerListe.find(u => u.benutzername === bn);
        if (!benutzer) {
            setFehler("Benutzer nicht gefunden.");
            return;
        }
        if (!bcrypt.compareSync(pw, benutzer.passwortHash)) {
            setFehler("Ungültiges Passwort.");
            return;
        }
        onLogin(benutzer);
        toggleOffen();
    };

    return (
        <>
            {/* Login-Button */}
            <motion.button
                type="button"
                whileHover={{ scale: 1.2 }}
                className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold cursor-pointer"
                onClick={toggleOffen}
            >
                <FaUser />
            </motion.button>

            {/* Login-Dialog */}
            {offen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <Card className="relative w-full max-w-[24rem] bg-[var(--cl-base)]">
                        <button
                            aria-label="Schließen"
                            onClick={toggleOffen}
                            className="absolute top-4 right-5 text-[var(--cl-text-dark)] text-xl font-bold cursor-pointer"
                        >
                            ✕
                        </button>
                        <CardBody className="flex flex-col gap-4 pt-6 px-6">
                            <Typography className="text-2xl black font-medium">
                                Einloggen
                            </Typography>
                            <Typography variant="paragraph" color="gray" className="text-xl mb-3 font-normal">
                                Gib deinen Benutzernamen und dein Passwort ein.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <form onSubmit={handleAnmeldung} className="flex flex-col ">
                                <label className="">
                                    <span className="text-red-500">*Pflichtfeld</span>
                                </label>
                                <Input
                                    value={bn}
                                    onChange={e => setBn(e.target.value)}
                                    className="h-8 text-xl mb-6 pl-3"
                                    placeholder=" Benutzername"
                                    size="lg"
                                />
                                <label className="block ">
                                    <span className="text-red-500">*Pflichtfeld</span>
                                </label>
                                <Input
                                    type="password"
                                    value={pw}
                                    onChange={e => setPw(e.target.value)}
                                    className="h-8 text-xl mb-10 pl-3"
                                    placeholder=" Passwort"
                                    size="lg"

                                />
                                {fehler && <Typography variant="small" color="red">{fehler}</Typography>}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold cursor-pointer text-xl"
                                >
                                    Einloggen
                                </motion.button>
                                {/*<RoleToggle />*/}
                            </form>
                            <div className="mt-4 text-center">
                                <p>Noch kein Konto?</p>
                                <button
                                    className="text-blue-500 font-bold cursor-pointer text-xl"
                                    onClick={() => { toggleRegOffen(); }}
                                >
                                    Registrieren
                                </button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {/* Registrierungs-Dialog */}
            {regOffen && (
                <Registrierung
                    benutzerListe={benutzerListe}
                    onRegistrieren={onRegistrieren}
                    onClose={toggleRegOffen}
                />
            )}
        </>
    );
}