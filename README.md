# Microblog

RESTful API для мікроблогінгу. Система дозволяє реєструватися, входити в акаунт, працювати з профілем, створювати/читати/оновлювати/видаляти пости й коментарі, шукати користувачів і пости за тегами, а також ставити лайки/дизлайки постам.

## Стек

- Node.js
- Express
- JWT
- bcryptjs
- Jest
- Supertest
- In-memory store для baseline-версії

## Запуск

```bash
npm install
npm start
```

Сервер запускається на:

```txt
http://localhost:3000
```

## Запуск тестів

```bash
npm test
```

## Основні інваріанти

- `email` має бути валідним.
- `username` має містити 3–30 символів: літери, цифри або `_`.
- `password` має містити мінімум 6 символів.
- `email` і `username` мають бути унікальними.
- Пост не може бути порожнім.
- Пост не може бути довшим за 280 символів.
- Коментар не може бути порожнім.
- Коментар не може бути довшим за 200 символів.
- Редагувати й видаляти пост може тільки його автор.
- Редагувати й видаляти коментар може тільки його автор.
- Реакція на пост може бути тільки `like` або `dislike`.
- Неавторизовані запити до захищених endpoints повертають `401 Unauthorized`.

## API endpoints

### Auth

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Реєстрація | No |
| POST | `/auth/login` | Вхід | No |

### Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/users/me` | Перегляд власного профілю | Yes |
| PATCH | `/users/me` | Оновлення власного профілю | Yes |
| DELETE | `/users/me` | Видалення власного акаунта | Yes |
| GET | `/users/search?q=ann` | Пошук користувача | Yes |

### Posts

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/posts` | Створення поста | Yes |
| GET | `/posts` | Список постів | Yes |
| GET | `/posts?tag=js` | Пошук постів за тегом | Yes |
| GET | `/posts/:id` | Отримання одного поста | Yes |
| PATCH | `/posts/:id` | Оновлення власного поста | Yes |
| DELETE | `/posts/:id` | Видалення власного поста | Yes |
| POST | `/posts/:id/reactions` | Лайк/дизлайк поста | Yes |

### Comments

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/posts/:id/comments` | Додати коментар | Yes |
| GET | `/posts/:id/comments` | Переглянути коментарі поста | Yes |
| PATCH | `/comments/:id` | Оновити власний коментар | Yes |
| DELETE | `/comments/:id` | Видалити власний коментар | Yes |

## Приклад використання

### Реєстрація

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"student","email":"student@example.com","password":"123456"}'
```

### Логін

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student","password":"123456"}'
```

### Створення поста

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content":"Hello microblog!","tags":["intro","lab1"]}'
```

## Структура проєкту

```txt
    src/
    application/
        commands/
        command-handlers/
        queries/
        query-handlers/
        read-models/
        repositories/
    domain/
    infrastructure/
    presentation/
    app.js
    container.js
    server.js
    docs/
    analysis/
        lab2.md
        lab3.md
    adr/
    tests/
    application/
    domain/
    api.test.js
```

## Що реалізовано для лабораторної

### Commands

Commands змінюють стан системи:

- `RegisterUserCommand`
- `LoginUserCommand`
- `CreatePostCommand`
- `AddCommentCommand`
- `LikePostCommand`

Їх обробляють Command Handlers:

- `RegisterUserCommandHandler`
- `LoginUserCommandHandler`
- `CreatePostCommandHandler`
- `AddCommentCommandHandler`
- `LikePostCommandHandler`

### Queries

Queries не змінюють стан системи:

- `GetPostsQuery`
- `GetPostByIdQuery`

Їх обробляють Query Handlers:

- `GetPostsQueryHandler`
- `GetPostByIdQueryHandler`

Queries повертають Read Models, а не доменні моделі.