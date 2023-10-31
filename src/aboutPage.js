import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"

import ContactForm from "./form"

function aboutPage(params) {
  return (
    <MDBCard>
      <MDBCardImage
        src="/images/About.png"
        position="top"
        alt="Elinet services - o nás"
      />
      <MDBCardBody>
        <MDBCardTitle>O nás</MDBCardTitle>
        <MDBRow>
          <MDBCol md={9}>
            <MDBRow>
              <MDBCol>
                <p>
                  Jsme malá lokální firma s hlavním zaměřením na IT, zabezpečení
                  a dodávku malých fotovoltaických systémů. I přes naši
                  kompaktní velikost, máme bohaté zkušenosti a hluboké znalosti
                  v oborech, v nichž působíme. V oblasti IT nabízíme komplexní
                  služby od správy sítí, přes vývoj softwaru až po opravy
                  počítačů.
                </p>{" "}
                Ve sféře zabezpečení poskytujeme řešení přizpůsobená potřebám
                našich klientů, abychom zabezpečili jejich podnikání spolehlivým
                a nákladově efektivním způsobem.
                <p>
                  V segmentu fotovoltaických systémů se zaměřujeme na dodávku a
                  instalaci malých FVE, aby naši klienti mohli efektivně
                  využívat čistou a udržitelnou energii.
                </p>
                <p>
                  Naším hlavním cílem je poskytovat vysokou kvalitu služeb a
                  spokojenost zákazníků. I přesto, že máme jen několik členů v
                  týmu, jsme odhodláni splnit každou zakázku s maximálním
                  nasazením a profesionalitou. Věříme, že naše osobní přístup a
                  odborné znalosti nás odlišují od konkurence a umožňují nám
                  budovat dlouhodobé vztahy s našimi klienty.
                </p>
                <p>
                  Jsme tým nadšenců, kteří chtějí dělat rozdíl ve své komunitě a
                  přispět k pozitivní změně ve světě technologií a udržitelné
                  energie. Vážíme si každé příležitosti, abychom pomohli našim
                  klientům dosáhnout jejich cílů a zlepšit jejich podnikání.
                  Vaše spokojenost je naším úspěchem.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md={3}>
            <ContactForm
              source={"about"}
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

export default aboutPage
