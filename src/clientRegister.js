import { useState, useRef } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText,
  MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBAlert, MDBSpinner
 } from "mdb-react-ui-kit"
import { sha256 } from "node-forge";
import connection from './connection.js';

function ClientRegister()
{
  const submitAlertMessage = useRef(null);        //  zobrazeni responseMessage v MDBAlertu po volani DB
  const [loading, setLoading] = useState(false);  //  volani do DB
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

  async function Submit(e)
  {
    e.preventDefault();
    setLoading(true);
    const form = document.getElementById("registerForm");
    const formData = new FormData(form);
    const sha = sha256.create().update(formData.get("email").toLowerCase() + formData.get("password"));

    formData.delete("rePassword");
    formData.set("password", sha.digest().toHex());

    let response = await connection.processRequest(formData);
    setError(response.isError);
    setResponseMessage (response.responseMessage);

    if (!response.isError) {
      setFormValue({ name: "", email: "", phone: "", password: "", rePassword: "" })
      form.reset();
    }
    setLoading(false);
    if (response && response.responseMessage && response.responseMessage.length > 0)  //  zobrazit vysledek volani DB - responseMessage
      submitAlertMessage.current.click();
  }
  return (  //  ClientRegister
    <>
      <section className="d-flex justify-content-center">
        <MDBCard>
            <MDBCardBody>
                <MDBCardText>Registrační formulář</MDBCardText>
                <form onSubmit={(e) => Submit(e)} id="registerForm" >
                    <MDBInput name="name" id="name" autoComplete="name"
                        onChange={onChange}
                        value={formValue.name}
                        wrapperClass="mb-4"
                        label="Jméno a příjmení"
                        required
                    />
                    <MDBInput name="email" id="email" autoComplete="email"
                        onChange={onChange}
                        value={formValue.email}
                        type="email"
                        wrapperClass="mb-4"
                        label="Email"
                        required
                    />
                    <MDBInput name="phone" id="phone" autoComplete="tel"
                        onChange={onChange}
                        value={formValue.phone}
                        type='tel'
                        wrapperClass="mb-4"
                        label="Telefon"
                    />
                    <MDBInput name="password" id="password" autoComplete="new-password"
                        onChange={onChange}
                        value={formValue.password}
                        type="password"
                        wrapperClass="mb-4"
                        label="Heslo (min 8 znaků)"
                        required
                    />
                    <MDBInput name="rePassword" id="rePassword" autoComplete="new-password"
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
          offset={150}
          delay={3000}
        >
          {responseMessage}
      </MDBAlert>
    </>
  )
} //  ClientRegister

export default ClientRegister;