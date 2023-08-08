import { useState, useEffect } from "react";
import {
  MDBCard, MDBCardBody, MDBContainer,
  MDBDatatable, 
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import processRequest, {formatDate} from './connection.js';

function OrderList(params)
{
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
    const formData = new FormData();
    formData.append("action", 'loadData');

    let response = await processRequest(formData, 'orderlist', params.setLoading, params.setMessage, params.setError, params.submitAlertMessage);

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
              issueDateText:  formatDate(document.issueDate, 'D'),
              expireDateText: formatDate(document.expireDate, document.type)
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
  }

  //  -------------------------------------------------------------------------------
  //  H L A V N I   B L O K
  //  -------------------------------------------------------------------------------
  return (
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
  )
} //  OrderList

export default OrderList;