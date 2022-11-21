import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MDBContainer } from "mdb-react-ui-kit"

//import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import "./index.css"

import MainMenu, { mainFooter } from "./mainMenu"
import MainPage from "./mainPage"
import SolarPage from "./solarPage"
import SecutityPage from "./securityPage"
import NetworkPage from "./networkPage"
import NoPage from "./NoPage"

export default function RoutePage() {
  return (
    <MDBContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />}>
            <Route index element={<MainPage />} />
            <Route path="solar" element={<SolarPage />} />
            <Route path="security" element={<SecutityPage />} />
            <Route path="network" element={<NetworkPage />} />
            <Route path="about" element={<NoPage />} />
            <Route path="contacts" element={<NoPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {mainFooter()}
    </MDBContainer>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RoutePage />)
