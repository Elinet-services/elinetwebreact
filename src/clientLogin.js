import { useState } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"

import { sha256 } from "node-forge";

function ClientLogin() {
    const [submited, setSubmited] = useState(false)
    const [error, setError] = useState(false)
    const [responseMessage, setResponseMessage] = useState()
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
        if (e.target.name === 'password') {
            if (e.target.value.length === 0)
                e.target.setCustomValidity('');
            else if (e.target.value.length < 8)
                e.target.setCustomValidity('Heslo musí mít délku alespoň 8 znaků');
            else
                e.target.setCustomValidity('');
        }
    }

    function Submit(e)
    {
      e.preventDefault();

      const url = "https://script.google.com/macros/s/AKfycbyHpBxU8hmMBau8A_l7sOCEaMaE7VszFDeIXYE-03n83r-q_FAREIZSEeNmstK5nL-vTw/exec";
      const formData = new FormData(document.getElementById("loginForm"));
      
      const sha = sha256.create().update(formData.get("email").toLowerCase() + formData.get("password"));

      formData.set("password", sha.digest().toHex());
      formData.append("source", 'login');

      fetch(url, {
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
            setFormValue({ email: "", password: ""})
            document.getElementById('loginForm').reset();
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
            neco se pokazilo
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
                <MDBCardText>Přihlášení</MDBCardText>
                <form onSubmit={(e) => Submit(e)} id="loginForm" >
                    <MDBInput
                        name="email"
                        id="email"
                        onChange={onChange}
                        value={formValue.email}
                        type="email"
                        wrapperClass="mb-4"
                        label="Email"
                        required
                    />
                    <MDBInput
                        name="password"
                        id="password"
                        onChange={onChange}
                        value={formValue.password}
                        type="password"
                        wrapperClass="mb-4"
                        label="Heslo (min 8 znaků)"
                        required
                    />
            
                    <MDBBtn type="submit" className="mb-4" block>
                        Přihlásit
                    </MDBBtn>

                    <a href="/forgot">Zapomenuté heslo</a>
                </form>
            </MDBCardBody>
        </MDBCard>
    </section>
    )
}

export default ClientLogin;