import { useState,useEffect } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"

import { sha256 } from "node-forge";
import connection from './connection.js';

function ClientLogin() {
    const [logged, setLogged] = useState(false)
    const [error, setError] = useState(false)
    const [responseMessage, setResponseMessage] = useState()
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
      //connection.resetCookies();
      //connection.setCookie('operatorLevel', 'N', { path: '/'});
      //cookies.set('userName', '', { path: '/'});
      //cookies.set('partnerName', '', { path: '/'});
    }, []);  

    const onChange = (e) => {
      //var cookie = require('cookie');
      //cookie.serialize('token','abcd123d',{expires: new Date()});

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

      const formData = new FormData(document.getElementById("loginForm"));
      
      const sha = sha256.create().update(formData.get("email").toLowerCase() + formData.get("password"));

      formData.set("password", sha.digest().toHex());
      formData.append("source", 'login');

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
            setFormValue({ email: "", password: ""})
            document.getElementById('loginForm').reset();
            setLogged(true) //  nastavime prihlaseno
            return response.json()
          }
        })
        .then((responseData) => {
          console.log(responseData.result)
          setResponseMessage(responseData.message)
          connection.setCookies(responseData.adminData.connection);
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
    } else if (logged) {
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
                        required autoComplete="email"
                    />
                    <MDBInput
                        name="password"
                        id="password"
                        onChange={onChange}
                        value={formValue.password}
                        type="password"
                        wrapperClass="mb-4"
                        label="Heslo (min 8 znaků)"
                        required autoComplete="current-password"
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