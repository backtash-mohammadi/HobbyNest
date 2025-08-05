import React from "react";
import { Link } from 'react-router-dom';

export default function CategoryNavBar(){




    return (
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center mb-4 border-amber-50">
            <Link to="/sport">
                <div>
                    <img src="src/assets/sport-cat-icon.PNG" alt="sport" className="w-16 h-16"/>
                        Sport
                </div>
            </Link>
            <Link to="/kunst">
                <div>

                    <img src="src/assets/kunst-cat-icon.png" alt="kunst" className="w-16 h-16"/>
                    Kunst

                </div>
             </Link>
            <Link to="/outdoor">
                <div>
                    <img src="src/assets/outdoor-cat-icon.png" alt="outdoor" className="w-16 h-16"/>
                    Outdoor-Aktivitäten
                </div>
            </Link>
            <Link to="/sonsitges">
                <div>
                    <img src="src/assets/sonstiges-icon.jpg" alt="sonstiges" className="w-16 h-16"/>
                    Sonsitges

                </div>
            </Link>
        </div>
    )
}