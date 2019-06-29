class StatsList {
    constructor(controller) {
        this.controller = controller;
        this.currentDate = new Date();
        this.currentIndex = 0;
        this.isModalDisplayed = false;
        this.data = null;
    }

    /**
     * The Controller invokes this method the first and every time the stats list grid is launched.  Initial setup is performed here.
     */
    onCreate() {
        // Make initial call to API for the current date. Store results in data instance variable.
        this.data = this.controller.getData('getStats', 0, this.currentDate);

        // Build the UI.
        this.buildDateButtons();
        this.buildGrid();
    }

    /**
     * Adds previous and next date buttons to the screen allowing for other stats to be loaded.
     */
    buildDateButtons() {
        // Extra credit feature.
    }

    /**
     * Builds the main part of the UI, the statistics grid.
     */
    buildGrid() {

    }

    /**
     * The Controller invokes this method any time it receives a key press.
     * @param {String} eventKeyName - Name of key pressed, eg., ArrowLeft, ArrowRight, Escape.
     */
    onKeyPress(eventKeyName) {
        switch (eventKeyName) {
            case 'ArrowLeft':
                if (this.currentIndex === 0) { return false; }
                else { this.updateFocus(eventKeyName); }
                break;
            case 'ArrowRight': 
                // If this.currentIndex === last game index (this.data.dates[0].games.length - 1)
                // return false, else...
                this.updateFocus(eventKeyName);
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                // TODO: Relevant once I add support for going up to and down from date buttons.
                return false;
                break;
            case 'Escape':
                if (this.isModalDisplayed) {
                    // TODO: Remove details modal dialog if displayed.
                }
            default:
                return false;    
        }
    }

    /**
     * After the display module has focus, it will call this internal method when a left or right arrow key is pressed, to: 
         * (A) shift the grid over one game cell, 
         * (B) remove focus from the previous game cell and add it to the newly focused game cell. 
     * @param {String} eventKeyName - Name of key pressed, eg., ArrowLeft, ArrowRight, Escape.
     */
    updateFocus(eventKeyName) {

    }
}

export default StatsList;