import FeaturedHobby from "./FeaturedHobby.jsx";
import React from "react";

export default function CategoryPage({beitraege, kategorie}){
    // console.log("vor: ", beitraege)
    // console.log("test k ", beitraege.filter(b => b.kategorie === "outdoor"));

    return (
        <>

            <h1 className="text-4xl font-bold mb-4">Category: sport</h1>
            <div className="flex flex-col md:grid-cols-2 gap-6 w-full">
                {beitraege
                    .filter(b => b.kategorie === `${kategorie}`)
                    .map((hobby) => (
                    <FeaturedHobby key={hobby.id} hobby={hobby}/>
                ))}
            </div>
        </>
    )



}