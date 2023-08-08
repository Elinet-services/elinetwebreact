import { useState } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"
import { sha256 } from "node-forge";
import processRequest from './connection.js';

function ClientRegister(params)
{
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
    const form = document.getElementById("registerForm");
    const formData = new FormData(form);
    const sha = sha256.create().update(formData.get("email").toLowerCase() + formData.get("password"));

    formData.delete("rePassword");
    formData.set("password", sha.digest().toHex());

    let response = await processRequest(formData, 'register', params.setLoading, params.setMessage, params.setError, params.submitAlertMessage);

    if (!response.isError) {
      setFormValue({ name: "", email: "", phone: "", password: "", rePassword: "" })
      form.reset();
    }
  }
  return (  //  ClientRegister
      <section className="d-flex justify-content-center">
        <MDBCard>
            <MDBCardBody>
                <MDBCardText>Registrační formulář</MDBCardText>
                <form onSubmit={(e) => Submit(e)} id="registerForm" >
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
                    <MDBInput name="password" autoComplete="new-password"
                        onChange={onChange}
                        value={formValue.password}
                        type="password"
                        wrapperClass="mb-4"
                        label="Heslo (min 8 znaků)"
                        required
                    />
                    <MDBInput name="rePassword" autoComplete="new-password"
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
} //  ClientRegister

export default ClientRegister;