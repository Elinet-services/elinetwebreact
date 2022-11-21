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

const NoPage = () => {
  return (
  <MDBCard>
  <MDBCardBody>
    <MDBCardTitle>Stránka nenalezena</MDBCardTitle>
    <MDBRow>
      <MDBCol md={8}>
        <MDBCardText>
          Hledáte něco?
          Pomůžeme Vám.
        </MDBCardText>
      </MDBCol>
      <MDBCol md={4}>
        <ContactForm />
      </MDBCol>
    </MDBRow>
  </MDBCardBody>
</MDBCard>
)

};

export default NoPage;