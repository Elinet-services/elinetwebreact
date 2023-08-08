import { useState } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"

import { sha256 } from "node-forge";
import processRequest from './connection.js';

function ClientReset(params) {
    const resetToken = params.resetToken;
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

      const form = document.getElementById("resetForm");
      const formData = new FormData(form);
      //  token = resetToken + g + hexEncode(email)
      const sha = sha256.create().update(hexDecode(resetToken.substring(resetToken.indexOf('g')+ 1 )) + formData.get("password"));

      formData.delete("rePassword");
      formData.set("password", sha.digest().toHex());
      formData.append("resetToken", resetToken.substring(0, resetToken.indexOf('g')));

      let response = await processRequest(formData, 'resetPassword', params.setLoading, params.setMessage, params.setError, params.submitAlertMessage);
  
      if (!response.isError) {
        setFormValue({ password: "", rePassword: "" })
        form.reset();
        setTimeout(() => {
          params.setPage('login');
        }, 2000);
      }
    }
    return (
      <section className="d-flex justify-content-center">
          <MDBCard>
              <MDBCardBody>
                  <MDBCardText>Reset hesla</MDBCardText>
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