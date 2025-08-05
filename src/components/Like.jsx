// React Hooks importieren
import { useState, useEffect } from 'react';
// Herz-Icon für "Like"
import { FcLike } from "react-icons/fc";

// LikeButton-Komponente erhält postId und currentUser als Props
const LikeButton = ({ postId, currentUser }) => {
    // State: Ob der aktuelle Benutzer diesen Post geliked hat
    const [liked, setLiked] = useState(false);
    // State: Wie viele Benutzer diesen Post insgesamt geliked haben
    const [likeCount, setLikeCount] = useState(0);

    // Effekt: Beim Laden prüfen, ob der aktuelle User diesen Post geliked hat
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("likesByPost") || "{}");
        const userList = stored[postId] || [];
        setLiked(userList.includes(currentUser.id)); // true/false für den User
        setLikeCount(userList.length); // Anzahl aller Likes für diesen Post
    }, [postId, currentUser.id]);

    // Funktion zum Liken oder Entliken
    const toggleLike = () => {
        const stored = JSON.parse(localStorage.getItem("likesByPost") || "{}");
        const userList = stored[postId] || [];

        let updatedList;

        if (userList.includes(currentUser.id)) {
            // Wenn bereits geliked → Like entfernen
            updatedList = userList.filter(id => id !== currentUser.id);
            setLiked(false);
        } else {
            // Wenn noch nicht geliked → Like hinzufügen
            updatedList = [...userList, currentUser.id];
            setLiked(true);
        }

        // Update der Liste im localStorage
        stored[postId] = updatedList;
        localStorage.setItem("likesByPost", JSON.stringify(stored));

        // Neue Like-Anzahl setzen
        setLikeCount(updatedList.length);
    };

    // Button-Render: Herz-Symbol + Anzahl der Likes
    return (
        <button onClick={toggleLike} className="flex items-center gap-1 text-red-500">
            {liked ? <FcLike /> : "♡"}  {/* Gefüllt oder leer je nach Status */}
            <span>{likeCount}</span>   {/* Anzahl der Likes */}
        </button>
    );
};

export default LikeButton;
