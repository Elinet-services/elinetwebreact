import {   
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol
 } from 'mdb-react-ui-kit'; 

import ContactForm from "./form";

function Solar() {
  return (    
    <MDBCard>
      <MDBCardImage src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg' position='top' alt='Solární elektárny' />
      <MDBCardBody>
        <MDBCardTitle>Solární elektárny</MDBCardTitle>
        <MDBRow>
          <MDBCol md={8}>
            <MDBCardText>
              <MDBRow className='mb-4'>
                <MDBCol>
                  Pro Váš rodinný dům nabízíme různorodé fotovoltaické střešní systémy jako jsou solární taška, solární panel nebo solární fásáda. K fotovoltaické elektrárně dokážeme nakombinovat další technologie jako je tepelné čerpadlo, bateriové uložiště nebo dobíjecí stanice pro elektromobily.<br/><br/>
                </MDBCol>
                <MDBCol>
                  Vybrané technologie navrhujeme vždy na míru na základě prvotní analýzy proveditelnosti daného objektu.
                </MDBCol>
              </MDBRow>
            </MDBCardText>
          </MDBCol>
          <MDBCol md={4}>
            <ContactForm />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Solar;