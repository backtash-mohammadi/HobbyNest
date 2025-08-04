import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
} from "@material-tailwind/react";
import { FaSignOutAlt, FaEdit, FaTimes } from "react-icons/fa";

// Komponente für Benutzerprofil mit Schließen-Option
export function Profil({ aktuellerBenutzer, onLogout, onBearbeiten, onClose }) {
    // Destrukturierung der Benutzerdaten
    const { benutzername, vorname, nachname, email, foto, erstelltAm, rolle } = aktuellerBenutzer;

    // Formatierung des Erstellungsdatums
    const datum = new Date(erstelltAm).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        /** Overlay wird nun intern in Profil gehandhabt **/
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative">
                {/* Schließen-Button oben rechts außerhalb der Karte für bessere Sichtbarkeit */}
                <button
                    aria-label="Profil schließen"
                    onClick={onClose}
                    className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg text-[var(--cl-text-dark)] hover:bg-gray-200"
                >
                    <FaTimes size={20} />
                </button>

                <Card className="max-w-md bg-[var(--cl-base)]">
                    {/* Kopfbereich mit Avatar und Namen */}
                    <CardHeader className="flex flex-col items-center p-6">
                        <Avatar
                            src={foto || undefined}
                            alt={benutzername}
                            size="xxl"
                            variant="circular"
                            className="mb-4"
                        />
                        <Typography variant="h5" className="font-medium">
                            {vorname} {nachname}
                        </Typography>
                        <Typography variant="small" className="text-gray-500">
                            @{benutzername}
                        </Typography>
                    </CardHeader>

                    {/* Hauptbereich mit Benutzerinformationen */}
                    <CardBody className="p-6 space-y-4">
                        <Typography variant="small" className="block">
                            <span className="font-bold">E-Mail:</span> {email}
                        </Typography>
                        <Typography variant="small" className="block">
                            <span className="font-bold">Rolle:</span> {rolle}
                        </Typography>
                        <Typography variant="small" className="block">
                            <span className="font-bold">Registriert am:</span> {datum}
                        </Typography>
                    </CardBody>

                    {/* Fußbereich mit Aktionstasten */}
                    <div className="flex justify-end gap-4 p-6">
                        {/* Bearbeiten nur für Administratoren */}
                        {rolle === "admin" && (
                            <Button
                                variant="outlined"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={onBearbeiten}
                            >
                                <FaEdit /> Bearbeiten
                            </Button>
                        )}
                        <Button
                            variant="gradient"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={onLogout}
                        >
                            <FaSignOutAlt /> Abmelden
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
