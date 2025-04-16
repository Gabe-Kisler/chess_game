export function setupMoveHandlers(validMoves, turn_color, sourceSquare) {
    // First remove any existing move handlers
    clearMoveHandlers();
    
    // Store the created handlers for later cleanup
    window.currentMoveHandlers = [];
    
    // Add handlers to each valid move square
    validMoves.forEach(targetSquare => {
        const squareElement = document.getElementById(targetSquare);
        
        if (squareElement) {
            const moveHandler = function() {
                // Clear highlights
                removeHighlight();
                
                // Call takeTurn with the selected move
                takeTurn(validMoves, turn_color, sourceSquare, targetSquare);
                
                // Clear all move handlers after move is made
                clearMoveHandlers();
                
                // Reset piece selection
                window.pieceSelected = null;
            };
            
            squareElement.addEventListener('click', moveHandler);
            
            // Store handler for later removal
            window.currentMoveHandlers.push({
                element: squareElement,
                handler: moveHandler
            });
        }
    });
}

/**
 * Removes all move handlers to clean up
 */
export function clearMoveHandlers() {
    if (window.currentMoveHandlers && window.currentMoveHandlers.length > 0) {
        window.currentMoveHandlers.forEach(({ element, handler }) => {
            element.removeEventListener('click', handler);
        });
        window.currentMoveHandlers = [];
    }
}