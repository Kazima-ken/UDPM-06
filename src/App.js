import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/customer/login/Login";
import Home from "./pages/customer/home/home";
import DashBoardCustomer from "./component/customer/DashBoardCustomer";
import CreateNFT from "./pages/customer/CreateEvent/CreateNFT";
import "bootstrap/dist/css/bootstrap.css";
import DonatePage from "./pages/customer/Donate/DonatePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/login"
            element={
              <DashBoardCustomer>
                <Login />
              </DashBoardCustomer>
            }
          />
          <Route
            path="/home"
            element={
              <DashBoardCustomer>
                <Home />
              </DashBoardCustomer>
            }
          />
          <Route
            path="/create-nft"
            element={
              <DashBoardCustomer>
                <CreateNFT />
              </DashBoardCustomer>
            }
          />
          <Route
            path="/donate/:nftId"
            element={
              <DashBoardCustomer>
                <DonatePage />
              </DashBoardCustomer>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
