import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
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
        src="/images/OfficeIII.png"
        position="top"
        alt="IT řešení Elinet services"
      />
      <MDBCardBody>
        <MDBCardTitle>IT Služby</MDBCardTitle>
        <MDBRow>
          <MDBCol md={9}>
            <MDBRow className="mb-4">
              <MDBCardBody>
                Zajišťujeme kompletní dodávku IT služeb pro společnosti od
                návrhu, přes vývoj a následnou podporu. Při svých dodávkách se
                zaměřujeme na zákaznická řešení postavená na komponentách
                Google, Mikrotik a Cisco.{" "}
              </MDBCardBody>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBTypography listUnStyled className="mb-0">
                  <li>
                    <ul>
                      <li>
                        Google Workspace pro zajištění základního fungování
                        společnosti (email, sdílení dokumentů). Zároveň vyvíjeme
                        aplikace v prostředí Google Apps Script.{" "}
                      </li>
                      <li>
                        Mikrotik a Cisco pro zajištění kompletního řešení sítí.
                        Většinu řešení stavíme na komponentách Mikrotik a pro
                        korporátní klientelu dodáváme Cosco.
                      </li>
                      <li>
                        ReactJSD a MDB Bootstrap pro vývoj responsivních
                        webových stránek a aplikací.
                      </li>
                    </ul>
                  </li>
                </MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography listUnStyled className="mb-0">
                  <li>
                    <ul>
                      <li>
                        Google Workspace pro zajištění základního fungování
                        společnosti (email, sdílení dokumentů). Zároveň vyvíjeme
                        aplikace v prostředí Google Apps Script.{" "}
                      </li>
                      <li>
                        Mikrotik a Cisco pro zajištění kompletního řešení sítí.
                        Většinu řešení stavíme na komponentách Mikrotik a pro
                        korporátní klientelu dodáváme Cosco.
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
          <MDBCol md={3}>
            <ContactForm />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  )
}

export default Solar
