import { useState, useRef } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText,
  MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBAlert, MDBSpinner
 } from "mdb-react-ui-kit"
import { useParams } from "react-router-dom";

import { sha256 } from "node-forge";
import connection from './connection.js';

function ClientReset() {
    const submitAlertMessage = useRef(null);        //  zobrazeni responseMessage v MDBAlertu po volani DB
    const [loading, setLoading] = useState(false);  //  volani do DB
    const [error, setError] = useState(false);
    const [responseMessage, setResponseMessage] = useState();

    let { token } = useParams();  //  token v URL
    const [formValue, setFormValue] = useState({
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

      const form = document.getElementById("resetForm");
      const formData = new FormData(form);
      //  token = token + g + hexEncode(email)
      const sha = sha256.create().update(hexDecode(token.substring(token.indexOf('g')+ 1 )) + formData.get("password"));

      formData.delete("rePassword");
      formData.set("password", sha.digest().toHex());
      formData.append("resetToken", token.substring(0, token.indexOf('g')));

      let response = await connection.processRequest(formData);
      setError(response.isError);
      setResponseMessage (response.responseMessage);
  
      if (!response.isError) {
        setFormValue({ password: "", rePassword: "" })
        form.reset();
      }
      setLoading(false);
      if (response && response.responseMessage && response.responseMessage.length > 0)  //  zobrazit vysledek volani DB - responseMessage
        submitAlertMessage.current.click();
    }
    return (
    <>
      <section className="d-flex justify-content-center">
          <MDBCard>
              <MDBCardBody>
                  <MDBCardText>Registrační formulář</MDBCardText>
                  <form onSubmit={(e) => Submit(e)} id="resetForm" >
                      <MDBInput
                          name="password"
                          id="password"
                          onChange={onChange}
                          value={formValue.password}
                          type="password"
                          wrapperClass="mb-4"
                          label="Heslo (min 8 znaků)"
                          required autoComplete="new-password"
                      />
                      <MDBInput
                          name="rePassword"
                          id="rePassword"
                          onChange={onChange}
                          value={formValue.rePassword}
                          type="password"
                          wrapperClass="mb-4"
                          label="Heslo pro kontrolu"
                          required autoComplete="new-password"
                      />
                      <MDBBtn type="submit" className="mb-4" block>
                          Změnit heslo
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
}

function hexDecode(aStr)
{
  const hex = aStr.toString();
  let result = '';
  for (let i = 0; i < hex.length; i += 2)
    result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return result;
}

export default ClientReset;