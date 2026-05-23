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

## Lab 4: Component Interaction and Integration Events

У лабораторній роботі №4 до архітектури було додано міжкомпонентну комунікацію, synchronous/asynchronous interaction та integration events.

### Auxiliary Component

Було додано окремий Notification Component, який відповідає за side effects після бізнес-операцій.

Файл:

```txt
src/infrastructure/notifications/ConsoleNotificationService.js
```

Notification component має чіткий контракт:

```txt
src/domain/notifications/NotificationService.js
```

---

## Synchronous Communication

Після створення поста `CreatePostCommandHandler` синхронно викликає:

```js
await notificationService.send(...)
```

Це означає, що основна бізнес-операція очікує завершення notification component.

### Переваги:
- проста реалізація;
- легше тестування;
- простіший debugging.

### Недоліки:
- більший response time;
- сильніше coupling;
- side effect може вплинути на основну операцію.

---

## Asynchronous Communication

Для асинхронної взаємодії реалізовано in-process Event Bus.

### Event Bus

```txt
src/shared/event-bus/EventBus.js
src/infrastructure/events/InProcessEventBus.js
```

### Integration Event

Після створення поста публікується immutable integration event:

```txt
src/domain/events/PostCreatedEvent.js
```

Event:
- immutable (`Object.freeze`)
- використовує past tense naming (`PostCreated`)
- містить достатньо context data

### Event Publishing

```js
await eventBus.publish(
  new PostCreatedEvent(...)
)
```

### Event Subscription

Notification component підписується на подію:

```js
eventBus.subscribe(
  "PostCreated",
  new PostCreatedNotificationHandler(...)
)
```

---

## Architecture after Lab 4

```txt
src/
├── application/
│   ├── commands/
│   ├── command-handlers/
│   ├── queries/
│   ├── query-handlers/
│   ├── read-models/
│   └── repositories/
│
├── domain/
│   ├── entities/
│   ├── events/
│   ├── notifications/
│   ├── repositories/
│   └── value-objects/
│
├── infrastructure/
│   ├── database/
│   ├── events/
│   ├── notifications/
│   └── repositories/
│
├── presentation/
│
├── shared/
│   └── event-bus/
│
├── app.js
├── container.js
├── server.js
├── tests/
└── docs/
```

---

## Tests

### Unit Tests
- Command handlers
- Domain invariants
- Sync communication
- EventBus behavior

### Integration Tests
- HTTP endpoints
- Query handlers
- Read models
- Authentication flow

## Main API Endpoints

### Authentication

```txt
POST /auth/register
POST /auth/login
```

### Posts

```txt
GET /posts
GET /posts/:id

POST /posts
POST /posts/:id/comments
POST /posts/:id/like
```

## Architecture Evolution

### Lab 1
- CRUD REST API
- Authentication
- Validation
- Integration and unit tests

### Lab 2
- Clean Architecture
- Domain Layer
- Repository Pattern
- Dependency Injection

### Lab 3
- CQS (Command Query Separation)
- Command Handlers
- Query Handlers
- Read Models

### Lab 4
- Component Interaction
- Synchronous communication
- Asynchronous communication
- Integration Events
- Event Bus
- Notification Component