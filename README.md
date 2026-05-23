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

## Lab 5: Modular Monolith

У лабораторній роботі №5 систему було перетворено на modular monolith.

Було виділено два bounded contexts:

- Core Module
- Analytics Module

### Core Module

Core Module містить основну бізнес-логіку мікроблогу:

- authentication
- users
- posts
- comments
- likes
- commands
- queries
- domain rules

### Фінальна структура проєкту

src/
├── modules/
│   ├── core/
│   │   ├── api/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   └── analytics/
│       ├── api/
│       ├── acl/
│       ├── application/
│       ├── domain/
│       └── infrastructure/
│
├── shared/
│   └── event-bus/
│
├── app.js
├── container.js
└── server.js