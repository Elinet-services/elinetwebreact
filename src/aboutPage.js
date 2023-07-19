import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit"

import ContactForm from "./form"

function aboutPage() {
  return (
    <MDBCard>
      <MDBCardImage
        src="/images/some.png"
        position="top"
        alt="Elinet services - o nás"
      />
      <MDBCardBody>
        <MDBCardTitle>Elinet service - o nas</MDBCardTitle>
        <MDBRow>
          <MDBCol md={9}>
            <MDBRow>
              <MDBCol>
                Jsme firma, ...<br/>
                Nase zakazky a reference...<br/>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md={3}>
            <ContactForm />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  )
}

export default aboutPage;