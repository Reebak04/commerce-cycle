import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJobArray } from "../hooks/JobArray";
import "../styles.css";

const HomePage = () => {
  const { jobs: products, setJobs: setProducts } = useJobArray();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("businessUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const loggedInBusinessId = parsedUser?.businessId;

  useEffect(() => {
    if (!loggedInBusinessId) {
      alert("Please log in to view products.");
      navigate("/"); // Redirect to login page
      return;
    }

    // Fetch products for the logged-in business
    fetch(`http://localhost:8080/api/products/buy-products/${loggedInBusinessId}`)
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP ${res.status} - ${errorText}`);
        }
        const data = await res.json(); // No need for `.text()` and manual parse
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setErrorMessage("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, [setProducts, navigate, loggedInBusinessId]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Product deleted!");
          setProducts((prev) => prev.filter((product) => product.id !== id));
        } else {
          alert("Failed to delete product.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting product.");
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.pname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.unit?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>; // Can replace with a spinner or progress bar
  }

  return (
    <div>
      {/* Navigation Bar (Consider adding it later for better UX) */}
      {/* <nav className="top-navbar">
        <Link to="/home">Home</Link>
        <Link to="/sell">My Products</Link>
        <Link to="/add">Add Product</Link>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </nav> */}

      <div className="page-content">
        <h2>Product Listings</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="job-cards">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="job-card">
                <h3>{product.pname}</h3>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Quantity:</strong> {product.quantity} {product.unit}</p>
                <p><strong>Available:</strong> {product.available_from} to {product.available_to}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <img
                  src={product.image}
                  alt={product.pname}
                  style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                />

                {product.businessId === loggedInBusinessId && (
                  <div className="card-actions">
                    <Link to={`/edit/${product.id}`} className="edit-btn">Edit</Link>
                    <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
