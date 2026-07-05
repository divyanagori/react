  
import "./index.css";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails.jsx";
function App() {
 
 
  return (
  <>
   
   <Routes>
    <Route path="/" element={<Home />} />
   
    <Route path="/employe/:empId" element={<EmployeeDetails />} />
   </Routes>
  </>
  )
}

export default App