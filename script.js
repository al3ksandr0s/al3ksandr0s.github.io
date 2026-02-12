// Main entry point - inizializza il gioco e collega gli eventi

import { showScreen, createFloatingHearts, copyCodeToClipboard } from './src/ui.js';
import { startChallenge, joinChallenge, startDuel } from './src/game.js';

/**
 * Inizializza tutti gli event listener
 */
function initEventListeners() {
    // Menu principale
    var challengeModeBtn = document.getElementById('challengeModeBtn');
    var duelModeBtn = document.getElementById('duelModeBtn');
    
    if (challengeModeBtn) {
        challengeModeBtn.addEventListener('click', function() { showScreen('challengeMenu'); });
    }
    if (duelModeBtn) {
        duelModeBtn.addEventListener('click', function() { showScreen('duelSetup'); });
    }
    
    // Challenge menu
    var createChallengeBtn = document.getElementById('createChallengeBtn');
    var joinChallengeBtn = document.getElementById('joinChallengeBtn');
    var backToMenuBtn1 = document.getElementById('backToMenuBtn1');
    
    if (createChallengeBtn) {
        createChallengeBtn.addEventListener('click', startChallenge);
    }
    if (joinChallengeBtn) {
        joinChallengeBtn.addEventListener('click', function() { showScreen('enterCode'); });
    }
    if (backToMenuBtn1) {
        backToMenuBtn1.addEventListener('click', function() { showScreen('menuScreen'); });
    }
    
    // Enter code screen
    var startChallengeBtn = document.getElementById('startChallengeBtn');
    var backToChallengeMenuBtn = document.getElementById('backToChallengeMenuBtn');
    
    if (startChallengeBtn) {
        startChallengeBtn.addEventListener('click', joinChallenge);
    }
    if (backToChallengeMenuBtn) {
        backToChallengeMenuBtn.addEventListener('click', function() { showScreen('challengeMenu'); });
    }
    
    // Duel setup
    var startDuelBtn = document.getElementById('startDuelBtn');
    var backToMenuBtn2 = document.getElementById('backToMenuBtn2');
    
    if (startDuelBtn) {
        startDuelBtn.addEventListener('click', startDuel);
    }
    if (backToMenuBtn2) {
        backToMenuBtn2.addEventListener('click', function() { showScreen('menuScreen'); });
    }
    
    // Challenge result
    var copyCodeBtn = document.getElementById('copyCodeBtn');
    var backToMenuBtn3 = document.getElementById('backToMenuBtn3');
    
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', copyCodeToClipboard);
    }
    if (backToMenuBtn3) {
        backToMenuBtn3.addEventListener('click', function() { showScreen('menuScreen'); });
    }
    
    // Duel result
    var rematchBtn = document.getElementById('rematchBtn');
    var backToMenuBtn4 = document.getElementById('backToMenuBtn4');
    
    if (rematchBtn) {
        rematchBtn.addEventListener('click', startDuel);
    }
    if (backToMenuBtn4) {
        backToMenuBtn4.addEventListener('click', function() { showScreen('menuScreen'); });
    }
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
