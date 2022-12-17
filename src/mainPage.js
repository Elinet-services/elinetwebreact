import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardLink,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"

function mainPage() {
  return (
    <>
      <MDBRow className="bg-light mb-3">
        <MDBCol>
          <MDBCard className="h-100">
            <a href="./network">
              <MDBCardImage
                src="images/officesm.png"
                position="top"
                alt="IT řešení"
              />
            </a>
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
        <MDBCol>
          <MDBCard className="h-100">
            <a href="./solar" className="text-reset">
              <MDBCardImage
                src="images/photoii.png"
                position="top"
                alt="Solární elektárny"
                href="./solar"
              />
            </a>
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
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard className="h-100">
            <a href="./security">
              <MDBCardImage
                src="images/homesecurityi.png"
                position="top"
                alt="Zabezpečení"
              />
            </a>
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
      <MDBRow className="mb-4">
        <MDBCol>
          Elinet services je ideální partner pro správu a provoz IT malých a
          středních společností. Snažíme se společnostem dodat taková IT řešení,
          o která není třeba neustále pečovat. Proto svá řešení stavíme hlavně
          na následujících technologiích a komponentech:
          <ul>
            <li>
              Google Workplace – komplexní firemní řešení, které zajistí mailové
              schránky pro celou firmu, umožní vytvoření webových stránek
              společnosti jejichž součástí je mimo jiné i plně funkční náhrada
              Microsoft Office včetně velkých sdílených disků.
            </li>
            <li>Mikrotik a Cisco pro sítě a wifi připojení</li>
            <li>
              Vývoj aplikací nad MS Excel a Google Spreadsheet prostřednictvím
              vývojového nástroje Appsheet.{" "}
            </li>
          </ul>
        </MDBCol>
        <MDBCol>
          Zajišťuje i další specializovaná řešení související s byznysem
          zákazníka. Jedná se například o nasazení interní podnikové telefone,
          wifi hotspoty pro penziony, hotely ale i autoprodejny atp. Obecně se
          snažíme, aby zákazník měl IT, které pokrývá jeho potřeby a nepotřebuje
          neustálý dohled.
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default mainPage
