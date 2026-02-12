// Logica principale del gioco Memory

import type { GameMode, GameState, DuelState, DecodedChallenge } from './types';
import { generateSeed, generateChallengeCode, decodeChallengeCode } from './utils';
import { createCards, flipCard, unflipCard, markAsMatched, isCardPlayable, getCardSymbol } from './cards';
import { 
    showScreen, 
    updateChallengeStats, 
    updateDuelStats,
    showChallengeResult,
    showDuelTransition,
    showDuelResult,
    setupPlayer1Turn,
    setupPlayer2Turn,
    showCodeError,
    hideCodeError,
    updateTurnIndicator
} from './ui';

// Stato del gioco
let gameState: GameState = {
    mode: '',
    seed: 0,
    moves: 0,
    time: 0,
    matchedPairs: 0,
    flippedCards: [],
    canFlip: true,
    timerInterval: null
};

// Stato del duel
let duelState: DuelState = {
    currentPlayer: 1,
    player1Moves: 0,
    player2Moves: 0,
    seed: 0
};

// Dati sfida (per modalità challenge-join)
let challengeData: DecodedChallenge | null = null;

/**
 * Resetta lo stato del gioco
 */
function resetGameState(): void {
    gameState.moves = 0;
    gameState.time = 0;
    gameState.matchedPairs = 0;
    gameState.flippedCards = [];
    gameState.canFlip = true;
    stopTimer();
}

/**
 * Avvia il timer
 */
function startTimer(): void {
    gameState.time = 0;
    stopTimer();
    gameState.timerInterval = window.setInterval(() => {
        gameState.time++;
        if (gameState.mode === 'challenge' || gameState.mode === 'challenge-join') {
            updateChallengeStats(gameState.moves, gameState.time, gameState.matchedPairs);
        }
    }, 1000);
}

/**
 * Ferma il timer
 */
function stopTimer(): void {
    if (gameState.timerInterval !== null) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

/**
 * Aggiorna le statistiche nella UI
 */
function updateStats(): void {
    if (gameState.mode === 'challenge' || gameState.mode === 'challenge-join') {
        updateChallengeStats(gameState.moves, gameState.time, gameState.matchedPairs);
    } else if (gameState.mode === 'duel') {
        updateDuelStats(duelState.currentPlayer, duelState.player1Moves, duelState.player2Moves, gameState.matchedPairs);
    }
}

/**
 * Cambia turno nel duel
 */
function switchTurn(): void {
    if (duelState.currentPlayer === 1) {
        duelState.currentPlayer = 2;
        setupPlayer2Turn();
    } else {
        duelState.currentPlayer = 1;
        setupPlayer1Turn();
    }
    updateTurnIndicator(duelState.currentPlayer);
    updateStats();
}

/**
 * Handler per il click su una carta
 */
function handleCardClick(card: HTMLElement): void {
    if (!gameState.canFlip || !isCardPlayable(card)) {
        return;
    }

    flipCard(card);
    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 2) {
        gameState.canFlip = false;
        
        // Incrementa mosse per il giocatore corrente
        if (gameState.mode === 'duel') {
            if (duelState.currentPlayer === 1) {
                duelState.player1Moves++;
            } else {
                duelState.player2Moves++;
            }
        } else {
            gameState.moves++;
        }
        
        updateStats();

        const [card1, card2] = gameState.flippedCards;
        
        if (getCardSymbol(card1) === getCardSymbol(card2)) {
            // Match trovato!
            setTimeout(() => {
                markAsMatched(card1);
                markAsMatched(card2);
                gameState.matchedPairs++;
                updateStats();
                gameState.flippedCards = [];
                gameState.canFlip = true;

                if (gameState.matchedPairs === 8) {
                    endGame();
                }
                // Nel duel, se trova coppia CONTINUA a giocare (non cambia turno)
            }, 500);
        } else {
            // Nessun match
            setTimeout(() => {
                unflipCard(card1);
                unflipCard(card2);
                gameState.flippedCards = [];
                gameState.canFlip = true;
                
                // Nel duel, se NON trova coppia CAMBIA turno
                if (gameState.mode === 'duel') {
                    switchTurn();
                }
            }, 1000);
        }
    }
}

/**
 * Fine del gioco
 */
function endGame(): void {
    stopTimer();
    
    if (gameState.mode === 'challenge') {
        // Genera codice sfida
        const code = generateChallengeCode(gameState.seed, gameState.moves, gameState.time);
        showChallengeResult(gameState.moves, gameState.time, code, null);
        
    } else if (gameState.mode === 'challenge-join' && challengeData) {
        // Mostra confronto con sfidante
        showChallengeResult(gameState.moves, gameState.time, null, {
            challengerMoves: challengeData.moves,
            challengerTime: challengeData.time
        });
        
    } else if (gameState.mode === 'duel') {
        // Mostra risultato finale del duel
        showDuelResult(duelState.player1Moves, duelState.player2Moves);
    }
}

/**
 * Avvia una nuova sfida (modalità Challenge)
 */
export function startChallenge(): void {
    gameState.mode = 'challenge';
    gameState.seed = generateSeed();
    resetGameState();
    createCards('challengeCardsGrid', gameState.seed, handleCardClick);
    updateStats();
    showScreen('challengeGame');
    startTimer();
}

/**
 * Partecipa a una sfida esistente
 */
export function joinChallenge(): void {
    const input = document.getElementById('challengeCodeInput') as HTMLInputElement;
    const code = input?.value.trim().toUpperCase() || '';
    
    const decoded = decodeChallengeCode(code);
    
    if (!decoded) {
        showCodeError('❌ Codice non valido. Controlla e riprova.');
        return;
    }
    
    hideCodeError();
    
    gameState.mode = 'challenge-join';
    gameState.seed = decoded.seed;
    challengeData = decoded;
    
    resetGameState();
    createCards('challengeCardsGrid', gameState.seed, handleCardClick);
    updateStats();
    showScreen('challengeGame');
    startTimer();
}

/**
 * Avvia un duel locale
 */
export function startDuel(): void {
    gameState.mode = 'duel';
    duelState.currentPlayer = 1;
    duelState.player1Moves = 0;
    duelState.player2Moves = 0;
    duelState.seed = generateSeed();
    
    resetGameState();
    createCards('duelCardsGrid', duelState.seed, handleCardClick);
    setupPlayer1Turn();
    updateTurnIndicator(1);
    updateStats();
    showScreen('duelGame');
}

/**
 * Avvia il turno del giocatore 2 (per transizione)
 */
export function startPlayer2Turn(): void {
    // Questa funzione non è più necessaria per il duel a turni alternati
    // ma la manteniamo per compatibilità
}
