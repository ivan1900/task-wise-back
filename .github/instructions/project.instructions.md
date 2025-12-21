---
applyTo: '**'
---

This is nest.js project.

This project user doman driven design (DDD) architecture pattern.
There are boudled contexts, each bounded context has its own folder inside the `src` folder. And each bounded context has its own subfolders like `application`, `domain`, `infrastructure`, `interface` and etc.
Each bounded context is independent from each other, so you can easily remove or add new bounded context without affecting other parts of the system.
Each bounded context is a module in nest.js, so you can easily import and use it in other parts of the system.

## Testing

Considering the project is over nest.js, you should use nest.js testing utilities to write unit and e2e tests.
