
import { motion } from "framer-motion";

const DeleteButton = ({ onClick }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.4 }}
        className="text-sm text-red-500 hover:text-red-700 ml-4"
        borderColor="black"
    >
        🗑️ Delete
    </motion.button>
);

export default DeleteButton;
