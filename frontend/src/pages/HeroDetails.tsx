import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Superhero } from '../store/api';
import { useDeleteSuperheroMutation } from '../store/api';

const HeroDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<Superhero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // хук для видалення
  const [deleteHero, { isLoading: isDeleting }] = useDeleteSuperheroMutation();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`http://localhost:4000/superheroes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch hero');
        const data = await res.json();
        setHero(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this hero?')) return;

    try {
      await deleteHero(Number(id)).unwrap();
      navigate('/'); // після видалення — назад на список
    } catch (err) {
      console.error('Failed to delete hero', err);
      alert('Error deleting hero');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!hero) return <p>Hero not found</p>;

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline">
        Back to list
      </Link>
      <h1 className="text-3xl font-bold mt-4">{hero.nickname}</h1>
      <p className="text-gray-700 mt-2">Real name: {hero.real_name}</p>
      <p className="mt-2">{hero.origin_description}</p>
      <p className="mt-2">Superpowers: {hero.superpowers.join(', ')}</p>
      <p className="mt-2 font-semibold">Catch phrase: {hero.catch_phrase}</p>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {hero.images.map((img) => (
          <img
            key={img.id}
            src={`http://localhost:4000/uploads/${img.url}`}
            alt={hero.nickname}
            className="mt-2 w-full h-48 object-contain rounded bg-white"
          />
        ))}
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete Hero'}
      </button>
    </div>
  );
};

export default HeroDetails;
