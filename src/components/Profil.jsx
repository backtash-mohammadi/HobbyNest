import React, { useState, useRef } from "react";
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

// Komponente für Benutzerprofil mit Bearbeitungsfunktion
export function Profil({ aktuellerBenutzer, onLogout, onClose, onSpeichern }) {
    // Lokale Zustände für Bearbeitung
    const [bearbeitungsModus, setBearbeitungsModus] = useState(false);
    const [vorname, setVorname] = useState(aktuellerBenutzer.vorname);
    const [nachname, setNachname] = useState(aktuellerBenutzer.nachname);
    const [email, setEmail] = useState(aktuellerBenutzer.email);
    const [foto, setFoto] = useState(aktuellerBenutzer.foto);
    const [rolle, setRolle] = useState(aktuellerBenutzer.rolle);
    const fileInputRef = useRef(null);

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

    // Speichern-Handler
    const handleSpeichern = () => {
        const aktualisierterBenutzer = {
            ...aktuellerBenutzer,
            vorname,
            nachname,
            email,
            foto,
            rolle,
        };
        onSpeichern(aktualisierterBenutzer);
        setBearbeitungsModus(false);
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
                                    src={foto || undefined}
                                    alt="Profilfoto"
                                    size="xl"
                                    variant="circular"
                                    className="mb-4"
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
                                    className="flex items-center gap-2"
                                >
                                    <FaUpload /> Foto ändern
                                </Button>
                            </>
                        ) : (
                            <Avatar
                                src={foto || undefined}
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
                                />
                                <Input
                                    value={nachname}
                                    onChange={e => setNachname(e.target.value)}
                                    size="lg"
                                    label="Nachname"
                                />
                            </div>
                        ) : (
                            <>
                                <Typography variant="h5" className="font-medium">
                                    {vorname} {nachname}
                                </Typography>
                                <Typography variant="small" className="text-gray-500">
                                    @{aktuellerBenutzer.benutzername}
                                </Typography>
                            </>
                        )}
                    </CardHeader>

                    <CardBody className="p-6 space-y-6 ">
                        {/* E-Mail oder Eingabe */}
                        {bearbeitungsModus ? (
                            <Input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                size="lg"
                                label="E-Mail"
                            />
                        ) : (
                            <Typography variant="small" className="block">
                                <span className="font-bold">E-Mail:</span> {email}
                            </Typography>
                        )}

                        {/* Rolle oder Auswahl */}
                        {bearbeitungsModus ? (
                            <div>
                                <label className="block mb-1 font-bold">Rolle</label>
                                <select
                                    value={rolle}
                                    onChange={(e) => setRolle(e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        ) : (
                            <Typography variant="small" className="block">
                                <span className="font-bold">Rolle:</span> {rolle}
                            </Typography>
                        )}

                        <Typography variant="small" className="block">
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
                                >
                                    Abbrechen
                                </Button>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    onClick={handleSpeichern}
                                    className="flex items-center gap-2"
                                >
                                    <FaEdit /> Speichern
                                </Button>
                                {/* Schließen-Button unten */}
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={onClose}
                                >
                                    Schließen
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setBearbeitungsModus(true)}
                                    className="flex items-center gap-2"
                                >
                                    <FaEdit /> Bearbeiten
                                </Button>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    onClick={onLogout}
                                    className="flex items-center gap-2"
                                >
                                    <FaSignOutAlt /> Abmelden
                                </Button>
                                {/* Schließen-Button unten */}
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={onClose}
                                >
                                    Schließen
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
