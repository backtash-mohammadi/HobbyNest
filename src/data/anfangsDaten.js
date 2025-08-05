import bcrypt from 'bcryptjs';

export const anfangsBenutzer = [
    { id: '1', benutzername: 'admin', passwortHash: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)), rolle: 'admin', vorname: 'Admin', nachname: 'Adminkovich', email: 'admin@gmail.com', foto: '', erstelltAm: '2025-07-01T00:00:00Z' },
    { id: '2', benutzername: 'user', passwortHash: bcrypt.hashSync('user', bcrypt.genSaltSync(10)), rolle: 'user', vorname: 'Benutzer', nachname: 'Benutzkovich', email: 'user@gmail.com', foto: '', erstelltAm: '2025-07-10T00:00:00Z' },
];

export const anfangsBeitraege = [
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
            '4. Unterstützung:\n', autorId: '1', erstelltAm: '2025-07-25T00:00:00Z', kategorie:"kunst" },
];

export const anfangsKommentare = [
    { id: '1', beitragId: '1', autorId: '2', inhalt: 'Toller Start!', erstelltAm: '2025-07-02T00:00:00Z' },
    { id: '2', beitragId: '2', autorId: '1', inhalt: 'Weiter so!', erstelltAm: '2025-07-16T00:00:00Z' },
];