import { useState } from "react";

import {
  MDBCard, MDBCardBody, MDBCardTitle, MDBContainer,
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
} from 'mdb-react-ui-kit';

import { MDBTreeTable, MDBTreeTableItem, MDBTreeTableHead, MDBTreeTableBody } from 'mdb-react-treetable';
import "mdb-react-treetable/dist/css/treetable.min.css"


function Administrace()
{
  /*  SEZNAM DOKUMENTU NA DISKU */
  const documents = {
    columns:  [
                {label:'Soubor', field:'displayName'}
              ], 
    rows: [
      { displayName:'9707757846.pdf', parameters:{documentName: '9707757846', documentType: '', documentDescription: 'popisek', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8a'} },
      { displayName:'AppSheet Invoice 20201219.pdf', parameters:{documentName: 'AppSheet Invoice 20201219', documentType: '', documentDescription: 'neco neco', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8b'}},
      { displayName:'INV05501595.pdf', parameters:{documentName: '3', documentType: '', documentDescription: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8c'} },  
      { displayName:'100220406.pdf', parameters:{documentName: '4', documentType: '', documentDescription: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8d'} },
      { displayName:'AXL 20220102_POV1220002.pdf', parameters:{documentName: '5', documentType: '', documentDescription: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8e'} },
      { displayName:'Zálohová_faktura_2260400136.pdf', parameters:{documentName: '', documentType: '', documentDescription: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8f'} },
      { displayName:'Elnika 20211027.pdf', parameters:{documentName: '', documentType: '', documentDescription: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8g'} },
      { displayName:'Uber 20220104.pdf', parameters:{documentName: '', documentType: '', documentDescription: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8h'} },
      { displayName:'Alza 20210219_2211903041.pdf', parameters:{documentName: '', documentType: '', documentDescription: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8i'} },
      { displayName:'Alza 20210403_2213538727.pdf', parameters:{documentName: '', documentType: '', documentDescription: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8j'} },
      { displayName:'Liftago 20211117_1463.pdf', parameters:{documentName: '', documentType: '', documentDescription: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8k'} },
    ]
  };
  
  //  -------------------------------------------------------------------------------
  //  data poslana z DB
  const httpResponse = {
    sourceData: [
      { partnerName:'Petr Macasek', identification:{idPartner: 111},
        orders:{
            111: { 
              orderName:'Ostrovni system', description: 'Strucny popis zakazky', dateFrom: '2022-03-13', dateTo: '2022-07-20', closed: false,
              documents: {
                '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z': {documentName: 'Plast partner spol. s r.o.', documentType: 'FP', documentDescription: 'popis dokumentu', documentDate: '2022-07-12',
                        fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},                        
                '2ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z': {documentName: 'Uctujeme za zbozi', documentType: 'FV',documentDescription: 'Zarucak specialni', documentDate: '2022-11-07',
                        fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},
                },
            },
            222: { 
              orderName:'Zabezpeceni', description: 'Zakazka 111.2 popisek', dateFrom: '2022-06-01', dateTo: '2022-07-30', closed: true,
              documents: {
                '3ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z': {documentName: 'Conrad Electronic', documentType: 'FP', documentDescription: 'Strucny popis dokumentu', documentDate: '2022-08-03',
                        fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},                
                '4ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z': {documentName: 'Zaruka na zabezpečení', documentType: 'Z', documentDescription: 'dokumentik popisek', documentDate: '2022-11-20',
                        fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'}
              }
            }
          }
      },
      { partnerName:'Roman Kubrt', identification:{idPartner: 211},
        orders:{
          113: { 
            orderName:'Vyhledavaci system', description: 'Zakazka uplne normalni', dateFrom: '2022-08-11', dateTo: '2023-02-27', closed: true,
            documents: {
              '5ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z': {documentName: 'Ostrovní elektrárny s.r.o.', documentType: 'FV', documentDescription: 'Dokument s nejakym hrozne dlouhym textickem ktery se nevejde do policka', documentDate: '2022-06-15',
                      fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},
              '6ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z': {documentName: 'Zaruka na vyhledani psa', documentType: 'Z', documentDescription: 'Strucny popis dokumentu', documentDate: '2022-10-13',
                      fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},
            }
          }
        }
      },
      { partnerName:'Zdenek Ulrich', identification:{idPartner: 311},
        orders:{
          114: { 
            orderName:'Vyhledavaci system', description: 'Zakazka uplne normalni', dateFrom: '2022-08-11', dateTo: '2023-02-27', closed: false,
            documents: {}
          }
        }
      },
      {partnerName:'Petr Macasek 1.5', identification:{idPartner: 411}, orders:{}},
      {partnerName:'Petr Macasek 2', identification:{idPartner: 511}, orders:{}},
      {partnerName:'Roman Kubrt 2', identification:{idPartner: 611}, orders:{}},
      {partnerName:'Zdenek Ulrich 2', identification:{idPartner: 711}, orders:{}},
      {partnerName:'Roman Kubrt 3', identification:{idPartner: 811}, orders:{}},
      {partnerName:'Zdenek Ulrich 3', identification:{idPartner: 911}, orders:{}},
      {partnerName:'Petr Macasek 2', identification:{idPartner: 1111}, orders:{}}
    ]
  };

  //  -------------------------------------------------------------------------------
  const [partners, setPartners] = useState(
    { columns:  [{label:'Klient', field:'partnerName'}], 
      rows: httpResponse.sourceData }  
  );
  const [activePartner,   setActivePartner] = useState(null);
  const [activeOrder,     setActiveOrder] = useState({orderId: 0, order: {orderName:'', description: '', dateFrom: '', dateTo: '', closed: false, documents: {}}});
  const [activeDocument,  setActiveDocument] = useState({fileId: '0', document: {documentName:'', documentType: '', documentDescription: '', documentDate: '', fileId: '0' }});
  const [documentTypeList, setDocumentTypeList] = useState([]);
  //
  const [showDocumentDetail, setShowDocumentDetail] = useState(false);
  const [showDocumentList,   setShowDocumentList]   = useState(false);
  const [showOrderDetail,    setShowOrderDetail]    = useState(false);
  const [detailFromList,     setDetailFromList]     = useState(false); //  detail dokumentu zobrazen z Prehledu dokumentů
  //
  const [orderFormValue, setOrderFormValue] = useState({
    orderName: '', dateFrom: '', dateTo: '', description: '', closed: false
  });
  const [documentFormValue, setDocumentFormValue] = useState({
    documentType: '', documentName: '', documentDescription: '', documentDate: ''
  });

  //  zobrazeni Modalnich oken
  const toggleShowDocumentDetail = () => setShowDocumentDetail(!showDocumentDetail);
  const toggleShowDocumentList = () => setShowDocumentList(!showDocumentList);
  const toggleShowOrderDetail = () => setShowOrderDetail(!showOrderDetail);  

  //  -------------------------------------------------------------------------------
  //  preformatuje datum z DB k zobrazeni v prehledu
  function formatDate(aDate) {
    let dateString = '';
    if (aDate != null) {
      const firstDot = aDate.indexOf('-');
      const lastDot  = aDate.lastIndexOf('-');
      //  kontrola
      if (firstDot > 0 && lastDot > firstDot )
        dateString = parseInt(aDate.substring(lastDot + 1)) +'.'+ parseInt(aDate.substring(firstDot + 1, lastDot)) +'.'+ aDate.substring(0, firstDot);
    }
    return dateString;
  }

  //  vrati radek v poli partners (podle idPartner)
  function getPertnerRow(aIdPartner) {
    for (let row in partners.rows) {
      if (partners.rows[row].identification.idPartner === aIdPartner)
        return row;
    }
    return -1;
  }
  //  -------------------------------------------------------------------------------
  /* obsluha ZAKAZKA formular */
  const onChangeOrderForm = (e) => {
    setOrderFormValue({ ...orderFormValue, [e.target.name]: e.target.value })
  }
  function submitOrderForm(e)
  {
    e.preventDefault();
    const partnerRow = getPertnerRow(activePartner.identification.idPartner);
    // SAVE DO DB, pripadne vraci NOVY idOrder
    // TODO
    //
    for (let key in orderFormValue) {
      activeOrder.order[key] = orderFormValue[key];
    }
    partners.rows[partnerRow].orders[activeOrder.orderId] = activeOrder.order;
   
    toggleShowOrderDetail();
  }

  //  -------------------------------------------------------------------------------
  /* obsluha DOCUMENT formular */
  const onChangeDocumentForm = (e) => {
    setDocumentFormValue({ ...documentFormValue, [e.target.name]: e.target.value })
  }
  function onChangeDocumentFormSelect(value) {
    documentFormValue.documentType = value;
    setDocumentTypeList ( [
      {value: 'FP', text: 'Faktura přijatá', defaultSelected: value === 'FP'},
      {value: 'FV', text: 'Faktura vydaná', defaultSelected: value === 'FV'},
      {value: 'Z',  text: 'Záruční list', defaultSelected: value === 'Z'} 
    ]);
  }
  function getDocumentTypeText(documentType) {
    for (let item in documentTypeList) {
      if (documentTypeList[item].value === documentType )
        return documentTypeList[item].text;
    }
    return '';
  }

  function onClickDocumentDelete()
  {
    const partnerRow = getPertnerRow(activePartner.identification.idPartner);
    // SAVE DO DB
    // TODO
    //
    delete partners.rows[partnerRow].orders[activeOrder.orderId].documents[activeDocument.fileId];
    toggleShowDocumentDetail();    
  }

  function submitDocumentForm(e)
  {
    e.preventDefault();
    const partnerRow = getPertnerRow(activePartner.identification.idPartner);
    // SAVE DO DB
    // TODO
    //
    for (let key in documentFormValue) {
      activeDocument.document[key] = documentFormValue[key];
    }
    partners.rows[partnerRow].orders[activeOrder.orderId].documents[activeDocument.fileId] = activeDocument.document;
   
    toggleShowDocumentDetail();
  }

  //  -------------------------------------------------------------------------------
  /* PREHLED ZAKAZEK a DOKUMENTU */
  function createOrderTreeTable()
  {
    let retArr = new Array([]);
    if (activePartner !== null && activePartner.orders !== undefined) {
      Object.keys(activePartner.orders).forEach(idOrder => {
        const order = activePartner.orders[idOrder];
        /* HLAVICKA ZAKAZKY */
        retArr.push(<MDBTreeTableItem key={'idOrder'+ idOrder}
                                      depth={1}
                                      values={[ <MDBRow>
                                                  <MDBCol md='3'
                                                    onClick={ () => {
                                                          setActiveOrder( {orderId: idOrder, order} );
                                                          setOrderFormValue(order);
                                                          toggleShowOrderDetail();
                                                        }
                                                      }
                                                    >{order.orderName}</MDBCol>
                                                  <MDBCol md='2' className="d-flex justify-content-end">{formatDate(order.dateFrom)}</MDBCol>
                                                  <MDBCol md='2' className="d-flex justify-content-end">{formatDate(order.dateTo)}</MDBCol>
                                                  <MDBCol md='4' className="overflow-hidden text-nowrap">{order.description}</MDBCol>
                                                  <MDBCol md='1' className="d-flex justify-content-end align-items-center">
                                                    {(order.closed ? '':
                                                      <MDBIcon far icon='plus-square'
                                                        onClick={ () => {
                                                          setActiveOrder( {orderId: idOrder, order} );
                                                          setActiveDocument({fileId: 0, document: {documentName:'', documentType: '', documentDescription: '', documentDate: '', fileId: '' }});
                                                          toggleShowDocumentList();
                                                        }
                                                      }
                                                      />
                                                    )}
                                                  </MDBCol>
                                                </MDBRow>]}
                                      className={(order.closed?'table-secondary':'')}/>)

        Object.keys(order.documents).forEach(idDocument => {
          const document = order.documents[idDocument];
          retArr.push(<MDBTreeTableItem key={'idDocument'+ idDocument} 
                                        depth={2} 
                                        onClick={ () => {
                                            setActiveOrder( {orderId: idOrder, order} );
                                            setActiveDocument( {fileId: idDocument, document} );
                                            setDocumentFormValue(document)
                                            onChangeDocumentFormSelect(document.documentType);
                                            setDetailFromList(false);
                                            toggleShowDocumentDetail()
                                          }
                                        }
                                        values={[ <MDBRow>
                                                    <MDBCol md='3'>{document.documentName}</MDBCol>
                                                    <MDBCol md='2'>{getDocumentTypeText(document.documentType)}</MDBCol>
                                                    <MDBCol md='2' className="d-flex justify-content-end">{formatDate(document.documentDate)}</MDBCol>
                                                    <MDBCol md='5' className="overflow-hidden text-nowrap">{document.documentDescription}</MDBCol>
                                                    { /* ikona DELETE DOCUMENT
                                                      <MDBCol md='1' className="d-flex justify-content-end">
                                                      {(order.closed ? '': 
                                                        <MDBIcon far icon='trash-alt'
                                                          onClick={onClickDocumentDelete()}
                                                        /> 
                                                      )}
                                                    </MDBCol> */}
                                                  </MDBRow>]}
                                        className={(order.closed ? 'table-secondary':'')}/>)
        })
      });
    }
    return retArr;
  }
  
  //  -------------------------------------------------------------------------------
  //  H L A V N I   B L O K
  //  -------------------------------------------------------------------------------
  return (
    <>
    <MDBContainer className="py-5">
      <MDBRow>
        {/* SEZNAM PARTNERU */}
        <MDBCol md='3'>
          <MDBCard>
            <MDBCardBody>
              <MDBDatatable maxHeight='400px' maxWidth='300px' 
                pagination={false}
                hover
                entries={9999}
                bordered
                noFoundMessage = 'Partner nenalezen'
                allText='Vše' rowsText='Řádek' ofText='z' 
                fixedHeader search striped sm
                onRowClick={(row) => {
                    setActivePartner(row);
                  }
                }
                data={partners} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* SEZNAM ZAKAZEK */}
        <MDBCol md='9'>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>{activePartner == null ? '' : activePartner.partnerName}</MDBCardTitle>
              <MDBTreeTable className="treetable-sm">
                <MDBTreeTableHead heads={[<MDBRow>
                                            <MDBCol md='3'>Zakázka</MDBCol>
                                            <MDBCol md='2' className="d-flex justify-content-end">Datum od</MDBCol>
                                            <MDBCol md='2' className="d-flex justify-content-end">Datum do</MDBCol>
                                            <MDBCol md='4'>Popis</MDBCol>
                                            <MDBCol md='1' className="d-flex justify-content-end align-items-center">
                                              {activePartner == null ? '' :
                                              <MDBIcon far icon='plus-square'
                                                onClick={ () => {
                                                    setActiveOrder(
                                                      {orderId: 0, order: {orderName:'', description: '', dateFrom: '', dateTo: '', closed: false, documents: {}}}
                                                    );
                                                    setOrderFormValue( {orderName:'', description: '', dateFrom: '', dateTo: '', closed: false, documents: {}} );
                                                    toggleShowOrderDetail();
                                                  }
                                                }
                                            /> }
                                            </MDBCol>
                                          </MDBRow>]} />
                <MDBTreeTableBody>
                  {createOrderTreeTable()}
                </MDBTreeTableBody>
              </MDBTreeTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>


    {/* DOCUMENT LIST */}

    <MDBModal tabIndex='-1' show={showDocumentList} setShow={setShowDocumentList}>
    {activeOrder == null ? '' :
      <MDBModalDialog size="xl">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{activePartner == null ? '' : activePartner.partnerName}<br></br>{orderFormValue.orderName}</MDBModalTitle>
            <MDBBtn
              type='button' className='btn-close' color='none'
              onClick={toggleShowDocumentList}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              {/* 1. sloupec s daty */}
              <MDBCol md='3'>
              <MDBDatatable maxHeight='400px' maxWidth='300px' 
                pagination={false} entries={9999}
                hover bordered
                noFoundMessage = 'Dokument nenalezen'
                allText='Vše' rowsText='Řádek' ofText='z'
                fixedHeader search striped sm
                onRowClick={(row) => {
                    setActiveDocument({fileId: row.parameters.fileId, document: row.parameters});
                    setDocumentFormValue(row.parameters);
                    //console.log(documentFormValue)
                  }
                }
                data={documents} />
              </MDBCol>

              {/* 2. sloupec s nahledem + hlavicka dokumentu*/}
              <MDBCol>
                <MDBRow>
                  <MDBCol>
                    <MDBDatatable
                      pagination={false} entries={9999}
                      fixedHeader sm
                      noFoundMessage = ''
                      data = {{
                          columns:  [
                            {label:'Název dokumentu', field:'documentName', width: 200},
                            {label:'Datum', field:'documentDate', width: 200},
                            {label:'Popis', field:'documentDescription'}
                          ], 
                          rows: activeDocument.fileId === '0' ? [] :
                                [{documentName: activeDocument.document.documentName, documentDate: formatDate(activeDocument.document.documentDate), documentDescription: activeDocument.document.documentDescription}]
                        }
                      }
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>Nahled dokumentu</MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleShowDocumentList}>
              Zpět
            </MDBBtn>
            <MDBBtn
              onClick={() => {
                  setDetailFromList(true);
                  setDocumentFormValue(activeDocument.document);
                  onChangeDocumentFormSelect('FP');
                  toggleShowDocumentList();
                  toggleShowDocumentDetail();
                }
              }
            >
              Vybrat
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    }
    </MDBModal>


    {/* DOCUMENT DETAIL */}

    <MDBModal tabIndex='-1' show={showDocumentDetail} setShow={setShowDocumentDetail}>
      <MDBModalDialog size="xl">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{activePartner == null ? '' : activePartner.partnerName}<br></br>{activeOrder.order.orderName}</MDBModalTitle>
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
                    <a href={'https://drive.google.com/file/d/'+ activeDocument.fileId +'/view?usp=drivesdk'} target="_blank" className='mb-3'>
                      Dokument
                    </a>
                    <MDBSelect
                      label='Typ'
                      name="documentType"
                      id="documentType"
                      data={documentTypeList}
                      className='mt-3 mb-3'
                      validation
                      onValueChange={(e) => onChangeDocumentFormSelect(e.value)}
                    />
                    <MDBInput
                      label='Název'
                      name='documentName'
                      id='documentName'
                      value={documentFormValue.documentName}
                      className='mb-3'
                      onChange={onChangeDocumentForm}
                    />
                    <MDBInput
                      label='Datum'
                      name='documentDate'
                      id='documentDate'
                      value={documentFormValue.documentDate}
                      type='date'
                      className='mb-3'
                      onChange={onChangeDocumentForm}
                    />
                    <MDBTextArea
                      rows='4'
                      label='Popis'
                      name='documentDescription'
                      id='documentDescription'
                      value={documentFormValue.documentDescription}
                      wrapperClass="mb-4"
                      className='mb-3'
                      onChange={onChangeDocumentForm}
                    />
                  </form>
              </MDBCol>

              {/* 2. sloupec s nahledem */}
              <MDBCol>
                Nahled dokumentu
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' 
              onClick={() => {
                  toggleShowDocumentDetail();
                  if (detailFromList) toggleShowDocumentList();
                }
              }
            >
              Zpět
            </MDBBtn>
            { detailFromList || activeOrder.order.closed ? '':
              <MDBPopconfirm
                color='warning'
                btnChildren={<div>Smazat&nbsp;&nbsp;<MDBIcon far icon='trash-alt'/></div>}
                cancelBtnText='NE'
                cancelBtnClasses='btn-secondary'
                confirmBtnText='Smazat'
                confirmBtnClasses='btn-warning'
                onConfirm={() => {onClickDocumentDelete()}}
              >
                <MDBPopconfirmMessage icon={<MDBIcon far icon='trash-alt'/>}> Opravdu smazat dokument {documentFormValue.documentName}?</MDBPopconfirmMessage>
              </MDBPopconfirm>
            }
            <MDBBtn type="submit" onClick={submitDocumentForm}>Uložit</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>

    {/* ZAKAZKA DETAIL */}

    <MDBModal tabIndex='-1' show={showOrderDetail} setShow={setShowOrderDetail}>
      <MDBModalDialog size="sm">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{activePartner == null ? '' : activePartner.partnerName} <br/> {activeOrder.orderId === 0 ? 'Nová zakázka': ''}</MDBModalTitle>
            <MDBBtn
              type='button'className='btn-close' color='none'
              onClick={toggleShowOrderDetail}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol>
                    <MDBInput
                      label='Název zakázky'
                      name='orderName'
                      id='orderName'
                      value={orderFormValue.orderName}
                      className='mb-3'
                      required
                      onChange={onChangeOrderForm}
                    />
                    <MDBInput
                      label='Datum od'
                      name='dateFrom'
                      id='dateFrom'
                      value={orderFormValue.dateFrom}
                      type='date'
                      className='mb-3'
                      required
                      onChange={onChangeOrderForm}
                    />
                    <MDBInput
                      label='Datum do'
                      name='dateTo'
                      id='dateTo'
                      value={orderFormValue.dateTo}
                      type='date'
                      className='mb-3'
                      onChange={onChangeOrderForm}
                    />
                    <MDBTextArea
                      rows='4'
                      label='Popis'
                      name='description'
                      id='description'
                      value={orderFormValue.description}
                      wrapperClass="mb-4"
                      className='mb-3'
                      onChange={onChangeOrderForm}
                    />
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' 
              onClick={() => {
                  toggleShowOrderDetail();
                }
              }
            >
              Zpět
            </MDBBtn>
            <MDBBtn type='submit' onClick={submitOrderForm} >Uložit</MDBBtn>
            
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    </>
  )
}

export default Administrace;