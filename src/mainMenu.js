import React, { useState } from 'react';
import {
  Outlet
} from 'react-router-dom';
import {   
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBNavbarBrand,
  MDBFooter, MDBRow, MDBCol
 } from 'mdb-react-ui-kit';
 

function MainMenu() {
  const [showBasic, setShowBasic] = useState(false);
  
  function getActiveMenu(aMenuItem) {    
    if (window.location.pathname == '/'+ aMenuItem)
      return 'active px-3';
    else
      return 'px-3';
  }
    
  return (
    <>
      <MDBNavbar expand='lg' bgColor='white' className='mb-3' sticky light>
        <MDBContainer fluid>
          <MDBNavbarBrand about='ELINET services' href='/' >
            <img src='images/cropped-mediumsquarelogo.jpg'/>
          </MDBNavbarBrand>
          <MDBNavbarToggler          
            onClick={() => setShowBasic(!showBasic)}
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <MDBCollapse show={showBasic} navbar>
            <MDBNavbarNav left className='mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink  href='./solar' className={getActiveMenu('solar')}>Solární elektárny</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='./network' className={getActiveMenu('network')}>Síťová řešení</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='./security' className={getActiveMenu('security')}>Zabezpečení</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='./about' className='px-3'>O nás</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='./contact' className='px-3'>Kontakt</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <Outlet />
    </>      
  );
}

export default MainMenu;

export function mainFooter(params) {
  return (
    <MDBFooter className='pt-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
    <section className='' >
      <MDBContainer className='text-center text-md-start mt-3'>
        <MDBRow className='mt-3'>
          <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
            <h6 className='fw-bold mb-4'>
              <MDBIcon icon="gem" className="me-3" />
              Elinet services s.r.o.
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </p>
          </MDBCol>

          <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Produkty</h6>
            <p>
              <a href='./solar' className='text-reset'>
                Solární elektárny
              </a>
            </p>
            <p>
              <a href='./network' className='text-reset'>
                Síťová řešení
              </a>
            </p>
            <p>
              <a href='./security' className='text-reset'>
                Zabezpečení
              </a>
            </p>
          </MDBCol>

          <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>O společnosti</h6>
            <p>
              <a href='./NoPage' className='text-reset'>
                O nás
              </a>
            </p>
            <p>
              <a href='./NoPage' className='text-reset'>
                Kontakty
              </a>
            </p>
          </MDBCol>

          <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-4'>
            <MDBRow>
              <MDBCol md={12}>
                <h6 className='text-uppercase fw-bold mb-4'>Adresa</h6>
              </MDBCol>
            </MDBRow>
            <MDBRow className='mb-2'>
              <MDBCol md={2}>
                <MDBIcon icon="home" className="me-2" />
              </MDBCol>
              <MDBCol md={10}>
                  Kaprova 42/14,<br/>Staré Město,<br/>110 00 Praha
              </MDBCol>
            </MDBRow>
            <MDBRow className='mb-2'>
              <MDBCol md={2}>
                <MDBIcon icon="envelope" className="me-3" />
              </MDBCol>
              <MDBCol md={10}>
                  info@elinet.com
              </MDBCol>
            </MDBRow>
            <MDBRow className='mb-2'>
              <MDBCol md={2}>
                <MDBIcon icon="phone" className="me-3" />
              </MDBCol>
              <MDBCol md={10}>
                + 420 776 684 729
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md={2}>IČO:</MDBCol>
              <MDBCol md={10}>
                  02199360
              </MDBCol>
            </MDBRow>
          </MDBCol>

        </MDBRow>
      </MDBContainer>
    </section>
    <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      © 2022 Copyright: <a className='text-reset fw-bold' href='https://elinet.cz/'>Elinet.cz</a>
    </div>
  </MDBFooter>
  );  
}