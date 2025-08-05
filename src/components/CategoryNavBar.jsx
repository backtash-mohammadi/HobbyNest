import React from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

export default function CategoryNavBar(){

    return (
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center mb-4 border-2 border-b-cyan-200 rounded-3xl">
            <motion.div
                whileHover={{ scale: 1.04 }}
                className="bg-[var(--cl-surface0)] p-6 rounded-xl shadow text-amber-50"
            >
            <Link to="/sport">
                <div>
                    <img src="src/assets/sport-cat-icon.PNG" alt="sport" className="w-16 h-16"/>
                        Sport
                </div>
            </Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[var(--cl-surface0)] p-6 rounded-xl shadow text-amber-50"
            >
            <Link to="/kunst">
                <div>

                    <img src="src/assets/kunst-cat-icon.png" alt="kunst" className="w-16 h-16"/>
                    Kunst

                </div>
             </Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[var(--cl-surface0)] p-6 rounded-xl shadow text-amber-50"
            >
            <Link to="/outdoor">
                <div>
                    <img src="src/assets/outdoor-cat-icon.png" alt="outdoor" className="w-16 h-16"/>
                    Outdoor
                </div>
            </Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[var(--cl-surface0)] p-6 rounded-xl shadow text-amber-50"
            >
            <Link to="/sonsitges">
                <div>
                    <img src="src/assets/sonstiges-icon.jpg" alt="sonstiges" className="w-16 h-16"/>
                    Sonsitges

                </div>
            </Link>
            </motion.div>
        </div>
    )
}