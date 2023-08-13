import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./mainPage.css";

function mainPage() {
  return (
    <>
      <MDBRow className="bg-light mb-3">
        <MDBCol>
          <MDBCard className="h-100 card-content">
            <div className="d-flex flex-row align-items-start">
              <MDBCardImage
                src="images/officesm.png"
                position="top"
                alt="IT řešení"
                className="card-image"
              />
              <MDBCardBody className="card-text">
                <MDBCardTitle>
                  <a href="./network" className="text-reset">
                    Specializované IT služby od našeho týmu{" "}
                  </a>
                </MDBCardTitle>
                <MDBCardText>
                  Naše odborná skupina nabízí komplexní IT služby, které pokrývají
                  spektrum od návrhu přes vývoj až po neustálou podporu. Naše hluboké
                  znalosti a zkušenosti v oblastech bankovnictví a telekomunikací
                  nám umožňují přinášet inovativní přístupy do světa malých a středních
                  podniků. S naším odborným know-how a zaměřením na zákaznická řešení,
                  jsme připraveni poskytnout IT služby, které jsou přesně přizpůsobeny
                  potřebám vaší firmy.
                </MDBCardText>
                <MDBCardText>
                  <a href="/network" className="learn-more">Dozvědět se více</a>
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
                src="images/photoii.png"
                position="top"
                alt="Solární elektárny"
                className="card-image"
              />
              <MDBCardBody className="card-text">
                <MDBCardTitle>
                  <a href="./solar" className="text-reset">
                    Kvalitní solární systémy na míru{" "}
                  </a>
                </MDBCardTitle>
                <MDBCardText className="text-wrap">
                  Poskytujeme komplexní služby v oblasti solární energie, od
                  prvotní analýzy až po instalaci. S naším omezeným počtem
                  projektů ročně zaručujeme nejvyšší úroveň kvality a zákaznické
                  spokojenosti. Naše nabídka zahrnuje různé typy solárních
                  systémů, od střešních tašek až po panely a fasády, které lze
                  integrovat s dalšími technologiemi pro maximalizaci účinnosti. 
                  Náš podrobný návrh je navržen tak, aby splnil všechny požadavky pro schválení u&nbsp;distribuční sítě a získání dotací.
                </MDBCardText>
                <MDBCardText>
                  <a href="./solar" className="learn-more">Dozvědět se více</a>
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
                src="images/homesecurityi.png"
                position="top"
                alt="Zabezpečení"
                className="card-image"
              />
              <MDBCardBody className="card-text">
                <MDBCardTitle>
                  <a href="./security" className="text-reset">
                    Moderní zabezpečovací systémy a automatizace pro domy a
                    kanceláře
                  </a>
                </MDBCardTitle>
                <MDBCardText>
                  Náš tým odborníků nabízí pružné, inovativní řešení v oblasti
                  zabezpečení a automatizace pro domácnosti nebo menší kancelářské
                  prostory. Naše rozsáhlé IT znalosti a zkušenosti z implementace
                  bezpečnostních a evakuačních systémů nám umožňují vytvářet systémy,
                  které lze v budoucnu jednoduše upravovat a rozšiřovat. S naším
                  individuálním přístupem se každá zakázka těší maximální péči, což
                  zajišťuje vysokou kvalitu našich dodávek a&nbsp;pravidelný servis. Po
                  důkladné analýze vašich potřeb vytvoříme řešení na míru, které po
                  schválení zrealizujeme pro vaše maximální pohodlí a efektivitu.
                </MDBCardText>
                <MDBCardText>
                  <a href="./security" className="learn-more">Dozvědět se více</a>
                </MDBCardText>
              </MDBCardBody>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default mainPage;
