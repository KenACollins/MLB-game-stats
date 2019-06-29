import { getRequestedDate, getApiFormattedDate } from './utilities/dateUtils.js';

const getStats = async (offsetDayCount = 0, referenceDate = new Date()) => {
    const requestedDate = getRequestedDate(offsetDayCount, referenceDate);
    const requestedDateFormatted = getApiFormattedDate(requestedDate);
    try {
        const response = await fetch(`http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=${requestedDateFormatted}&sportId=1`);
        const json = await response.json();
        console.log('json response', json);
        return json;
    }
    catch (err) {
        return console.log(`We're sorry, no data is available at this time for your requested date ${requestedDateFormatted}.`);
    }
};

export { getStats };


 