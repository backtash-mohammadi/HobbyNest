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
import { FaBackward, FaForward } from "react-icons/fa6";
import platzhalterBild from '../assets/platzhalter.webp';
import { motion } from "framer-motion";

// Komponente für den Administrator: Liste der Benutzer, Filter nach Name und Rolle, Paginierung
export function AdminBenutzerVerwaltung({ benutzerListe, currentUser, onBenutzerAktualisieren, onLoeschen}) {
    const [ausgewaehlterBenutzer, setAusgewaehlterBenutzer] = useState(null);
    const [suchName, setSuchName] = useState("");
    const [rollenFilter, setRollenFilter] = useState("alle");
    const [aktuelleSeite, setAktuelleSeite] = useState(1);
    const eintraegeProSeite = 12;

    const BewegteKarte = motion(Card);

    // Filter nach Name, Login und Rolle
    const gefilterteBenutzer = benutzerListe
        .filter((benutzer) => {
            const fullName = `${benutzer.vorname} ${benutzer.nachname}`.toLowerCase();
            const username = benutzer.benutzername.toLowerCase();
            const suche = suchName.toLowerCase();
            return fullName.includes(suche) || username.includes(suche);
        })
        .filter((benutzer) => {
            if (rollenFilter === "alle") return true;
            return benutzer.rolle === rollenFilter;
        });

    // Paginierung
    const gesamtSeiten = Math.ceil(gefilterteBenutzer.length / eintraegeProSeite) || 1;
    const indexLetzter = aktuelleSeite * eintraegeProSeite;
    const indexErster = indexLetzter - eintraegeProSeite;
    const angezeigteBenutzer = gefilterteBenutzer.slice(indexErster, indexLetzter);

    const geheZuVorheriger = () => setAktuelleSeite((prev) => Math.max(prev - 1, 1));
    const geheZuNächster = () => setAktuelleSeite((prev) => Math.min(prev + 1, gesamtSeiten));

    const handleSucheChange = (e) => {
        setSuchName(e.target.value);
        setAktuelleSeite(1);
    };

    const handleRollenChange = (e) => {
        setRollenFilter(e.target.value);
        setAktuelleSeite(1);
    };

    return (
        <div className="p-6">
            <Typography variant="h2" className="mb-10 text-center font-medium">
                Benutzerverwaltung (Admin)
            </Typography>

            {/* Nach Rolle filtern */}
            <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 h-10">
                    <span>Rolle:</span>
                    <select
                        value={rollenFilter}
                        onChange={handleRollenChange}
                        className="rounded border p-2  text-[var(--cl-text)]"
                    >
                        <option value="alle">Alle</option>
                        <option value="admin">Administratoren</option>
                        <option value="user">Nutzer</option>
                    </select>
                </label>

                {/* Suche nach Name oder Login */}
                <Input
                    placeholder="Suche nach Name oder Benutzername"
                    value={suchName}
                    onChange={handleSucheChange}
                    className="flex-1 pl-3 text-xl h-10"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
                {angezeigteBenutzer.map((benutzer) => (
                    <BewegteKarte key={benutzer.id} className="flex items-center gap-4 p-4 "
                                  whileHover={{ scale: 1.04 }}
                                  transition={{ type: "spring", stiffness: 250, damping: 40 }}
                    >
                        <Avatar
                            src={benutzer.foto || platzhalterBild}
                            alt={benutzer.benutzername}
                            size="xs"
                            variant="circular"
                        />
                        <div className="flex-1 ">
                            <Typography variant="small" className="font-bold text-base">
                                {benutzer.vorname} {benutzer.nachname}
                            </Typography>
                            <Typography variant="small" className="text-gray-500 text-base">
                                @{benutzer.benutzername} • Rolle: {benutzer.rolle}
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            size="sm"
                            className="normal-case flex items-center gap-2 cursor-pointer text-base"
                            onClick={() => setAusgewaehlterBenutzer(benutzer)}
                        >
                            <FaUserEdit /> Bearbeiten
                        </Button>
                    </BewegteKarte>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 gap-4">
                <Button
                    size="sm"
                    variant="outlined"
                    disabled={aktuelleSeite === 1}
                    onClick={geheZuVorheriger}
                    className="normal-case cursor-pointer flex items-center text-base"
                >
                    <FaBackward />{"\u00A0"}Zurück
                </Button>
                <Typography variant="small" className="text-base">
                    Seite {aktuelleSeite} von {gesamtSeiten}
                </Typography>
                <Button
                    size="sm"
                    variant="outlined"
                    disabled={aktuelleSeite === gesamtSeiten}
                    onClick={geheZuNächster}
                    className="normal-case cursor-pointer flex items-center text-base"
                >
                     Weiter{"\u00A0"}<FaForward />
                </Button>
            </div>

            {/* Profil-Dialog */}
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
                    onLoeschen={onLoeschen}
                />
            )}
        </div>
    );
}
