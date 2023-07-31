exports.getOperatorLevel = getOperatorLevel;
exports.getUserName     = getUserName;
exports.getPartnerName  = getPartnerName;
exports.setCookies      = setCookies;
exports.resetCookies    = resetCookies;
exports.formatDate      = formatDate;
exports.processRequest  = processRequest;

const serverURL = "https://script.google.com/macros/s/AKfycbyoGYiBQKNO-ukEWxrgz8nrotX9S624kx_KtDQnar_1ZuIgqtFNseO0F3e7sdgDp0tQDw/exec";
const cookieTimeout = 60;   //  platnost cookie v minutach

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

//  -------------------------------------------------------------------------------
async function processRequest(formData)
{
    let isError = false;
    let responseMessage = '';
    let adminData = {};

    formData.append("source", window.location.pathname.substring(1));
    formData.append("token", getToken());
    
    await fetch(serverURL, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        /* if (response.status === 401) {
            navigate('/login');
        } */

        if (response.ok) {
            return response.json()
        } else {
            isError = true;
            return { message: "Požadavek se nepodařilo odeslat" }
        }
    })
    .then((responseData) => {
        console.log(responseData);
        isError         = responseData.isError;
        responseMessage = responseData.message;
        adminData       = responseData.adminData;
    })
    .catch((e) => {
        console.log(e.message)
        isError = true;
        responseMessage = "Kritická chyba: "+ e.message;
    
    })

    return {"responseMessage": responseMessage, "isError": isError, "adminData": adminData };
}