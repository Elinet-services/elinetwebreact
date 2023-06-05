import { useState, useEffect, useRef } from "react";

import {
  MDBCard, MDBCardBody, MDBContainer,
  MDBInput, MDBSelect, MDBTextArea,
  MDBDatatable,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBPopconfirm,
  MDBPopconfirmMessage,
  MDBAutocomplete,
  MDBSpinner,
  MDBAlert
} from 'mdb-react-ui-kit';

//import { MDBTreeTable, MDBTreeTableItem, MDBTreeTableHead, MDBTreeTableBody } from 'mdb-react-treetable';
//import "mdb-react-treetable/dist/css/treetable.min.css"


function Administrace()
{
  const submitAlertMessage = useRef(null);        //  zobrazeni responseMessage v MDBAlertu po volani DB
  const [loading, setLoading] = useState(false);  //  volani do DB
  const [error, setError] = useState(false);      //  volani do DB vtratilo chybu
  const [responseMessage, setResponseMessage] = useState(''); //  textova zprava volani do DB
  const [showDocumentDetail, setShowDocumentDetail] = useState(false);  //  priznak, zobrazit detail dokumentu
  const [imageThumbnailData, setImageThumbnailData] = useState('');     //  obrazek nahledu dokumentu

  const [documentTypeList, setDocumentTypeList] = useState([
    {value: 'FP', text: 'Faktura přijatá', defaultSelected: false},
    {value: 'FV', text: 'Faktura vydaná', defaultSelected: false},
    {value: 'D',  text: 'Dokument', defaultSelected: false} ]
  );

  /*  SEZNAM DOKUMENTU NA DISKU */
  const [documentList, setDocumentList] = useState({
    columns:  [
      {label:'Soubor', field:'name', sort: true},
      {label:'Typ dokumentu', field:'typeText', sort: true},
      {label:'Datum vystavení', field:'issueDateText', sort: true},
      {label:'Datum expirace', field:'expireDateText', sort: true}
    ], 
    rows: []
  });

  /*  SEZNAM PARTNERU  */
  const [partnerDataAll, setPartnerDataAll] = useState([]);
  const [partnerData, setPartnerData] = useState([]); //  odfiltrovany seznam

  /*  SEZNAM ZAKAZEK  */
  const [orderDataAll, setOrderDataAll] = useState([]);
  const [orderData, setOrderData] = useState([]);     //  odfiltrovany seznam
  
  //  -------------------------------------------------------------------------------
  //  volani DB pro uvodni nacteni z DB
  useEffect(() => {
    const loadData = () => {
      const formData = new FormData();
      formData.append("action", 'loadData');
      
      processRequest(formData);
    };

    loadData();
  }, []);

  //  -------------------------------------------------------------------------------
  //  zobrazeni Modalnich oken
  const toggleShowDocumentDetail = () => setShowDocumentDetail(!showDocumentDetail);

  //  -------------------------------------------------------------------------------
  //  preformatuje datum z DB k zobrazeni v prehledu
  function formatDate(aDate, aDocumentType) {
    let dateString = '';
    if (aDocumentType !== 'D' && aDate != null) {
      const firstDot = aDate.indexOf('-');
      const lastDot  = aDate.lastIndexOf('-');
      //  kontrola
      if (firstDot > 0 && lastDot > firstDot )
        dateString = parseInt(aDate.substring(lastDot + 1)) +'.'+ parseInt(aDate.substring(firstDot + 1, lastDot)) +'.'+ aDate.substring(0, firstDot);
    }
    return dateString;
  }
  //  vrati text typu dokumentu (pro prehled dokumentu)
  function getDocumentTypeText(documentType) {
    for (let item in documentTypeList) {
      if (documentTypeList[item].value === documentType )
        return documentTypeList[item].text;
    }
    return '';
  }
  //  plni comboBox documentType podle hodnoty (nastavi defaultSelected = true)
  const updateDocumentTypeItem = (index, selected) => {
    let newArr = [...documentTypeList];
    newArr[index].defaultSelected = selected;
    setDocumentTypeList(newArr);
  }
  const fillDocumentTypeList = (documentTypeValue) => {
    for (let item in documentTypeList) {
      updateDocumentTypeItem(item, documentTypeList[item].value === documentTypeValue)
    }
  }
 
  //  -------------------------------------------------------------------------------
  /* obsluha DOCUMENT formular */
  const [documentFormValue, setDocumentFormValue] = useState({
    fileId: '', type: '', name: '', issueDate: '', expireDate: '', 
    //idPartner: '', idOrder: '', 
    description: '', partnerName:'', orderName: ''
  });
  //  normalni INPUT
  const onChangeDocumentForm = (e) => {
    setDocumentFormValue({ ...documentFormValue, [e.target.name]: e.target.value })
  }
  //  combobox documentType
  const onChangeDocumentFormType = (e) => {
    setDocumentFormValue({ ...documentFormValue, type: e.value });
//    if (e.value != 'D')
      //setDocumentFormValue({ ...documentFormValue, expireDate: '' });
  }
  //  combobox Partner
  const onChangeDocumentFormPartner = (value) => {
    setDocumentFormValue({ ...documentFormValue, partnerName: value });
  }
  const onSearchDocumentFormPartner = (value) => {
    let partners = (partnerDataAll.filter((item) => item.partnerName.toLowerCase().startsWith(value.toLowerCase())));
    setPartnerData(partners);
    if (partners.length === 1) { //  pokud mame prave jeden partner filtrovany
      setOrderDataAll(partners[0].orderList);
      setOrderData(partners[0].orderList);
    } else {
      setOrderDataAll([]);
      setOrderData([]);
    }
  }
  //  combobox Zakazka
  const onChangeDocumentFormOrder = (value) => {
    setDocumentFormValue({ ...documentFormValue, orderName: value });
  }
  const onSearchDocumentFormOrder = (value) => {    
    let orders = (orderDataAll.filter((item) => item.orderName.toLowerCase().startsWith(value.toLowerCase())));
    setOrderData(orders);
  }

  //  -------------------------------------------------------------------------------
  //  odesle data do DB
  function processRequest(formData)
  {
    //const url = "https://script.google.com/macros/s/AKfycbxSRRBE6BrXcSDUenhUY33C6UPkLaX9Ps9CAGYA5VwEllrq95LP0nROCn_a_K5TXtVNhA/exec";
    const url = "https://script.google.com/macros/s/AKfycbzjthLfYNaLHfNd57DSnF_NZ2v-JMwmBRJnPiFhYeCcbJ5o5HCCZOoLhaQmsnLfid4MAA/exec";
    if (formData.get('action') !== 'getThumbnailData')
      setLoading(true);
    setError(false);
    setResponseMessage('');

    formData.append("source", window.location.pathname.substring(1));    
    
    fetch(url, {
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

        if (formData.get('action') === 'getThumbnailData'){  //zpracuj nahled dokumentu
          let imageContent = '';
          const bytes = new Uint8Array( responseData.adminData.thumbnailData );
          const len = bytes.byteLength;
          for (let i = 0; i < len; i++) {
            imageContent += String.fromCharCode( bytes[ i ] );
          }
          setImageThumbnailData( btoa(imageContent) );
        }
        else {
          setPartnerDataAll(responseData.adminData.partnerList);
          setPartnerData(responseData.adminData.partnerList);
          let rows = [];
          //  naplnit seznam dokumentu
          responseData.adminData.documentList.forEach(function (row){
            rows.push( {
                fileId: row.fileId,
                type: row.type, 
                name: row.name, 
                issueDate: row.issueDate,
                expireDate: row.expireDate,
                description: row.description,
                partnerName: row.partnerName,
                orderName: row.orderName,
                typeText: getDocumentTypeText(row.type),
                issueDateText: formatDate(row.issueDate, ''),
                expireDateText: formatDate(row.expireDate, row.type)
              }
            )
          })
          setDocumentList({...documentList, rows});
        }
        setLoading(false);
        if (responseData.message.length > 0 && formData.get('action') === 'submitForm')  //  zobrazit vysledek volani DB - responseMessage
          submitAlertMessage.current.click();
      })
      .catch((e) => {
        console.log(e.message)
        setLoading(false);
        setError(true);
        setResponseMessage("Kritická chyba: "+ e.message);
        submitAlertMessage.current.click();
      })
  }

//  -------------------------------------------------------------------------------
  //  odeslani formu do DB
  function submitDocumentForm()
  {    
    const formData = new FormData();
    formData.append("action", 'submitForm');
    
    for (let key in documentFormValue) {
      formData.append(key, documentFormValue[key])
      console.log(key +' - '+ documentFormValue[key])
    }
    toggleShowDocumentDetail();
    processRequest(formData);
  }
  //  nacteni nahledu dokumentu
  function getThumbnailData(fileId)
  {
    const formData = new FormData();
    formData.append("action", 'getThumbnailData');
    formData.append("fileId", fileId);
    setImageThumbnailData('');
    processRequest(formData);
  }
  
  //  -------------------------------------------------------------------------------
  //  H L A V N I   B L O K
  //  -------------------------------------------------------------------------------
  return (
    <>
    <MDBContainer className="py-5">
      <MDBRow>
        {/* SEZNAM DOKUMENTU */}
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBDatatable 
                data={documentList} 
                maxHeight='400px' 
                pagination={false}
                hover
                entries={9999}
                bordered
                noFoundMessage = 'Dokument nenalezen'
                allText='Vše' rowsText='Řádek' ofText='z' 
                fixedHeader search striped sm
                onRowClick={(row) => {
                    setDocumentFormValue(
                      {fileId: row.fileId, type: row.type, name: row.name, issueDate: row.issueDate, expireDate: row.expireDate,
                        description: row.description, partnerName: row.partnerName, orderName: row.orderName}
                    );
                    fillDocumentTypeList(row.type);
                    onSearchDocumentFormPartner(row.partnerName);
                    getThumbnailData(row.fileId);
                    toggleShowDocumentDetail();
                  }
                }
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

    {/* DETAIL DOCUMENTU */}
    <MDBModal tabIndex='-1' show={showDocumentDetail} setShow={setShowDocumentDetail}>
      <MDBModalDialog size="xl">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{documentFormValue.name}</MDBModalTitle>
            <MDBBtn
              type='button' className='btn-close' color='none'
              onClick={toggleShowDocumentDetail}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              {/* 1. sloupec s daty */}
              <MDBCol md='3'>
                  <form>
                    <a href={'https://drive.google.com/file/d/'+ documentFormValue.fileId +'/view?usp=drivesdk'} target="_blank" rel="noreferrer" className='mb-3'>
                      Dokument
                    </a>
                    <MDBSelect
                      label='Typ'
                      name="type"
                      id="type"
                      data={documentTypeList}
                      className='mt-3 mb-3'
                      onValueChange={(e) => onChangeDocumentFormType(e)}
                    />
                    <MDBInput
                      label='Název'
                      name='name'
                      id='name'
                      value={documentFormValue.name}
                      className='mb-3'
                      onChange={onChangeDocumentForm}
                    />
                    <MDBInput
                      label='Datum vystavení'
                      name='issueDate'
                      id='issueDate'
                      value={documentFormValue.issueDate}
                      type='date'
                      className='mb-3'
                      onChange={onChangeDocumentForm}
                    />
                    {documentFormValue.type === 'D'? 
                    <MDBInput
                      label='Datum expirace'
                      name='expireDate'
                      id='expireDate'
                      value={documentFormValue.expireDate}
                      type='date'
                      className='mb-3'
                      onChange={onChangeDocumentForm}
                    /> : ''}
                    <MDBAutocomplete
                        label='Klient'
                        name='partner'
                        id='partner'
                        data={partnerData}
                        displayValue={(row) => row.partnerName}
                        value={documentFormValue.partnerName}
                        onSearch={onSearchDocumentFormPartner}
                        onChange={onChangeDocumentFormPartner}
                        itemContent={(result) => (
                          <div className='autocomplete-custom-item-content'>
                            <div className='autocomplete-custom-item-title'>{result.partnerName}</div>
                            <div className='autocomplete-custom-item-subtitle'>{result.description}</div>
                          </div>)}
                        className='mb-3'
                        listHeight='250px'
                        noResults='Klient nenalezen'
                    />                    
                    <MDBAutocomplete
                        label='Zakázka'
                        name='order'
                        id='order'
                        data={orderData}
                        displayValue={(row) => row.orderName}
                        value={documentFormValue.orderName}
                        onSearch={onSearchDocumentFormOrder}
                        onChange={onChangeDocumentFormOrder}
                        itemContent={(result) => (
                          <div className='autocomplete-custom-item-content'>
                            <div className='autocomplete-custom-item-title'>{result.orderName}</div>
                            <div className='autocomplete-custom-item-subtitle'>{result.description}</div>
                          </div>)}
                        className='mb-3'
                        listHeight='250px'
                        noResults='Zakázka nenalezena'
                    />                    
                    <MDBTextArea
                      rows='4'
                      label='Popis'
                      name='description'
                      id='description'
                      value={documentFormValue.description}
                      wrapperClass="mb-4"
                      className='mb-3'
                      onChange={onChangeDocumentForm}
                    />
                  </form>
              </MDBCol>

              {/* 2. sloupec s nahledem */}
              <MDBCol>
                <img src={`data:image/jpeg;base64,${imageThumbnailData}`} className='img-fluid shadow-4' alt={documentFormValue.name} />
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' 
              onClick={() => {
                  toggleShowDocumentDetail();
                }
              }
            >
              Zpět
            </MDBBtn>
            <MDBPopconfirm
              color='warning'
              btnChildren={<div>Smazat&nbsp;&nbsp;<MDBIcon far icon='trash-alt'/></div>}
              cancelBtnText='NE'
              cancelBtnClasses='btn-secondary'
              confirmBtnText='Smazat'
              confirmBtnClasses='btn-warning'
              //onConfirm={() => {onClickDocumentDelete()}}
            >
              <MDBPopconfirmMessage icon={<MDBIcon far icon='trash-alt'/>}> Opravdu smazat dokument {documentFormValue.name}?</MDBPopconfirmMessage>
            </MDBPopconfirm>
            <MDBBtn type="submit" 
              onClick={submitDocumentForm}
            >Uložit</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>

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
        color={error ? 'danger':'primary'}
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
// 
     
export default Administrace;