import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection.jsx";
import DeleteButton from "./DeleteButton.jsx";
import {useState} from "react";
import {FaEdit} from "react-icons/fa";
import { motion } from "framer-motion";
import { IoIosSave } from "react-icons/io";
import { GrRevert } from "react-icons/gr";
import ImageUploader from "./ImageUploader.jsx";

// Component, der die Details des Hobby/beitrag Object anzeigt.
// Der Component wird zu einer bestimmen path in App.jsx verbunden.
const HobbyDetails = (props) => {
    const { hobbyTitle } = useParams();
    const autorFoto = props.benutzern && props.benutzern.find(benutzer => benutzer.id === props.hobby.autorId).foto;

    // useState Hooks to edit the Post, after the admin user clicks on "editPost"
    const [editBeitragId, setEditBeitragId] = useState(null);
    const [bearbeiteUeberschrift, setBearbeiteUeberschrift] = useState('');
    const [bearbeiteInhalt, setBearbeiteInhalt] = useState('');

    const [bild, setBild] = useState(null);
    const [resetImageKey, setResetImageKey] = useState(0);
    // **************** end ************************************************

    if (!props.hobby) {
        return <p className="text-red-500">Keinen Beitrag gefunden</p>;
    }

    return (
        <>
        <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl mt-4">
            {/*Benutzers- Foto und Name */}
            <div className="mt-4 flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <img className="object-cover h-10 w-10 rounded-full"
                        // https://via.placeholder.com/40 löst Felher in console aus.
                        // src={hobby.autorBild || "https://via.placeholder.com/40"}
                         src={autorFoto || "src/assets/user-placeholder-icon.PNG"}
                         alt="Autor"
                    />
                    <span className="mx-2 font-semibold text-gray-500">
                            {props.benutzern ? props.benutzern.find(b => b.id === props.hobby.autorId).benutzername : "Unbekannt"}
                        </span>
                    <span className="text-xs text-gray-400">
                            {new Date(props.hobby.erstelltAm).toLocaleDateString("de-DE")}
                        </span>
                </div>
            </div>
            <div >
                <h2 className="text-3xl font-bold mb-4 text-[var(--cl-green)]">{props.hobby.ueberschrift}</h2>
            </div>
                <div className="flex justify-end mb-4">
                {props.benutzer && props.benutzer.rolle === "admin"
                    &&
                    <>
                        <motion.button
                            whileHover={{ scale: 1.3 }}
                            className="text-sm text-blue-950 hover:text-blue-700 ml-4 flex items-center gap-1 cursor-pointer"
                            borderColor="black"
                            onClick={() => {
                                setEditBeitragId(props.hobby.id);
                                setBearbeiteUeberschrift(props.hobby.ueberschrift);
                                setBearbeiteInhalt(props.hobby.inhalt);
                            }}>
                            <FaEdit />
                            Bearbeiten
                        </motion.button>
                        <DeleteButton onClick={() => props.onBeitragLoeschen(props.hobby.id)}/>
                    </>
                }
                </div>

            <div>
                {props.hobby.bild && (
                    <img
                        className="object-cover w-full h-64 mb-4"
                        src={props.hobby.bild}
                        alt={props.hobby.ueberschrift}
                    />
                )}
            </div>
            <div>
                <p className="mb-4 text-gray-700">{props.hobby.inhalt}</p>
            </div>
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
                            ueberschrift: bearbeiteUeberschrift.trim(),
                            inhalt: bearbeiteInhalt,
                            bild: bild
                        });
                        setEditBeitragId(null);

                        setBild(null);
                        setResetImageKey(prev => prev + 1);
                    }}>
                        <input
                            className="w-full p-2 border c rounded-md resize mb-3 focus:border-green-200 focus:border-4 focus:outline-none"
                            value={bearbeiteUeberschrift}
                            onChange={e => setBearbeiteUeberschrift(e.target.value)}
                        />
                        <textarea
                            className="w-full p-2 border c rounded-md resize min-h-70 focus:border-green-200 focus:border-4 focus:outline-none"
                            value={bearbeiteInhalt}
                            onChange={e => setBearbeiteInhalt(e.target.value)}
                        />
                        <ImageUploader onImageUpload={setBild} key={resetImageKey} />
                        <div className="flex justify-start">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.3 }}
                            className="text-sm text-green-500 hover:text-green-700 ml-4 flex items-center gap-1 cursor-pointer mr-1">
                            <IoIosSave />Speichern
                        </motion.button>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.3 }}
                            className="text-sm text-orange-500 hover:text-orange-600 ml-4 flex items-center gap-1 cursor-pointer"
                            onClick={() => setEditBeitragId(null)}>
                            <GrRevert />Abbrechen
                        </motion.button>
                        </div>
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