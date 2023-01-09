import { MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"

function ClientRegisterDone() {
    return (
    <section className="d-flex justify-content-center">
        <MDBCard>
            <MDBCardBody>
                <MDBCardText>Registrace provedena</MDBCardText>
            </MDBCardBody>
            <a href="/login">Přihlašte se prosím</a>
        </MDBCard>
    </section>
    )
}

export default ClientRegisterDone;