import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ValidateToken from "./pages/ValidateToken";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/validate" element={<ValidateToken />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
