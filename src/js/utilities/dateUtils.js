// Date Utilities
// Could collect all methods under one class and export the class but then if library were huge, caller would have to import unwanted functions.

/**
 * Returns the date desired. Utilizing an offset count of day(s) before (if negative) or after (if positive) and a 
 * reference date, computes and returns the requested date. An offset of -5 returns the date 5 days prior to
 * the reference date. An offset of 10 returns the date 10 days in the future of the reference date. An offset of 0
 * returns the same date as reference date.
 * @param {Date} referenceDate - Date used for reference. If offsetDayCount is 0, same date will be returned.
 * @param {Integer} offsetDayCount - Integer where -1, 0, 1 means we want previous, current, and next day's date (respectively).
 */  
const getRequestedDate = (offsetDayCount = 0, referenceDate = new Date()) => {
    let clonedDate = new Date(referenceDate.getTime());
    if (Number.isInteger(offsetDayCount) && offsetDayCount !== 0) {
        clonedDate.setDate(clonedDate.getDate() + offsetDayCount);
    }
    return clonedDate;
};

/**
 * For a given input date object, returns 'yyyy-mm-dd' formatted string.
 * @param {Date} inputDate - Date to be formatted into a string, default is current date 
 */
const getApiFormattedDate = (inputDate = new Date()) => {
    const delimiter = '-';
    const yearString = inputDate.getFullYear().toString();
    const monthString = ('0' + (inputDate.getMonth() + 1)).slice(-2);   // Want single digit month with leading zero.
    const dateString = ('0' + inputDate.getDate()).slice(-2);           // Want single digit date with leading zero.
    
    return yearString + delimiter + monthString + delimiter + dateString;
}; 

/**
 * Converts API date formatted string from yyyy-mm-dd to a user friendly value, eg., "Thu Jun 27 2019".
 * @param {String} dateString - in yyyy-mm-dd format 
 */
const getUserFriendlyDateFromApiDate = (dateString = '') => {
    if (dateString === '') { return ''; }
    return new Date(dateString.replace(/-/g, '\/')).toDateString(); // Weird, but yyyy-mm-dd gives previous date between 12-5 AM while yyyy/mm/dd does not.
};

export { getRequestedDate, getApiFormattedDate, getUserFriendlyDateFromApiDate };