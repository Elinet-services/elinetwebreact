import { useState } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"
import connection from './connection.js';

function ClientForgot() {
    const [submited, setSubmited] = useState(false)
    const [error, setError] = useState(false)
    const [responseMessage, setResponseMessage] = useState()
    const [formValue, setFormValue] = useState({
        email: ""
    });

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    function Submit(e)
    {
      e.preventDefault();

      const formData = new FormData(document.getElementById("forgotForm"));      
      formData.set("email", formData.get("email").toLowerCase());
      formData.append("source", 'forgot');

      fetch(connection.getConnectionUrl(), {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          /* if (response.status === 401) {
            navigate('/login');
          } */

          console.log(response)
          if (!response.ok) {
            setError(true)
            return { result: "Nepodarilo se odeslat" }
          } else {
            setFormValue({ email: ""})
            document.getElementById('forgotForm').reset();
            setSubmited(true) //  nastavime odeslano
            return response.json()
          }
        })
        .then((responseData) => {
          console.log(responseData.result)
          setResponseMessage(responseData.result)
        })
        .catch((e) => {
          console.log(e.message)
          setError(true)
          setResponseMessage("Kriticka chyba")
        })

    }
    if (error) {
        return (
          <p>
            Neco se pokazilo
            <br />
            {responseMessage}
          </p>
        )
    } else if (submited) {
        return (
          <section className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardBody>
                    <MDBCardText>{responseMessage}</MDBCardText>
                </MDBCardBody>
            </MDBCard>
          </section>
        )
    } else 
    return (
    <section className="d-flex justify-content-center">
        <MDBCard>
            <MDBCardBody>
                <MDBCardText>Obnovení hesla</MDBCardText>
                <form onSubmit={(e) => Submit(e)} id="forgotForm" >
                    <MDBInput
                        name="email"
                        id="email"
                        onChange={onChange}
                        value={formValue.email}
                        type="email"
                        wrapperClass="mb-4"
                        label="Email"
                        required autoComplete="email"
                    />
            
                    <MDBBtn type="submit" className="mb-4" block>
                        Obnovit
                    </MDBBtn>
                </form>
            </MDBCardBody>
        </MDBCard>
    </section>
    )
}

export default ClientForgot;