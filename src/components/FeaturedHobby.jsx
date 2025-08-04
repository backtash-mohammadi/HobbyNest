
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedHobby = ({ hobby }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[var(--cl-surface0)] p-6 rounded-xl shadow w-full"
        >
            <h2 className="text-2xl font-semibold mb-2 text-[var(--cl-green)]">
                🌟 Featured Hobby: {hobby.title}
            </h2>
            <p className="text-[var(--cl-subtext0)] mb-4">{hobby.short}</p>
            <Link
                to="/hobbyoverview"
                className="inline-block bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded hover:opacity-90 transition"
            >
                Browse All Guides →
            </Link>
        </motion.div>
    );
};

export default FeaturedHobby;
