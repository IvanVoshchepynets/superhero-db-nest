import React, { useState } from 'react';
import { useGetSuperheroesQuery, useDeleteSuperheroMutation } from '../store/api';
import HeroCard from '../components/HeroCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetSuperheroesQuery(page);
  const [deleteHero, { isLoading: isDeleting }] = useDeleteSuperheroMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading superheroes</p>;

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this hero?')) return;
    try {
      await deleteHero(id).unwrap();
    } catch (err) {
      console.error('Failed to delete hero', err);
      alert('Error deleting hero');
    }
  };

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Superheroes List</h1>
        <Link
          to="/create"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Hero
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.items.map((hero) => (
          <div key={hero.id} className="border rounded p-4 shadow">
            <HeroCard hero={hero} />

            <div className="flex justify-between mt-2">
              <Link
                to={`/edit/${hero.id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(hero.id)}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
