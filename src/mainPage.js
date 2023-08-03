import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"
import "./mainPage.css" // Importujeme externí CSS soubor pro stylování

function mainPage() {
  return (
    <>
      <MDBRow className="bg-light mb-3">
        <MDBCol>
          <MDBCard className="h-100 d-flex flex-row align-items-start">
            <MDBCardImage
              src="images/officesm.png"
              position="top"
              alt="IT řešení"
              className="w-33" // Zde nastavujeme, aby obrázek zabíral 1/3 šířky
            />
            <MDBCardBody>
              <MDBCardTitle>
                <a href="./network" className="text-reset">
                  IT řešení pro společnosti
                </a>
              </MDBCardTitle>
              <MDBCardText>
                Zajišťujeme kompletní dodávku IT služeb pro společnosti od
                návrhu, přes vývoj a následnou podporu. Při svých dodávkách se
                zaměřujeme na zákaznická řešení postavená na komponentách
                Google, Mikrotik a Cisco.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow className="bg-light mb-3">
        <MDBCol>
          <MDBCard className="h-100 d-flex flex-row align-items-start">
            <MDBCardBody>
              <MDBCardTitle>
                <a href="./solar" className="text-reset">
                  Solární elektárny
                </a>
              </MDBCardTitle>
              <MDBCardText>
                Pro Váš rodinný dům nabízíme různorodé fotovoltaické střešní
                systémy jako jsou solární taška, solární panel nebo solární
                fásáda. K fotovoltaické elektrárně dokážeme nakombinovat další
                technologie jako je tepelné čerpadlo, bateriové uložiště nebo
                dobíjecí stanice pro elektromobily.
                <br />
                <br />
                Vybrané technologie navrhujeme vždy na míru na základě prvotní
                analýzy proveditelnosti daného objektu.
              </MDBCardText>
            </MDBCardBody>
            <MDBCardImage
              src="images/photoii.png"
              position="top"
              alt="Solární elektárny"
              className="w-33" // Zde nastavujeme, aby obrázek zabíral 1/3 šířky
            />
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow className="bg-light mb-3">
        <MDBCol>
          <MDBCard className="h-100 d-flex flex-row align-items-start">
            <MDBCardImage
              src="images/homesecurityi.png"
              position="top"
              alt="Zabezpečení"
              className="w-33" // Zde nastavujeme, aby obrázek zabíral 1/3 šířky
            />
            <MDBCardBody>
              <MDBCardTitle>
                <a href="./security" className="text-reset">
                  Zabezpečení
                </a>
              </MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default mainPage
