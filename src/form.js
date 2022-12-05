import { useState } from 'react';
import {
  MDBCol,
  MDBInput,
  MDBTextArea,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Navigate } from 'react-router-dom';

function contactForm()
{
  const [submited, setSubmited] = useState(false);
  const [error, setError] = useState(false);
  const [responseMessage, setResponseMessage] = useState();

  function Submit (e)
  {
    e.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    formData.append('dateTime', new Date().toUTCString())
    formData.append('source', window.location.pathname.substring(1));
    //formData.append('ipAddress', ...)
    setSubmited(true);  //  nastavime odeslano
    
    const url = 'https://script.google.com/macros/s/AKfycbyR22C2uc7oNgSYgjWu7vxTSyKyAipY3EpboV-xGTdR1YhqLkSo0fVq7_l9LqzX-lU_DQ/exec';
    //const url = 'https://httpstat.us/401';
    //const url = 'https://script.google.com/macros/s/AKfycbz3xsrZgWErwE8RcO0iOb9rCgthBDDBejk3EZTfts-2HUDiKXSIHGTaBUcbSYlNmrktpw/exec';

    fetch( url
    , {
        method: 'POST',
        body: formData        
      } )
      .then(response => { 
        /* if (response.status === 401) {
          navigate('/login');
        } */

        console.log(response);
        if (!response.ok) {
          setError(true);
          return {result:'Nepodarilo se odeslat'};
        } else {
          return response.json();
        }
      })
      .then(responseData => {
        console.log(responseData.result);
        setResponseMessage (responseData.result);
      })
      .catch ((e) => {
        console.log(e.message);
        setError(true);
        setResponseMessage('Kriticka chyba');
      })
  }
  
  if (error) {
    return (<p>neco se pokazilo<br/>
            {responseMessage}
    </p>);
  }
  else if (submited && responseMessage)
  {
    return (<p>Odeslano<br/>
      {responseMessage}
    </p>);
  }
  else {
    return (    
    <form onSubmit={e => Submit(e)}>
      <MDBCol className='formHead mb-3'>Máte zájem o bližší informace? Napište nám.</MDBCol>
      <MDBInput name='name' id='name' wrapperClass='mb-4' label='Jméno a příjmení' />
      <MDBInput name='email' id='email' type='email' wrapperClass='mb-4' label='Email' />
      <MDBInput name='phone' id='phone' wrapperClass='mb-4' label='Telefon' />
      <MDBTextArea name='message' id='message' rows={4} wrapperClass='mb-4' label='Text zprávy' />

      <MDBBtn type='submit' className='mb-4' block>
        Odeslat
      </MDBBtn>
    </form>
    );
  }
}

export default contactForm;