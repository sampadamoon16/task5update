
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Manager from './Manager';
import NewUser from './NewUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import View from './View';
import SignUp from './SignUp';
import Login from './Login';


function App() {
  return (
    <div>
      {/* <Manager/> */}
      <BrowserRouter>
      <Routes> 
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/" element={<Manager/>}> </Route>
        <Route path="/adduser" element={<NewUser/>}> </Route>      
        <Route path="/update/:id" element={<NewUser/>}> </Route>      
        <Route path="/view/:id" element={<View/>}> </Route>      


      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
