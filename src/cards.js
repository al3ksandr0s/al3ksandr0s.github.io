// Gestione delle carte del Memory Game

import { shuffleWithSeed } from './utils.js';

// Simboli carte da gioco classiche (più carine e riconoscibili)
export const CARD_SYMBOLS = ['🃏', '👑', '⭐', '🎯', '🔔', '💎', '🍀', '🌙'];

/**
 * Crea le carte nel grid specificato
 */
export function createCards(gridId, seed, onCardClick) {
    const grid = document.getElementById(gridId);
    if (!grid) return [];
    
    grid.innerHTML = '';
    
    const cardPairs = [...CARD_SYMBOLS, ...CARD_SYMBOLS];
    const shuffledCards = shuffleWithSeed(cardPairs, seed);
    
    shuffledCards.forEach(function(symbol, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index.toString();
        card.dataset.symbol = symbol;
        card.innerHTML = '<div class="card-inner"><div class="card-face card-front"></div><div class="card-face card-back">' + symbol + '</div></div>';
        card.addEventListener('click', function() { onCardClick(card); });
        grid.appendChild(card);
    });
    
    return shuffledCards;
}

/**
 * Gira una carta (aggiunge classe flipped)
 */
export function flipCard(card) {
    card.classList.add('flipped');
}

/**
 * Nasconde una carta (rimuove classe flipped)
 */
export function unflipCard(card) {
    card.classList.remove('flipped');
}

/**
 * Segna una carta come matchata
 */
export function markAsMatched(card) {
    card.classList.add('matched');
}

/**
 * Controlla se una carta è già girata o matchata
 */
export function isCardPlayable(card) {
    return !card.classList.contains('flipped') && !card.classList.contains('matched');
}

/**
 * Ottiene il simbolo di una carta
 */
export function getCardSymbol(card) {
    return card.dataset.symbol || '';
}
