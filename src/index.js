import ReactDOM from "react-dom"
import React, { useState, useRef } from "react"

import "@fortawesome/fontawesome-free/css/all.min.css"
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import "./index.css"

import {
  MDBNavbar,
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
  function MainMenu() {
    return (
      <>
        <MDBNavbar
          fixed="bottom"
          expand="lg"
          bgColor="white"
          className="mb-1"
          sticky
          light
        >
          <MDBContainer fluid>
            <MDBNavbarBrand about="ELINET services s.r.o" onClick={() => setPage('main')}>
              <img src="/images/elinetLogoI.png" height="30" alt="Logo" loading="lazy" />
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={() => setShowBasic(!showBasic)}
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <MDBIcon fas icon="bars" />
            </MDBNavbarToggler>
            <MDBCollapse show={showBasic} navbar>
              <MDBNavbarNav className="my-2 mb-lg-0">
                <MDBNavbarItem active={getActiveMenu("network")}>
                  <MDBNavbarLink className='px-3' onClick={() => setPage('network')}>IT řešení</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem active={getActiveMenu("solar")}>
                  <MDBNavbarLink className='px-3' onClick={() => setPage('solar')}>Fotovoltaika</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem active={getActiveMenu("security")}>
                  <MDBNavbarLink className='px-3' onClick={() => setPage('security')}>Zabezpečení</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem active={getActiveMenu("about")}>
                  <MDBNavbarLink className='px-3' onClick={() => setPage('about')}>O nás</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem active={getActiveMenu("contact")}>
                  <MDBNavbarLink className='px-3' onClick={() => setPage('contact')}>Kontakt</MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
              <div>
                {getOperatorLevel() === 'N' ? (
                  <MDBBtn className='px-3' color='light' onClick={() => setPage('login')}>
                    Přihlášení
                  </MDBBtn>
                ) : (
                  <MDBDropdown>
                    <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                      Uživatel
                    </MDBDropdownToggle>
                    {/* Dropdown menu */}
                    {/* ... */}
                  </MDBDropdown>
                )}
              </div>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </>
    );
  } // MainMenu
  
  

  
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
  return (  //  RenderPage
    <MDBContainer>
      {MainMenu()}
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