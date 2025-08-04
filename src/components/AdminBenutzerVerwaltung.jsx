import React, { useState } from "react";
import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Profil } from "./Profil.jsx";
import { FaUserEdit } from "react-icons/fa";

// Komponente für Administrator: Liste der Benutzer und Profil öffnen
export function AdminBenutzerVerwaltung({ benutzerListe, onBenutzerAktualisieren }) {
    // Zustand für ausgewählten Benutzer
    const [ausgewaehlterBenutzer, setAusgewaehlterBenutzer] = useState(null);

    return (
        <div className="p-6">
            <Typography variant="h6" className="mb-4 font-medium">
                Benutzerverwaltung (Admin)
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {benutzerListe.map((benutzer) => (
                    <Card key={benutzer.id} className="flex items-center gap-4 p-4">
                        <Avatar
                            src={benutzer.foto || undefined}
                            alt={benutzer.benutzername}
                            size="xs"
                            variant="circular"
                        />
                        <div className="flex-1">
                            <Typography variant="small" className="font-bold">
                                {benutzer.vorname} {benutzer.nachname}
                            </Typography>
                            <Typography variant="small" className="text-gray-500">
                                @{benutzer.benutzername} • Rolle: {benutzer.rolle}
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => setAusgewaehlterBenutzer(benutzer)}
                        >
                            <FaUserEdit /> Bearbeiten
                        </Button>
                    </Card>
                ))}
            </div>

            {/* Profil-Dialog für ausgewählten Benutzer */}
            {ausgewaehlterBenutzer && (
                <Profil
                    aktuellerBenutzer={ausgewaehlterBenutzer}
                    onClose={() => setAusgewaehlterBenutzer(null)}
                    onLogout={() => { /* Admin bleibt eingeloggt */ }}
                    onSpeichern={(geänderterBenutzer) => {
                        onBenutzerAktualisieren(geänderterBenutzer);
                        setAusgewaehlterBenutzer(null);
                    }}
                />
            )}
        </div>
    );
}