# ADR 002: Modular Monolith and Bounded Contexts

## Status

Accepted

## Context

Після лабораторних 1-4 проєкт мав layered architecture, CQS, integration events та Event Bus. Проте вся система залишалась одним великим контекстом: core business logic, notifications, analytics і read models були частинами однієї загальної структури.

Для лабораторної роботи №5 потрібно виділити bounded contexts і перетворити систему на modular monolith.

## Decision

Було виділено два bounded contexts:

1. Core Module
2. Analytics Module

Core Module відповідає за основну бізнес-логіку мікроблогу:
- users;
- authentication;
- posts;
- comments;
- likes;
- commands;
- queries;
- domain rules.

Analytics Module відповідає за побудову метрик:
- total posts;
- total likes;
- total comments;
- post metrics.

## Rationale

Core — це upstream context, бо саме він створює бізнес-події: PostCreated, PostLiked, CommentAdded.

Analytics — downstream context. Він не змінює Core-дані, а тільки слухає події та будує власну модель даних.

Таке розділення логічне, бо аналітика не повинна впливати на основні бізнес-операції. Якщо аналітика тимчасово відстає, це прийнятно для бізнесу.

## Consequences

Переваги:
- модулі мають чіткі межі;
- Analytics не імпортує внутрішні класи Core;
- взаємодія відбувається через events;
- можна винести Analytics в окремий сервіс у майбутньому.

Недоліки:
- більше файлів і boilerplate;
- потрібно підтримувати event contracts;
- з'являється eventual consistency.