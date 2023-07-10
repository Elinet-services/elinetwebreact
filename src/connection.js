exports.getConnectionUrl = getConnectionUrl;
exports.getToken         = getToken;
exports.getOperatorLevel = getOperatorLevel;
exports.getUserName     = getUserName;
exports.getPartnerName  = getPartnerName;
exports.setCookies      = setCookies;
exports.resetCookies    = resetCookies;
exports.formatDate      = formatDate;

const url = "https://script.google.com/macros/s/AKfycbyRnV8Q5Q6J8F9irrs4PnpmP8bKepOJ37jssRWh5KRug2Rt8_TZV5Y-7q02IPIRbi0DWg/exec";
const cookieTimeout = 60;   //  platnost cookie v minutach

function getConnectionUrl () {
    return url;
}

function getToken() {
    return getCookie('token');
}
function getOperatorLevel() {   //  N - none; U - User; A - Admin
    let operatorLevel = getCookie('operatorLevel');
    if (operatorLevel.length === 0)
        operatorLevel = 'N';
    return operatorLevel;
}
function getUserName () {
    return getCookie('userName');
}
function getPartnerName () {
    return getCookie('partnerName');
}

function setCookies(connection) {
    setCookie('token', connection.token);
    setCookie('operatorLevel', connection.operatorLevel);
    setCookie('userName', connection.userName);
    setCookie('partnerName', connection.partnerName);
}

function resetCookies() {
    deleteCookie('token');
    deleteCookie('operatorLevel');
    deleteCookie('userName');
    deleteCookie('partnerName');    
}

function setCookie(aName, aValue) {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + (cookieTimeout * 60 * 1000));
    document.cookie = aName +"="+ aValue +";expires="+ expireDate.toUTCString() +";path=/";
}
  
function getCookie(aName)
{
    const name = aName +"=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function deleteCookie(aName)
{
    const expireDate = new Date(0);
    document.cookie = aName +"=;expires="+ expireDate.toUTCString() +";path=/";
}

//  -------------------------------------------------------------------------------
//  preformatuje datum z DB k zobrazeni v prehledu
function formatDate(aDate, aDocumentType) {
    let dateString = '';
    if (aDocumentType === 'D' && aDate != null) {
        const firstDot = aDate.indexOf('-');
        const lastDot  = aDate.lastIndexOf('-');
        //  kontrola
        if (firstDot > 0 && lastDot > firstDot )
        dateString = parseInt(aDate.substring(lastDot + 1)) +'.'+ parseInt(aDate.substring(firstDot + 1, lastDot)) +'.'+ aDate.substring(0, firstDot);
    }
    return dateString;
}
