import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBTypography,
} from "mdb-react-ui-kit"

import ContactForm from "./form"

function Solar() {
  return (
    <MDBCard>
      <MDBCardImage
        src="/images/notebook.jpeg"
        position="top"
        alt="IT řešení Elinet services"
      />
      <MDBCardBody>
        <MDBCardTitle>IT Služby</MDBCardTitle>
        <MDBRow>
          <MDBCol md={8}>
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBTypography listUnStyled className="mb-0">
                    <li>
                      Zajišťujeme prvoz a implementaci IT systémů postavených na
                      následujících řešeních:{" "}
                      <ul>
                        <li>
                          Google Workspace pro zajištění základního fungování
                          společnosti (email, sdílení dokumentů). Zároveň
                          vyvíjeme aplikace v prostředí Google Apps Script.{" "}
                        </li>
                        <li>
                          Mikrotik a Cisco pro zajištění kompletního řešení
                          sítí. Většinu řešení stavíme na komponentách Mikrotik
                          a pro korporátní klientelu dodáváme Cosco.
                        </li>
                        <li>
                          ReactJSD a MDB Bootstrap pro vývoj responsivních
                          webových stránek a aplikací.
                        </li>
                      </ul>
                    </li>
                  </MDBTypography>
                </MDBCol>
              </MDBRow>
          </MDBCol>
          <MDBCol md={4}>
            <ContactForm />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  )
}

export default Solar
