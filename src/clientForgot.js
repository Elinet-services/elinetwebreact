import { useState, useRef } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText,
  MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBAlert, MDBSpinner
} from "mdb-react-ui-kit"
import connection from './connection.js';

function ClientForgot() {
  const submitAlertMessage = useRef(null);        //  zobrazeni responseMessage v MDBAlertu po volani DB
  const [loading, setLoading] = useState(false);  //  volani do DB
  const [error, setError] = useState(false)
  const [responseMessage, setResponseMessage] = useState()
  const [formValue, setFormValue] = useState({
      email: ""
  });

  const onChange = (e) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  async function Submit(e)
  {
    e.preventDefault();
    const form = document.getElementById("forgotForm");
    const formData = new FormData(form);
    formData.set("email", formData.get("email").toLowerCase());

    setLoading(true);
    let response = await connection.processRequest(formData);
    setError(response.isError);
    setResponseMessage (response.responseMessage);

    if (!response.isError) {
      setFormValue({ email: ""})
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

export default ClientForgot;