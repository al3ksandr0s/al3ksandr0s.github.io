// Tipi per il gioco Memory Love Challenge

export type GameMode = 'challenge' | 'challenge-join' | 'duel' | '';

export interface GameState {
    mode: GameMode;
    seed: number;
    moves: number;
    time: number;
    matchedPairs: number;
    flippedCards: HTMLElement[];
    canFlip: boolean;
    timerInterval: number | null;
}

export interface DuelState {
    currentPlayer: 1 | 2;
    player1Moves: number;
    player2Moves: number;
    seed: number;
}

export interface ChallengeData {
    seed: number;
    moves: number;
    time: number;
}

export interface DecodedChallenge {
    seed: number;
    moves: number;
    time: number;
}
