import { useState, useRef } from "react"
import { MDBCol, MDBInput, MDBTextArea, MDBBtn,
  MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBAlert, MDBSpinner
} from "mdb-react-ui-kit"
import connection from './connection.js';

function ContactForm() {
  const submitAlertMessage = useRef(null);        //  zobrazeni responseMessage v MDBAlertu po volani DB
  const [loading, setLoading] = useState(false);  //  volani do DB
  const [error, setError] = useState(false)
  const [responseMessage, setResponseMessage] = useState()
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  function checkForm() 
  {
    let v_ret = true;
    return v_ret;
  }

  async function Submit(e)
  {
    e.preventDefault();

    const formData = new FormData(document.getElementById("contactForm"));
    /* for (const pair of formData.entries()) {
      console.log(pair[0] +', '+ pair[1]);
    } */

    if (checkForm()) {
      setLoading(true);

      let response = await connection.processRequest(formData);
      setError(response.isError);
      setResponseMessage (response.responseMessage);
  
      if (!response.isError) {
        setFormValue({ name: "", email: "", phone: "", message: ""})
      }
      setLoading(false);
      if (response && response.responseMessage && response.responseMessage.length > 0)  //  zobrazit vysledek volani DB - responseMessage
        submitAlertMessage.current.click();
    }
  }
  
  return (
    <>
      <form onSubmit={(e) => Submit(e)} id="contactForm">
        <MDBCol className="formHead mb-3">
          Rádi poskytneme bližší informace:{" "}
        </MDBCol>
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
        <MDBTextArea
          name="message"
          id="message"
          onChange={onChange}
          value={formValue.message}
          rows={4}
          wrapperClass="mb-4"
          label="Text zprávy"
        />

        <MDBBtn type="submit" className="mb-4" block>
          Odeslat
        </MDBBtn>
      </form>
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

export default ContactForm;