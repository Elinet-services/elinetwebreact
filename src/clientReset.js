import { useState } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit"
import { useParams } from "react-router-dom";

import { sha256 } from "node-forge";
import connection from './connection.js';

function ClientReset() {
    let { token } = useParams();

    const [submited, setSubmited] = useState(false)
    const [error, setError] = useState(false)
    const [responseMessage, setResponseMessage] = useState()
    const [formValue, setFormValue] = useState({
        password: "",
        rePassword: ""
    });

    console.log(token);

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

    function Submit(e)
    {
      e.preventDefault();

      const formData = new FormData(document.getElementById("resetForm"));
      //  token = token + g + hexEncode(email)
      const sha = sha256.create().update(hexDecode(token.substring(token.indexOf('g')+ 1 )) + formData.get("password"));

      formData.delete("rePassword");
      formData.set("password", sha.digest().toHex());
      formData.append("token", token.substring(0, token.indexOf('g')));
      formData.append("source", 'resetPassword');

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
            return { result: "Nepodarilo se odeslat" }
          } else {
            setFormValue({ password: "", rePassword: "" })
            document.getElementById('resetForm').reset();
            setSubmited(true) //  nastavime odeslano
            return response.json()
          }
        })
        .then((responseData) => {
          console.log(responseData.result)
          setResponseMessage(responseData.result)
        })
        .catch((e) => {
          console.log(e.message)
          setError(true)
          setResponseMessage("Kriticka chyba")
        })

    }
    if (error) {
        return (
          <p>
            neco se pokazilo
            <br />
            {responseMessage}
          </p>
        )
    } else if (submited) {
        return (
          <section className="d-flex justify-content-center">
            <MDBCard>
                <MDBCardBody>
                    <MDBCardText>{responseMessage}</MDBCardText>
                </MDBCardBody>
                <a href="/login">Přihlaste se prosím</a>
            </MDBCard>
          </section>
        )
    } else 
    return (
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
                        required
                    />
                    <MDBInput
                        name="rePassword"
                        id="rePassword"
                        onChange={onChange}
                        value={formValue.rePassword}
                        type="password"
                        wrapperClass="mb-4"
                        label="Heslo pro kontrolu"
                        required
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