import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ValidateToken from "./pages/ValidateToken";
import Layout from "./Layout/Layout";
import PublicKeyPage from "./pages/PublicKeyPage";
import DynamicJwkToPem from "./pages/DynamicJwkToPem";
import DynamicTokenGenerator from "./pages/DynamicTokenGenerator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="ValidateToken" element={<ValidateToken />} />
           <Route path="/public-key" element={<PublicKeyPage />} />
           <Route path="/convert-jwk" element={< DynamicJwkToPem />} />
           <Route path="/generate-token" element={< DynamicTokenGenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
