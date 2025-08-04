import React, { useState } from "react";
import bcrypt from "bcryptjs";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import {motion} from "framer-motion";
import {FaUser} from "react-icons/fa";
import RoleToggle from "./RoleToggle.jsx";

export function DialogWithForm({ benutzerListe, onLogin }) {

    const [offen, setOffen] = useState(false);
    const toggleOffen = () => setOffen(cur => !cur);

    const [bn, setBn] = useState("");
    const [pw, setPw] = useState("");
    const [fehler, setFehler] = useState("");

    const handleAnmeldung = (e) => {
        e.preventDefault();

        const benutzer = benutzerListe.find(u => u.benutzername === bn);
        if (!benutzer) {
            setFehler("Benutzer nicht gefunden.");
            return;
        }

        if (!bcrypt.compareSync(pw, benutzer.passwortHash)) {
            setFehler("Ungültiges Passwort.");
            return;
        }

        onLogin(benutzer);
        toggleOffen();
    };

    return (
        <>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.2 }}
                className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold"
                onClick={toggleOffen}
            >
                <FaUser />
            </motion.button>

            {offen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    {/* Dialog card  */}
                    <Card className="w-full max-w-[24rem] bg-[var(--cl-base)]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="small" className="black font-medium">
                                Einloggen
                            </Typography>
                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray"
                            >
                                Gib deine Benutzername und dein Passwort ein, um dich anzumelden.
                            </Typography>

                            {/* Role Toggle */}


                        </CardBody>

                        {/* Button */}
                        <CardFooter className="pt-2">
                            <div>
                                <form onSubmit={handleAnmeldung} className="flex flex-col gap-4">
                                <Typography className="-mb-2" variant="h6"> Deine Benutzername </Typography>
                                <Input
                                    value={bn}
                                    onChange={e => setBn(e.target.value)}
                                    placeholder="Benutzername"
                                    size="lg"
                                    required
                                />

                                <Typography className="-mb-2" variant="h6"> Dein Password</Typography>
                                <Input
                                    type="password"
                                    value={pw}
                                    onChange={e => setPw(e.target.value)}
                                    placeholder="Passwort"
                                    size="lg"
                                    required
                                />
                                {fehler && (
                                    <Typography variant="small" color="red">
                                        {fehler}
                                    </Typography>
                                )}
                                <div className="-ml-2.5 -mt-3">
                                    <Checkbox label="Remember Me" />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold"
                                >
                                    Einloggen
                                </motion.button>
                            </form>

                                <div className="mt-2">
                                    <RoleToggle />
                                </div>
                            </div>
                        </CardFooter>

                        <CardFooter className="pt-2">
                            <Typography variant="small" className="mt-4 flex justify-center">
                                Don&apos;t have an account?&nbsp;
                                <Typography
                                    as="a"
                                    href="#signup"
                                    variant="small"
                                    color="blue-gray"
                                    className="ml-1 font-bold"
                                    onClick={toggleOffen}
                                >
                                    Registrieren
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}
