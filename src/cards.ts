// Gestione delle carte del Memory Game

import { shuffleWithSeed } from './utils';

// Simboli carte da gioco classiche (più carine e riconoscibili)
export const CARD_SYMBOLS = ['🃏', '👑', '⭐', '🎯', '🔔', '💎', '🍀', '🌙'];

export type CardClickHandler = (card: HTMLElement) => void;

/**
 * Crea le carte nel grid specificato
 */
export function createCards(gridId: string, seed: number, onCardClick: CardClickHandler): string[] {
    const grid = document.getElementById(gridId);
    if (!grid) return [];
    
    grid.innerHTML = '';
    
    const cardPairs = [...CARD_SYMBOLS, ...CARD_SYMBOLS];
    const shuffledCards = shuffleWithSeed(cardPairs, seed);
    
    shuffledCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index.toString();
        card.dataset.symbol = symbol;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front"></div>
                <div class="card-face card-back">${symbol}</div>
            </div>
        `;
        card.addEventListener('click', () => onCardClick(card));
        grid.appendChild(card);
    });
    
    return shuffledCards;
}

/**
 * Gira una carta (aggiunge classe flipped)
 */
export function flipCard(card: HTMLElement): void {
    card.classList.add('flipped');
}

/**
 * Nasconde una carta (rimuove classe flipped)
 */
export function unflipCard(card: HTMLElement): void {
    card.classList.remove('flipped');
}

/**
 * Segna una carta come matchata
 */
export function markAsMatched(card: HTMLElement): void {
    card.classList.add('matched');
}

/**
 * Controlla se una carta è già girata o matchata
 */
export function isCardPlayable(card: HTMLElement): boolean {
    return !card.classList.contains('flipped') && !card.classList.contains('matched');
}

/**
 * Ottiene il simbolo di una carta
 */
export function getCardSymbol(card: HTMLElement): string {
    return card.dataset.symbol || '';
}
