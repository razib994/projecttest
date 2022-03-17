import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./Home";
import AddForm from "./AddForm";
import Navbar from "./Navbar/Navbar";
import UpdateForm from "./UpdateForm";

function App() {
     const editDataApp = (editData) =>{
        console.log(editData)
    }
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/AddForm" element={ <AddForm/> } />
        <Route path="/UpdateForm" element={<UpdateForm editData={editDataApp}/> } />
      </Routes>
    </div>
  );
}

export default App;
