import { useState } from "react"
import { MDBCol, MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit"
import connection from './connection.js';

function ContactForm() {
  const [submited, setSubmited] = useState(false)
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

  function Submit(e)
  {
    e.preventDefault();

    const formData = new FormData(document.getElementById("contactForm"));

    if (checkForm()) {

      formData.append("dateTime", new Date().toUTCString())
      formData.append("source", window.location.pathname.substring(1))

      /* for (const pair of formData.entries()) {
        console.log(pair[0] +', '+ pair[1]);
      } */
      console.log(formData);
      setSubmited(true) //  nastavime odeslano

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
            return { message: "Nepodarilo se odeslat" }
          } else {
            setFormValue({ name: "", email: "", phone: "", message: ""})
            document.getElementById('contactForm').reset();
            return response.json()
          }
        })
        .then((responseData) => {
          console.log(responseData.message)
          setResponseMessage(responseData.message)
        })
        .catch((e) => {
          console.log(e.message)
          setError(true)
          setResponseMessage("Kriticka chyba")
        })
    }
  }
  
  if (error) {
    return (
      <p>
        neco se pokazilo
        <br />
        {responseMessage}
      </p>
    )
  } else if (submited && responseMessage) {
    return (
      <p>
        Odeslano
        <br />
        {responseMessage}
      </p>
    )
  } else {
    return (
      <form onSubmit={(e) => Submit(e)} id="contactForm">
        <MDBCol className="formHead mb-3">
          Rádi poskytneme bližší informace:{" "}
        </MDBCol>
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
    )
  }
}

export default ContactForm;