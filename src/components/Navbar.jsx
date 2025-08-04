
import { Link } from "react-router-dom";

import {DialogWithForm} from "./DialogWithForm.jsx";

// https://react-icons.github.io/react-icons/search/#q=message

const Navbar = () => {
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

                <DialogWithForm/>
            </div>
        </nav>
    );
};

export default Navbar;
