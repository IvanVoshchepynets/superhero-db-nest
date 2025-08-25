import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Superhero } from '../store/api';

interface Props {
  initialData?: Partial<Superhero>;
  onSubmit: (data: FormData) => void;
}

const HeroForm = ({ initialData = {}, onSubmit }: Props) => {
  const [nickname, setNickname] = useState(initialData.nickname || '');
  const [realName, setRealName] = useState(initialData.real_name || '');
  const [originDescription, setOriginDescription] = useState(initialData.origin_description || '');
  const [catchPhrase, setCatchPhrase] = useState(initialData.catch_phrase || '');
  const [superpowers, setSuperpowers] = useState<string>((initialData.superpowers || []).join(', '));
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('real_name', realName);
    formData.append('origin_description', originDescription);
    formData.append('catch_phrase', catchPhrase);
    formData.append('superpowers', JSON.stringify(superpowers.split(',').map(s => s.trim())));
    if (image) formData.append('image', image);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <div className="mb-2">
        <label className="block">Nickname</label>
        <input className="w-full border p-1" value={nickname} onChange={e => setNickname(e.target.value)} />
      </div>
      <div className="mb-2">
        <label className="block">Real Name</label>
        <input className="w-full border p-1" value={realName} onChange={e => setRealName(e.target.value)} />
      </div>
      <div className="mb-2">
        <label className="block">Origin Description</label>
        <textarea className="w-full border p-1" value={originDescription} onChange={e => setOriginDescription(e.target.value)} />
      </div>
      <div className="mb-2">
        <label className="block">Catch Phrase</label>
        <input className="w-full border p-1" value={catchPhrase} onChange={e => setCatchPhrase(e.target.value)} />
      </div>
      <div className="mb-2">
        <label className="block">Superpowers (comma separated)</label>
        <input className="w-full border p-1" value={superpowers} onChange={e => setSuperpowers(e.target.value)} />
      </div>
      <div className="mb-2">
        <label className="block">Image</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default HeroForm;
