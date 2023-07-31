import { useState, useEffect, useRef } from "react";
import {  MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText,
          MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBSpinner, MDBAlert
} from "mdb-react-ui-kit"

import { sha256 } from "node-forge";
import connection from './connection.js';

function ClientLogin() {
    const submitAlertMessage = useRef(null);        //  zobrazeni responseMessage v MDBAlertu po volani DB
    const [loading, setLoading] = useState(false);  //  volani do DB
    const [error, setError] = useState(false)       //  volani do DB vratilo chybu
    const [responseMessage, setResponseMessage] = useState('')

    const [logged, setLogged] = useState(false)
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });

  useEffect(() => {
      connection.resetCookies();
    }, []);  

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

    async function Login(e)
    {
      e.preventDefault();
      setLoading(true);
      setError(false);

      const formData = new FormData(document.getElementById("loginForm"));
      const sha = sha256.create().update(formData.get("email").toLowerCase() + formData.get("password"));
      formData.set("password", sha.digest().toHex());

      let response = await connection.processRequest(formData);
      setError(response.isError);
      setResponseMessage (response.responseMessage);

      if (!response.isError) {
        setFormValue({ email: "", password: ""})
        document.getElementById('loginForm').reset();

        if (response.adminData && response.adminData.connection) {
          setLogged(true);
          connection.setCookies(response.adminData.connection);
          setTimeout(() => {
            window.location.replace('/');
          }, 2000);
        }
      }
      setLoading(false);
      if (response && response.responseMessage && response.responseMessage.length > 0)  //  zobrazit vysledek volani DB - responseMessage
        submitAlertMessage.current.click();
    }
    
  return (
    <>
    <section className={"d-flex justify-content-center"+ (logged ? ' visually-hidden':'')}>
        <MDBCard>
            <MDBCardBody>
                <MDBCardText>Přihlášení</MDBCardText>
                <form onSubmit={(e) => Login(e)} id="loginForm" >
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

    {/* Odeslani do DB */}
    <MDBModal show={loading} tabIndex='-1' staticBackdrop>
      <MDBModalDialog size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Odesílání do DB</MDBModalTitle>
          </MDBModalHeader>
          <MDBModalBody>
            <div className='text-center'>
              <MDBSpinner role='status'/>
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    {/* zobrazeni responseMessage */}
    <MDBBtn className='visually-hidden' ref={submitAlertMessage}/>
    <MDBAlert triggerRef={submitAlertMessage}
        color={error ? 'danger':'success'}
        autohide appendToBody
        position='top-center'
        width={800}
        offset={50}
        delay={2000}
      >
        {responseMessage}
    </MDBAlert>
    </>
  )
}

export default ClientLogin;