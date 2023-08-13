import React from 'react';
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
  MDBNavbarBrand
} from "mdb-react-ui-kit";
import { getOperatorLevel, getUserName, getPartnerName } from './connection.js';

export function MainMenu({ setPage, showBasic, setShowBasic, getActiveMenu, renderUserInfo, Logout }) {
  return (
    <>
      <MDBNavbar fixed="botom"
        expand="lg"
        bgColor="white"
        className="mb-1"
        sticky light
      >
        <MDBContainer fluid>
          <MDBNavbarBrand about="ELINET services s.r.o" onClick={() => setPage('main')}>
            <img src="/images/elinetLogoI.png"
              height="30"
              alt="Logo"
              loading="lazy"
            />
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
            <MDBNavbarNav className="my-2 mb-lg-0" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <MDBNavbarItem active={getActiveMenu("network")}>
                  <MDBNavbarLink className='px-3' onClick={() => setPage('network')}>
                    IT řešení
                  </MDBNavbarLink>
                </MDBNavbarItem>
                {/* ... Další položky ... */}
              </div>
              <MDBNavbarItem active={getActiveMenu("login")}>
                {getOperatorLevel() === 'N' ?
                  <MDBBtn className='px-3' color='light' onClick={() => setPage('login')}>
                    Přihlášení
                  </MDBBtn>
                  :
                  <MDBDropdown>
                    <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                      Uživatel
                    </MDBDropdownToggle>
                    {getOperatorLevel() === 'A' ?
                      <MDBDropdownMenu>
                        {renderUserInfo()}
                        <MDBDropdownItem divider />
                        <MDBDropdownItem link onClick={() => setPage('administrace')}>Administrace</MDBDropdownItem>
                        <MDBDropdownItem link onClick={() => setPage('register')}>Registrace</MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem link onClick={Logout}>Odhlášení</MDBDropdownItem>
                      </MDBDropdownMenu>
                      :
                      <MDBDropdownMenu>
                        {renderUserInfo()}
                        <MDBDropdownItem divider />
                        <MDBDropdownItem link onClick={() => setPage('orderlist')}>Seznam zakázek</MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem link onClick={Logout}>Odhlášení</MDBDropdownItem>
                      </MDBDropdownMenu>
                    }
                  </MDBDropdown>
                }
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
