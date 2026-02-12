// Gestione UI e schermate

/**
 * Mostra una schermata specifica nascondendo le altre
 */
export function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

/**
 * Crea elementi decorativi nello sfondo
 */
export function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    if (!container) return;
    
    const symbols = ['♠', '♥', '♦', '♣', '⭐', '✦', '◆', '●'];
    
    for (let i = 0; i < 12; i++) {
        const element = document.createElement('div');
        element.className = 'floating-heart';
        element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 10 + 's';
        element.style.animationDuration = (8 + Math.random() * 6) + 's';
        element.style.fontSize = (12 + Math.random() * 16) + 'px';
        container.appendChild(element);
    }
}

/**
 * Aggiorna le statistiche di gioco nella UI
 */
export function updateChallengeStats(moves, time, matchedPairs) {
    const movesEl = document.getElementById('movesCount');
    const timeEl = document.getElementById('timeCount');
    const pairsEl = document.getElementById('pairsCount');
    
    if (movesEl) movesEl.textContent = moves.toString();
    if (timeEl) timeEl.textContent = time + 's';
    if (pairsEl) pairsEl.textContent = matchedPairs + '/8';
}

/**
 * Aggiorna le statistiche del duel nella UI
 */
export function updateDuelStats(currentPlayer, player1Moves, player2Moves, matchedPairs) {
    const player1MovesEl = document.getElementById('player1Moves');
    const player2MovesEl = document.getElementById('player2Moves');
    const pairsEl = document.getElementById('duelPairsCount');
    
    if (player1MovesEl) player1MovesEl.textContent = player1Moves.toString();
    if (player2MovesEl) player2MovesEl.textContent = player2Moves.toString();
    if (pairsEl) pairsEl.textContent = matchedPairs + '/8';
}

/**
 * Aggiorna l'indicatore del turno
 */
export function updateTurnIndicator(currentPlayer) {
    const indicator = document.getElementById('turnIndicator');
    if (indicator) {
        if (currentPlayer === 1) {
            indicator.textContent = '🎮 Turno: Giocatore 1';
            indicator.style.background = 'linear-gradient(135deg, #e94560, #c23a51)';
        } else {
            indicator.textContent = '🎮 Turno: Giocatore 2';
            indicator.style.background = 'linear-gradient(135deg, #6c5ce7, #5541d7)';
        }
    }
}

/**
 * Mostra il risultato della sfida
 */
export function showChallengeResult(moves, time, code, comparison) {
    const resultTitle = document.getElementById('resultTitle');
    const finalMoves = document.getElementById('finalMoves');
    const finalTime = document.getElementById('finalTime');
    const generatedCode = document.getElementById('generatedCode');
    const codeDisplay = document.getElementById('codeDisplay');
    const challengeComparison = document.getElementById('challengeComparison');
    const comparisonResult = document.getElementById('comparisonResult');
    
    if (finalMoves) finalMoves.textContent = moves.toString();
    if (finalTime) finalTime.textContent = time + 's';
    
    if (code && generatedCode && codeDisplay) {
        // Modalità creazione sfida
        if (resultTitle) resultTitle.textContent = '🎉 Complimenti!';
        codeDisplay.textContent = code;
        generatedCode.classList.add('visible');
        if (challengeComparison) challengeComparison.classList.remove('visible');
    } else if (comparison && comparisonResult && challengeComparison) {
        // Modalità risposta sfida
        if (generatedCode) generatedCode.classList.remove('visible');
        challengeComparison.classList.add('visible');
        
        let comparisonText = '';
        if (moves < comparison.challengerMoves) {
            comparisonText = '🏆 HAI VINTO! Hai fatto ' + (comparison.challengerMoves - moves) + ' mosse in meno del tuo amico!';
            if (resultTitle) resultTitle.textContent = '🏆 Vittoria!';
        } else if (moves > comparison.challengerMoves) {
            comparisonText = '😢 Hai perso! Il tuo amico ha fatto ' + (moves - comparison.challengerMoves) + ' mosse in meno.';
            if (resultTitle) resultTitle.textContent = '💔 Sconfitta';
        } else {
            comparisonText = '🤝 Pareggio! Entrambi avete fatto ' + moves + ' mosse!';
            if (resultTitle) resultTitle.textContent = '🤝 Pareggio!';
        }
        comparisonText += '<br><br>Tu: ' + moves + ' mosse in ' + time + 's<br>Amico: ' + comparison.challengerMoves + ' mosse in ' + comparison.challengerTime + 's';
        
        comparisonResult.innerHTML = comparisonText;
    }
    
    showScreen('challengeResult');
}

/**
 * Mostra la schermata di transizione del duel (non più usata)
 */
export function showDuelTransition(player1Moves) {
    const p1TransitionMoves = document.getElementById('p1TransitionMoves');
    if (p1TransitionMoves) {
        p1TransitionMoves.textContent = player1Moves.toString();
    }
    showScreen('duelTransition');
}

/**
 * Mostra il risultato finale del duel
 */
export function showDuelResult(player1Moves, player2Moves) {
    const p1FinalMoves = document.getElementById('p1FinalMoves');
    const p2FinalMoves = document.getElementById('p2FinalMoves');
    const duelResultTitle = document.getElementById('duelResultTitle');
    const p1Result = document.getElementById('p1Result');
    const p2Result = document.getElementById('p2Result');
    const p1Badge = document.getElementById('p1Badge');
    const p2Badge = document.getElementById('p2Badge');
    
    if (p1FinalMoves) p1FinalMoves.textContent = player1Moves.toString();
    if (p2FinalMoves) p2FinalMoves.textContent = player2Moves.toString();
    
    if (p1Result) p1Result.classList.remove('winner');
    if (p2Result) p2Result.classList.remove('winner');
    
    // Chi ha fatto MENO mosse vince
    if (player1Moves < player2Moves) {
        if (duelResultTitle) duelResultTitle.textContent = '🏆 Giocatore 1 Vince!';
        if (p1Badge) p1Badge.textContent = '🏆';
        if (p2Badge) p2Badge.textContent = '';
        if (p1Result) p1Result.classList.add('winner');
    } else if (player2Moves < player1Moves) {
        if (duelResultTitle) duelResultTitle.textContent = '🏆 Giocatore 2 Vince!';
        if (p1Badge) p1Badge.textContent = '';
        if (p2Badge) p2Badge.textContent = '🏆';
        if (p2Result) p2Result.classList.add('winner');
    } else {
        if (duelResultTitle) duelResultTitle.textContent = '🤝 Pareggio!';
        if (p1Badge) p1Badge.textContent = '🤝';
        if (p2Badge) p2Badge.textContent = '🤝';
    }
    
    showScreen('duelResult');
}

/**
 * Prepara la UI per il turno del giocatore 2
 */
export function setupPlayer2Turn() {
    const player1Stat = document.getElementById('player1Stat');
    const player2Stat = document.getElementById('player2Stat');
    
    if (player1Stat) player1Stat.classList.remove('active');
    if (player2Stat) player2Stat.classList.add('active');
}

/**
 * Prepara la UI per il turno del giocatore 1
 */
export function setupPlayer1Turn() {
    const player1Stat = document.getElementById('player1Stat');
    const player2Stat = document.getElementById('player2Stat');
    
    if (player1Stat) player1Stat.classList.add('active');
    if (player2Stat) player2Stat.classList.remove('active');
}

/**
 * Mostra un errore nel campo codice
 */
export function showCodeError(message) {
    const errorEl = document.getElementById('codeError');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
    }
}

/**
 * Nasconde l'errore del campo codice
 */
export function hideCodeError() {
    const errorEl = document.getElementById('codeError');
    if (errorEl) {
        errorEl.classList.remove('visible');
    }
}

/**
 * Copia il codice negli appunti
 */
export async function copyCodeToClipboard() {
    const codeDisplay = document.getElementById('codeDisplay');
    const copyBtn = document.getElementById('copyCodeBtn');
    
    if (codeDisplay && copyBtn) {
        try {
            await navigator.clipboard.writeText(codeDisplay.textContent || '');
            copyBtn.textContent = '✅ Copiato!';
            setTimeout(function() {
                copyBtn.textContent = '📋 Copia Codice';
            }, 2000);
        } catch (e) {
            console.error('Failed to copy code');
        }
    }
}
