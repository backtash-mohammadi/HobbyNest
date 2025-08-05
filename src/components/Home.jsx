import React from "react";
import { motion } from "framer-motion";
import CommentSection from "./CommentSection.jsx";
import FeaturedHobby from "./FeaturedHobby.jsx";
import NewPost from "./NewPost.jsx";
import CategoryNavBar from "./CategoryNavBar.jsx";

const Home = (props) => {
    // const featuredHobbies = [
    //     {
    //         id: "chess101",
    //         title: "Getting Started with Chess",
    //         short: "Learn the basics of chess — the board, the pieces, and beginner strategies.",
    //     },
    //     {
    //         id: "music101",
    //         title: "Learn to Play Music",
    //         short: "Explore musical instruments, rhythm, and melody to start your music journey.",
    //     },
    //     {
    //         id: "books101",
    //         title: "Reading for Beginners",
    //         short: "Tips on how to build a reading habit and enjoy books.",
    //     },
    //     {
    //         id: "cooking101",
    //         title: "Start Cooking at Home",
    //         short: "Learn simple recipes and kitchen tips for delicious home cooking.",
    //     },
    // ];

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
        <div className="min-h-screen px-6 py-10 bg-[var(--cl-base)] text-[var(--cl-text)]">
            <CategoryNavBar />
            <h1 className="text-4xl font-bold mb-4">🎯 Welcome to HobbyNest</h1>
            <p className="text-lg mb-10 text-[var(--cl-subtext1)]">
                Discover easy beginner guides for fun and rewarding hobbies!
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {props.beitraege.map((hobby) => (
                        <FeaturedHobby key={hobby.id} hobby={hobby} kommentare={props.kommentare}/>
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
