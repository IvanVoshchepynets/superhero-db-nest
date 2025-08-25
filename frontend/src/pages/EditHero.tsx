import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSuperheroQuery, useUpdateSuperheroMutation } from '../store/api';

const EditHero = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: hero, isLoading, error } = useGetSuperheroQuery(Number(id));
  const [updateSuperhero, { isLoading: isUpdating }] = useUpdateSuperheroMutation();

  const [form, setForm] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: [''],
    catch_phrase: '',
  });
  const [imageFile, setImageFile] = useState<File | undefined>();

  useEffect(() => {
    if (hero) {
      setForm({
        nickname: hero.nickname,
        real_name: hero.real_name,
        origin_description: hero.origin_description,
        superpowers: hero.superpowers.length ? hero.superpowers : [''],
        catch_phrase: hero.catch_phrase,
      });
    }
  }, [hero]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === 'superpowers' && typeof index === 'number') {
      const newPowers = [...form.superpowers];
      newPowers[index] = value;
      setForm({ ...form, superpowers: newPowers });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addSuperpower = () => setForm({ ...form, superpowers: [...form.superpowers, ''] });
  const removeSuperpower = (index: number) => {
    const newPowers = form.superpowers.filter((_, i) => i !== index);
    setForm({ ...form, superpowers: newPowers });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSuperhero({ id: Number(id), ...form, image: imageFile }).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Error updating superhero:', err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading superhero</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Superhero</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={form.nickname}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="real_name"
          placeholder="Real Name"
          value={form.real_name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <textarea
          name="origin_description"
          placeholder="Origin Description"
          value={form.origin_description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <div>
          <label className="block mb-1">Superpowers:</label>
          {form.superpowers.map((power, i) => (
            <div key={i} className="flex mb-1">
              <input
                type="text"
                name="superpowers"
                value={power}
                onChange={(e) => handleChange(e, i)}
                className="border p-2 flex-1"
                required
              />
              <button type="button" onClick={() => removeSuperpower(i)} className="ml-2 text-red-500">
                &times;
              </button>
            </div>
          ))}
          <button type="button" onClick={addSuperpower} className="text-blue-500">
            + Add superpower
          </button>
        </div>
        <input
          type="text"
          name="catch_phrase"
          placeholder="Catch Phrase"
          value={form.catch_phrase}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <div>
          <label className="block mb-1">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : undefined)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Hero'}
        </button>
      </form>
    </div>
  );
};

export default EditHero;
