import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SuperheroImage {
  id: number;
  url: string;
  superheroId: number;
}

export interface Superhero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: SuperheroImage[];
}

export const superheroApi = createApi({
  reducerPath: 'superheroApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: ['Superhero'],
  endpoints: (builder) => ({
    // 🔹 Тепер query приймає номер сторінки
    getSuperheroes: builder.query<
      { items: Superhero[]; page: number; limit: number; total: number },
      number | void
    >({
      query: (page = 1) => `superheroes?page=${page}&limit=5`,
      providesTags: ['Superhero'],
    }),

    getSuperhero: builder.query<Superhero, number>({
      query: (id) => `superheroes/${id}`,
      providesTags: ['Superhero'],
    }),

    createSuperhero: builder.mutation<Superhero, Partial<Superhero> & { image?: File | undefined }>(
      {
        query: (body) => {
          const formData = new FormData();
          formData.append('nickname', body.nickname!);
          formData.append('real_name', body.real_name!);
          formData.append('origin_description', body.origin_description!);
          formData.append('superpowers', JSON.stringify(body.superpowers || []));
          formData.append('catch_phrase', body.catch_phrase!);
          if (body.image) formData.append('image', body.image);

          return {
            url: 'superheroes',
            method: 'POST',
            body: formData,
          };
        },
        invalidatesTags: ['Superhero'],
      },
    ),

    updateSuperhero: builder.mutation<
      Superhero,
      Partial<Superhero> & { id: number; image?: File | undefined }
    >({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        formData.append('nickname', body.nickname!);
        formData.append('real_name', body.real_name!);
        formData.append('origin_description', body.origin_description!);
        formData.append('superpowers', JSON.stringify(body.superpowers || []));
        formData.append('catch_phrase', body.catch_phrase!);
        if (body.image) formData.append('image', body.image);

        return {
          url: `superheroes/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['Superhero'],
    }),

    // 🔹 Видалення героя
    deleteSuperhero: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `superheroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Superhero'],
    }),
  }),
});

export const {
  useGetSuperheroesQuery,
  useCreateSuperheroMutation,
  useGetSuperheroQuery,
  useUpdateSuperheroMutation,
  useDeleteSuperheroMutation,
} = superheroApi;
