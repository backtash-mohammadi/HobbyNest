import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { motion } from "framer-motion";

export default function NewPost({ author, onBeitragHinzufuegen }) {
    const [ueberschrift, setUeberschrift] = useState('');
    const [inhalt, setInhalt] = useState('');
    const [kategorie, setKategorie] = useState('');
    const [bild, setBild] = useState(null);
    const [resetImageKey, setResetImageKey] = useState(0); // Used to reset ImageUploader

    function handleSubmit(e) {
        e.preventDefault();

        const neuerBeitrag = {
            id: crypto.randomUUID(),
            ueberschrift: ueberschrift.trim(),
            inhalt,
            autorId: author.id,
            autorName: author.benutzername,
            autorBild: author.foto,
            erstelltAm: new Date().toISOString(),
            kategorie,
            bild,
        };

        onBeitragHinzufuegen(neuerBeitrag);

        // Reset form fields
        setUeberschrift('');
        setInhalt('');
        setKategorie('');
        setBild(null);
        setResetImageKey(prev => prev + 1); // Force ImageUploader reset
    }

    // Only admins can see the form
    if (!author || author.rolle !== "admin") return null;

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl mt-4 min-h-screen">
            <h3 className="text-3xl font-bold mb-2 text-[var(--cl-green)]">Neuer Beitrag</h3>

            <form onSubmit={handleSubmit}>
                {/* Überschrift */}
                <input
                    className="w-full p-2 border border-gray-300 rounded-md resize mb-4"
                    value={ueberschrift}
                    onChange={e => setUeberschrift(e.target.value)}
                    placeholder="Überschrift"
                    required
                />

                {/* Inhalt */}
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md resize mb-4 min-h-[240px]"
                    value={inhalt}
                    onChange={e => setInhalt(e.target.value)}
                    placeholder="Inhalt"
                    required
                />

                {/* Kategorie Dropdown */}
                <label htmlFor="kategorie" className="block mb-2 font-medium">
                    Kategorie
                </label>
                <select
                    id="kategorie"
                    value={kategorie}
                    onChange={(e) => setKategorie(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    required
                >
                    <option value="">Bitte auswählen</option>
                    <option value="sport">Sport</option>
                    <option value="kunst">Kunst</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="kochen">Kochen</option>
                    <option value="musik">Musik</option>
                    <option value="sonstiges">Sonstiges</option>
                </select>

                {/* Bild-Upload + Button nebeneinander */}
                <div className="flex items-center justify-between gap-4 mt-4">
                    {/* ImageUploader gets reset via key change */}
                    <ImageUploader onImageUpload={setBild} key={resetImageKey} />

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1 }}
                        className="bg-[var(--cl-green)] text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
                    >
                        Beitrag hinzufügen
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
