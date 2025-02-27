import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "./components/card";
import HomePagination from "./components/pagination";
import { AppBar } from "@mui/material";
import Loader from "./components/loader";

export default function Home({
  pokemonList: initialPokemonList,
  totalPages: initialTotalPages,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState(initialPokemonList);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPokemon, setCurrentPokemon] = useState(initialPokemonList);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchFilteredPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
        );
        const data = await res.json();

        let filteredResults;
        if (!isNaN(searchTerm)) {
          filteredResults = data.results.filter((pokemon) => {
            const id = pokemon.url.split("/").filter(Boolean).pop();
            return id === searchTerm;
          });
        } else {
          filteredResults = data.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setFilteredPokemon(filteredResults);
        setTotalPages(Math.ceil(filteredResults.length / itemsPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchFilteredPokemon();
    } else {
      setFilteredPokemon(initialPokemonList);
      setTotalPages(initialTotalPages);
    }
    setCurrentPage(1);
  }, [searchTerm, initialPokemonList, initialTotalPages]);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
        );
        const data = await res.json();

        setCurrentPokemon(data.results);
        setTotalPages(Math.ceil(data.count / itemsPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      }
    };

    if (!searchTerm) {
      fetchPokemon();
    } else {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const paginatedFilteredPokemon = filteredPokemon.slice(
        indexOfFirstItem,
        indexOfLastItem
      );
      setCurrentPokemon(paginatedFilteredPokemon);
    }
  }, [currentPage, searchTerm, filteredPokemon]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <AppBar position="static">
        <h1 className="text-4xl font-bold text-center mb-2 mt-2">
          Pokemon Explorer
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-3 mb-2 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </AppBar>
      <div className="flex flex-col min-h-screen relative">
        {loading && <Loader />}
        {!loading && (
          <>
            <div className="flex-grow overflow-y-auto bg-gray-100 p-6 flex flex-col items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl w-full px-4">
                {currentPokemon.map((pokemon, index) => {
                  const id = pokemon.url.split("/").filter(Boolean).pop();
                  return (
                    <Link href={`/pokemon/${id}`} key={index}>
                      <div className="flex justify-center">
                        <Card id={id} pokemon={pokemon} loading={loading} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            {totalPages > 1 && (
              <AppBar position="static" color="default">
                <div className="flex justify-center mt-4 p-4">
                  <HomePagination
                    searchTerm={searchTerm}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    filteredPokemon={filteredPokemon}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                  />
                </div>
              </AppBar>
            )}
          </>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
  );
  const data = await res.json();

  return {
    props: {
      pokemonList: data.results,
      totalPages: Math.ceil(data.count / 16),
    },
  };
}
