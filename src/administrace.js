import { useState } from "react";

import {
  MDBCard, MDBCardBody, MDBCardTitle, MDBContainer,
  MDBInput, MDBSelect, MDBDatepicker, MDBTextArea,
  MDBDatatable,
  MDBIcon,
  MDBRow,
  MDBCol  
} from 'mdb-react-ui-kit';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

import {
  MDBPopconfirm,
  MDBPopconfirmMessage,
} from 'mdb-react-ui-kit';

import { MDBTreeTable, MDBTreeTableItem, MDBTreeTableHead, MDBTreeTableBody } from 'mdb-react-treetable';
import "mdb-react-treetable/dist/css/treetable.min.css"


function Administrace()
{
  const documentTypeList = {
    'FP' : {text: 'Faktura přijatá'},
    'FV' : {text: 'Faktura vydaná'},
    'Z'  : {text: 'Záruční list'}
  };

  const httpResponse = {
    sourceData: [
      { partnerName:'Petr Macasek', identification:{idPartner: 111},
        orders:{
            111: { 
              idOrder:111, orderName:'Ostrovni system', description: 'Strucny popis zakazky', dateFrom: '11.2.2022', dateTo: '22.4.2022', closed: false,
              documents: {
                10001: {documentName: 'Plast partner spol. s r.o.', documentType: 'FP', description: 'popis dokumentu', documentDate: '2022-07-12',
                        fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},                        
                10011: {documentName: 'Uctujeme za zbozi', documentType: 'FV',description: 'Zarucak specialni', documentDate: '2022-11-07',
                        fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},
                },
            },
            222: { 
              idOrder:112, orderName:'Zabezpeceni', description: 'Zakazka 111.2 popisek', dateFrom: '1.6.2022', dateTo: '7.8.2022', closed: true,
              documents: {
                10012: {documentName: 'Conrad Electronic', documentType: 'FP', description: 'Strucny popis dokumentu', documentDate: '2022-08-03',
                        fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},                
                10013: {documentName: 'Zaruka na zabezpečení', documentType: 'Z', description: 'dokumentik popisek', documentDate: '2022-11-20',
                        fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'}
              }
            }
          }
      },
      { partnerName:'Roman Kubrt', identification:{idPartner: 211},
        orders:{
          113: { 
            idOrder:113, orderName:'Vyhledavaci system', description: 'Zakazka uplne normalni', dateFrom: '11.8.2022', dateTo: '2.10.2023', closed: true,
            documents: {
              10023: {documentName: 'Ostrovní elektrárny s.r.o.', documentType: 'FV', description: 'Dokument s nejakym hrozne dlouhym textickem ktery se nevejde do policka', documentDate: '2022-06-15',
                      fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},
              10024: {documentName: 'Zaruka na vyhledani psa', documentType: 'Z', description: 'Strucny popis dokumentu', documentDate: '2022-10-13',
                      fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'},
            }
          }
        }
      },
      { partnerName:'Zdenek Ulrich', identification:{idPartner: 311},
        orders:{}
      },
      {partnerName:'Petr Macasek 1.5', identification:{idPartner: 411},
        orders:{}
      },
      {partnerName:'Petr Macasek 2', identification:{idPartner: 511},
        orders:{}
      },
      {partnerName:'Roman Kubrt 2', identification:{idPartner: 611}},
      {partnerName:'Zdenek Ulrich 2', identification:{idPartner: 711}},
      {partnerName:'Roman Kubrt 3', identification:{idPartner: 811}},
      {partnerName:'Zdenek Ulrich 3', identification:{idPartner: 911}},
      {partnerName:'Petr Macasek 2', identification:{idPartner: 1111}}
    ]
  };

  const [activePartner, setActivePartner] = useState(null); //  httpResponse.sourceData[0]
  const [activeOrder, setActiveOrder] = useState(null);
  const [activeDocument, setActiveDocument] = useState(null);
  //
  const [showDocumentDetail, setShowDocumentDetail] = useState(false);
  const [showDocumentList,   setShowDocumentList]   = useState(false);
  const [showOrderDetail,    setShowOrderDetail]    = useState(false);
  const [detailFromList,     setDetailFromList]     = useState(false); //  detail dokumentu zobrazen z Prehledu
  //
  const [documentFormValue, setDocumentFormValue] = useState({
    documentType: "",
    documentName: "",
    description: "",
    documentDate: ""
  })

  function formatDate(aDate) 
  {
    let dateString = ''
    const firstDot = aDate.indexOf('-');
    const lastDot  = aDate.lastIndexOf('-');
    //  kontrola
    if (firstDot > 0 && lastDot > firstDot )
      dateString = parseInt(aDate.substring(lastDot + 1)) +'.'+ parseInt(aDate.substring(firstDot + 1, lastDot)) +'.'+ aDate.substring(0, firstDot);
    return dateString;
  }
  const toggleShowDocumentDetail = () => setShowDocumentDetail(!showDocumentDetail);
  const toggleShowDocumentList = () => setShowDocumentList(!showDocumentList);
  const toggleShowOrderDetail = () => setShowOrderDetail(!showOrderDetail);
  
  let partners = {
    columns:  [
                {label:'Klient', field:'partnerName'}
              ], 
    rows: httpResponse.sourceData
  };

  let documents = {
    columns:  [
                {label:'Soubor', field:'displayName'}
              ], 
    rows: [
      { displayName:'9707757846.pdf', parameters:{documentName: '9707757846', documentType: '', description: 'popisek', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z' }},
      { displayName:'AppSheet Invoice 20201219.pdf', parameters:{documentName: 'AppSheet Invoice 20201219', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },
      { displayName:'INV05501595.pdf', parameters:{documentName: '3', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },  
      { displayName:'100220406.pdf', parameters:{documentName: '4', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },
      { displayName:'AXL 20220102_POV1220002.pdf', parameters:{documentName: '5', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },
      { displayName:'Zálohová_faktura_2260400136.pdf', parameters:{documentName: '', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },
      { displayName:'Elnika 20211027.pdf', parameters:{documentName: '', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },
      { displayName:'Uber 20220104.pdf', parameters:{documentName: '', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },
      { displayName:'Alza 20210219_2211903041.pdf', parameters:{documentName: '', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },
      { displayName:'Alza 20210403_2213538727.pdf', parameters:{documentName: '', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },
      { displayName:'Liftago 20211117_1463.pdf', parameters:{documentName: '', documentType: '', description: '', documentDate: '2022-06-15', fileId: '1ijF4bU-6ZBlkBjvlbZwwXSYCntLdl_8Z'} },
    ]
  };
  
  
  function onClickDocumentDelete(idDocument)
  {    
    // console.log( idDocument + ' - '+ activeOrder); // activePartner.orders[activeOrder].orderName 
    
  }

  /* PREHLED ZAKAZEK a DOKUMENTU */
  function createOrderTreeTable()
  {
    let retArr = new Array([]);
    if (activePartner !== null && activePartner.orders !== undefined) {
      Object.keys(activePartner.orders).forEach(idOrder => {
        const order = activePartner.orders[idOrder];
        retArr.push(<MDBTreeTableItem key={'idOrder'+ idOrder}
                                      depth={1}
                                      values={[ <MDBRow>
                                                  <MDBCol md='3'>{order.orderName}</MDBCol>
                                                  <MDBCol md='2' className="d-flex justify-content-end">{order.dateFrom}</MDBCol>
                                                  <MDBCol md='2' className="d-flex justify-content-end">{order.dateTo}</MDBCol>
                                                  <MDBCol md='4' className="overflow-hidden text-nowrap">{order.description}</MDBCol>
                                                  <MDBCol md='1' className="d-flex justify-content-end">
                                                    {(order.closed ? '':
                                                      <MDBIcon far icon='plus-square'
                                                        onClick={ () => {
                                                          setActiveOrder(order);
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
                                            setActiveOrder(order);
                                            setActiveDocument(document);
                                            setDetailFromList(false);
                                            toggleShowDocumentDetail()
                                          }
                                        }
                                        values={[ <MDBRow>
                                                    <MDBCol md='3'>{document.documentName}</MDBCol>
                                                    <MDBCol md='2'>{documentTypeList[document.documentType].text}</MDBCol>
                                                    <MDBCol md='2' className="d-flex justify-content-end">{formatDate(document.documentDate)}</MDBCol>
                                                    <MDBCol md='5' className="overflow-hidden text-nowrap">{document.description}</MDBCol>
                                                    { /*
                                                      <MDBCol md='1' className="d-flex justify-content-end">
                                                      {(order.closed ? '': 
                                                        <MDBIcon far icon='trash-alt'
                                                          onClick={onClickDocumentDelete(idDocument)}
                                                        /> 
                                                      )}
                                                    </MDBCol> */}
                                                  </MDBRow>]}
                                        className={(order.closed?'table-secondary':'')}/>)
        })
      });
    }
    return retArr;
  }
  function getDocumentTypeSelectData(activeDocumentType)
  {
    let retArr = new Array([]);
    Object.keys(documentTypeList).forEach(documentType => 
      {
        retArr.push({text: documentTypeList[documentType].text, value: documentType, defaultSelected: activeDocumentType === documentType });
      }
    )
    return retArr;
  }

  const onChange = (e) => {
    setDocumentFormValue({ ...documentFormValue, [e.target.name]: e.target.value })
    if (e.target.name === 'documentDate') {
      activeDocument.documentDate = e.target.value;      
    }
  }
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
                    setActiveOrder(null);
                    setActiveDocument(null);
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
              <MDBCardTitle>{activePartner == null ? '' : activePartner.partnerName }</MDBCardTitle>
              <MDBTreeTable className="treetable-sm">
                <MDBTreeTableHead heads={[<MDBRow>
                                            <MDBCol md='3'>Zakázka</MDBCol>
                                            <MDBCol md='2' className="d-flex justify-content-end">Datum od</MDBCol>
                                            <MDBCol md='2' className="d-flex justify-content-end">Datum do</MDBCol>
                                            <MDBCol md='4'>Popis</MDBCol>
                                            <MDBCol md='1' className="d-flex justify-content-end">
                                              {activePartner == null ? '' : 
                                                <MDBIcon far icon='plus-square'
                                                onClick={ () => {
                                                  setActiveOrder(
                                                    {idOrder:null, orderName:'', description: '', dateFrom: '', dateTo: '', closed: false, documents: {} }
                                                  );
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
            <MDBModalTitle>{activePartner.partnerName}<br></br>{activeOrder.orderName}</MDBModalTitle>
            <MDBBtn
              type='button'
              className='btn-close'
              color='none'
              onClick={toggleShowDocumentList}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              {/* 1. sloupec s daty */}
              <MDBCol md='3'>
              <MDBDatatable maxHeight='400px' maxWidth='300px' 
                pagination={false}
                hover
                entries={9999}
                bordered
                noFoundMessage = 'Dokument nenalezen'
                allText='Vše' rowsText='Řádek' ofText='z'
                fixedHeader search striped sm
                onRowClick={(row) => {
                    setActiveDocument(row.parameters);
                  }
                }
                data={documents} />
              </MDBCol>

              {/* 2. sloupec s nahledem */}
              <MDBCol>
                <MDBRow>
                  <MDBCol>
                    <MDBDatatable
                      pagination={false}
                      entries={9999}
                      fixedHeader sm
                      noFoundMessage = ''
                      data = {{
                          columns:  [
                            {label:'Název dokumentu', field:'documentName', width: 200},
                            {label:'Datum', field:'documentDate', width: 200},
                            {label:'Popis', field:'description'}
                          ], 
                          rows: activeDocument == null ? [] :
                                [{documentName: activeDocument.documentName, documentDate: formatDate(activeDocument.documentDate), description: activeDocument.description}]
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
    {activeDocument == null ? '' :
      <MDBModalDialog size="xl">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{activePartner.partnerName}<br></br>{activeOrder.orderName}</MDBModalTitle>
            <MDBBtn
              type='button'
              className='btn-close'
              color='none'
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
                      data={getDocumentTypeSelectData(activeDocument.documentType)}
                      className='mt-3 mb-3'
                    />
                    <MDBInput
                      label='Název'
                      name='documentName'
                      id='documentName'
                      value={activeDocument.documentName}
                      className='mb-3'
                    />
                    <MDBInput
                      label='Datum'
                      name='documentDate'
                      id='documentDate'
                      value={activeDocument.documentDate}
                      type='date'
                      className='mb-3'
                      onChange={onChange}
                    />
                    <MDBTextArea
                      rows='4'
                      label='Popis'
                      name='documentDescription'
                      id='documentDescription'
                      value={activeDocument.description}
                      wrapperClass="mb-4"
                      className='mb-3'
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
            { detailFromList ? '':
              <MDBBtn color='warning'>Smazat&nbsp;&nbsp;
                <MDBIcon far icon='trash-alt'
                        onClick={onClickDocumentDelete(activeDocument.idDocument)}/>
              </MDBBtn> 
            }
            <MDBBtn>Uložit</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    }
    </MDBModal>


    {/* ZAKAZKA DETAIL */}

    <MDBModal tabIndex='-1' show={showOrderDetail} setShow={setShowOrderDetail}>
    {activePartner == null || activeOrder == null ? '' :
      <MDBModalDialog size="sm">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{activePartner.partnerName}<br></br>Nová zakázka</MDBModalTitle>
            <MDBBtn
              type='button'
              className='btn-close'
              color='none'
              onClick={toggleShowOrderDetail}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              {/* 1. sloupec s daty */}
              <MDBCol>
                  <form>
                    <MDBInput
                      label='Název zakázky'
                      name='orderName'
                      id='orderName'
                      value={activeOrder.orderName}
                      className='mb-3'
                    />
                    <MDBInput
                      label='Datum od'
                      name='dateFrom'
                      id='dateFrom'
                      value={activeOrder.dateFrom}
                      type='date'
                      className='mb-3'
                    />
                    <MDBInput
                      label='Datum do'
                      name='dateTo'
                      id='dateTo'
                      value={activeOrder.dateTo}
                      type='date'
                      className='mb-3'
                    />
                    <MDBTextArea
                      rows='4'
                      label='Popis'
                      name='orderDescription'
                      id='orderDescription'
                      value={activeOrder.description}
                      wrapperClass="mb-4"
                      className='mb-3'
                    />
                  </form>
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
            <MDBBtn>Uložit</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    }
    </MDBModal>
    </>
  )
}


export default Administrace;