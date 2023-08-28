import {
  MDBContainer,
  MDBFooter,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";

export default function mainFooter({setPage}) {
  return (
    <MDBFooter
      className="pt-1 pb-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <section className="px-3">
        <MDBContainer className="text-md-start" id='footer'>
          <MDBRow className="my-2">
            <MDBCol md="4" lg="4" xl="3" className="mx-auto my-2">
              <h6 className="fw-bold mb-2">
                Elinet services s.r.o.
              </h6>
              <span>
                Partner pro IT malých a středních společností, dodavatel
                solárních elektráren a zabezpečnení objektů
              </span>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto my-2">
              <h6 className="text-uppercase fw-bold mb-2">Produkty</h6>
              <span className='like-link text-reset' onClick={() => {setPage('solar')}}>Solární elektárny</span><br/>
              <span className='like-link text-reset' onClick={() => {setPage('network')}}>Síťová řešení</span><br/>
              <span className='like-link text-reset' onClick={() => {setPage('security')}}>Zabezpečení</span><br/>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto my-2">
              <h6 className="text-uppercase fw-bold mb-2">O společnosti</h6>
              <span className='like-link text-reset' onClick={() => {setPage('about')}}>O nás</span><br/>
              <span className='like-link text-reset' onClick={() => {setPage('contact')}}>Kontakty</span><br/>
            </MDBCol>

            <MDBCol md="3" lg="4" xl="3" className="mx-auto my-2">
              <MDBRow>
                <MDBCol md={12}>
                  <h6 className="text-uppercase fw-bold mb-2">Adresa</h6>
                </MDBCol>
              </MDBRow>
              <MDBRow className="">
              <MDBCol md={10}>Elinet services s.r.o.</MDBCol>
                <MDBCol md={10}>
                  Kaprova 42/14, Staré Město,
                  <br />
                  110 00 Praha
                </MDBCol>
                
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div className="text-center p-1"
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
