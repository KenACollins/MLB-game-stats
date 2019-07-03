// This is the controller module in an MVC design pattern that includes data and display modules.
import { getStats } from './GetStatsDataMod.js';
// import cannedData from './cannedData.json';
import StatsList from './StatsListDispMod.js';

class Controller {
    constructor() {
        this.dataMods = new Map();
        this.loadDataMods();
        this.displayMods = [];
        this.launchDisplayMods();
    }

    establishRootElement() {
        const rootElement = document.createElement('div');
        rootElement.id = 'root';
        rootElement.classList.add('bgImage');
        document.body.appendChild(rootElement);
        return rootElement;
    }

    //====================
    // Manage Data Modules
    //====================
    /**
     * The controller knows about all the data modules that are needed and loads them into memory.
     * Ideally, we would have logic identifying only the data modules needed at this time and then 
     * use the dynamic import() function as opposed to including every data module via import statements
     * at the top. Support for the dynamic import() function is not universal at this time (I believe).
     */
    loadDataMods() {
        this.dataMods.set('getStats', getStats);
        // Add future data modules to the map.
    }
    
    /**
     * When display modules need data, they ask controller to get it for them.
     * @param {Object} context - the 'this' context of the caller.
     * @param {String} callbackName - name of function associated with caller that should be invoked when result is ready 
     * @param {String} dataModName - string known to display module that references a data module 
     * @param  {...any} args - parameters the data module requires (if any) 
     */
    requestData(context, callbackName, dataModName, ...args) {
        (async () => {  
            const result = await this.dataMods.get(dataModName).apply(this, args);
            context[callbackName](result);
        })()
        .catch(err => console.error(err));
    }

    //=======================
    // Manage Display Modules
    //=======================
    /**
     * The controller establishes the root element attached to the body tag in the DOM.
     * 
     * The controller knows about all the display modules that are needed to be shown on the screen
     * being built at this time. It creates new instances of each desired display module, passing it
     * a reference to itself (so the display module can invoke methods on the controller) and a handle
     * to the root element (so the display module can attach itself to the DOM).
     * 
     * The controller then calls the display module's onCreate() method to build the module.  
     * 
     * Finally, the controller sets up listeners for key pressess that are passed to the focused display module.
     * 
     * Some time later, like when the user is navigating to a new screen, the Controller will destroy
     * unwanted display modules. Note that this is pretty drastic, what if the user presses the Back button
     * to return to the previous screen? It would probably be better to keep a history of display modules
     * for a screen, rather than destroy them, in case the user returns so the previous state can be restored.
     */
    launchDisplayMods() {
        const rootElement = this.establishRootElement();
        let statsList = new StatsList(this, rootElement);
        this.displayMods.push(statsList);   // Keep track of this display module for later on when we destroy it.
        statsList.onCreate();
        this.passKeyPressesToDisplayMod(statsList);
        // Launch future display modules based on some logic that determines what is needed.
    }

    passKeyPressesToDisplayMod(dispMod) {
        // All key presses have default behavior turned off. This prevents the arrow keys from sliding
        // the screen up/down/left/right when app is loaded in a web browser but due to screen real estate,
        // is not quite 1920 x 1080 pixels and scroll bars have formed. Also, this prevents an Enter key
        // press from submitting the screen (only really an issue with forms).

        // Arrow, Enter, and Escape keys are triggered by keydown event, not keypress. 
        document.addEventListener("keydown", function onEvent(event) {
            event.preventDefault();
            dispMod.onKeyPress(event.key);
        });
        
        // Regular keys not covered by keydown event are triggered by keypress.
        document.addEventListener("keypress", function(event) {
            event.preventDefault();
            dispMod.onKeyPress(event.key);            
        });
    }

    destroyDisplayMods() {
        while (this.displayMods.length) {
            let currentDisplayMod = this.displayMods.shift();
            currentDisplayMod.onDestroy();

        }
    }
}

export default Controller;