import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"

import ContactForm from "./form"

function solarPage() {
  return (
    <MDBCard>
      <MDBCardImage
        src="images/Photobig.png"
        position="top"
        alt="Solární elektárny"
      />
      <MDBCardBody>
        <MDBCardTitle>Fotovoltaické systémy</MDBCardTitle>
        <MDBRow>
          <MDBCol md={8}>
            <MDBRow className="mb-4">
              <MDBCol>
                <p>
                  Fotovoltaické systémy jsou vhodnou volbou pro rodinné domy v
                  České republice, protože vám umožňují vyrábět vlastní
                  elektrickou energii z obnovitelného zdroje a tím snižovat vaše
                  náklady na elektřinu. Je důležité si uvědomit, že pro
                  instalaci fotovoltaického systému je nutné mít dostatečně
                  velkou plochu na střeše nebo na pozemku pro umístění solárních
                  panelů.{" "}
                </p>{" "}
                <p>
                  Při výběru fotovoltaického systému je třeba zvážit několik
                  faktorů, jako je velikost vašeho domu, orientace střechy a
                  výška budovy. Vyšší budovy obvykle produkují více energie,
                  protože solární panely jsou vystaveny většímu množství
                  slunečního světla.
                </p>{" "}
                <p>
                  Je také důležité zvážit, jakou elektrickou energii potřebujete
                  pro vaše potřeby a kolik energie byste chtěli vyrobit. To vám
                  pomůže stanovit velikost fotovoltaického systému, který budete
                  potřebovat. Existují různé typy fotovoltaických panelů, které
                  se liší výkonem a cenou.
                </p>
              </MDBCol>
              <MDBCol>
                <p>
                  Je důležité vybrat si ty, které budou nejlépe vyhovovat vašim
                  potřebám a rozpočtu. Je také nutné zvážit náklady na instalaci
                  fotovoltaického systému, které zahrnují náklady na solární
                  panely, invertery, montážní materiál a práci instalatéra.{" "}
                </p>
                <p>
                  V České republice existují různé možnosti financování
                  fotovoltaických systémů, včetně dotací a úvěrů. Můžete se také
                  ucházet o podporu v rámci programu Podpora OZE, který je určen
                  pro podporu výroby elektřiny z obnovitelných zdrojů energie.
                </p>
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

export default solarPage;