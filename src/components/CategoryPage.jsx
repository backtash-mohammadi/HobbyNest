import FeaturedHobby from "./FeaturedHobby.jsx";
import React from "react";
import CategoryNavBar from "./CategoryNavBar.jsx";

export default function CategoryPage({beitraege, kategorie, benutzern}){
    // console.log("vor: ", beitraege)
    // console.log("test k ", beitraege.filter(b => b.kategorie === "outdoor"));

    return (
        <>
            <div>
                <CategoryNavBar/>
            </div>
            <h1 className="text-4xl font-bold mb-4">Kategorie: {kategorie}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {beitraege
                    .filter(b => b.kategorie === kategorie)
                    .map(hobby => (
                        <FeaturedHobby key={hobby.id} hobby={hobby} benutzern={benutzern}/>
                    ))}
            </div>

        </>
    )



}