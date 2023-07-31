import { useState, useEffect, useRef } from "react";

import {
  MDBCard, MDBCardBody, MDBContainer,
  MDBDatatable, 
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBSpinner,
  MDBAlert,
} from 'mdb-react-ui-kit';
import connection from './connection.js';


function OrderList()
{
  const submitAlertMessage = useRef(null);        //  zobrazeni responseMessage v MDBAlertu po volani DB
  const [loading, setLoading] = useState(false);  //  volani do DB
  const [error, setError] = useState(false);      //  volani do DB vtratilo chybu
  const [responseMessage, setResponseMessage] = useState(''); //  textova zprava volani do DB

  const [documentTypeList, setDocumentTypeList] = useState([
    {value: '', text: '' },
    {value: 'FP', text: 'Faktura přijatá', defaultSelected: false},
    {value: 'FV', text: 'Faktura vydaná', defaultSelected: false},
    {value: 'D',  text: 'Dokument', defaultSelected: false} ]
  );
  /*  SEZNAM ZAKAZEK  */
  const [orderList, setOrderList] = useState({
    columns:  [{label:'Zakázky', field:'name', sort: true}], 
    rows: []
  });
  
  /*  SEZNAM DOKUMENTU  */
  const [documentList, setDocumentList] = useState({
    columns:  [
      {label:'Soubor', field:'name', sort: true},
      {label:'Typ dokumentu', field:'typeText', sort: true},
      {label:'Datum vystavení', field:'issueDateText', sort: true},
      {label:'Datum expirace', field:'expireDateText', sort: true}
    ], 
    rows: []
  });

  //  -------------------------------------------------------------------------------
  //  volani DB pro uvodni nacteni z DB
  useEffect(() => {
    loadData();
  }, []);

  //  -------------------------------------------------------------------------------
  //  vrati text typu dokumentu (pro prehled dokumentu)
  function getDocumentTypeText(documentType) {
    for (let item in documentTypeList) {
      if (documentTypeList[item].value === documentType )
        return documentTypeList[item].text;
    }
    return '';
  }

  //  naplni seznam dokumentu pro vybranou zakazku
  function setDocumentListOne(aDocumentList) {
    setDocumentList({...documentList, rows: aDocumentList});
  };

  //  -------------------------------------------------------------------------------
  //  odesle data do DB
  async function loadData()
  {
    setLoading(true);
    setError(false);
    setResponseMessage('');

    const formData = new FormData();
    formData.append("action", 'loadData');

    let response = await connection.processRequest(formData);
    setError(response.isError);
    setResponseMessage (response.responseMessage);

    if (!response.isError) {
      //  naplnit prehled zakazek
      let orders = [];
      let documents = [];

      if (response.adminData.orderList) {
        //  projdem seznam zakazek
        response.adminData.orderList.forEach(function (order){

          //  v nem seznam dokumentu
          documents = [];
          order.documentList.forEach(function (document){
            documents.push({
              fileId:         document.fileId,
              type:           document.type,
              name:           document.name,
              issueDate:      document.issueDate,
              expireDate:     document.expireDate,
              description:    document.description,
              typeText:       getDocumentTypeText(document.type),
              issueDateText:  connection.formatDate(document.issueDate, 'D'),
              expireDateText: connection.formatDate(document.expireDate, document.type)
            });
          })
          if (orders.length === 0)  //  naplneni pro 1. zakazku
            setDocumentListOne (documents);

          orders.push({ name: order.name,
                        'documentList' : documents
          })
        })
      }
      setOrderList({...orderList, rows: orders});         
    }
    setLoading(false);
    if (response && response.responseMessage && response.responseMessage.length > 0)  //  zobrazit vysledek volani DB - responseMessage
      submitAlertMessage.current.click();
  }

  //  -------------------------------------------------------------------------------
  //  H L A V N I   B L O K
  //  -------------------------------------------------------------------------------
  return (
    <>
    <MDBContainer className="py-5">
      <MDBRow>
        {/* SEZNAM ZAKAZEK */}
        <MDBCol md='3'>
          <MDBCard>
            <MDBCardBody>
              <MDBDatatable maxHeight='400px' maxWidth='300px'
                data={orderList} 
                pagination={false}
                hover
                entries={9999}
                bordered
                noFoundMessage = 'Zakázka nenalezena'
                allText='Vše' rowsText='Řádek' ofText='z' 
                fixedHeader striped sm
                onRowClick={(row) => {
                    setDocumentListOne(row.documentList);
                  }
                }
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* SEZNAM DOKUMENTU */}
        <MDBCol md='9'>
          <MDBCard>
            <MDBCardBody>
              <MDBDatatable maxHeight='400px'
                data={documentList}
                pagination={false}
                hover
                entries={9999}
                bordered
                noFoundMessage = 'Dokument nenalezen'
                allText='Vše' rowsText='Řádek' ofText='z' 
                fixedHeader striped sm
                onRowClick={(row) => {
                    const url = 'https://drive.google.com/file/d/'+ row.fileId +'/view?usp=drive_link'; //  zobrazit
                    //const url = 'https://drive.google.com/uc?id='+ row.fileId +'&export=download';    //  stahnout
                    window.open(url, row.name);
                  }
                }
              />
              </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

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
        offset={50}
        delay={2000}
      >
        {responseMessage}
      </MDBAlert>
    </>
  )
}

export default OrderList;