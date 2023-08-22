import {
  MDBContainer,
  MDBFooter,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";

export default function mainFooter() {
  return (
    <MDBFooter
      className="pt-1 pb-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <section className="px-3">
        <MDBContainer className="text-center text-md-start mt-1 mb-1">
          <MDBRow className="mt-1">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-2">
              <h6 className="fw-bold mb-2" style={{ fontSize: '0.9rem' }}>
                Elinet services s.r.o.
              </h6>
              <p style={{ fontSize: '0.8rem' }}>
                Partner pro IT malých a středních společností, dodavatel
                solárních elektráren a zabezpečnení objektů
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-2">
              <h6 className="text-uppercase fw-bold mb-2" style={{ fontSize: '0.9rem' }}>Produkty</h6>
              <p style={{ fontSize: '0.8rem' }}><a href="./solar" className="text-reset">Solární elektárny</a></p>
              <p style={{ fontSize: '0.8rem' }}><a href="./network" className="text-reset">Síťová řešení</a></p>
              <p style={{ fontSize: '0.8rem' }}><a href="./security" className="text-reset">Zabezpečení</a></p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-2">
              <h6 className="text-uppercase fw-bold mb-2" style={{ fontSize: '0.9rem' }}>O společnosti</h6>
              <p style={{ fontSize: '0.8rem' }}><a href="./about" className="text-reset">O nás</a></p>
              <p style={{ fontSize: '0.8rem' }}><a href="./contact" className="text-reset">Kontakty</a></p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-2">
              <MDBRow>
                <MDBCol md={12}>
                  <h6 className="text-uppercase fw-bold mb-2" style={{ fontSize: '0.9rem' }}>Adresa</h6>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-2">
                <MDBCol md={10} style={{ fontSize: '0.8rem' }}>
                  Kaprova 42/14, Staré Město,
                  <br />
                  110 00 Praha
                </MDBCol>
                <MDBCol md={10} style={{ fontSize: '0.8rem' }}><a href='mailto:info@elinet.com'>info@elinet.com</a></MDBCol>

                <MDBCol md={10} style={{ fontSize: '0.8rem' }}><a href='tel:+420776684729'>+ 420 776 684 729</a></MDBCol>

                <MDBCol md={10} style={{ fontSize: '0.8rem' }}>IČ: 02199360, DIČ: CZ 02199360</MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div
        className="text-center p-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      >
        © 2023 Copyright: 
        <a className="text-reset fw-bold" href="https://www.elinet.cz/">
           Elinet.cz
        </a>
      </div>
    </MDBFooter>
  );
}
