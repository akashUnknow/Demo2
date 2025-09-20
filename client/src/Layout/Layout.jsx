import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
     <div className="flex flex-col min-h-screen">
       <header className="p-4 bg-gray-800 text-white">
        <nav className="flex space-x-4">
          <Link to="/">Home</Link>
          <Link to="/ValidateToken">ValidateToken</Link>
          <Link to="/convert-jwk">DynamicJwkToPem</Link>
          <Link to="/generate-token">DynamicTokenGenerator</Link>
        </nav>
      </header>

        <main className="flex-grow flex items-center justify-center bg-gray-50">
        {/* This is where nested routes will render */}
        <Outlet />
      </main>

       <footer className="p-4 bg-gray-100 text-center">
         Akash 
      </footer>
    </div>
  );
}
