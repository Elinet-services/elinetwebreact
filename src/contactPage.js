import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"

import ContactForm from "./form"

function contactPage(params) {
  return (
    <MDBCard>
      <MDBCardImage
        src="/images/Contact.png"
        position="top"
        alt="Elinet services - kontakty"
      />
      <MDBCardBody>
        <MDBCardTitle>Kontaktní informace</MDBCardTitle>
        <MDBRow>
          <MDBCol md={9}>
            <MDBRow>
              <MDBCol>
                Kontaktujte nás ...
                <br />
                telefonem nebo emailem
                <br />a jinak jsou kontaktni informace dole v paticce
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md={3}>
            <ContactForm
              source={"contact"}
              setLoading={params.setLoading}
              setMessage={params.setMessage}
              setError={params.setError}
              submitAlertMessage={params.submitAlertMessage}
            />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  )
}

export default contactPage
