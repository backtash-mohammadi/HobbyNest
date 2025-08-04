import bcrypt from 'bcryptjs';

export const anfangsBenutzer = [
    { id: '1', benutzername: 'admin', passwortHash: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)), rolle: 'admin', erstelltAm: '2025-07-01T00:00:00Z' },
    { id: '2', benutzername: 'user', passwortHash: bcrypt.hashSync('user', bcrypt.genSaltSync(10)), rolle: 'user', erstelltAm: '2025-07-10T00:00:00Z' },
];

export const anfangsBeitraege = [
    { id: '1', ueberschrift: 'Willkommen im Blog', inhalt: 'Das ist der erste Beitrag.', autorId: '1', erstelltAm: '2025-07-01T00:00:00Z' },
    { id: '2', ueberschrift: 'React lernen', inhalt: 'Hier teile ich meine Erfahrungen...', autorId: '2', erstelltAm: '2025-07-15T00:00:00Z' },
];

export const anfangsKommentare = [
    { id: '1', beitragId: '1', autorId: '2', inhalt: 'Toller Start!', erstelltAm: '2025-07-02T00:00:00Z' },
    { id: '2', beitragId: '2', autorId: '1', inhalt: 'Weiter so!', erstelltAm: '2025-07-16T00:00:00Z' },
];