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
                V případě, že nechcete využít kontaktní formulář na našich
                stránkách, je možno nás kontaktovat na níže uvedených spojeních.
                <br />
                Telefon: +420 776 684 729
                <br />
                E-mail: info@elinet.cz
                <br />
                Adresa: Kaprova 42/14, Staré Město, 110 00 Praha
                <br />
                IČ: 02199360
                <br />
                DIČ: CZ02199360
                <br />
                Provozní doba: Po - Pá: 9:00 - 17:00
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
