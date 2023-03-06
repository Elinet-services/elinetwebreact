import { useState } from "react";

import {
  MDBCard, MDBCardBody, MDBContainer,
  MDBDatatable,
  MDBIcon,
  MDBRow,
  MDBCol  
} from 'mdb-react-ui-kit';
import { MDBTreeview } from 'mdb-react-treeview';
import { MDBTreeTable, MDBTreeTableItem, MDBTreeTableHead, MDBTreeTableBody } from 'mdb-react-treetable';
import "mdb-react-treetable/dist/css/treetable.min.css"


function Administrace()
{
  const httpResponse = {
    sourceData: [
      { partnerName:'Petr Macasek', identification:{idPartner: 111},
        orders:[
            { idOrder:111, orderName:'Ostrovni system', address: 'Drzkova 755', description: 'Strucny popis zakazky', closed: false,
              documents: [
                {idDocument: 10001, company: 'Alza a.s', documentName: 'Faktura prijata', documentDate: '12.7.2022'},
                {idDocument: 10011, company: 'Elinet s.r.o', documentName: 'Zarucni list', documentDate: '7.11.2022'},
              ]
            },
            { idOrder:112, orderName:'Zabezpeceni', address: 'Straseci 5', description: 'Strucny popis zakazky', closed: false,
              documents: [
                {idDocument: 10011, company: 'Alza a.sasdasda', documentName: 'Faktura prijata', documentDate: '12.7.2022'},
                {idDocument: 10021, company: 'Elinet s.r.o', documentName: 'Zarucni list', documentDate: '7.11.2022'},
              ]
            }          
        ]
      },
      { partnerName:'Roman Kubrt', identification:{idPartner: 211},
        orders:[
          { idOrder:112, orderName:'Aaxdasdsad', address: 'Straseci 5', description: 'Strucny popis zakazky', closed: false,
          documents: [
            {idDocument: 10011, company: 'Alza a.sasdasda', documentName: 'Faktura prijata', documentDate: '12.7.2022'},
            {idDocument: 10021, company: 'Elinet s.r.o', documentName: 'Zarucni list', documentDate: '7.11.2022'},
          ]
        }          

        ]
      },
      { partnerName:'Zdenek Ulrich', identification:{idPartner: 311},
        orders:[]
      },
      {partnerName:'Petr Macasek 1.5', identification:{idPartner: 411}},
      {partnerName:'Petr Macasek 2', identification:{idPartner: 511}},
      {partnerName:'Roman Kubrt 2', identification:{idPartner: 611}},
      {partnerName:'Zdenek Ulrich 2', identification:{idPartner: 711}},
      {partnerName:'Roman Kubrt 3', identification:{idPartner: 811}},
      {partnerName:'Zdenek Ulrich 3', identification:{idPartner: 911}},
      { partnerName:'Petr Macasek 2', identification:{idPartner: 1111}}      
    ]
  };

  const [orders, setOrders] = useState(httpResponse.sourceData[0].orders);
  orders.forEach(order => {
    console.log(order.orderName)
  });

  let partners = {
    columns:  [
                {label:'Klient', field:'partnerName'}                
              ], 
    rows: httpResponse.sourceData
  };


  let ordersObj = {
    columns: [{label:'Zakazka', field:'orderName'},
              {label:'Doklad', field:'documentName'} ],
    rows: [
      {idOrder:111, orderName:'Stavba elektrarny', depth:1 },
      {idDocument:111,depth: 2, documentName:<MDBRow><MDBCol>Alza a.s.</MDBCol><MDBCol>Faktura</MDBCol></MDBRow>},
      {idDocument:112, depth: 2, documentName:'Zarucni list'},
      {idOrder:222, orderName:'Zabezpeceni domu'},
      {idDocument:211, documentName:'Faktura Securitas'},
      {idDocument:212, documentName:'Zarucni list'}
    ]
  };

  function createOrderTreeTable()
  {
    let retArr = new Array();
    if (orders != 'undefined') {
      orders.forEach(order => {
        retArr.push(<MDBTreeTableItem values={[<MDBRow><MDBCol>{order.orderName}</MDBCol><MDBCol>{order.address}</MDBCol></MDBRow>]} depth={1} className='table-secondary'/>)
        order.documents.forEach(document => {
          retArr.push(<MDBTreeTableItem values={[<MDBRow><MDBCol>{document.company}</MDBCol><MDBCol>{document.documentName}</MDBCol><MDBCol>{document.documentDate}</MDBCol></MDBRow>]} depth={2} />)
        })
      });
    }
    return retArr;
  }
  

//fixedHeader
    return (

      <>
      <MDBContainer className="py-5">
        <MDBCard>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='3'>
                <MDBDatatable maxHeight='400px' maxWidth='300px' 
                  pagination={false}
                  hover
                  entries={9999}
                  bordered            
                  allText='Vše'
                  ofText='z'
                  rowsText='Řádek'
                  fixedHeader search sm
                  onRowClick={(row) => {               
                    setOrders(row.orders);
                    }
                  }
                  data={partners} />
              </MDBCol>            
              <MDBCol md='9'>
                <MDBTreeTable>                
                  <MDBTreeTableHead heads={[<MDBRow><MDBCol>Zakazka</MDBCol><MDBCol>Adresa</MDBCol></MDBRow>]} />
                  <MDBTreeTableBody>
                    {createOrderTreeTable()}

                  </MDBTreeTableBody>                
                </MDBTreeTable>

                </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      </>
    )
}

export default Administrace;

/*          

                  <MDBTreeTableItem values={['Personal', '15mb', 'Folder']} depth={1} className='Klasa neconeco'/>
                  <MDBTreeTableItem values={['index', '5mb', <MDBRow><MDBCol>Alza a.s.</MDBCol><MDBCol>Faktura</MDBCol></MDBRow>]} depth={2} />
                  <MDBTreeTableItem values={['index', '5mb', 'html']} depth={2} />
                  <MDBTreeTableItem values={['my-cat', '0mb', 'webp']} depth={2} />
                  <MDBTreeTableItem values={['Documents', '350mb', 'Folder']} depth={2} />
                  <MDBTreeTableItem values={['Bill', '200mb', 'PDF']} depth={3} />
                  <MDBTreeTableItem values={['Newspapers mentions', '50mb', 'PDF']} depth={3} />
                  <MDBTreeTableItem values={['Ebooks', '100mb', 'zip']} depth={3} />
                  <MDBTreeTableItem values={['Songs', '30mb', 'Folder']} depth={2} />
                  <MDBTreeTableItem values={['Ode to JS', '10mb', 'mp3']} depth={3} />
                  <MDBTreeTableItem values={['One more style', '10mb', 'mp3']} depth={3} />
                  <MDBTreeTableItem values={['Bjork-Its-Oh-So-Quiet', '10mb', 'mp3']} depth={3} />                  

      <div style={{ padding: '20px' }} className='text-center'>
        <MDBBtn onClick={() => setBasicOpen(!basicOpen)}>
          <MDBIcon fas icon='bars' />
        </MDBBtn>
      </div>

      <MDBCard className='py-5 justify-content-center'>
        <MDBCardBody >
          <MDBSideNav isOpen={basicOpen} absolute getOpenState={(e: any) => setBasicOpen(e)}>
          <MDBSideNavMenu>
            partners.forEach(partnerItem => {
              <MDBSideNavItem>
                <MDBSideNavLink>
                  partnerItem
                </MDBSideNavLink>
              </MDBSideNavItem>              
            });
          </MDBSideNavMenu>
        </MDBSideNav>

        <div style={{ padding: '20px' }} className='text-center'>
          <MDBBtn onClick={() => setBasicOpen(!basicOpen)}>
            <MDBIcon fas icon='bars' />
          </MDBBtn>
        </div>


        </MDBCardBody>
      </MDBCard>
*/