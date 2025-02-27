import React from "react";

const Card = ({ id, pokemon }) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

return (
    <div className="bg-white shadow-md rounded-lg p-6 w-64 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 capitalize">
            {pokemon?.name}
        </h2>
        <div className="flex justify-center mb-4">
            <img src={imageUrl} alt={pokemon?.name} className="w-32 h-32 object-cover" />
        </div>
        <p className="text-gray-600">ID: {id}</p>
    </div>
);
};

export default Card;
