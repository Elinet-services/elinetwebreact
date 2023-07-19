import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"

import ContactForm from "./form"

function securityPage() {
  return (
    <MDBCard>
      <MDBCardImage
        src="images/beispielinstallation.jpg"
        position="top"
        alt="Zabezpečení"
      />
      <MDBCardBody>
        <MDBCardTitle>Zabezpečení</MDBCardTitle>
        <MDBRow>
          <MDBCol md={8}>
            <MDBRow className="mb-4">
              <MDBCol>
                Vytvoříme vám návrh elektronického zabezpečení domu na základě
                potřeb a parametrů vašeho rodinného domu. Eliminujeme všechna
                rizika i falešné poplachy a zajistíme vám efektivní ochranu domu
                i celé rodiny. Rozumíme moderním technologiím a dokážeme vaši
                domácnost nejen zabezpečit, ale i automatizovat.
              </MDBCol>
              <MDBCol>
                Zabezpečení a ochrana domu jsou základem pro klidný spánek a
                bezpečí každé rodiny. I přesto se lidé mnohdy o zabezpečení domu
                začínají zajímat až ve chvíli, kdy si zažijí vloupání či požár
                na vlastní kůži.
                <br />
                <br />
                <i>
                  „Lidé si u sebe doma rizika nepřipouští. Teprve až když začne
                  hořet, nebo potkají zloděje po cestě na záchod, zjistí, že
                  pocit bezpečí domova je k nezaplacení“
                </i>
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

export default securityPage;