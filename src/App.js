import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Login from './Components/Login'
import Nav from './Components/Navbar'

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" exact element={<div>landing</div>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<div>signup</div>} />
      </Routes>
    </div>
  );
}

export default App;
