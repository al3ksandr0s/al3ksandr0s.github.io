// Funzioni utility per il Memory Game

/**
 * Genera un seed casuale
 */
export function generateSeed() {
    return Math.floor(Math.random() * 100000);
}

/**
 * Generatore di numeri pseudo-casuali con seed
 */
export function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

/**
 * Shuffle array con seed specifico (per avere sempre lo stesso ordine con lo stesso seed)
 */
export function shuffleWithSeed(array, seed) {
    const result = [...array];
    let currentSeed = seed;
    
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(currentSeed) * (i + 1));
        currentSeed++;
        [result[i], result[j]] = [result[j], result[i]];
    }
    
    return result;
}

/**
 * Genera un hash semplice per verificare l'integrità del codice sfida
 */
export function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36).substring(0, 4).toUpperCase();
}

/**
 * Genera un codice sfida che include seed, mosse, tempo e hash di verifica
 * Formato: HASH-SEED-MOVES-TIME
 */
export function generateChallengeCode(seed, moves, time) {
    const data = `${seed}-${moves}-${time}`;
    const hash = simpleHash(data);
    return `${hash}-${seed}-${moves}-${time}`;
}

/**
 * Decodifica un codice sfida e verifica l'integrità
 */
export function decodeChallengeCode(code) {
    try {
        const parts = code.split('-');
        if (parts.length !== 4) return null;
        
        const [hash, seedStr, movesStr, timeStr] = parts;
        const seed = parseInt(seedStr, 10);
        const moves = parseInt(movesStr, 10);
        const time = parseInt(timeStr, 10);
        
        if (isNaN(seed) || isNaN(moves) || isNaN(time)) return null;
        
        // Verifica hash
        const expectedHash = simpleHash(`${seed}-${moves}-${time}`);
        if (hash !== expectedHash) return null;
        
        return { seed, moves, time, hash };
    } catch {
        return null;
    }
}
