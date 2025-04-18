# await-sync

> Run async functions synchronously in Node.js using deasync.

**Caution:** This utility blocks the Node.js event loop to make async functions behave synchronously. Use it **only in safe contexts** like CLI tools, bootstrapping scripts, or test environments — **not in production servers or UI-heavy apps.**

## Installation

```bash
npm install await-sync
```

## Usage
```typescript
import { inSync } from "await-sync";

const asyncFunc = async () => {
  await new Promise((res) => setTimeout(res, 100));
  return "done";
};

const result = inSync(asyncFunc);
console.log(result); // "done"
```

## API
```typescript
inSync<T>(asyncFunc: () => Promise<T>): T
```
Runs the async function and returns its result synchronously.
Blocks the event loop until resolution.
Throws if the function rejects.

## Why?
Sometimes you need a quick synchronous result from an async function — in CLI scripts, test environments, or setups where await/async isn't supported.

## License
MIT

## Author
Made by Diego Vallejo

