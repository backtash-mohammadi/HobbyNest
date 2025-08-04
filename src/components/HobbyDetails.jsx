import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection.jsx";

// Component, der die Details des Hobby/beitrag Object anzeigt.
// Der Component wird zu einer bestimmen path in App.jsx verbunden.
const HobbyDetails = (props) => {
    const { hobbyTitle } = useParams();

    if (!props.hobby) {
        return <p className="text-red-500">Hobby not found</p>;
    }

    return (
        <>
            <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl mt-4">
                <h1 className="text-3xl font-bold mb-2 text-[var(--cl-green)]">{props.hobby.ueberschrift}</h1>
                <p className="mb-4 text-gray-700">{props.hobby.inhalt}</p>
                {/*<p className="text-sm text-gray-500">Category: {hobby.category}</p>*/}
            </div>

            {/*    Hier habe ich die Kommentare hinzugefügt, die zum Post/Hobby/Beitrag gehören*/}
            <CommentSection postId={props.hobby.id} benutzer={props.benutzer} benutzern={props.benutzern}/>
        </>
    );
};

export default HobbyDetails;