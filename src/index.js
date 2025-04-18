import * as deasync from 'deasync';

/**
 * Runs an asynchronous function in a synchronous manner by blocking the event loop
 * until the promise resolves or rejects.
 *
 * **WARNING:** This function uses `deasync` to block the Node.js event loop, which is 
 * generally discouraged in production environments or performance-sensitive applications.
 * Only use this in Node.js environments (e.g., CLI tools, scripts, or testing).
 *
 * @template T - The return type of the async function.
 * @param asyncFunc - A function that returns a Promise to be resolved synchronously.
 * @returns The resolved value of the async function.
 * @throws The error if the async function rejects.
 *
 * @example
 * ```ts
 * const result = inSync(async () => {
 *   await someAsyncOperation();
 *   return "Done";
 * });
 * console.log(result); // "Done"
 * ```
 */
export function inSync<T>(asyncFunc: () => Promise<T>): T {
  let done = false;
  let result: T;
  let error: any;

  asyncFunc()
    .then(res => {
      result = res;
      done = true;
    })
    .catch(err => {
      error = err;
      done = true;
    });

  deasync.loopWhile(() => !done);

  if (error) throw error;
  return result!;
}
