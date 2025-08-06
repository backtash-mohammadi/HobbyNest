import FeaturedHobby from "./FeaturedHobby.jsx";
import React, {useState} from "react";
import CategoryNavBar from "./CategoryNavBar.jsx";
import Pagination from "./Pagination.jsx";

export default function CategoryPage({beitraege, kategorie, benutzern, kommentare}){
    // console.log("vor: ", beitraege)
    // console.log("test k ", beitraege.filter(b => b.kategorie === "outdoor"));
    const capitalized = String(kategorie).charAt(0).toUpperCase() + String(kategorie).slice(1);
    // Pagination-State
    const [aktuelleSeite, setAktuelleSeite] = useState(1);
    const eintraegeProSeite = 9;
    // Filter nach ausgewählter Kategorie
    const gefilterteBeitraege = beitraege.filter(
        (b) => b.kategorie === kategorie
    ).sort((a, b) => new Date(b.erstelltAm) - new Date(a.erstelltAm));

    // Berechnung Gesamtseiten
    const gesamtSeiten = Math.ceil( gefilterteBeitraege.length / eintraegeProSeite) || 1;

    // Slice für die aktuelle Seite
    const indexLetzter = aktuelleSeite * eintraegeProSeite;
    const indexErster = indexLetzter - eintraegeProSeite;
    const sichtbareBeitraege = gefilterteBeitraege.slice(
        indexErster,
        indexLetzter
    );

    return (
        <>
            <div>
                <CategoryNavBar/>
            </div>
            <h1 className="text-5xl font-bold mb-4 ml-4">{capitalized}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {sichtbareBeitraege.map((hobby) => (
                    <FeaturedHobby
                        key={hobby.id}
                        hobby={hobby}
                        benutzern={benutzern}
                        kommentare={kommentare}
                    />
                ))}
            </div>
            {/* Paginierung */}
            <Pagination
                aktuelleSeite={aktuelleSeite}
                gesamtSeiten={gesamtSeiten}
                onSeitewechsel={(seite) => setAktuelleSeite(seite)}
            />
        </>
    )



}