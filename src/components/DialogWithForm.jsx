import React from "react";
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

//https://www.material-tailwind.com/docs/react/dialog#signup

export function DialogWithForm() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.2 }}
                className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold"
                onClick={handleOpen}
            >
                <FaUser/>
            </motion.button>


            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <Card className="w-full max-w-[24rem] bg-[var(--cl-base)]">
                        <CardBody className="flex flex-col gap-4">
                            {/* The message inside the dialog */}
                            <Typography variant="small" className="black font-medium cursor-pointer">
                                Einlogen
                            </Typography>


                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray"
                            >
                                Gib deine E-Mail-Adresse und dein Passwort ein, um dich anzumelden.
                            </Typography>
                            <Typography className="-mb-2" variant="h6">
                                Deine Email
                            </Typography>
                            <Input placeholder={"Email"}  size="lg" />
                            <Typography className="-mb-2" variant="h6">
                                Dein Password
                            </Typography>
                            <Input placeholder={"Passwort"}  size="lg" />
                            <div className="-ml-2.5 -mt-3">
                                <Checkbox label="Remember Me" />
                            </div>
                        </CardBody>
                        {/* Button */}
                        <CardFooter className="pt-2">
                            <div className="flex justify-center">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.2 }}
                                    className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold"
                                    onClick={handleOpen}
                                >
                                    Einloggen
                                </motion.button>
                            </div>

                            <Typography variant="small" className="mt-4 flex justify-center">
                                Don&apos;t have an account?
                                <Typography
                                    as="a"
                                    href="#signup"
                                    variant="small"
                                    color="blue-gray"
                                    className="ml-1 font-bold"
                                    onClick={handleOpen}
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
