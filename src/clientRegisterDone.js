import { MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"

function ClientRegisterDone() {
    return (
    <section className="d-flex justify-content-center">
        <MDBCard>
            <MDBCardBody>
                <MDBCardText>Registrace aktivována</MDBCardText>
                <a href="/login">Přihlaste se prosím</a>
            </MDBCardBody>
        </MDBCard>
    </section>
    )
}

export default ClientRegisterDone;