import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Landing from './Pages/Landing'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Nav from './Components/Navbar'

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
