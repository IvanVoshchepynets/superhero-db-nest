# Superhero DB App

A full-featured web application for managing a database of superheroes, built with Nest.js (backend), React (frontend), Prisma, and PostgreSQL.

[Superhero DB Demo](https://drive.google.com/file/d/1AfpHnTONCP9zxelikkmn0qR2gWLVYY70/view?usp=sharing)

## Main Features

- Create, edit, and delete superheroes (CRUD)
- Assign and remove image per superhero
- List all superheroes showing only one image, nickname, and pagination (5 items per page)
- View detailed information of a superhero with image, real name, origin description, superpowers, and catch phrase
- Responsive design for desktop and mobile

## Tech Stack

- **Backend:** Node.js, Nest.js, Prisma, PostgreSQL
- **Frontend:** React, Redux Toolkit, React Router DOM, Tailwind CSS
- **Others:** Docker (for database and backend)

## How to Run the Project

1. Clone the repository:

   git clone https://github.com/IvanVoshchepynets/superhero-db-nest.git

2. Navigate into the backend folder:

   cd superhero-db-nest/backend

3. Build and start Docker containers for PostgreSQL and backend:

   docker-compose build

   docker-compose up -d

4. The backend server will be available at http://localhost:4000

   You can access the list of superheroes at: http://localhost:4000/superheroes

   Database runs in Docker (PostgreSQL) on port 5432

5. Navigate into the frontend folder:

   cd superhero-db-nest/frontend

6. Install dependencies and start the development server:

   npm install

   npm run dev

7. Open in browser: http://localhost:5174/

   The frontend also has a Dockerfile for optional Docker deployment, but local development is recommended using npm run dev.

# Superhero DB App

Повнофункціональний вебзастосунок для керування базою даних супергероїв, створений за допомогою Nest.js (бекенд), React (фронтенд), Prisma та PostgreSQL.

[Superhero DB Demo](https://drive.google.com/file/d/1AfpHnTONCP9zxelikkmn0qR2gWLVYY70/view?usp=sharing)

## Основні можливості

- Створення, редагування та видалення супергероїв (CRUD)
- Призначення та видалення зображення для кожного супергероя
- Список усіх супергероїв, що відображає лише одне зображення, прізвисько та нумерацію сторінок (5 елементів на сторінці)
- Перегляд детальної інформації про супергероя із зображенням, справжнім ім'ям, описом походження, суперсилами та ключовою фразою
- Адаптивний дизайн для комп'ютерів та мобільних пристроїв

## Стек технологій

- **Backend:** Node.js, Nest.js, Prisma, PostgreSQL
- **Frontend:** React, Redux Toolkit, React Router DOM, Tailwind CSS
- **Others:** Docker (for database and backend)

## Як запустити проєкт

1. Клонуйте репозиторій:

   git clone https://github.com/IvanVoshchepynets/superhero-db-nest.git

2. Перейдіть до папки бекенду:

   cd superhero-db-nest/backend

3. Збірка та запуск Docker-контейнерів для PostgreSQL та бекенду:

   docker-compose build

   docker-compose up -d

4. Бекенд-сервер буде доступний за адресою http://localhost:4000

   Ви можете переглянути список супергероїв за адресою: http://localhost:4000/superheroes

   База даних працює в Docker (PostgreSQL) на порту 5432

5. Перейдіть до папки фронтенду:

   cd superhero-db-nest/frontend

6. Встановіть залежності та запустіть сервер розробки:

   npm install

   npm run dev

7. Відкрити у браузері: http://localhost:5174/

   Фронтенд також має Dockerfile для опціонального розгортання Docker, але рекомендується локальна розробка за допомогою npm run dev.
