import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"
import "./mainPage.css"

function mainPage({ setPage }) {
  return (
    <>
      <MDBRow className="bg-light mb-3">
        <MDBCol>
          <MDBCard className="h-100 card-content">
            <div className="d-flex flex-row align-items-start">
              <MDBCardImage
                src="images/Male_NTB.png"
                position="top"
                alt="IT řešení"
                className="card-image"
              />
              <MDBCardBody className="card-text">
                <MDBCardTitle>
                  <span
                    onClick={() => setPage("network")}
                    className="like-link text-reset"
                  >
                    Specializované IT služby od našeho týmu{" "}
                  </span>
                </MDBCardTitle>
                <MDBCardText>
                  Naše odborná skupina nabízí komplexní IT služby, které
                  pokrývají spektrum od návrhu přes vývoj až po neustálou
                  podporu. Naše hluboké znalosti a zkušenosti v oblastech
                  bankovnictví a telekomunikací nám umožňují přinášet inovativní
                  přístupy do světa malých a středních podniků. S naším odborným
                  know-how a zaměřením na zákaznická řešení, jsme připraveni
                  poskytnout IT služby, které jsou přesně přizpůsobeny potřebám
                  vaší firmy.
                </MDBCardText>
                <MDBCardText>
                  <span
                    className="like-link"
                    onClick={() => {
                      setPage("network")
                    }}
                  >
                    Dozvědět se více
                  </span>
                </MDBCardText>
              </MDBCardBody>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow className="bg-light mb-3">
        <MDBCol>
          <MDBCard className="h-100 card-content">
            <div className="d-flex flex-row-reverse align-items-start">
              <MDBCardImage
                src="images/FVE.png"
                position="top"
                alt="Solární elektárny"
                className="card-image"
              />
              <MDBCardBody className="card-text">
                <MDBCardTitle>
                  <span
                    onClick={() => setPage("solar")}
                    className="like-link text-reset"
                  >
                    Kvalitní solární systémy na míru{" "}
                  </span>
                </MDBCardTitle>
                <MDBCardText className="text-wrap">
                  Poskytujeme komplexní služby v oblasti solární energie, od
                  prvotní analýzy až po instalaci. S naším omezeným počtem
                  projektů ročně zaručujeme nejvyšší úroveň kvality a zákaznické
                  spokojenosti. Naše nabídka zahrnuje různé typy solárních
                  systémů, od střešních tašek až po panely a fasády, které lze
                  integrovat s dalšími technologiemi pro maximalizaci účinnosti.
                  Náš podrobný návrh je navržen tak, aby splnil všechny
                  požadavky pro schválení u&nbsp;distribuční sítě a získání
                  dotací.
                </MDBCardText>
                <MDBCardText>
                  <span
                    className="like-link"
                    onClick={() => {
                      setPage("solar")
                    }}
                  >
                    Dozvědět se více
                  </span>
                </MDBCardText>
              </MDBCardBody>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow className="bg-light mb-3">
        <MDBCol>
          <MDBCard className="h-100 card-content">
            <div className="d-flex flex-row align-items-start">
              <MDBCardImage
                src="images/EZS_small.png"
                position="top"
                alt="Zabezpečení"
                className="card-image"
              />
              <MDBCardBody className="card-text">
                <MDBCardTitle>
                  <span
                    onClick={() => setPage("security")}
                    className="like-link text-reset"
                  >
                    Moderní zabezpečovací systémy a automatizace pro domy a
                    kanceláře
                  </span>
                </MDBCardTitle>
                <MDBCardText>
                  Náš tým odborníků nabízí pružné, inovativní řešení v oblasti
                  zabezpečení a automatizace pro domácnosti nebo menší
                  kancelářské prostory. Naše rozsáhlé IT znalosti a zkušenosti z
                  implementace bezpečnostních a evakuačních systémů nám umožňují
                  vytvářet systémy, které lze v budoucnu jednoduše upravovat a
                  rozšiřovat. S naším individuálním přístupem se každá zakázka
                  těší maximální péči, což zajišťuje vysokou kvalitu našich
                  dodávek a&nbsp;pravidelný servis. Po důkladné analýze vašich
                  potřeb vytvoříme řešení na míru, které po schválení
                  zrealizujeme pro vaše maximální pohodlí a efektivitu.
                </MDBCardText>
                <MDBCardText>
                  <span
                    className="like-link"
                    onClick={() => {
                      setPage("security")
                    }}
                  >
                    Dozvědět se více
                  </span>
                </MDBCardText>
              </MDBCardBody>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default mainPage
