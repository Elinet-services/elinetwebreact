import React from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBDropdown,
  MDBDropdownToggle,
  MDBCollapse,
  MDBNavbarBrand,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from "mdb-react-ui-kit";
import { getOperatorLevel } from './connection.js';

export default function MainMenu({ activePage, setShowBasic, showBasic, setPage }) {
  function getActiveMenu(aMenuItem) {
    return (activePage === aMenuItem);
  }

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
  <img src="/images/elinetLogoI.png" height="27" alt="Logo" loading="lazy" />
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
}
