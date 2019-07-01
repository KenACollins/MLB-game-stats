// This is a display module, the view in an MVC design pattern.
import { getRequestedDate, getUserFriendlyDateFromApiDate } from './utilities/dateUtils.js';

// Index Constants
const API_UNFOCUSED_IMAGE_INDEX = 16;           // From API: Image cut in index position 16 matches what we want for unfocused game cells: 209 x 118px.
const API_FOCUSED_IMAGE_INDEX = 12;             // From API: Image cut in index position 12 matches what we want for focused game cells: 320 x 180px.

// Game Constants
const UNFOCUSED_IMAGE_WIDTH = '209px';
const UNFOCUSED_IMAGE_HEIGHT = '118px';
const FOCUSED_IMAGE_WIDTH = '320px';
const FOCUSED_IMAGE_HEIGHT = '180px';
const MAX_GAME_CELLS_PER_ROW = 7;               // Based on the sizes chosen for the game cells, this is the number that fit on a 1080 screen.
const NO_SCORE = 'No Score';

// ID Constants
const DISPLAY_MODULE_ID = 'gamesContainer';     // ID of the top level DOM element created by this display module, not to be confused with the true root
                                                // attached to body tag by the Controller which is passed to this display module.
const GAME_CAPTIONS_ID_PREFIX = 'captions';     // Unique string prepended along with the index position of the game captions being added to the DOM.
const GAME_IMAGE_ID_PREFIX = 'image';           // Unique string prepended along with the index position of the game image being added to the DOM.
const PREVIOUS_DATE_BUTTON_ID = 'prevDate';
const NEXT_DATE_BUTTON_ID = 'nextDate';
const DEFAULT_DATE_BUTTON_ID = 'prevDate';      // ID of the date button that will gain focus by default on an up key press from the grid. 

class StatsList {

    constructor(controller, rootElement) {
        this.controller = controller;           // We are passed a reference to the Controller object so that we can invoke its requestData() method.
        this.rootElement = rootElement;         // We are passed a reference to the root DOM element to which we will attach our display module.               
        this.currentDate = new Date();          // Defaut to retrieving MLB statistics for the current date.
        this.currentIndex = 0;                  // Focus will begin in the grid with first game of the day.
        this.maxIndex = -1;                     // Will hold the last index of the last game. Example: If there 15 games, this will be 14 (zero-based index).
        this.gamesMetadata = [];                // Array of objects containing the metadata we are capturing from the API.
        this.isModalDisplayed = false;          // Boolean flag indicating whether the detailed overlay is present or not.
        this.data = null;                       // Instance variable holding the complete JSON data object returned by the API.
        this.gridHasFocus = false;              // Boolean flag indicating if we are in the grid or in the date buttons sections of the screen.
        this.buttonIdHasFocus = '';             // Unique identifier of the date button that has focus when the grid is not in focus.
    }
    
    /**
     * The Controller invokes this method the first and every time the stats list grid is launched.  Initial setup is performed here.
     */
    onCreate() {
        // Make initial call to API for yesterday's date. Wait for results before building screen.
        //const offsetDayCount = -1;
        //this.currentDate = getRequestedDate(offsetDayCount, this.currentDate);
        this.controller.requestData(this, 'receiveStatsData', 'getStats', this.currentDate);
    }
    
    /**
     * The Controller invokes this method when asynchronous MLB stats data has been retrieved.
     * @param {Object} result - JSON object containing MLB stats data. 
     */
    receiveStatsData(result) {
        console.log('In display mod receiveStatsData(), result is:', result);
        this.data = result;         // Update our instance variable with the data returned by the Controller.
        this.buildDisplayModule();  // Build (or rebuild) the display module based on the newly retrieved data.

    }
    
    buildDisplayModule() {
        if (!this.data) { return; }
        
        // Delete previous state of the display module if the date buttons were clicked.
        const displayModuleTopElement = document.getElementById(DISPLAY_MODULE_ID);
        if (displayModuleTopElement !== null) {
            displayModuleTopElement.parentNode.removeChild(displayModuleTopElement);
            this.gamesMetadata.splice(0, this.gamesMetadata.length);    // Empty array of previous metadata.
        }
        
        // Estabish top level container for our display module.
        const gamesContainer = document.createElement('div');
        gamesContainer.id = DISPLAY_MODULE_ID;
        gamesContainer.classList.add('gamesContainer');
    
        // Add date buttons, header, and grid to top level container.
        gamesContainer.appendChild(this.buildDateButtons());
        gamesContainer.appendChild(this.buildHeader());
        gamesContainer.appendChild(this.buildGrid());
    
        // Add top level container to the screen.
        this.rootElement.appendChild(gamesContainer);
    
        // Apply focus.
        if (this.buttonIdHasFocus === '') {
            this.addGridFocus();
        }
        else {
            this.addDateButtonsFocus();
        }
    }
    
    /**
     * Adds previous and next date buttons to the screen allowing for other stats to be loaded.
     */
    buildDateButtons() {
        /*
        <a class="waves-effect waves-light btn-large"><i class="material-icons left">chevron_left</i>Previous Date</a>
        <a class="waves-effect waves-light btn-large"><i class="material-icons right">chevron_right</i>Next Date</a>
        */
        //=================
        // Create Container
        //=================
        // Define the container for the date buttons.
        const dateButtonsDiv = document.createElement('div');
        dateButtonsDiv.classList.add('dateButtons');

        //=====================
        // Previous Date Button
        //=====================
        // Define the previous date button. Apply material design styling.
        const prevDateButton = document.createElement('a');
        prevDateButton.id = PREVIOUS_DATE_BUTTON_ID;
        prevDateButton.classList.add('waves-effect', 'waves-light', 'btn-large');
        const prevDateButtonText = document.createTextNode('Previous Date');

        // Define the icon to be placed inside the previous date button.
        const iconLeft = document.createElement('i');
        iconLeft.classList.add('material-icons', 'left');
        const iconLeftText = document.createTextNode('chevron_left');
        iconLeft.appendChild(iconLeftText);

        // Insert child nodes within previous date button.
        prevDateButton.appendChild(iconLeft);
        prevDateButton.appendChild(prevDateButtonText);

        //=================
        // Next Date Button
        //=================
        // Define the next date button. Apply material design styling.
        const nextDateButton = document.createElement('a');
        nextDateButton.id = NEXT_DATE_BUTTON_ID;
        nextDateButton.classList.add('waves-effect', 'waves-light', 'btn-large');
        const nextDateButtonText = document.createTextNode('Next Date');

        // Define the icon to be placed inside the next date button.
        const iconRight = document.createElement('i');
        iconRight.classList.add('material-icons', 'right');
        const iconRightText = document.createTextNode('chevron_right');
        iconRight.appendChild(iconRightText);

        // Insert child nodes within next date button.
        nextDateButton.appendChild(iconRight);
        nextDateButton.appendChild(nextDateButtonText);

        //==============================
        // Finalize and Return Container
        //==============================
        // Add previous and next date buttons to container and return it to caller.
        dateButtonsDiv.appendChild(prevDateButton);
        dateButtonsDiv.appendChild(nextDateButton);
        return dateButtonsDiv;
    }

    /**
     * Builds the header that appears above the grid, for example:
     * "Stats for Sat Jun 29 2019: 15 total games, 15 editorial recaps available:".
     */
    buildHeader() {
        if (!this.data) { return null; }

        const header = document.createElement('h4');
        let headerText = null;
        
        if (this.data.totalGames === 0) {
            headerText = document.createTextNode("We're sorry, there is no data available for the date you requested.");
        }
        else {
            let countRecaps = 0;
            this.data.dates[0].games.forEach(game => {
                if (game.content && game.content.editorial && game.content.editorial.recap && game.content.editorial.recap.mlb) {
                    countRecaps++;
                }
            });
            headerText = document.createTextNode(`Stats for ${getUserFriendlyDateFromApiDate(this.data.dates[0].date)}: ${this.data.totalGames} total games, ${countRecaps} editorial recaps available:`);
        }

        header.appendChild(headerText);
        return header;
    }

    /**
     * Builds the main part of the UI, the statistics grid.
     */
    buildGrid() {
        if (!this.data || this.data.totalGames === 0) { return null; }

        const gamesRow = document.createElement('div');
        gamesRow.classList.add('gamesRow');

        this.currentIndex = 0;
        this.maxIndex = this.data.totalGames - 1;
        let gameIndex = -1;
        this.data.dates[0].games.forEach(game => {
            this.storeMetadata(game);
            gameIndex++;
            let gameCaptions = document.createElement('div');
            gameCaptions.id = `${GAME_CAPTIONS_ID_PREFIX}${gameIndex}`;     // Example: captions0 or captions14.
            gameCaptions.classList.add('gameCaptions', 'hiddenCaption');     // COMPATIBILITY WARNING: IE does not support adding multiple CSS classes in one line.
            let homeTeamNode = document.createElement('p');
            let homeTeamText = document.createTextNode(`${this.gamesMetadata[gameIndex].homeTeam.name}: ${this.gamesMetadata[gameIndex].homeTeam.score}`);
            homeTeamNode.appendChild(homeTeamText);
            gameCaptions.appendChild(homeTeamNode);
            let awayTeamNode = document.createElement('p');
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
                /**
                 * It is better to load the larger image size for the focused state and just shrink it when displaying it in smaller unfocused thumbnail
                 * state than to load the smaller image and stretch it for the larger state. The latter situation causes pixelation. However, this is not 
                 * a cut and dry solution - the proper approach depends on the requirements. In our case, the focused image size is only 150% of the 
                 * unfocused image size, so this 'load the larger image and shrink it for the thumbnail' approach works.
                 * 
                 * If instead, the focused image size were significantly larger than the thumbnail, like 500%, it could be a performance issue to load every
                 * game image at this much higher resolution. If there are 15 games, that is a lot of bandwidth to load images that the user may not choose
                 * to focus on. In a case like that, it might be preferable to just load all images in the unfocused thumbnail size and then only fetch the 
                 * larger size on demand when the user has shifted focus.
                 */
                let desiredImageSrc = game.content.editorial.recap.mlb.image.cuts[API_FOCUSED_IMAGE_INDEX].src;
                let imageElement = document.createElement('img')
                imageElement.src = desiredImageSrc;
                gameImage.appendChild(imageElement);
            }
            
            gameCaptions.appendChild(gameImage);

            let headlineNode = document.createElement('p');
            headlineNode.classList.add('desc');
            let headlineText = document.createTextNode(this.gamesMetadata[gameIndex].headline);
            headlineNode.appendChild(headlineText);
            gameCaptions.appendChild(headlineNode);
            gamesRow.appendChild(gameCaptions);
        });
        
        //console.log('gamesMetadata array', this.gamesMetadata);
        return gamesRow;
    }

    storeMetadata(game) {
        let metadataObj = {homeTeam: {name: '', score: ''}, awayTeam: {name: '', score: ''}, headline: ''};

        // Home Team
        if (game.teams && game.teams.home && game.teams.home.team && game.teams.home.team.name) {
            metadataObj.homeTeam.name = game.teams.home.team.name;
        }
        if (game.teams && game.teams.home) {
            if (typeof game.teams.home.score !== 'undefined') {
                metadataObj.homeTeam.score = game.teams.home.score;
            }
            else {
                metadataObj.homeTeam.score = NO_SCORE;
            }
        }

        // Away Team
        if (game.teams && game.teams.away && game.teams.away.team && game.teams.away.team.name) {
            metadataObj.awayTeam.name = game.teams.away.team.name;
        }
        if (game.teams && game.teams.away && typeof game.teams.away.score !== 'undefined') {  // Zero score is falsy but we want to record shutouts.
            metadataObj.awayTeam.score = game.teams.away.score;
        }
        if (game.teams && game.teams.away) {
            if (typeof game.teams.away.score !== 'undefined') {
                metadataObj.awayTeam.score = game.teams.away.score;
            }
            else {
                metadataObj.awayTeam.score = NO_SCORE;
            }
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
        // console.log('In StatsList disp mod onKeyPress:', eventKeyName);
        const removeFocusOnly = true;

        switch (eventKeyName) {
            case 'ArrowLeft':
                if (this.gridHasFocus) {
                    if (this.currentIndex === 0) { return false; }
                    else { this.updateGridFocus(eventKeyName); }
                }
                else {  // Date buttons have focus.
                    if (this.buttonIdHasFocus === PREVIOUS_DATE_BUTTON_ID) { return false; }
                    else { this.updateDateButtonsFocus(eventKeyName); }
                }
                break;
            case 'ArrowRight': 
                if (this.gridHasFocus) {
                    if (this.currentIndex === this.maxIndex) { return false; }
                    else { this.updateGridFocus(eventKeyName); }
                }
                else {  // Date buttons have focus.
                    if (this.buttonIdHasFocus === NEXT_DATE_BUTTON_ID) { return false; }
                    else { this.updateDateButtonsFocus(eventKeyName); }
                }
                break;
            case 'ArrowUp':
                if (this.gridHasFocus) {
                    if (this.currentIndex - MAX_GAME_CELLS_PER_ROW >= 0) {
                        this.updateGridFocus(eventKeyName);
                    }
                    else {  
                        this.updateGridFocus(eventKeyName, removeFocusOnly);
                        this.updateDateButtonsFocus(eventKeyName);
                    }
                }
                else {  // Date buttons have focus.
                    return false;
                }    
                break;
            case 'ArrowDown':
                if (this.gridHasFocus) {
                    if (this.currentIndex + MAX_GAME_CELLS_PER_ROW <= this.maxIndex) {
                        this.updateGridFocus(eventKeyName);
                    }
                    else {
                        return false;
                    }
                }
                else {  // Date buttons have focus.
                    this.updateDateButtonsFocus(eventKeyName);
                    this.updateGridFocus(eventKeyName);
                }
                break;
            case 'Enter':
                if (this.gridHasFocus) {
                    // TODO: Show modal dialog with details on the focused game.
                }
                else {  // Date buttons have focus.
                    if (this.buttonIdHasFocus === PREVIOUS_DATE_BUTTON_ID) {
                        // Retrieve data for the date BEFORE the one currently being displayed and then rebuild display module.
                        const offsetDayCount = -1;
                        this.currentDate = getRequestedDate(offsetDayCount, this.currentDate);
                        this.controller.requestData(this, 'receiveStatsData', 'getStats', this.currentDate);
                    }
                    else if (this.buttonIdHasFocus === NEXT_DATE_BUTTON_ID) {
                        // Retrieve data for the date AFTER the one currently being displayed and then rebuild display module.
                        const offsetDayCount = 1;
                        this.currentDate = getRequestedDate(offsetDayCount, this.currentDate);
                        this.controller.requestData(this, 'receiveStatsData', 'getStats', this.currentDate);
                    }
                }
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
     * After a key press is received by the display module, if the grid has or is gaining focus, 
     * this method will be called to remove focus from the game that is currently focused and to 
     * grant focus to the game the user is moving toward. 
     * @param {String} eventKeyName - One of the following keys: 'ArrowLeft', 'ArrowRight', 'ArrowUp', or 'ArrowDown'.
     * @param {Boolean} removeFocusOnly - If true, grid will lose focus so that date buttons can gain focus.
     */
    updateGridFocus(eventKeyName, removeFocusOnly = false) {
        let nextIndex = null;

        switch (eventKeyName) {
            case 'ArrowLeft':
                nextIndex = this.currentIndex - 1;
                break;
            case 'ArrowRight':
                nextIndex = this.currentIndex + 1;
                break;
            case 'ArrowUp':
                if (removeFocusOnly === false) {
                    nextIndex = this.currentIndex - MAX_GAME_CELLS_PER_ROW;
                }
                break;
            case 'ArrowDown':
                if (this.gridHasFocus) {
                    nextIndex = this.currentIndex + MAX_GAME_CELLS_PER_ROW;
                }
                else {  // Grid is gaining focus as user navigates down from date buttons.
                    nextIndex = this.currentIndex;  // Restore previously focused game index.
                }
                break;
            default:
                return false;
        }

        // We are definitely removing the current focus in the grid no matter what.
        this.removeGridFocus();
            
        // If we are moving to a new game cell, give it focus.
        if (nextIndex !== null) {
            this.currentIndex = nextIndex;
            this.addGridFocus();
        }
    }

    /**
     * Removes focus from the game in the grid that currently has focus.
     */
    removeGridFocus() {
        // If grid does not have focus because user is navigating down to grid from date buttons, there is nothing to do.
        if (this.gridHasFocus === false) { return; }

        // Hide the captions above and below the game image.
        let currentGameCaptions = document.getElementById(`${GAME_CAPTIONS_ID_PREFIX}${this.currentIndex}`);
        currentGameCaptions.classList.add('hiddenCaption');

        // Restore original image size.
        let currentGameImage = document.getElementById(`${GAME_IMAGE_ID_PREFIX}${this.currentIndex}`);
        currentGameImage.style.width = UNFOCUSED_IMAGE_WIDTH;
        currentGameImage.style.height = UNFOCUSED_IMAGE_HEIGHT;

        // Remove border around game.
        currentGameImage.style.removeProperty('border');

        // Restore original headline width so it wraps in a more compact space.
        let headlineNode = currentGameImage.nextSibling;
        headlineNode.style.width = UNFOCUSED_IMAGE_WIDTH;

        // Set flag indicating focus has been removed from the grid.
        this.gridHasFocus = false;
    }

    /**
     * Adds focus to the game in the grid that user is moving toward.
     */
    addGridFocus() {
        // Technically, the current value of this.currentIndex is the index of the game that will gain focus below.
        // It was just updated prior to invoking this method.

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

        // Set flag indicating focus lies in the grid.
        this.gridHasFocus = true;
    }

    /**
     * After a key press is received by the display module, if the date buttons have or are gaining focus, 
     * this method will be called to remove focus from the date button that is currently focused and to 
     * grant focus to the date button that user is moving toward. 
     * @param {String} eventKeyName - One of the following keys: 'ArrowLeft', 'ArrowRight', or 'ArrowDown'.
     */
    updateDateButtonsFocus(eventKeyName) {
        let nextButtonId = null;

        switch (eventKeyName) {
            case 'ArrowLeft':
                nextButtonId = PREVIOUS_DATE_BUTTON_ID;
                break;
            case 'ArrowRight':
                nextButtonId = NEXT_DATE_BUTTON_ID;
                break;
            case 'ArrowUp':
                nextButtonId = DEFAULT_DATE_BUTTON_ID;
                break;
            case 'ArrowDown':
                break;
            default:
                return false;
        }

        // We are definitely removing the current focus in the date buttons no matter what.
        this.removeDateButtonsFocus();

        // If we are moving to a new date button, give it focus.
        if (nextButtonId !== null) {
            this.buttonIdHasFocus = nextButtonId;
            this.addDateButtonsFocus();
        }
    }

    /**
     * Removes focus from the date button that currently has focus.
     */
    removeDateButtonsFocus() {
        if (this.buttonIdHasFocus === '') { return; }

        const focusedDateButton = document.getElementById(this.buttonIdHasFocus);
        focusedDateButton.style.removeProperty('border');

        // Reset ID indicating that focus has been removed from the date buttons.
        this.buttonIdHasFocus = '';
    }

    /**
     * Adds focus to the date button that user is moving toward. Called under three circumstances:
     * o User is moving up to the date buttons from the grid and we will give focus to one button by default.
     * o User is toggling left and right within the date buttons.
     * o User pressed Enter key while a date button had focus, the display module was rebuilt after data for
     *   the newly requested date was available, and we want to restore focus to the button that was clicked
     *   in case user wants to repeatedly move through dates in succession. For example, grid was initially
     *   loaded with today's data. User pressed Enter key while previous date button had focus and this caused
     *   data to be fetched for yesterday's date. User presses Enter again to fetch data for the date before
     *   yesterday, etc.
     */
    addDateButtonsFocus() {
        // Technically, the current value of this.buttonIdHasFocus is the ID of the button that WILL GAIN FOCUS below
        // (was just updated prior to invoking this method) EXCEPT in the situation where we are restoring focus to a 
        // date button after a display module rebuild.
        const gainingFocusButton = document.getElementById(this.buttonIdHasFocus);
        gainingFocusButton.style.border = 'solid 5px red';
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