"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.inSync = inSync;
// @ts-ignore
const deasync = __importStar(require("deasync"));
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
function inSync(asyncFunc) {
    let done = false;
    let result;
    let error;
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
    if (error)
        throw error;
    return result;
}
