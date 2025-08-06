import FeaturedHobby from "./FeaturedHobby.jsx";
import React from "react";
import CategoryNavBar from "./CategoryNavBar.jsx";

export default function CategoryPage({beitraege, kategorie, benutzern, kommentare}){
    // console.log("vor: ", beitraege)
    // console.log("test k ", beitraege.filter(b => b.kategorie === "outdoor"));
    const capitalized = String(kategorie).charAt(0).toUpperCase() + String(kategorie).slice(1);

    return (
        <>
            <div>
                <CategoryNavBar/>
            </div>
            <h1 className="text-5xl font-bold mb-4 ml-4">{capitalized}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {beitraege
                    .filter(b => b.kategorie === kategorie)
                    .sort((a, b) => new Date(b.erstelltAm) - new Date(a.erstelltAm))
                    .map(hobby => (
                        <FeaturedHobby key={hobby.id} hobby={hobby} benutzern={benutzern} kommentare={kommentare}/>
                    ))}
            </div>

        </>
    )



}