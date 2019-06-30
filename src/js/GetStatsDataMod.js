// This is a data module, the model in an MVC design pattern. 
import { getApiFormattedDate } from './utilities/dateUtils.js';

const getStats = async (referenceDate = new Date()) => {
    const requestedDateFormatted = getApiFormattedDate(referenceDate);
    try {
        const response = await fetch(`http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=${requestedDateFormatted}&sportId=1`);
        const json = await response.json();
        return json;
    }
    catch (err) {
        return console.log(`We're sorry, no data is available at this time for your requested date ${requestedDateFormatted}.`);
    }
};

export { getStats };


 