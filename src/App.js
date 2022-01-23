
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <div>navbar placeholder</div>
      <Routes>
        <Route path="/" exact element={<div>landing</div>} />
        <Route path="/login" exact element={<div>login</div>} />
        <Route path="/signup" exact element={<div>signup</div>} />
      </Routes>
    </div>
  );
}

export default App;
