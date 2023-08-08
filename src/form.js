import { useState } from "react"
import { MDBCol, MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit"
import processRequest from './connection.js';

function ContactForm(params)
{
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

    if (checkForm()) {

      let response = await processRequest(formData, params.source, params.setLoading, params.setMessage, params.setError, params.submitAlertMessage);
  
      if (!response.isError) {
        setFormValue({ name: "", email: "", phone: "", message: ""})
      }
    }
  }
  
  return (
    <form onSubmit={(e) => Submit(e)} id="contactForm">
      <MDBCol className="formHead mb-3">
        Rádi poskytneme bližší informace:{" "}
      </MDBCol>
      <MDBInput name="name" autoComplete="name"
        onChange={onChange}
        value={formValue.name}
        wrapperClass="mb-4"
        label="Jméno a příjmení"
        required
      />
      <MDBInput name="email" autoComplete="email"
        onChange={onChange}
        value={formValue.email}
        type="email"
        wrapperClass="mb-4"
        label="Email"
        required
      />
      <MDBInput name="phone" autoComplete="tel"
        onChange={onChange}
        value={formValue.phone}
        type='tel'
        wrapperClass="mb-4"
        label="Telefon"
      />
      <MDBTextArea name="message"
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
  )
}

export default ContactForm;