import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // 🔥 import jwtDecode

const SellProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token"); // 🔥 directly fetching token

      if (!token) {
        alert("Please log in first!");
        navigate("/");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        const businessId = decodedToken.businessId;
        console.log("Business ID from token:", businessId);

        if (!businessId) {
          alert("Business ID not found. Please log in again.");
          navigate("/");
          return;
        }

        // 🔥 Now fetch products based on businessId
        const response = await fetch(`http://localhost:8080/api/products/sell-products/${businessId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        alert("Session expired or invalid. Please login again.");
        navigate("/");
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in. Please log in to continue.");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Product deleted!");
          setProducts((prev) => prev.filter((product) => product.id !== id));
        } else {
          alert("Failed to delete product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.pname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading your products...</p>;
  }

  return (
    <div>
      <h2>My Listed Products</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.pname}</h3>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No products listed yet.</p>
        )}
      </div>
    </div>
  );
};

export default SellProduct;
