import React, {useRef, useState} from "react";
import bcrypt from "bcryptjs";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Checkbox, Button, Avatar,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import {FaUpload} from "react-icons/fa";

// Komponente für Benutzerregistrierung, gesteuert von übergeordnetem Dialog
export function Registrierung({ benutzerListe, onRegistrieren, onClose }) {
    // Zustände für Formulareingaben und Fehler
    const [benutzername, setBenutzername] = useState("");
    const [passwort, setPasswort] = useState("");
    const [passwortBestaetigung, setPasswortBestaetigung] = useState("");
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [email, setEmail] = useState("");
    const [foto, setFoto] = useState(""); // Base64-String des Bildes
    const [fehler, setFehler] = useState("");
    // Ref für verstecktes File-Input
    const fileInputRef = useRef(null);


    // Handler zum Einlesen der Bilddatei
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setFoto(reader.result);
        reader.readAsDataURL(file);
    };

    // Handler für Registrierung
    const handleRegistrierung = (e) => {
        e.preventDefault();

        // Pflichtfelder prüfen
        if (!benutzername || !passwort || !passwortBestaetigung) {
            setFehler("Benutzername und Passwort sind erforderlich.");
            return;
        }
        // Passwort-Regeln prüfen
        if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/.test(passwort)) {
            setFehler(
            "Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten."
        );
            return;
        }
        // Passwort-Bestätigung prüfen
        if (passwort !== passwortBestaetigung) {
            setFehler("Passwörter stimmen nicht überein.");
            return;
        }
        // Einzigartigkeit des Benutzernamens prüfen
        if (benutzerListe.some(u => u.benutzername === benutzername)) {
            setFehler("Benutzername existiert bereits. Wählen Sie einen anderen.");
            return;
        }
        // Benutzerobjekt erstellen
        const passwortHash = bcrypt.hashSync(passwort, bcrypt.genSaltSync(10));
        const neuerBenutzer = {
            id: crypto.randomUUID(),
            benutzername,
            passwortHash,
            rolle: 'user',
            vorname,
            nachname,
            email,
            foto,
            erstelltAm: new Date().toISOString(),
        };
        // Callback ausführen
        onRegistrieren(neuerBenutzer);
        // Dialog schließen
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="relative w-full max-w-[24rem] bg-[var(--cl-base)]">
                {/* Schließen-Button oben rechts */}
                <button
                    aria-label="Schließen"
                    onClick={onClose}
                    className="absolute top-4 right-5 text-[var(--cl-text-dark)] text-xl font-bold"
                >
                    ✕
                </button>

                <CardBody className="flex flex-col gap-4 pt-6 px-6">
                    <Typography variant="small" className="black font-medium">
                        Registrierung
                    </Typography>
                    <Typography variant="paragraph" color="gray" className="mb-3 font-normal">
                        Erstelle einen neuen Account.
                    </Typography>
                    {fehler && (
                        <Typography variant="small" color="red">
                            {fehler}
                        </Typography>
                    )}

                    {/* Vorschau des ausgewählten Fotos */}
                    {foto && (
                        <Avatar
                            src={foto}
                            alt="Profilfoto"
                            size="xl"
                            variant="circular"
                            className="mx-auto"
                        />
                    )}

                    <form onSubmit={handleRegistrierung} className="flex flex-col gap-4">
                        <Input
                            value={benutzername}
                            onChange={e => setBenutzername(e.target.value)}
                            placeholder="Benutzername"
                            size="lg"
                            required
                        />
                        <Input
                            type="password"
                            value={passwort}
                            onChange={e => setPasswort(e.target.value)}
                            placeholder="Passwort"
                            size="lg"
                            required
                        />
                        <Input
                            type="password"
                            value={passwortBestaetigung}
                            onChange={e => setPasswortBestaetigung(e.target.value)}
                            placeholder="Passwort bestätigen"
                            size="lg"
                            required
                        />
                        <Input
                            value={vorname}
                            onChange={e => setVorname(e.target.value)}
                            placeholder="Vorname"
                            size="lg"
                        />
                        <Input
                            value={nachname}
                            onChange={e => setNachname(e.target.value)}
                            placeholder="Nachname"
                            size="lg"
                        />
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="E-Mail"
                            size="lg"
                        />

                        {/* Verstecktes File-Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFotoChange}
                            className="hidden"
                        />
                        {/* Button zum Auslösen des File-Dialogs */}
                        <Button
                            variant="outlined"
                            size="sm"
                            onClick={() => fileInputRef.current.click()}
                            className="flex items-center gap-2"
                        >
                            <FaUpload /> Profilfoto auswählen
                        </Button>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.1 }}
                            className="bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold mt-2"
                        >
                            Registrieren
                        </motion.button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}
