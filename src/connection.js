exports.getConnectionUrl = getConnectionUrl;
exports.getOperatorLevel = getOperatorLevel;
exports.getUserName     = getUserName;
exports.getPartnerName  = getPartnerName;
exports.setCookies = setCookies;
exports.resetCookies = resetCookies;

const url = "https://script.google.com/macros/s/AKfycbyEpGMXM4xm46fbV6u3tPUCSFCfOhRrxiAodUPuL_fCsYsTcNO8QM8656gCqlCzJhxtZw/exec";
const cookieTimeout = 30;   //  platnost cookie v minutach

function getConnectionUrl () {
    return url;
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
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
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

