const serverURL = "https://script.google.com/macros/s/AKfycbyqt8G2TVvB1P2Y8pVatqnRpj2p3gBbgcGLANjdtGbD7CGoipkTAr3X0vWaLfEoR0OF/exec";
const cookieTimeout = 60;   //  platnost cookie v minutach

export function getOperatorLevel() {   //  N - none; U - User; A - Admin
    let operatorLevel = getCookie('operatorLevel');
    if (operatorLevel.length === 0)
        operatorLevel = 'N';
    return operatorLevel;
}
export function getUserName () {
    return getCookie('userName');
}
export function getPartnerName () {
    return getCookie('partnerName');
}

export function setCookies(connection) {
    setCookie('token', connection.token);
    setCookie('operatorLevel', connection.operatorLevel);
    setCookie('userName', connection.userName);
    setCookie('partnerName', connection.partnerName);
}

export function resetCookies() {
    console.log('resetCookies');
    deleteCookie('token');
    deleteCookie('operatorLevel');
    deleteCookie('userName');
    deleteCookie('partnerName');
}

function getToken() {
    return getCookie('token');
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
export function formatDate(aDate, aDocumentType) {
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
export default async function processRequest(formData, source, setLoading, setMessage, setError, submitAlertMessage)
{
    setLoading(true);
    let isError = false;
    let responseMessage = '';
    let adminData = {};

    formData.append("source", source);
    formData.append("token", getToken());

    /* for (const pair of formData.entries()) {
      console.log(pair[0] +', '+ pair[1]);
    } */

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
    setMessage(responseMessage);
    setError(isError);
    setLoading(false);
    if (responseMessage.length > 0)  //  zobrazit vysledek volani DB - responseMessage
        submitAlertMessage.current.click();

    return {"isError": isError, "adminData": adminData };
}