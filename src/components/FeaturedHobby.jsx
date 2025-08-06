import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import LikeButton from "./Like.jsx"; // Import LikeButton!

const FeaturedHobby = ({ hobby, benutzern, kommentare, onLikesChanged, currentUser }) => {
    // Anzahl der Kommentare
    let anzahlDerKommentare = kommentare ? kommentare.filter(k => k.beitragId === hobby.id).length : 0;

    // autorFoto wird in benutzern array gesucht.
    const autorFoto = benutzern && benutzern.find(benutzer => benutzer.id === hobby.autorId)?.foto;

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

                <p className="mt-2 text-sm text-gray-600 line-clamp-3 text-justify">{hobby.inhalt}</p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            className="object-cover h-10 w-10 rounded-full"
                            src={autorFoto || "src/assets/user-placeholder-icon.PNG"}
                            alt="Autor"
                        />
                        <span className="mx-2 font-semibold text-gray-700">
                            {benutzern ? benutzern.find(b => b.id === hobby.autorId)?.benutzername : "Unbekannt"}
                        </span>
                        <span className="text-xs text-gray-600">
                            {new Date(hobby.erstelltAm).toLocaleDateString("de-DE")}
                        </span>
                    </div>
                    <span
                        className={`flex items-center gap-x-1 mx-2 font-semibold ${anzahlDerKommentare > 4 ? 'text-yellow-600' : 'text-blue-950'}`}>
                        <FaComments />
                        {anzahlDerKommentare}
                    </span>
                    <LikeButton
                        postId={hobby.id}
                        currentUser={currentUser}
                        onLikesChanged={onLikesChanged}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeaturedHobby;
