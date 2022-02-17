import './App.css';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './config'
import Landing from './Pages/Landing'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Nav from './Components/Navbar'
import Protected from './Components/Protected'
import Matchmaking from './Pages/Matchmaking'

function App() {
  return (
    <AuthProvider>
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/matchmaking" element={<Matchmaking />} />
      </Routes>
    </div>
    </AuthProvider>
  );
}


export default App;
