// Utility functions per il gioco

import type { DecodedChallenge } from './types';

/**
 * Generatore pseudo-random con seed (Mulberry32)
 */
export function seededRandom(seed: number): () => number {
    return function(): number {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

/**
 * Shuffle array con seed deterministico
 */
export function shuffleWithSeed<T>(array: T[], seed: number): T[] {
    const rng = seededRandom(seed);
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Genera un seed casuale a 5 cifre
 */
export function generateSeed(): number {
    return Math.floor(Math.random() * 90000) + 10000;
}

/**
 * Genera hash semplice per verifica codice
 */
export function generateHash(seed: number, moves: number, time: number): string {
    const data = `${seed}${moves}${time}LOVE`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const absHash = Math.abs(hash);
    for (let i = 0; i < 4; i++) {
        result += chars[(absHash >> (i * 5)) % chars.length];
    }
    return result;
}

/**
 * Verifica che l'hash corrisponda ai dati
 */
export function verifyHash(hash: string, seed: number, moves: number, time: number): boolean {
    return generateHash(seed, moves, time) === hash;
}

/**
 * Genera il codice sfida completo
 */
export function generateChallengeCode(seed: number, moves: number, time: number): string {
    const hash = generateHash(seed, moves, time);
    return `${hash}-${seed}-${moves}-${time}`;
}

/**
 * Decodifica e valida un codice sfida
 */
export function decodeChallengeCode(code: string): DecodedChallenge | null {
    const parts = code.split('-');
    if (parts.length !== 4) return null;
    
    const [hash, seedStr, movesStr, timeStr] = parts;
    const seed = parseInt(seedStr);
    const moves = parseInt(movesStr);
    const time = parseInt(timeStr);
    
    if (isNaN(seed) || isNaN(moves) || isNaN(time)) return null;
    if (!verifyHash(hash, seed, moves, time)) return null;
    
    return { seed, moves, time };
}
