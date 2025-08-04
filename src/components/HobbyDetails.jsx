import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection.jsx";
import DeleteButton from "./DeleteButton.jsx";
import {useState} from "react";

// Component, der die Details des Hobby/beitrag Object anzeigt.
// Der Component wird zu einer bestimmen path in App.jsx verbunden.
const HobbyDetails = (props) => {
    const { hobbyTitle } = useParams();

    // useState Hooks to edit the Post, after the admin user clicks on "editPost"
    const [editBeitragId, setEditBeitragId] = useState(null);
    const [bearbeiteUeberschrift, setBearbeiteUeberschrift] = useState('');
    const [bearbeiteInhalt, setBearbeiteInhalt] = useState('');
    // **************** end ************************************************

    if (!props.hobby) {
        return <p className="text-red-500">Hobby not found</p>;
    }

    return (
        <>
        <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl mt-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-2 text-[var(--cl-green)]">{props.hobby.ueberschrift}</h1>

                {props.benutzer && props.benutzer.rolle === "admin"
                    &&
                    <>
                    <button onClick={() => {
                    setEditBeitragId(props.hobby.id);
                    setBearbeiteUeberschrift(props.hobby.ueberschrift);
                    setBearbeiteInhalt(props.hobby.inhalt);
                    }}>
                        Bearbeiten
                    </button>
                        <DeleteButton onClick={() => props.onBeitragLoeschen(props.hobby.id)}/>
                    </>
                }
            </div>

            <p className="mb-4 text-gray-700">{props.hobby.inhalt}</p>
            {/*<p className="text-sm text-gray-500">Category: {hobby.category}</p>*/}
        </div>

            {/*    Hier habe ich die Kommentare hinzugefügt, die zum Post/Hobby/Beitrag gehören*/}
            {/* This is the edit post section. It shows on screen when the admin clicks on "Bearbeiten" Button.*/}
            {editBeitragId === props.hobby.id && props.benutzer && props.benutzer.rolle === "admin" &&
                <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl mt-4">
                    <h3 className="text-3xl font-bold mb-2 text-[var(--cl-green)]">Beitrag bearbeiten</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        props.onBeitragBearbeiten({
                            ...props.hobby,
                            ueberschrift: bearbeiteUeberschrift,
                            inhalt: bearbeiteInhalt,
                        });
                        setEditBeitragId(null);
                    }}>
                        <input
                            value={bearbeiteUeberschrift}
                            onChange={e => setBearbeiteUeberschrift(e.target.value)}
                        />
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md resize"
                            value={bearbeiteInhalt}
                            onChange={e => setBearbeiteInhalt(e.target.value)}
                        />
                        <button type="submit" className="text-sm text-cyan-300-500 hover:text-cyan-700 ml-4"
                        >Speichern</button>
                        <button type="button" className="text-sm text-violet-600-300-500 hover:text-violet-700 ml-4" onClick={() => setEditBeitragId(null)}>Abbrechen</button>
                    </form>

                </div>
            // *************************  End of the Edit Beitrag section. *************************** //
            }

        {/*    Hier habe ich die Kommentare hinzugefügt, die zum Post/Hobby/Beitrag gehören*/}
            <CommentSection postId={props.hobby.id} benutzer={props.benutzer} benutzern={props.benutzern}/>
        </>
    );
};

export default HobbyDetails;