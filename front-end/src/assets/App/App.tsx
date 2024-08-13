import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SildeNavBar from './../Layouts/NavBar';

import { Landing } from '../Pages/Landing';
import { Admin } from '../Pages/Admin';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import { Cart }  from '../Pages/Cart';


function App() {

  return (
    <div>
      {/* NavBar contains the main routes  */}
  <SildeNavBar />

    <Router>
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/home" element={< Landing/>} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </div>
 
  )
}

export default App
