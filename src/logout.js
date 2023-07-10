import { useState, useEffect } from "react";

import { MDBCard, MDBCardBody, MDBCardText, MDBSpinner } from 'mdb-react-ui-kit';
import connection from './connection.js';

function Logout()
{
  const [submited, setSubmited] = useState(false)
  const [error, setError] = useState(false);      //  volani do DB vtratilo chybu
  const [responseMessage, setResponseMessage] = useState(''); //  textova zprava volani do DB
  
  //  -------------------------------------------------------------------------------
  //  volani DB pro uvodni nacteni z DB
  useEffect(() => {
    const loadData = () => {
      const formData = new FormData();
      processRequest(formData);
    };

    loadData();
  }, []);


  //  -------------------------------------------------------------------------------
  //  odesle data do DB
  function processRequest(formData)
  {
    setError(false);
    setResponseMessage('');

    formData.append("source", window.location.pathname.substring(1));
    formData.append("token", connection.getToken());
    
    fetch(connection.getConnectionUrl(), {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        /* if (response.status === 401) {
          navigate('/login');
        } */

        if (!response.ok) {
          setError(true)
          return { message: "Nepodařilo se odeslat" }
        } else {
          return response.json()
        }
      })
      .then((responseData) => {
        //  console.log(responseData)
        setResponseMessage(responseData.message);
        connection.resetCookies();
        setSubmited(true);
      })
      .catch((e) => {
        console.log(e.message)
        setError(true);
        setResponseMessage("Kritická chyba: "+ e.message);
      })
  }
  
  //  -------------------------------------------------------------------------------
  //  H L A V N I   B L O K
  //  -------------------------------------------------------------------------------
  if (error) {
    return (
      <section className="d-flex justify-content-center">
        <MDBCard>
            <MDBCardBody>
              <MDBCardText>Něco se pokazilo</MDBCardText>
              <MDBCardText>{responseMessage}</MDBCardText>
            </MDBCardBody>
        </MDBCard>
      </section>
    )
  } else if (submited){
    return (
      <section className="d-flex justify-content-center">
        <MDBCard>
            <MDBCardBody>
                <MDBCardText>{responseMessage}</MDBCardText>
                <span><a href="/login">Přihlaste se prosím</a></span>
            </MDBCardBody>

        </MDBCard>
      </section>
    )
  } else {
    return (
      <section className="d-flex justify-content-center">
        <MDBCard>
            <MDBCardBody>
                <MDBCardText>Odesílání do DB</MDBCardText>
                <MDBCardText>
                  <div className='text-center'>
                    <MDBSpinner role='status'/>
                  </div>
                </MDBCardText>                
            </MDBCardBody>
        </MDBCard>
      </section>
    )
  }  
}

export default Logout;