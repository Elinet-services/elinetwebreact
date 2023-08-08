import { useState, useEffect } from "react";
import {  MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"

import { sha256 } from "node-forge";
import processRequest, {setCookies, resetCookies} from './connection.js';

function ClientLogin(params) {
    const [source, setSource] = useState('login');
    const [logged, setLogged] = useState(false)
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
      resetCookies();
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

//  -------------------------------------------------------------------------------
    async function Login(e)
    {
      e.preventDefault();

      const formData = new FormData(document.getElementById("loginForm"));
      const sha = sha256.create().update(formData.get("email").toLowerCase() + formData.get("password"));
      formData.set("password", sha.digest().toHex());

      let response = await processRequest(formData, 'login', params.setLoading, params.setMessage, params.setError, params.submitAlertMessage);

      if (!response.isError) {
        setFormValue({ email: "", password: ""})
        document.getElementById('loginForm').reset();

        if (response.adminData && response.adminData.connection) {
          setLogged(true);
          setCookies(response.adminData.connection);
          //setTimeout(() => {
          //  window.location.replace('/');
          //}, 2000);
        }
      }
    }

//  -------------------------------------------------------------------------------
    async function Forgot(e)
    {
      e.preventDefault();
  
      const form = document.getElementById("forgotForm");
      const formData = new FormData(form);
      formData.set("email", formData.get("email").toLowerCase());
  
      let response = await processRequest(formData, 'forgot', params.setLoading, params.setMessage, params.setError, params.submitAlertMessage);
  
      if (!response.isError) {
        setFormValue({ email: ""})
        form.reset();    
      }
    }  

//  -------------------------------------------------------------------------------
return (
  <>
    {source === 'login' ? 
      <section className={"d-flex justify-content-center"+ (logged ? ' visually-hidden':'')}>
          <MDBCard>
              <MDBCardBody>
                  <MDBCardText>Přihlášení</MDBCardText>
                  <form onSubmit={(e) => Login(e)} id="loginForm" >
                      <MDBInput name="email" autoComplete="email"
                          onChange={onChange}
                          value={formValue.email}
                          type="email"
                          wrapperClass="mb-4"
                          label="Email"
                          required 
                      />
                      <MDBInput name="password" autoComplete="current-password"
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
                  </form>
                  <MDBBtn color='link' onClick={() => setSource('forgot')}>
                    Zapomenuté heslo
                  </MDBBtn>
              </MDBCardBody>
          </MDBCard>
      </section>
    : 
      <section className="d-flex justify-content-center">
        <MDBCard>
            <MDBCardBody>
              <MDBCardText>Obnovení hesla</MDBCardText>
              <form onSubmit={(e) => Forgot(e)} id="forgotForm" >
                <MDBInput name="email" autoComplete="email"
                    onChange={onChange}
                    value={formValue.email}
                    type="email"
                    wrapperClass="mb-4"
                    label="Email"
                    required
                />
                <MDBBtn type="submit" className="mb-4" block>
                    Obnovit
                </MDBBtn>
              </form>
              <MDBBtn color='link' onClick={() => setSource('login')}>
                Přihlaste se
              </MDBBtn>
            </MDBCardBody>
        </MDBCard>
      </section>
    }
  </>
  )
}

export default ClientLogin;