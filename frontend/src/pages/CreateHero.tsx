import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateSuperheroMutation } from '../store/api';

const CreateHero = () => {
  const navigate = useNavigate();
  const [createSuperhero, { isLoading }] = useCreateSuperheroMutation();

  const [form, setForm] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: [''],
    catch_phrase: '',
  });

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

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
      await createSuperhero({ ...form, image: imageFile }).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Error creating superhero:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Superhero</h1>
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
            onChange={(e) => setImageFile(e.target.files?.[0])} // undefined, якщо нема файлу
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Hero'}
        </button>
      </form>
    </div>
  );
};

export default CreateHero;
