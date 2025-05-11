// src/crypto.polyfill.ts
import { webcrypto } from 'node:crypto';
(globalThis as any).crypto = webcrypto;