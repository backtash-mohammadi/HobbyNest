import bcrypt from 'bcryptjs';

export const anfangsBenutzer = [
    { id: '1', benutzername: 'admin', passwortHash: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)), rolle: 'admin', vorname: 'Admin', nachname: 'Adminkovich', email: 'admin@gmail.com', foto: '', erstelltAm: '2025-07-01T00:00:00Z' },
    { id: '2', benutzername: 'user', passwortHash: bcrypt.hashSync('user', bcrypt.genSaltSync(10)), rolle: 'user', vorname: 'Benutzer', nachname: 'Benutzkovich', email: 'user@gmail.com', foto: '', erstelltAm: '2025-07-10T00:00:00Z' },
];

export const anfangsBeitraege = [

    {
        id: '5',
        ueberschrift: 'Warum Ausdauertraining so wichtig ist',
        inhalt: 'Ausdauertraining stärkt das Herz-Kreislauf-System, verbessert die Lungenkapazität und erhöht die allgemeine Fitness. Schon 30 Minuten Laufen, Radfahren oder Schwimmen pro Tag können das Risiko für chronische Erkrankungen deutlich senken. Zudem hilft regelmäßiges Training beim Stressabbau und fördert einen besseren Schlaf.',
        autorId: '1',
        erstelltAm: new Date('2025-08-01'),
        kategorie: 'sport',
        bild: 'src/assets/ausdauern-beitrag.png'
    },
    {
        id: '6',
        ueberschrift: 'Die besten Dehnübungen für Fußballer',
        inhalt: 'Fußball beansprucht viele Muskelgruppen. Daher ist gezieltes Dehnen essenziell, um Verletzungen vorzubeugen. Übungen wie der Ausfallschritt, die Oberschenkeldehnung und das Kreisen der Hüfte sorgen für mehr Beweglichkeit. Ideal vor und nach dem Training, um die Muskeln geschmeidig zu halten.',
        autorId: '1',
        erstelltAm: new Date('2025-08-03'),
        kategorie: 'sport',
        bild: 'src/assets/fussball-beitrag.png'
    },
    {
        id: '7',
        ueberschrift: 'Krafttraining für Anfänger: So startest du richtig',
        inhalt: 'Wer neu mit Krafttraining beginnt, sollte sich auf Grundübungen konzentrieren: Kniebeugen, Liegestütze und Rudern mit dem eigenen Körpergewicht sind ideal. Wichtig ist eine saubere Technik, langsame Steigerung der Intensität und ausreichend Regeneration. So vermeidest du Verletzungen und baust gezielt Muskeln auf.',
        autorId: '1',
        erstelltAm: new Date('2025-08-05'),
        kategorie: 'sport',
        bild: 'src/assets/krafttraining-beitrag.jpg'
    },

    {
        id: '8',
        ueberschrift: 'Warum Musik Emotionen weckt',
        inhalt: 'Musik kann starke Emotionen auslösen, weil sie direkt auf das limbische System im Gehirn wirkt. Ein trauriger Song kann Erinnerungen hervorrufen, während schnelle Beats Energie geben. Studien zeigen, dass Musik sogar den Herzschlag und die Atmung beeinflussen kann. Deshalb ist sie in Therapie, Werbung und Film so wirksam.',
        autorId: '1',
        erstelltAm: new Date('2025-08-01'),
        kategorie: 'musik',
        bild: 'src/assets/musik-emotion-beitrag.jpg'
    },
    {
        id: '9',
        ueberschrift: 'Die Vorteile eines Instruments im Alltag',
        inhalt: 'Ein Instrument zu lernen fördert Konzentration, Geduld und Feinmotorik. Studien zeigen, dass musizierende Kinder oft besser in Mathematik abschneiden. Auch Erwachsene profitieren: Musik reduziert Stress und stärkt das Gedächtnis. Ob Gitarre, Klavier oder Geige – jedes Instrument bringt neue kreative Möglichkeiten.',
        autorId: '2',
        erstelltAm: new Date('2025-08-03'),
        kategorie: 'musik',
        bild: 'src/assets/instrument-beitrag.png'
    },
    {
        id: '10',
        ueberschrift: 'Kopfhörer oder Lautsprecher – was ist besser?',
        inhalt: 'Kopfhörer bieten ein intensives Hörerlebnis, ideal für unterwegs oder konzentriertes Zuhören. Lautsprecher hingegen schaffen Raumklang und sind besser für Gruppen oder beim Musikhören zu Hause. Beide haben ihre Vor- und Nachteile – entscheidend ist der Einsatzzweck und persönliche Vorlieben beim Hören.',
        autorId: '1',
        erstelltAm: new Date('2025-08-05'),
        kategorie: 'musik',
        bild: 'src/assets/kopfhoerer-beitrag.webp'
    },
    {
        id: '11',
        ueberschrift: 'Warum moderne Kunst polarisiert',
        inhalt: 'Moderne Kunst bricht oft mit traditionellen Formen, was zu Diskussionen führt. Viele Werke setzen auf Emotion statt Technik und fordern Betrachter dazu auf, neue Perspektiven einzunehmen. Diese Vielfalt macht moderne Kunst spannend, aber auch kontrovers – sie lädt zur Reflexion und zum Dialog ein.',
        autorId: '2',
        erstelltAm: new Date('2025-08-01'),
        kategorie: 'kunst',
        bild: 'src/assets/moderne-kunst-beitrag.png'
    },
    {
        id: '12',
        ueberschrift: 'Die Wirkung von Farben in der Malerei',
        inhalt: 'Farben haben in der Kunst eine starke emotionale Bedeutung. Rot steht für Energie oder Gefahr, Blau wirkt beruhigend und Gelb vermittelt Optimismus. Künstler nutzen gezielt Farbkontraste und Farbharmonien, um Stimmung und Tiefe zu erzeugen. Farben sprechen das Unterbewusstsein direkt an und beeinflussen die Wahrnehmung.',
        autorId: '2',
        erstelltAm: new Date('2025-08-03'),
        kategorie: 'kunst',
        bild: 'src/assets/farben-beirag.png'
    },
    {
        id: '13',
        ueberschrift: 'Skulpturen im öffentlichen Raum',
        inhalt: 'Skulpturen im Freien verschönern nicht nur Städte, sondern regen auch zum Nachdenken an. Sie machen Kunst für alle zugänglich und laden zur Interaktion ein. Ob abstrakt oder realistisch – solche Werke verändern die Wahrnehmung von Orten und schaffen kulturelle Identität im Alltag.',
        autorId: '1',
        erstelltAm: new Date('2025-08-05'),
        kategorie: 'kunst',
        bild: 'src/assets/skulpturen-beitrag.jpg'
    },
    { id: '1', ueberschrift: 'Willkommen im Blog', inhalt: 'Das ist der erste Beitrag.', autorId: '1', erstelltAm: '2025-07-01T00:00:00Z', kategorie:"sport"},
    { id: '2', ueberschrift: 'React lernen', inhalt: 'Hier teile ich meine Erfahrungen...', autorId: '2', erstelltAm: '2025-07-15T00:00:00Z', kategorie:"outdoor" },
    { id: '3',
        ueberschrift: 'Getting Started with Chess',
        inhalt: 'Schach ist ein Brettspiel für zwei Spieler, bei dem es darum geht, den gegnerischen König durch Schachmatt zu setzen. Das bedeutet, dass der König angegriffen wird und keine Möglichkeit hat, dem Angriff zu entkommen. Das Spiel wird auf einem 64-Felder-Brett mit weißen und schwarzen Feldern gespielt, wobei jeder Spieler 16 Figuren hat: einen König, eine Dame, zwei Türme, zwei Läufer, zwei Springer und acht Bauern',
        autorId: '2',
        erstelltAm: '2025-07-25T00:00:00Z',
        kategorie: "sonstiges" },
    { id: '4', ueberschrift: 'Learn to Play Music', inhalt: 'Beginnen Sie mit den Grundlagen, setzen Sie sich realistische Ziele, üben Sie regelmäßig, und suchen Sie sich Unterstützung. \n' +
            'Es ist wichtig, sich nicht zu überfordern, Spaß am Lernen zu haben und sich auch über kleine Erfolge zu freuen. \n' +
            'Hier sind einige detaillierte Tipps:\n' +
            '\n' +
            '1. Grundlagen schaffen:\n' +
            '\n' +
            '2. Motivation und Spaß:\n' +
            '\n' +
            '3. Üben und Lernen:\n' +
            '\n' +
            '4. Unterstützung:\n', autorId: '1', erstelltAm: '2025-07-25T00:00:00Z', kategorie:"kunst" }




];

export const anfangsKommentare = [
    { id: '1', beitragId: '1', autorId: '2', inhalt: 'Toller Start!', erstelltAm: '2025-07-02T00:00:00Z' },
    { id: '2', beitragId: '2', autorId: '1', inhalt: 'Weiter so!', erstelltAm: '2025-07-16T00:00:00Z' },
];