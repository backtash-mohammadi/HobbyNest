import React, { useEffect, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "./DeleteButton.jsx"
import DeleteButton from "./DeleteButton.jsx";
import {ladeListe, speichereListe, STORAGE_KEYS} from "../utils/localStorage.js";
import {anfangsKommentare} from "../data/anfangsDaten.js";


// Main component for displaying and submitting comments
const CommentSection = ({postId, benutzer, benutzern}) => {
    // State for the list of comments
    // const [kommentare, setKommentare] = useState([]);
    //
    // // State for the comment form input fields
    // const [form, setForm] = useState({ name: "", text: "" });
    //
    // // Load comments from localStorage when component mounts or postId changes
    // useEffect(() => {
    //     const gespeichert = JSON.parse(localStorage.getItem("comments")) || {};
    //     setKommentare(gespeichert[postId] || []);
    // }, [postId]);
    //
    // console.log("PostId: ",postId);
    //
    // // Updates the form state whenever the input fields change
    // const verarbeiteAenderung = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value });
    // };
    //
    // // Handles form submission: adds a new comment and saves to localStorage
    // const verarbeiteAbsenden = (e) => {
    //     e.preventDefault();
    //
    //     const newComment = {
    //         name: form.name,
    //         text: form.text,
    //         date: new Date().toLocaleString("de-DE", {
    //             day: "2-digit",
    //             month: "2-digit",
    //             year: "numeric",
    //             hour: "2-digit",
    //             minute: "2-digit",
    //         }),
    //     };
    //
    //     const stored = JSON.parse(localStorage.getItem("comments")) || {};
    //     const updated = {
    //         ...stored,
    //         [postId]: [...(stored[postId] || []), newComment],
    //     };
    //
    //     // save to localstorage
    //     localStorage.setItem("comments", JSON.stringify(updated));
    //     setKommentare(updated[postId]);
    //     setForm({ name: "", text: "" });
    // };
    //
    // // delete comment
    // const loescheKommentar = (index) => {
    //     const updated = [...kommentare];
    //     updated.splice(index, 1);
    //
    //     const stored = JSON.parse(localStorage.getItem("comments")) || {};
    //     stored[postId] = updated;
    //     localStorage.setItem("comments", JSON.stringify(stored));
    //
    //     setKommentare(updated);
    // };

    const [kommentare, setKommentare] = useState(ladeListe(STORAGE_KEYS.KOMMENTARE) || anfangsKommentare);
    useEffect(() => {
        speichereListe(STORAGE_KEYS.KOMMENTARE, kommentare);
    }, [kommentare]);

    function kommentarHinzufuegen(e) {
        e.preventDefault();
        const now = new Date().toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        const neuerKommentar = { id: crypto.randomUUID(), beitragId: postId, autorId: benutzer.id, inhalt, erstelltAm: now};
        setKommentare(prev => [...prev, neuerKommentar]);
        setInhalt("");
    }

    function handleKommentarLoeschen(kommentarId) {
        setKommentare(prev => prev.filter(k => k.id !== kommentarId));
    }

    const [inhalt, setInhalt] = useState('');
    return (
        <FaRegCommentAlt />,
            <div className="mt-10 max-w-2xl mx-auto bg-[var(--cl-surface0)] text-[var(--cl-text-name)] p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-[var(--cl-green)]">
                    Kommentare
                </h3>

                {/* Show list of comments or fallback text */}
                {kommentare.length === 0 ? (
                    <p className="text-[var(--cl-subtext0)] italic mb-4">
                        Noch keine Kommentare.
                    </p>
                ) : (
                    <ul className="space-y-3 mb-6">
                        {kommentare
                            .filter(c => c.beitragId === postId)
                            .map((c) => (
                                <motion.li
                                    key={c.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 1.2 }}
                                    className="bg-[var(--cl-surface1)] p-4 rounded-md border border-[var(--cl-surface2)]"
                                >
                                    <div className="flex justify-between text-sm font-semibold">
                                        <span>{benutzern.find(b => b.id === c.autorId)?.benutzername || "Unbekannt"}</span>
                                        <span className="text-xs text-[var(--cl-subtext1)]">
                                </span>

                                        {/*Der DeleteButton ist nur für Admin und für den Author des Kommentares sichtbar*/}
                                        { benutzer && (benutzer.id === c.autorId || benutzer.rolle === "admin") &&
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-[var(--cl-subtext1)]">{c.erstelltAm}</span>
                                                <DeleteButton onClick={() => handleKommentarLoeschen(c.id)} />
                                            </div>
                                        }
                                    </div>
                                    <p className="mt-2 text-[var(--cl-subtext0)]">{c.inhalt}</p>
                                </motion.li>
                            ))}
                    </ul>
                )}


                {/* Comment input form */}
                {/*The form is available only if the user is logged in/registered.*/}
                { benutzer &&
                    <form onSubmit={kommentarHinzufuegen} className="space-y-3">
                        {/*<input*/}
                        {/*    name="name"*/}
                        {/*    value={form.name}*/}
                        {/*    onChange={verarbeiteAenderung}*/}
                        {/*    placeholder="Name"*/}
                        {/*    required*/}
                        {/*    className="w-full p-3 rounded-md bg-[var(--cl-surface1)] text-[var(--cl-text-name)]*/}
                        {/*placeholder:text-[var(--cl-subtext1)]*/}
                        {/*border border-[var(--cl-teal)]*/}
                        {/*focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)] transition"*/}
                        {/*/>*/}
                        <textarea
                            name="text"
                            value={inhalt}
                            onChange={e => setInhalt(e.target.value)}
                            placeholder="Kommentar"
                            required
                            className="w-full p-3 rounded-md bg-[var(--cl-surface1)] text-[var(--cl-text-name)]
                    placeholder:text-[var(--cl-subtext1)]
                    border border-[var(--cl-teal)]
                    shadow-[0_0_6px_1px_var(--cl-teal)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)] transition"
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.2 }}
                            className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold cursor-pointer"
                        >
                            Absenden
                        </motion.button>
                    </form>
                }
            </div>
    );
};

export default CommentSection;
