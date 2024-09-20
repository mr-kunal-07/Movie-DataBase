import React, { useEffect, useState } from 'react';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyapi.online/api/movies')
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching the movie data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-white mb-8">Movie Database</h1>
            {movies.length === 0 ? (
                <p className="text-center text-white">No movies found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {movies.map((movie) => (
                        <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                            <img
                                src={movie.image}
                                alt={movie.movie}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white">{movie.movie}</h3>
                                <p className="text-gray-400 mt-1">Rating: <span className="text-yellow-400">{movie.rating}</span></p>
                                <a
                                    href={movie.imdb_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline mt-2 block"
                                >
                                    View on IMDb
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieList;
