import { useParams } from "react-router-dom";

// Component, der die Details des Hobby/beitrag Object anzeigt.
// Der Component wird zu einer bestimmen path in App.jsx verbunden.
const HobbyDetails = ({ hobby }) => {
    const { hobbyTitle } = useParams();

    if (!hobby) {
        return <p className="text-red-500">Hobby not found</p>;
    }

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-xl mt-4">
            <h1 className="text-3xl font-bold mb-2 text-[var(--cl-green)]">{hobby.ueberschrift}</h1>
            <p className="mb-4 text-gray-700">{hobby.inhalt}</p>
            {/*<p className="text-sm text-gray-500">Category: {hobby.category}</p>*/}
        </div>
    );
};

export default HobbyDetails;