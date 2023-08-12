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

function networkPage(params) {
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
                Zajišťujeme kompletní dodávku IT služeb pro společnosti, která zahrnuje návrh, vývoj a následnou podporu. Při svých dodávkách se zaměřujeme na zákaznická řešení, která jsou postavená na komponentách od renomovaných společností, jako jsou Google, Mikrotik a Cisco.
              </MDBCardBody>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBTypography listUnStyled className="mb-0">
                  <li>
                    <ul>
                      <li>
                        <strong>Google Workspace:</strong> Pro zajištění základního fungování společnosti, jako je email a sdílení dokumentů. Zároveň vyvíjíme aplikace v prostředí Google Apps Script, což umožňuje přizpůsobení a automatizaci procesů dle specifických potřeb.
                      </li>
                      <li>
                        <strong>Mikrotik a Cisco:</strong> Pro zajištění kompletního řešení sítí. Většinu řešení stavíme na komponentách Mikrotik, a pro korporátní klientelu preferujeme produkty od společnosti Cisco. 
                      </li>
                      <li>
                        <strong>ReactJS a MDB Bootstrap:</strong> Pro vývoj responsivních webových stránek a aplikací. Tyto moderní technologie nám umožňují vytvářet vizuálně atraktivní a funkčně bohaté webové prezentace, které se přizpůsobují různým zařízením a velikostem obrazovek.
                      </li>
                    </ul>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md={3}>
            <ContactForm source={'network'} setLoading={params.setLoading} setMessage={params.setMessage} setError={params.setError} submitAlertMessage={params.submitAlertMessage}/>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  )
}

export default networkPage;
