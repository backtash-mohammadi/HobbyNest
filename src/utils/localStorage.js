export const STORAGE_KEYS = {
    BENUTZER: 'blog_benutzer',
    BEITRAEGE: 'blog_beitraege',
    KOMMENTARE: 'blog_kommentare',
};

export function speichereListe(key, liste) {
    localStorage.setItem(key, JSON.stringify(liste));
}

export function ladeListe(key) {
    const daten = localStorage.getItem(key);
    return daten ? JSON.parse(daten) : null;
}