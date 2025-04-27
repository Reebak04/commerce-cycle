import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import SellProduct from "./pages/SellProduct";
import EditProduct from "./pages/EditProduct";
import "./App.css";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <header className="top-navbar">
        <h1>Commerce Cycle</h1>
        <nav className="navbar">
          <a href="/home">Home</a>
          <a href="/add">Add Product</a>
          <a href="/sell">My Products</a>
          <a href="/">Logout</a>
        </nav>
      </header>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;