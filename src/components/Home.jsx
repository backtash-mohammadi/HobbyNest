import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import CommentSection from "./CommentSection.jsx";
import FeaturedHobby from "./FeaturedHobby.jsx";
import NewPost from "./NewPost.jsx";
import CategoryNavBar from "./CategoryNavBar.jsx";
import {Input} from "@material-tailwind/react";
import Pagination from './Pagination.jsx';
import { FcLike } from "react-icons/fc";


const Home = (props) => {
    // State for the search field (Überschrift filter)
    const [suchUeberschrift, setSuchUeberschrift] = useState("");
    // List of all users, passed as prop
    const [aktuelleSeite, setAktuelleSeite] = useState(1);
    const benutzernListe = props.benutzern;

    const eintraegeProSeite = 9;


    // --- Likes states ---
    // State: Should only liked posts be shown?
    const [showLiked, setShowLiked] = useState(false);
    // State: Array of post IDs that the current user has liked
    const [likedIds, setLikedIds] = useState([]);
    // State: Used to trigger a reload of likes after any like/unlike
    const [likesChanged, setLikesChanged] = useState(0); // Increments on like/unlike



    // Effect: Whenever user, posts, or a like changes, recalculate likedIds for the current user
    useEffect(() => {
        if (props.benutzer) {
            // Get the mapping {postId: [userIds...]} from localStorage
            const stored = JSON.parse(localStorage.getItem("likesByPost") || "{}");
            // Find all posts that current user has liked
            const liked = Object.entries(stored)
                .filter(([_, ids]) => ids.includes(props.benutzer.id))
                .map(([postId]) => postId);
            setLikedIds(liked);
        } else {
            setLikedIds([]); // Reset if user logs out
        }
    }, [props.benutzer, props.beitraege, likesChanged]); // Re-run if user, posts, or a like changes


    // --- Combine likes filter and search filter ---
    // 1. If "show only liked" is enabled, filter to only liked posts
    // 2. Apply search filter for Überschrift (title)
    // 3. Sort newest first
    const filteredPosts = (showLiked
            ? props.beitraege.filter(post => likedIds.includes(post.id))
            : props.beitraege
    )
        .filter(beitrag =>
            beitrag.ueberschrift
                .toLowerCase()
                .includes(suchUeberschrift.toLowerCase())
        )
        .sort((a, b) => new Date(b.erstelltAm) - new Date(a.erstelltAm));
    const gefilterteBeitraege = props.beitraege.sort((a, b) => new Date(b.erstelltAm) - new Date(a.erstelltAm)).filter((beitrag) =>
        beitrag.ueberschrift
            .toLowerCase()
            .includes(suchUeberschrift.toLowerCase())
    );

    const gesamtSeiten = Math.ceil(gefilterteBeitraege.length / eintraegeProSeite) || 1;

    const indexLetzter = aktuelleSeite * eintraegeProSeite;
    const indexErster = indexLetzter - eintraegeProSeite;
    const sichtbareBeitraege = filteredPosts.slice(indexErster, indexLetzter);



    console.log(filteredPosts, 'filteredPosts');
    console.log(likedIds, 'likedIds');


    return (
        // <div className="min-h-screen px-6 py-10 bg-[var(--cl-base)] text-[var(--cl-text)]">
        <div className="min-h-screen px-6 py-10 bg-[var(--cl-base)] text-[var(--cl-text)]">
            <CategoryNavBar />
            <h1 className="text-4xl font-bold mb-4 text-center">🎯 Willkommen zu HobbyNest</h1>
            <p className="text-lg mb-10 text-[var(--cl-subtext1)] text-center">
                Einfache Anleitungen für Anfänger zu unterhaltsamen und lohnenden Hobbys!
            </p>

            {/* Toggle for likes filter */}
            {props.benutzer && (
                <div className="flex items-center gap-2 mb-6 justify-center">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showLiked}
                            onChange={e => setShowLiked(e.target.checked)}
                            className="sr-only"
                        />
                        <span className="relative w-10 h-5 bg-gray-300 rounded-full transition">
                            <span
                                className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white shadow transform transition ${
                                    showLiked ? "translate-x-5 bg-red-400" : ""
                                }`}
                            ></span>
                        </span>
                        <FcLike className="ml-2 text-2xl" />
                    </label>
                </div>
            )}

            {/* Поле поиска */}
            <div className="mb-8">
                <Input
                    placeholder="Suche nach Hobby-Titel"
                    value={suchUeberschrift}
                    onChange={(e) => {
                        setSuchUeberschrift(e.target.value);
                        setAktuelleSeite(1);
                    }}
                    className="w-full text-xl pl-3 h-12"
                />
            </div>

            <div className="flex items-start gap-6 mb-12">
                {/* Post Cards */}
                <div className="grid place-items-top grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {sichtbareBeitraege.map((hobby) => (
                        <motion.div
                            key={hobby.id}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 200, damping: 40 }}
                            className="w-full"
                        >
                            <FeaturedHobby
                                key={hobby.id}
                                hobby={hobby}
                                benutzern={benutzernListe}
                                kommentare={props.kommentare}
                                onLikesChanged={() => setLikesChanged(l => l + 1)} // <-- NEW PROP
                                currentUser={props.benutzer}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
            <Pagination
                aktuelleSeite={aktuelleSeite}
                gesamtSeiten={gesamtSeiten}
                onSeitewechsel={(seite) => setAktuelleSeite(seite)}
            />
            {/* Ich habe die CommentSection Component innerhalb dem HobbyDetails component versetzt.  */}
            {/*Auf Wunsch, kann man auch die ganze Liste der Kommentare hier in Home page sichtbar lassen.*/}
            {/*<CommentSection />*/}


            {/*    New Post section. This section acn be moved elsewhere, if needed.*/}
            {/*<NewPost author={props.benutzer} onBeitragHinzufuegen={props.onBeitragHinzufuegen}/>*/}
        </div>
    );
};

export default Home;
