// This is the controller module in MVC design pattern that includes data and display modules.
import { getStats } from './dataModule.js';
import StatsList from './displayModule.js';

const statsJson = getStats;

console.log("Hello there, I am in app.js");
console.log('statsJson in app.js', statsJson());

//====================
// Manage Data Modules
//====================
let dataMods = new Map();
dataMods.set('getStats', getStats);
// Add future data modules to the map.

/**
 * When display modules need data, they ask controller to get it for them.
 * @param {String} dataModName - string known to display module that references a data module 
 * @param  {...any} args - parameters the data module requires (if any) 
 */
const getData = (dataModName, ...args) => {
    return dataMods.get(dataModName)(args);
};

//=======================
// Manage Display Modules
//=======================
let displayMods = [];
displayMods.push(StatsList);
// Add future display modules to the array.

displayMods.forEach(displayMod => {
    let dMod = new displayMod(this);    // this can't have meaning. Must refactor app.js as a constructor?
    dMod.onCreate();
});

