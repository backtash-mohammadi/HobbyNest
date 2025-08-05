import { useState, useEffect } from "react";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";

const FeaturedHobby = ({ hobby, benutzern }) => {
    const [liked, setLiked] = useState(false);

    // Beim Laden Like-Status aus localStorage lesen
    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
        setLiked(likedPosts[hobby.id] || false);
    }, [hobby.id]);

    // Toggle Like + speichern
    const toggleLike = () => {
        const updated = !liked;
        setLiked(updated);
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
        likedPosts[hobby.id] = updated;
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    };

    return (
        <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md relative">
            {hobby.bild && (
                <img
                    className="object-cover w-full h-64"
                    src={hobby.bild}
                    alt={hobby.ueberschrift}
                />
            )}

            <div className="p-6">
                <span className="text-xs font-medium text-blue-600 uppercase">
                    {hobby.kategorie}
                </span>

                <Link to={`/${hobby.ueberschrift}`}>
                    <h2 className="mt-2 text-xl font-semibold text-gray-800 hover:text-gray-600 hover:underline">
                        {hobby.ueberschrift}
                    </h2>
                </Link>

                <p className="mt-2 text-sm text-gray-600">{hobby.inhalt}</p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            className="object-cover h-10 w-10 rounded-full"
                            // https://via.placeholder.com/40 löst Felher in console aus.
                            //ich nutze eine temporäre Variante, die ein Bild von assets nimmt.
                            // src={hobby.autorBild || "https://via.placeholder.com/40"}
                            src={hobby.autorBild || "src/assets/user-placeholder-icon.PNG"}


                            alt="Autor"
                        />
                        <span className="mx-2 font-semibold text-gray-700">
                            {benutzern ? benutzern.find(b => b.id === hobby.autorId).benutzername : "Unbekannt"}
                        </span>
                        <span className="text-xs text-gray-600">
                            {new Date(hobby.erstelltAm).toLocaleDateString("de-DE")}
                        </span>
                    </div>

                    <button onClick={toggleLike} className="text-red-500 text-xl cursor-pointer">
                        {liked ? <FcLike /> : "♡"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedHobby;
