import bcrypt from 'bcryptjs';

export const anfangsBenutzer = [
    { id: '1', benutzername: 'admin', passwortHash: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)), rolle: 'admin', erstelltAm: '2025-07-01T00:00:00Z' },
    { id: '2', benutzername: 'user', passwortHash: bcrypt.hashSync('user', bcrypt.genSaltSync(10)), rolle: 'user', erstelltAm: '2025-07-10T00:00:00Z' },
];

export const anfangsBeitraege = [
    { id: '1', ueberschrift: 'Willkommen im Blog', inhalt: 'Das ist der erste Beitrag.', autorId: '1', erstelltAm: '2025-07-01T00:00:00Z' },
    { id: '2', ueberschrift: 'React lernen', inhalt: 'Hier teile ich meine Erfahrungen...', autorId: '2', erstelltAm: '2025-07-15T00:00:00Z' },
    { id: '3',
        ueberschrift: 'Getting Started with Chess',
        inhalt: '"What Is Strategy In Chess?\\n" +\n' +
            '                "Chess strategy is the purposeful attempt to gain an advantage over your opponent. Unlike tactics, chess strategy involves long-term goals, usually related to king safety, pawn structure, space, piece activity, etc.\\n" +\n' +
            '                "\\n" +\n' +
            '                "Chess strategy.\\n" +\n' +
            '                "GM Anatoly Karpov vs. GM Garry Kasparov, 1984. Karpov is strategically winning in this position, and Kasparov eventually resigned.\\n" +\n' +
            '                "Why Is Strategy Important?\\n" +\n' +
            '                "There is a famous saying that points out that \\"chess is 99% tactics.\\" If that is true, why is studying strategy so important?\\n" +\n' +
            '                "\\n" +\n' +
            '                "Although tactics can indeed define a game\'s outcome, good strategic play creates the opportunity for tactical shots in the first place. You can look at strategy as the breeding ground for tactics.\\n" +\n' +
            '                "\\n" +\n' +
            '                "According to the renowned Chinese general Sun Tzu, \\"Strategy without tactics is the slowest route to victory. Tactics without strategy is the noise before defeat.\\" Indeed, relying solely on your opponent falling for a tactical shot might work well for beginners but is a losing approach for more advanced players.\\n" +\n' +
            '                "\\n" +\n' +
            '                "Strategy without tactics is the slowest route to victory. Tactics without strategy is the noise before defeat."',
        autorId: '2',
        erstelltAm: '2025-07-25T00:00:00Z' },
    { id: '4', ueberschrift: 'Learn to Play Music', inhalt: 'Explore musical instruments, rhythm, and melody to start your music journey.', autorId: '1', erstelltAm: '2025-07-25T00:00:00Z' },

];

export const anfangsKommentare = [
    { id: '1', beitragId: '1', autorId: '2', inhalt: 'Toller Start!', erstelltAm: '2025-07-02T00:00:00Z' },
    { id: '2', beitragId: '2', autorId: '1', inhalt: 'Weiter so!', erstelltAm: '2025-07-16T00:00:00Z' },
];