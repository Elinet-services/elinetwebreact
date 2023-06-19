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
  MDBPopconfirm,
  MDBPopconfirmMessage,
  MDBAutocomplete,
  MDBSpinner,
  MDBAlert,
  MDBBtnGroup, MDBRadio
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
  const [documentListFilter, setDocumentListFilter] = useState('N');    //  vyber filtru Ne/Zarazene/Vse

  const [documentTypeList, setDocumentTypeList] = useState([
    {value: '', text: '' },
    {value: 'FP', text: 'Faktura přijatá', defaultSelected: false},
    {value: 'FV', text: 'Faktura vydaná', defaultSelected: false},
    {value: 'D',  text: 'Dokument', defaultSelected: false} ]
  );
  /*  SEZNAM DOKUMENTU NA DISKU */
  const [documentListAll, setDocumentListAll] = useState({rows: []}); //  vsechna data kuli filtrovani Ne/Zarazene/Vse
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
    if (aDocumentType === 'D' && aDate != null) {
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
    description: '', partnerName:'', orderName: '', origName: ''
  });
  //  normalni INPUT
  const onChangeDocumentForm = (e) => {
    setDocumentFormValue({ ...documentFormValue, [e.target.name]: e.target.value })
  }
  //  combobox documentType
  const onChangeDocumentFormType = (e) => {
    setDocumentFormValue({ ...documentFormValue, type: e.value });
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
    setOrderData(orderDataAll.filter((item) => item.orderName.toLowerCase().startsWith(value.toLowerCase())));
  }

  //  -------------------------------------------------------------------------------
  //  odesle data do DB
  function processRequest(formData)
  {
    const url = "https://script.google.com/macros/s/AKfycbxOyHw6GiImKkBjPgLFKfI1JoMQ78IhY0ilZtYOgFJN8aIGSeK8dfTTMLYZtepgVP5gMw/exec";
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
                partnerName: (row.partnerName === undefined ? '' : row.partnerName),
                orderName: (row.orderName === undefined ? '' : row.orderName),
                typeText: getDocumentTypeText(row.type),
                issueDateText: formatDate(row.issueDate, 'D'),
                expireDateText: formatDate(row.expireDate, row.type)
              }
            )
          })
          setDocumentListAll({...documentListAll, rows});
          filterDocumentList(documentListFilter, rows);
        }
        setLoading(false);
        if (responseData.message.length > 0 /*&& formData.get('action') === 'submitForm'*/)  //  zobrazit vysledek volani DB - responseMessage
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
  function submitDocumentForm(e)
  {
    e.preventDefault();
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
  //  odstraneni souboru
  function onClickDocumentDelete ()
  {
    const formData = new FormData();
    formData.append("action", 'deleteFile');
    formData.append("fileId", documentFormValue.fileId);
    toggleShowDocumentDetail();
    processRequest(formData);
  }
  //  -------------------------------------------------------------------------------
  //  FILTROVANI Ne/Zarazene/Vse
  function filterDocumentList(value, documentRows)
  {
    let rows = (documentRows.filter((item) => 
        value === 'V' ||
        (value === 'Z' && (item.type.length > 0 && item.issueDate.length > 0 && item.partnerName.length > 0 && item.orderName.length > 0 )) ||
        (value === 'N' && (item.type.length === 0 || item.issueDate.length === 0 || item.partnerName.length === 0 || item.orderName.length === 0 )) 
      ));
    setDocumentList({...documentList, rows});
  }
  function onChangeDocumentListFilter (value) {
    setDocumentListFilter(value);
    filterDocumentList(value, documentListAll.rows)
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
              <MDBBtnGroup shadow='2' className='mb-2'>
                <MDBRadio btn btnColor='light' id='documentFilterN' name='documentFilter' value='N' label='Nezařazené' defaultChecked onChange={(e) => onChangeDocumentListFilter(e.target.value)}/>
                <MDBRadio btn btnColor='light' id='documentFilterZ' name='documentFilter' value='Z' label='Zařazené' onChange={(e) => onChangeDocumentListFilter(e.target.value)}/>
                <MDBRadio btn btnColor='light' id='documentFilterV' name='documentFilter' value='V' label='Vše' onChange={(e) => onChangeDocumentListFilter(e.target.value)}/>
              </MDBBtnGroup>
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
                      { fileId: row.fileId, type: row.type, name: row.name.substring(0, row.name.lastIndexOf('.')), 
                        issueDate: row.issueDate, expireDate: row.expireDate,
                        description: row.description, partnerName: row.partnerName, orderName: row.orderName, origName: row.name}
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
            <MDBModalTitle>{documentFormValue.origName}</MDBModalTitle>
            <MDBBtn
              type='button' className='btn-close' color='none'
              onClick={toggleShowDocumentDetail}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              {/* 1. sloupec s daty */}
              <MDBCol md='3'>
                <form onSubmit={(e) => submitDocumentForm(e)}>
                  <a href={'https://drive.google.com/file/d/'+ documentFormValue.fileId +'/view?usp=drivesdk'} target="_blank" rel="noreferrer" className='mb-3'>
                    Dokument
                  </a>
                  <MDBSelect label='Typ'
                    data={documentTypeList}
                    placeholder='Example placeholder'
                    name="type"
                    id="type"
                    validation
                    className='mt-3 mb-3'
                    onValueChange={(e) => onChangeDocumentFormType(e)}
                  />
                  <MDBInput label='Název'
                    value={documentFormValue.name}
                    name='name'
                    id='name'
                    required
                    className='mb-3'
                    onChange={onChangeDocumentForm}
                  />
                  <MDBInput label='Datum vystavení'
                    value={documentFormValue.issueDate}
                    name='issueDate'
                    id='issueDate'
                    required
                    type='date'
                    className='mb-3'
                    onChange={onChangeDocumentForm}
                  />
                  {documentFormValue.type === 'D'? 
                    <MDBInput label='Datum expirace'
                      value={documentFormValue.expireDate}
                      name='expireDate'
                      id='expireDate'
                      required
                      type='date'
                      className='mb-3'
                      onChange={onChangeDocumentForm}
                    /> : ''}
                  <MDBAutocomplete label='Klient'
                      name='partner'
                      id='partner'
                      required
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
                      noResults={<div className='text-warning'>Firma nenalezena, zadáváte novou</div>}
                  />
                  <MDBAutocomplete label='Zakázka'
                      name='order'
                      id='order'
                      required
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
                      noResults={<div className='text-warning'>Zakázka nenalezena, zadáváte novou</div>}
                  />
                  <MDBTextArea label='Popis'
                    value={documentFormValue.description}
                    name='description'
                    id='description'
                    rows='4'
                    wrapperClass="mb-4"
                    className='mb-3'
                    onChange={onChangeDocumentForm}
                  />
                  {/* butonky */}
                  <MDBRow>
                    <MDBCol className="d-flex justify-content-end flex-wrap">
                      <div className="m-1">
                        <MDBPopconfirm btnChildren={<div>Smazat&nbsp;&nbsp;<MDBIcon far icon='trash-alt'/></div>}
                          type='button' color='warning'
                          cancelBtnText='NE' cancelBtnClasses='btn-secondary'
                          confirmBtnText='Smazat' confirmBtnClasses='btn-warning'
                          placement='top'
                          onConfirm={() => {onClickDocumentDelete()}}
                        >
                          <MDBPopconfirmMessage icon={<MDBIcon far icon='trash-alt'/>}> Opravdu smazat dokument {documentFormValue.origName}?</MDBPopconfirmMessage>
                        </MDBPopconfirm>
                      </div>
                      <MDBBtn type="submit" className="m-1">
                        Uložit
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCol>
              {/* 2. sloupec s nahledem dokumentu */}
              <MDBCol>
                {imageThumbnailData.length === 0 ? 
                  <MDBSpinner role='status'/> :
                  <img src={`data:image/jpeg;base64,${imageThumbnailData}`} className='img-fluid shadow-4' alt={documentFormValue.name} />
                }
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
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