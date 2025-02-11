import moment from "moment";

export const  isValidDateString = (dateString, format = 'YYYY-MM-DD')=> {
    // Parse the date string using moment.js
    const parsedDate = moment(dateString, format, true); // true to enable strict parsing

    // Check if the parsed date is valid and the input string matches the specified format
    return parsedDate.isValid() && parsedDate.format(format) === dateString;
}

 export function compareDateStrings(dateString1, dateString2, format = 'YYYY-MM-DD') {
    // Parse the date strings into JavaScript Date objects
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Compare the Date objects
    if (date1 < date2) {
        return false; // dateString1 is earlier than dateString2
    } else if (date1 > date2) {
        return true; // dateString1 is later than dateString2
    } else {
        return false; // dateString1 is equal to dateString2
    }
}