import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit"

import ContactForm from "./form"

function contactPage(params) {
  return (
    <MDBCard>
      <MDBCardImage
        src="/images/contact.png"
        position="top"
        alt="Elinet services - kontakty"
      />
      <MDBCardBody>
        <MDBCardTitle>Kontaktní informace</MDBCardTitle>
        <MDBRow>
          <MDBCol md={9}>
            <MDBRow>
              <MDBCol>
                <MDBCol md={10}>Elinet services s.r.o.
                  Kaprova 42/14, Staré Město,
                  110 00 Praha</MDBCol>
                <MDBCol md={10}><a href='mailto:info@elinet.cz'>info@elinet.cz</a></MDBCol>
                <MDBCol md={10}>+ 420 776 684 729</MDBCol>
                <MDBCol md={10}>IČ: 02199360</MDBCol>
                <MDBCol md={10}>DIČ:&nbsp;CZ&nbsp;02199360</MDBCol>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md={3}>
            <ContactForm source={'contact'} setLoading={params.setLoading} setMessage={params.setMessage} setError={params.setError} submitAlertMessage={params.submitAlertMessage}/>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  )
}

export default contactPage;
