import { useState, useEffect } from 'react';
import { FcLike } from "react-icons/fc";

// LikeButton-Komponente erhält postId und currentUser als Props
const LikeButton = ({ postId, currentUser, onLikesChanged }) => {
    // State: Ob der aktuelle Benutzer diesen Post geliked hat
    const [liked, setLiked] = useState(false);
    // State: Wie viele Benutzer diesen Post insgesamt geliked haben
    const [likeCount, setLikeCount] = useState(0);

    // Effekt: Beim Laden prüfen, ob der aktuelle User diesen Post geliked hat
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("likesByPost") || "{}");
        const userList = stored[postId] || [];
        setLiked(currentUser ? userList.includes(currentUser.id) : false);
        setLikeCount(userList.length);
    }, [postId, currentUser?.id]);

    // Funktion zum Liken oder Entliken
    const toggleLike = () => {
        if (!currentUser) return; // Prevent like if not logged in
        const stored = JSON.parse(localStorage.getItem("likesByPost") || "{}");
        const userList = stored[postId] || [];

        let updatedList;

        if (userList.includes(currentUser.id)) {
            updatedList = userList.filter(id => id !== currentUser.id);
            setLiked(false);
        } else {
            updatedList = [...userList, currentUser.id];
            setLiked(true);
        }

        stored[postId] = updatedList;
        localStorage.setItem("likesByPost", JSON.stringify(stored));

        setLikeCount(updatedList.length);

        if (onLikesChanged) onLikesChanged();
    };

    // Show count for everyone, only allow click for logged-in users
    return (
        <button
            onClick={currentUser ? toggleLike : undefined}
            className={
                "flex items-center gap-1 text-red-500 " +
                (!currentUser ? "opacity-50 cursor-default" : "")
            }
            disabled={!currentUser}
            tabIndex={currentUser ? 0 : -1}
            aria-label="Like"
        >
            {liked && currentUser ? <FcLike /> : "♡"}
            <span>{likeCount}</span>
        </button>
    );
};

export default LikeButton;
