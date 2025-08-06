import React, { useState, useRef } from "react";
import bcrypt from "bcryptjs";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
    Input,
} from "@material-tailwind/react";
import { FaSignOutAlt, FaTimes, FaUpload, FaEdit } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";
import platzhalterBild from '../assets/platzhalter.webp';
import DeleteButton from "./DeleteButton.jsx";

// Komponente für Benutzerprofil mit Bearbeitungsfunktion
export function Profil({ aktuellerBenutzer, currentUser, onLogout, onClose, onSpeichern, onLoeschen }) {
    // Nur Admin darf Rolle ändern und nicht sich selbst
    const darfRolleAendern = currentUser?.rolle === "admin" && currentUser.id !== aktuellerBenutzer.id;

    // Lokale Zustände für Bearbeitung
    const [bearbeitungsModus, setBearbeitungsModus] = useState(false);
    const [vorname, setVorname] = useState(aktuellerBenutzer.vorname);
    const [nachname, setNachname] = useState(aktuellerBenutzer.nachname);
    const [email, setEmail] = useState(aktuellerBenutzer.email);
    const [foto, setFoto] = useState(aktuellerBenutzer.foto);
    const [rolle, setRolle] = useState(aktuellerBenutzer.rolle);
    const fileInputRef = useRef(null);
    // Neue Zustände für Passwortänderung
    const [aktuellesPasswort, setAktuellesPasswort] = useState("");
    const [neuesPasswort, setNeuesPasswort] = useState("");
    const [passwortBestaetigung, setPasswortBestaetigung] = useState("");
    const [passwortFehler, setPasswortFehler] = useState("");
    const darfBenutzerLoeschen = darfRolleAendern;

    // Datum formatieren
    const datum = new Date(aktuellerBenutzer.erstelltAm).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Handler Bild-Upload
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setFoto(reader.result);
        reader.readAsDataURL(file);
    };

    // Speichern Handler
    const handleSpeichern = () => {
        // Passwort ändern, wenn eingegeben
        let passwortHash = aktuellerBenutzer.passwortHash;
        if (aktuellesPasswort || neuesPasswort || passwortBestaetigung) {
            // Prüfen aktuelles Passwort
            if (!bcrypt.compareSync(aktuellesPasswort, aktuellerBenutzer.passwortHash)) {
                setPasswortFehler("Aktuelles Passwort ist falsch.");
                return;
            }
            if (neuesPasswort !== passwortBestaetigung) {
                setPasswortFehler("Neue Passwörter stimmen nicht überein.");
                return;
            }
            if (neuesPasswort.length < 8) {
                setPasswortFehler("Neues Passwort muss mindestens 8 Zeichen lang sein.");
                return;
            }
            passwortHash = bcrypt.hashSync(neuesPasswort, bcrypt.genSaltSync(10));
        }

        const aktualisierterBenutzer = {
            ...aktuellerBenutzer,
            vorname,
            nachname,
            email,
            foto,
            rolle: darfRolleAendern ? rolle : aktuellerBenutzer.rolle,
            passwortHash,
        };
        onSpeichern(aktualisierterBenutzer);
        setBearbeitungsModus(false);
        // Reset Passwortfelder
        setAktuellesPasswort("");
        setNeuesPasswort("");
        setPasswortBestaetigung("");
        setPasswortFehler("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative max-w-md w-full">

                <Card className="bg-[var(--cl-base)] overflow-hidden">
                    <CardHeader className="flex flex-col items-center p-6">
                        {/* Avatar oder Upload-Button im Bearbeitungsmodus */}
                        {bearbeitungsModus ? (
                            <>
                                <Avatar
                                    src={foto || platzhalterBild}
                                    alt="Profilfoto"
                                    size="xl"
                                    variant="circular"
                                    className="mb-4 "
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFotoChange}
                                    className="hidden"
                                />
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => fileInputRef.current.click()}
                                    className="normal-case flex items-center gap-2 cursor-pointer text-base mb-6"
                                >
                                    <FaUpload /> Foto ändern
                                </Button>
                            </>
                        ) : (
                            <Avatar
                                src={foto || platzhalterBild}
                                alt={aktuellerBenutzer.benutzername}
                                size="xxl"
                                variant="circular"
                                className="mb-4"
                            />
                        )}

                        {/* Name und Benutzername */}
                        {bearbeitungsModus ? (
                            <div className="w-full flex flex-col gap-8">
                                <Input
                                    value={vorname}
                                    onChange={e => setVorname(e.target.value)}
                                    size="lg"
                                    label="Vorname"
                                    className="text-xl pl-3"
                                />
                                <Input
                                    value={nachname}
                                    onChange={e => setNachname(e.target.value)}
                                    size="lg"
                                    label="Nachname"
                                    className="text-xl pl-3"
                                />
                            </div>
                        ) : (
                            <>
                                <Typography variant="h5" className="font-medium text-xl">
                                    {vorname} {nachname}
                                </Typography>
                                <Typography variant="small" className="text-gray-500 text-xl">
                                    @{aktuellerBenutzer.benutzername}
                                </Typography>
                            </>
                        )}
                    </CardHeader>

                    <CardBody className="p-6 space-y-8">
                        {bearbeitungsModus ? (
                            <div className="w-full flex flex-col gap-8">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="lg"
                                    label="E-Mail"
                                    className="text-xl pl-3"
                                />
                                {/* Passwortänderung nur für sich selbst */}
                                {currentUser.id === aktuellerBenutzer.id && (
                                    <>
                                        <Input
                                            type="password"
                                            value={aktuellesPasswort}
                                            onChange={(e) => setAktuellesPasswort(e.target.value)}
                                            size="lg"
                                            label="Aktuelles Passwort"
                                            className="text-xl pl-3"
                                        />
                                        <Input
                                            type="password"
                                            value={neuesPasswort}
                                            onChange={(e) => setNeuesPasswort(e.target.value)}
                                            size="lg"
                                            label="Neues Passwort"
                                            className="text-xl pl-3"
                                        />
                                        <Input
                                            type="password"
                                            value={passwortBestaetigung}
                                            onChange={(e) => setPasswortBestaetigung(e.target.value)}
                                            size="lg"
                                            label="Passwort bestätigen"
                                            className="text-xl pl-3"
                                        />
                                        {passwortFehler && (
                                            <Typography variant="small" color="red">
                                                {passwortFehler}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            </div>
                        ) : (
                            <Typography variant="small" className="block text-lg">
                                <span className="font-bold ">E-Mail:</span> {email}
                            </Typography>
                        )}

                        {/* Rolle oder Auswahl */}
                        {bearbeitungsModus && darfRolleAendern ? (
                            <div>
                                <label className="block mb-1 font-bold text-lg">Rolle</label>
                                <select
                                    value={rolle}
                                    onChange={(e) => setRolle(e.target.value)}
                                    className="w-full p-2 border rounded cursor-pointer"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        ) : (
                            <Typography variant="small" className="block text-lg">
                                <span className="font-bold">Rolle:</span> {rolle}
                            </Typography>
                        )}

                        <Typography variant="small" className="block text-lg">
                            <span className="font-bold">Registriert am:</span> {datum}
                        </Typography>
                    </CardBody>


                    {/* Aktionen: Bearbeiten/Speichern/Abbrechen/Logout */}
                    <div className="flex justify-end gap-4 p-6">
                        {bearbeitungsModus ? (
                            <>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setBearbeitungsModus(false)}
                                    className="normal-case flex items-center gap-2 cursor-pointer text-sm"

                                >
                                    <FcCancel/> Abbrechen
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={handleSpeichern}
                                    className="normal-case flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    <FaEdit /> Speichern
                                </Button>
                                {/* Schließen-Button unten */}
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={onClose}
                                    className="normal-case flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    <IoCloseSharp /> Schließen
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setBearbeitungsModus(true)}
                                    className="normal-case flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    <FaEdit /> Bearbeiten
                                </Button>
                                {darfBenutzerLoeschen ? (
                                  <Button
                                      variant="outlined"
                                      size="sm"
                                      className="normal-case flex items-center gap-2 cursor-pointer text-sm"
                                    onClick={() => {
                                      if (window.confirm(
                                        `Soll der Benutzer "${aktuellerBenutzer.benutzername}" wirklich gelöscht werden?`
                                      )) {
                                        onLoeschen(aktuellerBenutzer.id);
                                        onClose();
                                      }
                                    }}
                                  >
                                      🗑️ Löschen
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={onLogout}
                                    className="normal-case flex items-center gap-2 cursor-pointer text-sm"
                                  >
                                    <FaSignOutAlt /> Abmelden
                                  </Button>
                                )}
                                {/* Schließen-Button unten */}
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={onClose}
                                    className="normal-case flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    <IoCloseSharp /> Schließen
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
