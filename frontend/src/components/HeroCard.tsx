import type { Superhero } from '../store/api';
import { Link } from 'react-router-dom';

interface Props {
  hero: Superhero;
}

const HeroCard = ({ hero }: Props) => {
  return (
    <Link to={`/superheroes/${hero.id}`}>
      <div className="border rounded p-4 hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{hero.nickname}</h2>
        
        {hero.images[0] && (
  <img
    src={`http://localhost:4000/uploads/${hero.images[0].url}`}
    alt={hero.nickname}
    className="mt-2 w-full h-48 object-contain rounded bg-white"
  />
)}
      </div>
    </Link>
  );
};

export default HeroCard;
