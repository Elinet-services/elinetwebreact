import ReactDOM from "react-dom"
import React, { useState, useRef } from "react"

import "@fortawesome/fontawesome-free/css/all.min.css"
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import "./index.css"

import {
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBNavbarBrand,
  MDBRow,
  MDBCol,
  MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBAlert, MDBSpinner,
} from "mdb-react-ui-kit"
import processRequest, {resetCookies, getOperatorLevel, getUserName, getPartnerName} from './connection.js';
import MainMenu from "./mainMenu";
import mainFooter from "./mainFooter"
import MainPage from "./mainPage"
import SolarPage from "./solarPage"
import SecurityPage from "./securityPage"
import NetworkPage from "./networkPage"
import AboutPage from "./aboutPage"
import ContactPage from "./contactPage"

import RegisterPage from "./clientRegister"
import ClientLogin from "./clientLogin"
import ResetPassword from "./clientReset"
import Administrace from "./administrace"
import OrderList from "./orderlist"


const URLparams = new URLSearchParams(window.location.search);
let initPage = 'main';
if (URLparams.get('resetToken')) 
  initPage = 'reset';

export default function RenderPage()
{
  const [page, setPage] = useState(initPage);     //  jakou stranku zobrazit
  const submitAlertMessage = useRef(null);        //  zobrazeni responseMessage v MDBAlertu po volani DB
  const [loading, setLoading] = useState(false);  //  volani do DB
  const [error, setError] = useState(false);      //  volani do DB vratilo chybu
  const [responseMessage, setResponseMessage] = useState(''); //  textova zprava volani do DB

  const [showBasic, setShowBasic] = useState(false);

  function getActiveMenu(aMenuItem) {
    return (page === aMenuItem);
  }

  //  -------------------------------------------------------------------------------
  //  Logout
  async function Logout()
  {
    const formData = new FormData();

    let response = await processRequest(formData, 'logout', setLoading, setResponseMessage, setError, submitAlertMessage);

    if (!response.isError) {
      resetCookies();
      setTimeout(() => {
        setPage('main');
      }, 2000);
    }
  } //  Logout

  //  -------------------------------------------------------------------------------
  function renderUserInfo()
  {
    return (
      <MDBDropdownItem>
        <MDBContainer className="pe-5">
          <MDBRow>
            <MDBCol size='6'>
              Uživatel:
            </MDBCol>
            <MDBCol size='6' className="text-nowrap pe-5">
              {getUserName()}
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size='6'>
              Partner:
            </MDBCol>
            <MDBCol size='6' className="text-nowrap pe-5" >
              {getPartnerName()}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBDropdownItem>
    ) 
  } //  renderUserInfo

  //  -------------------------------------------------------------------------------

  

  
  function showPage() 
  {     
    switch (page) {
      case 'main':      return <MainPage/>;
      case 'network':   return <NetworkPage setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>;
      case 'solar':     return <SolarPage setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>;
      case 'security':  return <SecurityPage setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>;
      case 'about':     return <AboutPage setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>;
      case 'contact':   return <ContactPage setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>;
      case 'login':     return <ClientLogin setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>;
      case 'administrace': return <Administrace setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>
      case 'register':  return <RegisterPage setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>
      case 'orderlist': return <OrderList setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>
      case 'reset':     return <ResetPassword resetToken={URLparams.get('resetToken')} setPage={setPage}
                                              setLoading={setLoading} setMessage={setResponseMessage} setError={setError} submitAlertMessage={submitAlertMessage}/>
      default: return <MainPage/>;
    }
  }

  //  -------------------------------------------------------------------------------
  return (
    <MDBContainer>
      <MainMenu 
        activePage={page} 
        setShowBasic={setShowBasic} 
        showBasic={showBasic} 
        setPage={setPage} 
      />
      {showPage()}
      {mainFooter()}

      {/* Odeslani do DB */}
      <MDBModal show={loading} tabIndex='-1' staticBackdrop>
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Odesílání do DB</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='text-center'>
                <MDBSpinner role='status'/>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* zobrazeni responseMessage */}
      <MDBBtn className='visually-hidden' ref={submitAlertMessage}/>
      <MDBAlert triggerRef={submitAlertMessage}
          color={error ? 'danger':'success'}
          autohide appendToBody
          position='top-center'
          width={800}
          offset={50}
          delay={2000}
        >
          {responseMessage}
      </MDBAlert>
    </MDBContainer>
  )
} //  RenderPage

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RenderPage />)