import React from "react";
import { motion } from "framer-motion";
import CommentSection from "./CommentSection.jsx";
import FeaturedHobby from "./FeaturedHobby.jsx";
import NewPost from "./NewPost.jsx";
import CategoryNavBar from "./CategoryNavBar.jsx";

const Home = (props) => {
    const benutzernListe = props.benutzern;
    const colors = [
        "#ff0088", // pink
        "#00d1ff", // sky blue
        "#34d399", // teal
        "#facc15", // yellow
        "#f87171", // red
        "#a78bfa", // violet
        "#4ade80", // green
        "#38bdf8", // blue
        "#f472b6"  // rose
    ];

    const boxStyle = {
        width: 25,
        height: 25,
        borderRadius: 7,
        margin: "1px",
    };

    return (
        // <div className="min-h-screen px-6 py-10 bg-[var(--cl-base)] text-[var(--cl-text)]">
        <div className="min-h-screen px-6 py-10 bg-[var(--cl-base)] text-[var(--cl-text)]">
            <CategoryNavBar />
            <h1 className="text-4xl font-bold mb-4 text-center">🎯 Willkommen zu HobbyNest</h1>
            <p className="text-lg mb-10 text-[var(--cl-subtext1)] text-center">
                Einfache Anleitungen für Anfänger zu unterhaltsamen und lohnenden Hobbys!
            </p>

            <div className="flex items-start gap-6 mb-12">
                {/* Left: Animated Color Boxes */}
                <div className="flex flex-col gap-3">
                    {colors.map((color, index) => (
                        <motion.div
                            key={index}
                            style={{ ...boxStyle, backgroundColor: color }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
                        />
                    ))}
                </div>

                {/* Right: List of Featured Hobby Cards */}
                <div className="grid place-items-center grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {props.beitraege.map((hobby) => (
                        <FeaturedHobby key={hobby.id} hobby={hobby} benutzern={benutzernListe} kommentare={props.kommentare}/>
                    ))}
                </div>
            </div>
            {/* Ich habe die CommentSection Component innerhalb dem HobbyDetails component versetzt.  */}
            {/*Auf Wunsch, kann man auch die ganze Liste der Kommentare hier in Home page sichtbar lassen.*/}
            {/*<CommentSection />*/}


            {/*    New Post section. This section acn be moved elsewhere, if needed.*/}
            <NewPost author={props.benutzer} onBeitragHinzufuegen={props.onBeitragHinzufuegen}/>
        </div>
    );
};

export default Home;
