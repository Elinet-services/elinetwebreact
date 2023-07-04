import { useState } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"
import { sha256 } from "node-forge";
import connection from './connection.js';

function ClientRegister()
{
    const [submited, setSubmited] = useState(false)
    const [error, setError] = useState(false)
    const [responseMessage, setResponseMessage] = useState()
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        rePassword: ""
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
        if (e.target.name === 'rePassword') {
            if (e.target.value.length === 0)
                e.target.setCustomValidity('');
            else if (e.target.value !== formValue.password)
                e.target.setCustomValidity('Hesla se neshodují');
            else
                e.target.setCustomValidity('');
        }
    }

    function Submit(e)
    {
      e.preventDefault();
      const formData = new FormData(document.getElementById("registerForm"));      
      const sha = sha256.create().update(formData.get("email").toLowerCase() + formData.get("password"));

      formData.delete("rePassword");
      formData.set("password", sha.digest().toHex());
      formData.append("source", 'register');
      formData.append("token", connection.getToken());

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
            setFormValue({ name: "", email: "", phone: "", password: "", rePassword: "" })
            document.getElementById('registerForm').reset();
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
                <MDBCardText>Registrační formulář</MDBCardText>
                <form onSubmit={(e) => Submit(e)} id="registerForm" >
                    <MDBInput
                        name="name"
                        id="name"
                        onChange={onChange}
                        value={formValue.name}
                        wrapperClass="mb-4"
                        label="Jméno a příjmení"
                        required
                    />
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
                        name="phone"
                        id="phone"
                        onChange={onChange}
                        value={formValue.phone}
                        type='tel'
                        wrapperClass="mb-4"
                        label="Telefon"
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
                    <MDBInput
                        name="rePassword"
                        id="rePassword"
                        onChange={onChange}
                        value={formValue.rePassword}
                        type="password"
                        wrapperClass="mb-4"
                        label="Heslo pro kontrolu"
                        required
                    />
            
                    <MDBBtn type="submit" className="mb-4" block>
                        Registrovat
                    </MDBBtn>
                </form>
            </MDBCardBody>
        </MDBCard>
    </section>
    )
}

export default ClientRegister;