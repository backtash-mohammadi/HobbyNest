import React, { useState } from "react";
import {
    Card,
    Avatar,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";
import { Profil } from "./Profil.jsx";
import { FaUserEdit } from "react-icons/fa";
import platzhalterBild from '../assets/platzhalter.webp';

// Komponente für Administrator: Liste der Benutzer, Profil öffnen, nach Name filtern und paginieren
export function AdminBenutzerVerwaltung({ benutzerListe, currentUser, onBenutzerAktualisieren }) {
    const [ausgewaehlterBenutzer, setAusgewaehlterBenutzer] = useState(null);
    const [suchName, setSuchName] = useState("");
    const [aktuelleSeite, setAktuelleSeite] = useState(1);
    const eintraegeProSeite = 12;

    // Filter auf Basis von Vorname, Nachname oder Benutzername
    const gefilterteBenutzer = benutzerListe.filter((benutzer) => {
        const fullName = `${benutzer.vorname} ${benutzer.nachname}`.toLowerCase();
        const username = benutzer.benutzername.toLowerCase();
        const suche = suchName.toLowerCase();
        return fullName.includes(suche) || username.includes(suche);
    });

    // Paginierung berechnen
    const gesamtSeiten = Math.ceil(gefilterteBenutzer.length / eintraegeProSeite) || 1;
    const indexLetzter = aktuelleSeite * eintraegeProSeite;
    const indexErster = indexLetzter - eintraegeProSeite;
    const angezeigteBenutzer = gefilterteBenutzer.slice(indexErster, indexLetzter);

    const geheZuVorheriger = () => {
        setAktuelleSeite((prev) => Math.max(prev - 1, 1));
    };

    const geheZuNächster = () => {
        setAktuelleSeite((prev) => Math.min(prev + 1, gesamtSeiten));
    };

    const handleSucheChange = (e) => {
        setSuchName(e.target.value);
        setAktuelleSeite(1);
    };

    return (
        <div className="p-6">
            <Typography variant="h2" className="mb-10 text-center font-medium">
                Benutzerverwaltung (Admin)
            </Typography>

            {/* Eingabefeld für Namenssuche */}
            <Input
                label="Suche nach Name oder Benutzername"
                value={suchName}
                onChange={handleSucheChange}
                className="mb-1"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-20">
                {angezeigteBenutzer.map((benutzer) => (
                    <Card key={benutzer.id} className="flex items-center gap-4 p-4">
                        <Avatar
                            src={benutzer.foto || platzhalterBild}
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

            {/* Paginierungssteuerung */}
            <div className="flex justify-center items-center mt-6 gap-4">
                <Button
                    size="sm"
                    variant="outlined"
                    disabled={aktuelleSeite === 1}
                    onClick={geheZuVorheriger}
                >
                    Zurück
                </Button>
                <Typography variant="small">
                    Seite {aktuelleSeite} von {gesamtSeiten}
                </Typography>
                <Button
                    size="sm"
                    variant="outlined"
                    disabled={aktuelleSeite === gesamtSeiten}
                    onClick={geheZuNächster}
                >
                    Weiter
                </Button>
            </div>

            {/* Profil-Dialog für ausgewählten Benutzer */}
            {ausgewaehlterBenutzer && (
                <Profil
                    aktuellerBenutzer={ausgewaehlterBenutzer}
                    currentUser={currentUser}
                    onClose={() => setAusgewaehlterBenutzer(null)}
                    onLogout={() => {}}
                    onSpeichern={(geänderterBenutzer) => {
                        onBenutzerAktualisieren(geänderterBenutzer);
                        setAusgewaehlterBenutzer(null);
                    }}
                />
            )}
        </div>
    );
}
