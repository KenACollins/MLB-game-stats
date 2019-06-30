// This is the controller module in an MVC design pattern that includes data and display modules.
import { getStats } from './GetStatsDataMod.js';
// import { cannedData } from './cannedData.js';
import StatsList from './StatsListDispMod.js';

class Controller {
    constructor() {
        this.dataMods = new Map();
        this.loadDataMods();
        this.launchDisplayMods();
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
     * The controller knows about all the display modules that are needed. It creates new instances
     * of each desired display module and then calls the module's onCreate() method to build the
     * module and alter what is seen on the screen. It then sets up listeners for key pressess
     * that are also passed on to the display module that has focus.
     */
    launchDisplayMods() {
        let statsList = new StatsList(this);
        statsList.onCreate();
        this.passKeyPressesToDisplayMod(statsList);
        // Launch future display modules based on some logic that determines what is needed.
    }

    passKeyPressesToDisplayMod(dispMod) {       
        // Arrow, Enter, and Escape keys are triggered by keydown event, not keypress. 
        document.addEventListener("keydown", function onEvent(event) {
            dispMod.onKeyPress(event.key);
        });

        // Regular keys not covered by keydown event are triggered by keypress.
        document.addEventListener("keypress", function(event) {
            dispMod.onKeyPress(event.key);            
        });
    }
}

new Controller();