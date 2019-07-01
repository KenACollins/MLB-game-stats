// This is a display module, the view in an MVC design pattern.
import { getRequestedDate, getUserFriendlyDateFromApiDate } from './utilities/dateUtils.js';

const API_UNFOCUSED_IMAGE_INDEX = 16;           // From API: Image cut in index position 16 matches what we want for unfocused game cells: 209 x 118px.
const API_FOCUSED_IMAGE_INDEX = 12;             // From API: Image cut in index position 12 matches what we want for focused game cells: 320 x 180px.
const UNFOCUSED_IMAGE_WIDTH = '209px';
const UNFOCUSED_IMAGE_HEIGHT = '118px';
const FOCUSED_IMAGE_WIDTH = '320px';
const FOCUSED_IMAGE_HEIGHT = '180px';
const MAX_GAME_CELLS_PER_ROW = 7;               // Based on the sizes chosen for the game cells, this is the number that fit on a 1080 screen.
const GAME_CAPTIONS_ID_PREFIX = 'captions';     // Unique string prepended along with the index position of the game captions being added to the DOM.
const GAME_IMAGE_ID_PREFIX = 'image';           // Unique string prepended along with the index position of the game image being added to the DOM.

class StatsList {

    constructor(controller) {
        this.controller = controller;           // We are passed a reference to our caller. Save it in an instance variable.                   
        this.currentDate = new Date();          // Default to retrieving MLB statistics for the current date.
        this.currentIndex = 0;                  // Focus will begin with first game of the day.
        this.maxIndex = -1;                     // Will hold the last index of the last game. If there 15 games, this will be 14.
        this.gamesMetadata = [];                // Array of objects containing the metadata we are capturing from the API.
        this.isModalDisplayed = false;          // Boolean flag indicating whether the detailed overlay is present or not.
        this.data = null;                       // Instance variable holding the complete JSON data object returned by the API.
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
                gameCaptions.id = `${GAME_CAPTIONS_ID_PREFIX}${gameIndex}`;     // Example: captions0 or captions14.
                gameCaptions.classList.add('gameCaptions', 'hiddenCaption');     // COMPATIBILITY WARNING: IE does not support adding multiple CSS classes in one line.
                let homeTeamNode = document.createElement('p');
                //homeTeamNode.classList.add('hiddenCaption');
                let homeTeamText = document.createTextNode(`${this.gamesMetadata[gameIndex].homeTeam.name}: ${this.gamesMetadata[gameIndex].homeTeam.score}`);
                homeTeamNode.appendChild(homeTeamText);
                gameCaptions.appendChild(homeTeamNode);
                let awayTeamNode = document.createElement('p');
                //awayTeamNode.classList.add('hiddenCaption');
                let awayTeamText = document.createTextNode(`${this.gamesMetadata[gameIndex].awayTeam.name}: ${this.gamesMetadata[gameIndex].awayTeam.score}`);
                awayTeamNode.appendChild(awayTeamText);
                gameCaptions.appendChild(awayTeamNode);
                let gameImage = document.createElement('div');
                gameImage.classList.add('gameImage');
                gameImage.id = `${GAME_IMAGE_ID_PREFIX}${gameIndex}`;     // Example: image0 or image14.

                if (game.content && game.content.editorial && game.content.editorial.recap && 
                    game.content.editorial.recap.mlb && game.content.editorial.recap.mlb.image && 
                    game.content.editorial.recap.mlb.image.cuts) 
                {
                    countRecaps++;
                    let desiredImageSrc = game.content.editorial.recap.mlb.image.cuts[15].src;
                    let imageElement = document.createElement('img')
                    imageElement.src = desiredImageSrc;
                    gameImage.appendChild(imageElement);
                }
                
                gameCaptions.appendChild(gameImage);

                let headlineNode = document.createElement('p');
                headlineNode.classList.add('desc');
                //headlineNode.classList.add('hiddenCaption');
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

        // Apply focus to the first game.
        this.addGameRowFocus();
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
        //console.log('In StatsList disp mod onKeyPress:', eventKeyName);
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
            case 'Enter':
                // TODO: Process.    
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
        let nextIndex = null;

        switch (eventKeyName) {
            case 'ArrowLeft':
                nextIndex = this.currentIndex - 1;
                break;
            case 'ArrowRight':
                nextIndex = this.currentIndex + 1;
                break;
            case 'ArrowUp':
                if (this.currentIndex - MAX_GAME_CELLS_PER_ROW >= 0) {
                    nextIndex = this.currentIndex - MAX_GAME_CELLS_PER_ROW;
                }
                break;
            case 'ArrowDown':
                if (this.currentIndex + MAX_GAME_CELLS_PER_ROW <= this.maxIndex) {
                    nextIndex = this.currentIndex + MAX_GAME_CELLS_PER_ROW;
                }
                break;
            default:
                return false;
        }

        // If we are moving to a new game cell, remove the current focus and add it to the next one
        // gaining focus. Otherwise, we have clicked farther than we can go. Keep the focus we have.
        if (nextIndex !== null) {
            this.removeGameRowFocus();
            this.currentIndex = nextIndex;
            this.addGameRowFocus();
        }
    }

    removeGameRowFocus() {
        // Hide the captions above and below the game image.
        let nextGameCaptions = document.getElementById(`${GAME_CAPTIONS_ID_PREFIX}${this.currentIndex}`);
        nextGameCaptions.classList.add('hiddenCaption');

        // Restore original image size.
        let nextGameImage = document.getElementById(`${GAME_IMAGE_ID_PREFIX}${this.currentIndex}`);
        nextGameImage.style.width = UNFOCUSED_IMAGE_WIDTH;
        nextGameImage.style.height = UNFOCUSED_IMAGE_HEIGHT;

        // Remove border around game.
        nextGameImage.style.removeProperty('border');

        // Restore original headline width so it wraps in a more compact space.
        let headlineNode = nextGameImage.nextSibling;
        headlineNode.style.width = UNFOCUSED_IMAGE_WIDTH;
    }

    addGameRowFocus() {
        // Show the captions above and below the game image.
        let nextGameCaptions = document.getElementById(`${GAME_CAPTIONS_ID_PREFIX}${this.currentIndex}`);
        nextGameCaptions.classList.remove('hiddenCaption');

        // Increase size of game image by 150%.
        let nextGameImage = document.getElementById(`${GAME_IMAGE_ID_PREFIX}${this.currentIndex}`);
        nextGameImage.style.width = FOCUSED_IMAGE_WIDTH;
        nextGameImage.style.height = FOCUSED_IMAGE_HEIGHT;

        // Add a border around game gaining focus.
        nextGameImage.style.border = 'solid 5px red';

        // Increase width of headline below image so it has more room and less line wrapping.
        let headlineNode = nextGameImage.nextSibling;
        headlineNode.style.width = FOCUSED_IMAGE_WIDTH;
    }

    /**
     * For DOM element IDs consisting of a string followed by a number that corresponds to the 
     * index position of the game in the API data, extract the index number. For example, if passed
     * an ID of 'caption7' the method will return 7 as a number.
     * @param {String} id 
     */
    getIndexFromId(id) {
        return new Number(id.replace(/\D/g, '')).valueOf();
    }

}

export default StatsList;