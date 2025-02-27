import { useRouter } from "next/router";
import Image from "next/image";
import Loader from "../components/loader";
import { useState, useEffect } from "react";

export default function PokemonDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading || !pokemon) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => router.push("/")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back to home
      </button>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold capitalize text-center mb-4 text-black">
          {pokemon.name}
        </h1>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={200}
          height={200}
          className="mx-auto"
        />
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-black">Types</h2>
          <p className="text-black">
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-black">Abilities</h2>
          <p className="text-black">
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-black">Stats</h2>
          <ul className="text-black">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-black">Moves</h2>
          <p className="text-black">
            {pokemon.moves.map((m) => m.move.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}