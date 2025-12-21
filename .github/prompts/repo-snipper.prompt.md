---
agent: agent
---

Create a new repo with the name provided by developer.

Considering that this should be the strucure:

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DDBB/Prisma.service';

@Injectable()
export default class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
```

Add the necessary imports in the module file for this boundled context
