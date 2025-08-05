import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

// Tutorial: https://www.youtube.com/watch?app=desktop&v=eDw46GYAIDQ&ab_channel=EricMurphy

function StarRating({ rating, setRating }) {
    const [hover, setHover] = useState(null);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            style={{ display: "none" }}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={22}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default StarRating;