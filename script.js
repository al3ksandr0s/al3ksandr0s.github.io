// Main entry point - inizializza il gioco e collega gli eventi

import { showScreen, createFloatingHearts, copyCodeToClipboard } from './src/ui.js';
import { startChallenge, joinChallenge, startDuel } from './src/game.js';

/**
 * Inizializza tutti gli event listener
 */
function initEventListeners() {
    // Menu principale
    document.getElementById('challengeModeBtn')?.addEventListener('click', () => showScreen('challengeMenu'));
    document.getElementById('duelModeBtn')?.addEventListener('click', () => showScreen('duelSetup'));
    
    // Challenge menu
    document.getElementById('createChallengeBtn')?.addEventListener('click', startChallenge);
    document.getElementById('joinChallengeBtn')?.addEventListener('click', () => showScreen('enterCode'));
    document.getElementById('backToMenuBtn1')?.addEventListener('click', () => showScreen('menuScreen'));
    
    // Enter code screen
    document.getElementById('startChallengeBtn')?.addEventListener('click', joinChallenge);
    document.getElementById('backToChallengeMenuBtn')?.addEventListener('click', () => showScreen('challengeMenu'));
    
    // Duel setup
    document.getElementById('startDuelBtn')?.addEventListener('click', startDuel);
    document.getElementById('backToMenuBtn2')?.addEventListener('click', () => showScreen('menuScreen'));
    
    // Challenge result
    document.getElementById('copyCodeBtn')?.addEventListener('click', copyCodeToClipboard);
    document.getElementById('backToMenuBtn3')?.addEventListener('click', () => showScreen('menuScreen'));
    
    // Duel result
    document.getElementById('rematchBtn')?.addEventListener('click', startDuel);
    document.getElementById('backToMenuBtn4')?.addEventListener('click', () => showScreen('menuScreen'));
}

/**
 * Inizializza l'applicazione
 */
function init() {
    createFloatingHearts();
    initEventListeners();
}

// Avvia l'applicazione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', init);
