import {
  MDBContainer,
  MDBIcon,
  MDBFooter,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit"

//  -------------------------------------------------------------------------------
export default function mainFooter() {
  return (
    <MDBFooter
      className="pt-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <section className="">
        <MDBContainer className="text-center text-md-start mt-3">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Elinet services s.r.o.
              </h6>
              <p>
                Partner pro IT malých a středních společností, dodavatel
                solárních elektráren a zabezpečnení objektů
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Produkty</h6>
              <p>
                <a href="./solar" className="text-reset">
                  Solární elektárny
                </a>
              </p>
              <p>
                <a href="./network" className="text-reset">
                  Síťová řešení
                </a>
              </p>
              <p>
                <a href="./security" className="text-reset">
                  Zabezpečení
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">O společnosti</h6>
              <p>
                <a href="./about" className="text-reset">
                  O nás
                </a>
              </p>
              <p>
                <a href="./contact" className="text-reset">
                  Kontakty
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-4">
              <MDBRow>
                <MDBCol md={12}>
                  <h6 className="text-uppercase fw-bold mb-4">Adresa</h6>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-2">
                <MDBCol md={2}>
                  <MDBIcon icon="home" className="me-2" />
                </MDBCol>
                <MDBCol md={10}>
                  Kaprova 42/14,
                  <br />
                  Staré Město,
                  <br />
                  110 00 Praha
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-2">
                <MDBCol md={2}>
                  <MDBIcon icon="envelope" className="me-3" />
                </MDBCol>
                <MDBCol md={10}><a href='mailto:info@elinet.com'>info@elinet.com</a></MDBCol>
              </MDBRow>
              <MDBRow className="mb-2">
                <MDBCol md={2}>
                  <MDBIcon icon="phone" className="me-3" />
                </MDBCol>
                <MDBCol md={10}><a href='tel:+420776684729'>+ 420 776 684 729</a></MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={2}>IČO:</MDBCol>
                <MDBCol md={10}>02199360</MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div
        className="text-center p-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      >
        © 2023 Copyright:{" "}
        <a className="text-reset fw-bold" href="https://elinet.cz/">
          Elinet.cz
        </a>
      </div>
    </MDBFooter>
  )
} //  mainFooter
