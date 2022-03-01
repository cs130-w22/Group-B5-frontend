import './App.css';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './config'
import Landing from './Pages/Landing'
import Login from './Components/Login'
import Signup from './Components/Signup'
import UserContent from './Components/UserContent'
import Nav from './Components/Navbar'
import Protected from './Components/Protected'
import Matchmaking from './Pages/Matchmaking'
import { useState, useEffect } from 'react'
import { io } from "socket.io-client"
import { API_URL } from './config'

function App() {
  const [socket, changeSocket] = useState(null)

  let openConnection = () => {
    let token = localStorage.getItem('token')

    const sock = io(`${API_URL}`, 
      {auth: {
        token
      }
    });
    return sock;
  }

  return (
    <AuthProvider>
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/matchmaking/*" 
          element={<Protected><Matchmaking changeSocket={changeSocket} socket={socket} openConnection={openConnection} /></Protected>} />
        <Route path="/user-content" element={<Protected><UserContent /></Protected>} />
      </Routes>
    </div>
    </AuthProvider>
  );
}


export default App;
