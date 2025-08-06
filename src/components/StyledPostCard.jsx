// components/StyledPostCard.jsx
import { Link } from "react-router-dom";
import LikeButton from "./Like.jsx";

// Card component for displaying a single hobby/post
const StyledPostCard = ({ hobby, currentUser, onLikesChanged }) => {
    return (
        <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md relative">
            {/* Show image at the top of the card if available */}
            {hobby.bild && (
                <img
                    className="object-cover w-full h-64"
                    src={hobby.bild}
                    alt={hobby.ueberschrift}
                />
            )}

            <div className="p-6">
                {/* Category label in blue */}
                <span className="text-xs font-medium text-blue-600 uppercase">
                    {hobby.kategorie}
                </span>

                {/* Post title that links to the detail page */}
                <Link to={`/${hobby.ueberschrift}`}>
                    <h2 className="mt-2 text-xl font-semibold text-gray-800 hover:text-gray-600 hover:underline">
                        {hobby.ueberschrift}
                    </h2>
                </Link>

                {/* Post description text */}
                <p className="mt-2 text-sm text-gray-600">{hobby.inhalt}</p>

                {/* Footer with author info and like button */}
                <div className="mt-4 flex items-center justify-between">
                    {/* Author image, name, and post date */}
                    <div className="flex items-center">
                        <img
                            className="object-cover h-10 w-10 rounded-full"
                            src={hobby.autorBild || "https://via.placeholder.com/40"}
                            alt="Author"
                        />
                        <span className="mx-2 font-semibold text-gray-700">
                            {hobby.autorName || "Unbekannt"}
                        </span>
                        <span className="text-xs text-gray-600">
                            {new Date(hobby.erstelltAm).toLocaleDateString("de-DE")}
                        </span>
                    </div>

                    {/* Like button with counter, only shown if user is logged in */}
                    {currentUser && (
                        <LikeButton postId={hobby.id} currentUser={currentUser} />
                    )}
                </div>
            </div>
        </div>

    );

};

export default StyledPostCard;
