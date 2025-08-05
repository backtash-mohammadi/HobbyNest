import React from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const categories = [
    { name: "Sport", path: "/sport", img: "src/assets/sport-cat-icon.PNG" },
    { name: "Kunst", path: "/kunst", img: "src/assets/kunst-cat-icon.png" },
    { name: "Outdoor", path: "/outdoor", img: "src/assets/outdoor-cat-icon.png" },
    { name: "Kochen", path: "/kochen", img: "src/assets/kochen-cat-icon.jpg" },
    { name: "Musik", path: "/musik", img: "src/assets/musik-icon.png" },
    { name: "Sonstiges", path: "/sonstiges", img: "src/assets/sonstiges-icon.jpg" },
];

export default function CategoryNavBar() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-4 flex flex-wrap gap-8 justify-center items-center bg-white/30 rounded-3xl shadow-md border border-cyan-100 mb-4">
            {categories.map(cat => (
                <motion.div
                    whileHover={{ scale: 1.09, y: -8, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                    key={cat.name}
                    className="flex flex-col items-center bg-gray-800/90 rounded-2xl px-8 py-6 shadow-lg transition-all duration-200 cursor-pointer min-w-[120px]"
                >
                    <Link to={cat.path} className="flex flex-col items-center">
                        <img
                            src={cat.img}
                            alt={cat.name}
                            className="rounded-full w-16 h-16 mb-3 border-4 border-white shadow"
                            style={{ objectFit: "cover", background: "#fff" }}
                        />
                        <span className="text-lg font-semibold text-white">{cat.name}</span>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
