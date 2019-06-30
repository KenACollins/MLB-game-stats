// This is a display module, the view in an MVC design pattern.
import { getRequestedDate, getUserFriendlyDateFromApiDate } from './utilities/dateUtils.js';

class StatsList {
    constructor(controller) {
        this.controller = controller;
        this.currentDate = new Date();
        this.currentIndex = 0;
        this.maxIndex = null;
        this.gamesMetadata = [];
        this.isModalDisplayed = false;
        this.data = null;
    }
    
    /**
     * The Controller invokes this method the first and every time the stats list grid is launched.  Initial setup is performed here.
     */
    onCreate() {
        // Make initial call to API for yesterday's date. Wait for results before building screen.
        const offsetDayCount = -1;
        this.currentDate = getRequestedDate(offsetDayCount, this.currentDate);
        this.controller.requestData(this, 'receiveStatsData', 'getStats', this.currentDate);
    }
    
    /**
     * The Controller invokes this method when asynchronous MLB stats data has been retrieved.
     * @param {Object} result - JSON object containing MLB stats data. 
     */
    receiveStatsData(result) {
        console.log('In display mod receiveStatsData(), result is:', result);
        // Update our instance variable with the data returned by the Controller.
        this.data = result;
        
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
        if (!this.data) { return; }

        const rootElement = document.createElement('div');
        rootElement.classList.add('bgImage');
        const gamesContainer = document.createElement('div');
        gamesContainer.classList.add('gamesContainer');
        const header = document.createElement('h4');
        const gamesRow = document.createElement('div');
        gamesRow.classList.add('gamesRow');
        let headerText = null;
        if (this.data.totalGames === 0) {
            headerText = document.createTextNode("We're sorry, there is no data available for the date you requested.");
        }
        else {
            this.maxIndex = this.data.totalGames - 1;
            let gameIndex = -1;
            let countRecaps = 0;
            this.data.dates[0].games.forEach(game => {
                this.storeMetadata(game);
                gameIndex++;
                let gameCaptions = document.createElement('div');
                gameCaptions.classList.add('gameCaptions');
                let homeTeamNode = document.createElement('p');
                homeTeamNode.classList.add('hiddenCaption');
                let homeTeamText = document.createTextNode(`${this.gamesMetadata[gameIndex].homeTeam.name}: ${this.gamesMetadata[gameIndex].homeTeam.score}`);
                homeTeamNode.appendChild(homeTeamText);
                gameCaptions.appendChild(homeTeamNode);
                let awayTeamNode = document.createElement('p');
                awayTeamNode.classList.add('hiddenCaption');
                let awayTeamText = document.createTextNode(`${this.gamesMetadata[gameIndex].awayTeam.name}: ${this.gamesMetadata[gameIndex].awayTeam.score}`);
                awayTeamNode.appendChild(awayTeamText);
                gameCaptions.appendChild(awayTeamNode);
                let gameCell = document.createElement('div');
                gameCell.classList.add('gameCell');
                gameCell.id = gameIndex;

                if (game.content && game.content.editorial && game.content.editorial.recap && 
                    game.content.editorial.recap.mlb && game.content.editorial.recap.mlb.image && 
                    game.content.editorial.recap.mlb.image.cuts) 
                {
                    countRecaps++;
                    let desiredImageSrc = game.content.editorial.recap.mlb.image.cuts[15].src;
                    let imageElement = document.createElement('img')
                    imageElement.src = desiredImageSrc;
                    gameCell.appendChild(imageElement);
                }
                
                gameCaptions.appendChild(gameCell);

                let headlineNode = document.createElement('p');
                headlineNode.classList.add('desc');
                headlineNode.classList.add('hiddenCaption');
                let headlineText = document.createTextNode(this.gamesMetadata[gameIndex].headline);
                headlineNode.appendChild(headlineText);
                gameCaptions.appendChild(headlineNode);
                gamesRow.appendChild(gameCaptions);
            });
            
            //console.log('gamesMetadata array', this.gamesMetadata);
            headerText = document.createTextNode(`Stats for ${getUserFriendlyDateFromApiDate(this.data.dates[0].date)}: ${this.data.totalGames} total games, ${countRecaps} editorial recaps available:`);
        }
        header.appendChild(headerText);
        gamesContainer.appendChild(header);
        gamesContainer.appendChild(gamesRow);
        rootElement.appendChild(gamesContainer);
        document.body.appendChild(rootElement);
    }

    storeMetadata(game) {
        let metadataObj = {homeTeam: {name: '', score: ''}, awayTeam: {name: '', score: ''}, headline: ''};
        // Home Team
        if (game.teams && game.teams.home && game.teams.home.team && game.teams.home.team.name) {
            metadataObj.homeTeam.name = game.teams.home.team.name;
        }
        if (game.teams && game.teams.home && typeof game.teams.home.score !== undefined) {
            metadataObj.homeTeam.score = game.teams.home.score;
        }

        // Away Team
        if (game.teams && game.teams.away && game.teams.away.team && game.teams.away.team.name) {
            metadataObj.awayTeam.name = game.teams.away.team.name;
        }
        if (game.teams && game.teams.away && typeof game.teams.away.score !== undefined) {  // Zero score is falsy but we want to record shutouts.
            metadataObj.awayTeam.score = game.teams.away.score;
        }

        // Headline
        if (game.content && game.content.editorial && game.content.editorial.recap && 
            game.content.editorial.recap.mlb && game.content.editorial.recap.mlb.headline) 
        {
            metadataObj.headline = game.content.editorial.recap.mlb.headline;
        }

        this.gamesMetadata.push(metadataObj);
    }

    /**
     * The Controller invokes this method any time it receives a key press.
     * @param {String} eventKeyName - Name of key pressed, eg., ArrowLeft, ArrowRight, Escape.
     */
    onKeyPress(eventKeyName) {
        console.log('In StatsList disp mod onKeyPress:', eventKeyName);
        switch (eventKeyName) {
            case 'ArrowLeft':
                if (this.currentIndex === 0) { return false; }
                else { this.updateFocus(eventKeyName); }
                break;
            case 'ArrowRight': 
                if (this.currentIndex === this.maxIndex) { return false; }
                else { this.updateFocus(eventKeyName); }
                break;
            case 'ArrowUp':
                // TODO: Logic to check if at top of module, return false. Else...
                this.updateFocus(eventKeyName);
                break;
            case 'ArrowDown':
                // TODO: Logic to check if at bottom of module, return false. Else...
                this.updateFocus(eventKeyName);
                break;
            case 'Escape':
                if (this.isModalDisplayed) {
                    // TODO: Remove details modal dialog if displayed.
                }
                break;
            default:
                return false;    
        }
    }

    /**
     * After the display module has focus, it will call this internal method to remove focus from the div
     * that is currently focused and to grant focus to the div we are moving toward. 
     * @param {String} eventKeyName - Name of key pressed, eg., ArrowLeft, ArrowRight, Escape.
     */
    updateFocus(eventKeyName) {
        /**
         * Notes to self:
         * 7 games per row before wrapping so...
         * o If press up and index ID of game is greater than 7, subtract 7 to get the ID of the div to gain focus. Else, ignore key press.
         * o If press down and index ID of game + 7 is less than this.maxIndex, then add 7 to current index ID to get the new div to gain focus.
         */
        switch (eventKeyName) {
            case 'ArrowLeft':
                break;
            case 'ArrowRight':
                this.currentIndex++;
                let nextElement = document.getElementById(this.currentIndex);
                let focusedElementStyles = getComputedStyle(nextElement);
                //console.log('focusedElementStyles', focusedElementStyles);
                let previousWidth = focusedElementStyles.width;
                let previousHeight = focusedElementStyles.height;
                console.log('previousWidth', previousWidth);
                console.log('previousHeight', previousHeight);
                nextElement.style.width = (parseFloat(previousWidth, 10) * 1.5) + 'px';
                nextElement.style.height = (parseFloat(previousHeight, 10) * 1.5) + 'px';
                nextElement.style.border = 'solid 5px red';
                let headlineNode = nextElement.nextSibling;
                headlineNode.style.width = (parseFloat(previousWidth, 10) * 1.5) + 'px';
                headlineNode.classList.remove('hiddenCaption');
                let awayElement = nextElement.previousSibling;
                awayElement.classList.remove('hiddenCaption');
                let homeElement = nextElement.previousSibling.previousSibling;
                homeElement.classList.remove('hiddenCaption');
                break;
            default:
                return false;
        }
    }

}

export default StatsList;