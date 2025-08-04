// components/RoleToggle.jsx
import { motion } from "framer-motion";
import { useState } from "react"

const RoleToggle = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    // Flip the toggle
    const toggleRole = () => setIsAdmin(!isAdmin)

    return (
        <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-[var(--cl-subtext0)]">
        {isAdmin ? "Admin" : "Nutzer"}
      </span>
            <button
                className="toggle-container"
                style={{
                    ...container,
                    justifyContent: "flex-" + (isAdmin ? "start" : "end"),
                }}
                onClick={toggleRole}
            >
                <motion.div
                    className="toggle-handle"
                    style={handle}
                    layout
                    transition={{ type: "spring", duration: 0.2, bounce: 0.2 }}
                />
            </button>
        </div>
    )
}

export default RoleToggle

const container = {
    width: 80,
    height: 35,
    backgroundColor: "var(--cl-blue)",
    borderRadius: 35,
    cursor: "pointer",
    display: "flex",
    padding: 5,
}

const handle = {
    width: 25,
    height: 25,
    backgroundColor: "var(--cl-error)",
    borderRadius: "50%",
}
