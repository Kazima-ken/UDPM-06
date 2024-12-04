import { BrowserRouter as Router, Route, Routes,Navigate  } from "react-router-dom";
import Login from "./pages/customer/login/Login";
import Home from "./pages/customer/home/home";
import DashBoardCustomer from "./component/customer/DashBoardCustomer";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <DashBoardCustomer>
            <Home />
          </DashBoardCustomer>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
