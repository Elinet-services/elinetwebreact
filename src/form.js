import {
  MDBCol,
  MDBInput,
  MDBTextArea,
  MDBBtn
} from 'mdb-react-ui-kit';

function contactForm() {
  return (    
    <form>
      <MDBCol className='formHead mb-3'>Máte zájem o bližší informace? Napište nám.</MDBCol>
      <MDBInput id='name' wrapperClass='mb-4' label='Jméno a příjmení' />
      <MDBInput type='email' id='email' wrapperClass='mb-4' label='Email' />
      <MDBInput id='phone' wrapperClass='mb-4' label='Telefon' />
      <MDBTextArea wrapperClass='mb-4' id='message' rows={4} label='Text zprávy' />

      <MDBBtn type='submit' className='mb-4' block>
        Odeslat
      </MDBBtn>
    </form>
  );
}

export default contactForm;