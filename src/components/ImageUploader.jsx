import { useState } from "react";
import { motion } from "framer-motion";

export default function ImageUploader({ onImageUpload }) {
    const [preview, setPreview] = useState(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageUpload(reader.result); // send base64 to parent
            };
            reader.readAsDataURL(file);
        } else {
            alert("Bitte ein Bild auswählen.");
        }
    }

    return (
        <motion.div className="mb-4 m-2" whileHover={{ scale: 1.1 }}
        >
            <input type="file" accept="image/*" onChange={handleImageChange} className="bg-[var(--cl-green)] text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"/>
            {preview && (
                <img
                    src={preview}
                    alt="Vorschau"
                    className="mt-2 max-h-48 rounded-md shadow cursor-pointer"

                />
            )}
        </motion.div>
    );
}
