import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { FaBackward, FaForward } from 'react-icons/fa';

// Pagination-Komponente zur Navigation zwischen Seiten
export function Pagination({ aktuelleSeite, gesamtSeiten, onSeitewechsel }) {
    return (
        <div className="flex justify-center items-center mt-6 gap-4">
            {/* ZURÜCK-Button */}
            <Button
                size="sm"
                variant="outlined"
                disabled={aktuelleSeite <= 1}
                onClick={() => onSeitewechsel(aktuelleSeite - 1)}
                className="normal-case flex items-center gap-2 cursor-pointer text-base"
            >
                <FaBackward /> Vorherige
            </Button>

            {/* Aktuelle Seite */}
            <Typography variant="small" className="text-base">
                Seite {aktuelleSeite} von {gesamtSeiten}
            </Typography>

            {/* WEITER-Button */}
            <Button
                size="sm"
                variant="outlined"
                disabled={aktuelleSeite >= gesamtSeiten}
                onClick={() => onSeitewechsel(aktuelleSeite + 1)}
                className="normal-case flex items-center gap-2 cursor-pointer text-base"
            >
                Weiter <FaForward />
            </Button>
        </div>
    );
}

export default Pagination;