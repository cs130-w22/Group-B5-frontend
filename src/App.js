import './App.css';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './config'
import Landing from './Pages/Landing'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Nav from './Components/Navbar'
import Protected from './Components/Protected'
import { useState, useEffect } from 'react'
import { io } from "socket.io-client"
import { API_URL } from './config'


function App() {
  const [socket, changeSocket] = useState(null)

  let openConnection = (lobbyType) => {
    let token = localStorage.getItem('token')

    const sock = io(`${API_URL}/race/${lobbyType}`, 
      {auth: {
        token
      }
    });

    sock.on("connect", () => {
      console.log("Connected to socket server");
      changeSocket(sock)
    });
    
    sock.on("disconnect", () => {
      console.log("Disconnected from socket server"); 
    });

    sock.on("connect_error", (e) => {
      console.log(e.message)
      //sock.connect();
    });
  }

  return (
    <AuthProvider>
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
    </AuthProvider>
  );
}


export default App;
