import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {DialogWithForm} from "./DialogWithForm.jsx";

// https://react-icons.github.io/react-icons/search/#q=message

const Navbar = ({ benutzerListe, onLogin, currentUser, onLogout }) => {
    return (
        <nav className="w-full fixed top-0 left-0 bg-[var(--cl-surface0)] text-[var(--cl-text)] z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-[var(--cl-green)]">🌱 HobbyNest</h1>
                <ul className="flex gap-6 text-sm font-medium">
                    <li>
                        <Link to="/" className="hover:text-[var(--cl-blue)]">Home</Link>
                    </li>
                    {/* Add more links here if needed */}
                </ul>

                {currentUser && <>
                <div>
                    <p className="text-sm font-medium text-[var(--cl-subtext0)]">Sie sind angemeldet als {currentUser.benutzername}</p>

                </div>
                <div>
                    <motion.button                         type="submit"
                                                           whileHover={{ scale: 1.1 }}
                                                           className="bg-[var(--cl-blue)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold"
                                                           onClick={onLogout}>Abmelden
                    </motion.button>
                </div>
                </>
                }
                <DialogWithForm benutzerListe={benutzerListe} onLogin={onLogin}/>
            </div>
        </nav>
    );
};

export default Navbar;
