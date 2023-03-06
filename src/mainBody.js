import React from "react"
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdb-react-ui-kit"

import "mdb-react-ui-kit/dist/css/mdb.min.css"

function mainPage() {
  //const [showBasic, setShowBasic] = useState(false);
  return (
    <MDBContainer>
      <MDBRow className="bg-light mb-3">
        <MDBCol>
          <MDBCard>
            <MDBCardImage
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
              position="top"
              alt="Solární elektárny"
            />
            <MDBCardBody>
              <MDBCardTitle>Solární elektárny</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard>
            <MDBCardImage
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(16).jpg"
              position="top"
              alt="IT řešení"
            />
            <MDBCardBody>
              <MDBCardTitle>Síťová řešení</MDBCardTitle>
              <MDBCardText>
                Zajišťujeme chod malých a středních společností bezproblémovým
                chodem firemního IT. Implementujeme kompletní síťové služby
                především na bázi kompoment Mikrotik a Cisco. Z pohledu
                základních aplikačních životních funkcí jako jsou mailová
                komunikace, videkonference a podobně implementujeme řešení na
                bázi Google Workspace. Zajišťujeme i vývoj aplikací na zakázku.
                Jednoduché aplikace konfigurujeme v prostředí AppSheet,
                komplexnější řešení stavíme na bázi React-JS a Node-JS.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard>
            <MDBCardImage
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg"
              position="top"
              alt="Zabezpečení"
            />
            <MDBCardBody>
              <MDBCardTitle>Zabezpečení</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default mainPage
