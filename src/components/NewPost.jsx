import { useState } from "react";
import ImageUploader from "./ImageUploader";

export default function NewPost({ author, onBeitragHinzufuegen }) {
    const [ueberschrift, setUeberschrift] = useState('');
    const [inhalt, setInhalt] = useState('');
    const [kategorie, setKategorie] = useState('');
    const [bild, setBild] = useState(null); // für Bilder

    function handleSubmit(e) {
        e.preventDefault();
        const neuerBeitrag = {
            id: crypto.randomUUID(),
            ueberschrift,
            inhalt,
            autorId: author.id,
            autorName: author.benutzername,           // <—
            autorBild: author.foto,                   // <—
            erstelltAm: new Date().toISOString(),     // <—
            kategorie,
            bild,
        };
        onBeitragHinzufuegen(neuerBeitrag);
        setUeberschrift('');
        setInhalt('');
        setKategorie('');
        setBild(null);
    }

    if (!author || author.rolle !== "admin") return null;

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl mt-4">
            <h3 className="text-3xl font-bold mb-2 text-[var(--cl-green)]">Neuer Beitrag</h3>

            <form onSubmit={handleSubmit}>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md resize mb-4"
                    value={ueberschrift}
                    onChange={e => setUeberschrift(e.target.value)}
                    placeholder="Überschrift"
                    required
                />

                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md resize mb-4"
                    value={inhalt}
                    onChange={e => setInhalt(e.target.value)}
                    placeholder="Inhalt"
                    required
                />

                <p className="mb-2 font-medium">Kategorie</p>
                {["sport", "kunst", "outdoor", "sonstiges"].map((cat) => (
                    <div key={cat}>
                        <input
                            type="radio"
                            id={cat}
                            name="kategorie"
                            value={cat}
                            onChange={(e) => setKategorie(e.target.value)}
                            checked={kategorie === cat}
                            required
                        />
                        <label htmlFor={cat} className="ml-1 capitalize">{cat}</label>
                    </div>
                ))}

                <div className="mt-4">
                    <p className="mb-1 font-medium">Bild hochladen</p>
                    <ImageUploader onImageUpload={setBild} />
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-[var(--cl-green)] text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    Beitrag hinzufügen
                </button>
            </form>
        </div>
    );
}
