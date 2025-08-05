import {useState} from "react";

export default function NewPost({author, onBeitragHinzufuegen}){
    const [ueberschrift, setUeberschrift] = useState('');
    const [inhalt, setInhalt] = useState('');
    const [kategorie, setKategorie] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const neuerBeitrag = { id: crypto.randomUUID(), ueberschrift, inhalt, autorId: author.id, erstelltAm: new Date().toISOString(), kategorie: kategorie};
        onBeitragHinzufuegen(neuerBeitrag);
        setUeberschrift('');
        setInhalt('');
        setKategorie('');
    }

    return( author && author.rolle === "admin" &&
        <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl mt-4">
            <h3 className="text-3xl font-bold mb-2 text-[var(--cl-green)]">Neuer Beitrag</h3>

            <form onSubmit={handleSubmit}>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md resize mb-4"
                    value={ueberschrift}
                    onChange={e => setUeberschrift(e.target.value)}
                    placeholder="Überschrift" />
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md resize mb-1"
                    value={inhalt}
                    onChange={e => setInhalt(e.target.value)}
                    placeholder="Inhalt" />

                <p>Kategorie</p>
                <input
                    type="radio"
                    id="sport"
                    name="kategorie"
                    value="sport"
                    // checked={choice === 'Option 1'}
                    onChange={(e) => setKategorie(e.target.value)}
                    required
                />
                <label htmlFor="sport">Sport</label><br></br>
                <input type="radio" id="kunst" name="kategorie" value="kunst" onChange={(e) => setKategorie(e.target.value)}
                />
                <label htmlFor="kust">Kunst</label>
                <br/>
                <input type="radio" id="outdoor" name="kategorie" value="outdoor" onChange={(e) => setKategorie(e.target.value)}/>
                <label htmlFor="outdoor">Outdoor</label>
                <br></br>
                <input type="radio" id="sonstiges" name="kategorie" value="sonstiges" onChange={(e) => setKategorie(e.target.value)}/>
                <label htmlFor="sonstiges">Sonstiges</label>
                <br></br>

                <button type="submit">Beitrag hinzufügen</button>
            </form>
        </div>
    )
}