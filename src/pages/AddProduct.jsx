import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddProduct = () => {
  const [product, setProduct] = useState({
    pname: "",
    description: "",
    quantity: "",
    unit: "",
    availableFrom: "",
    availableTo: "",
    image: "",
    price: "",
    businessId: "", // initially empty
  });

  const [loading, setLoading] = useState(true); // to manage loading state
  const navigate = useNavigate();

  // Fetch the businessId from the token upon component mount
  useEffect(() => {
    const fetchBusinessId = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add a product.");
        navigate("/");
        return;
      }

      try {
        // Decode the token and extract the businessId
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        const businessId = decodedToken.businessId;
        console.log("Business ID from token:", businessId);

        if (!businessId) {
          alert("Business ID not found in token.");
          navigate("/");
          return;
        }

        // Set the businessId in the state
        setProduct((prevProduct) => ({
          ...prevProduct,
          businessId: businessId,
        }));

        setLoading(false); // Done loading
      } catch (error) {
        console.error("Invalid token:", error);
        alert("Session expired or invalid. Please login again.");
        navigate("/");
      }
    };

    fetchBusinessId();
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle the form submission to add a product
  const handleAddProduct = async (e) => {
    e.preventDefault();
  
    if (!product.businessId) {
      alert("Business ID not loaded yet. Please wait a moment.");
      return;
    }
  
    const token = localStorage.getItem("token"); // 🔥 Fetch token
  
    // No need to remove businessId from the payload now
    const payload = {
      ...product,
      quantity: parseInt(product.quantity),
      price: parseFloat(product.price),
    };
  
    console.log("Final Payload with businessId:", JSON.stringify(payload));
  
    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send full payload with businessId
      });
  
      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error('No JSON response', err);
        data = null;
      }
  
      if (!response.ok) {
        console.error('Error:', data || { message: 'Unknown error' });
        return;
      }
  
      console.log('Success:', data);
  
      if (response.ok) {
        alert("✅ Product added successfully!");
        setProduct((prevProduct) => ({
          ...prevProduct,
          pname: "",
          description: "",
          quantity: "",
          unit: "",
          availableFrom: "",
          availableTo: "",
          image: "",
          price: "",
          // keep businessId intact
        }));
        navigate("/home");
      } else {
        alert(`❌ Failed to add product: ${data?.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ An error occurred. Please try again later.");
    }
  };
  
    

  if (loading) {
    return <p>Loading business info...</p>; // show until businessId is ready
  }

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          name="pname"
          placeholder="Product Name"
          value={product.pname}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="unit"
          placeholder="Unit"
          value={product.unit}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="availableFrom"
          placeholder="Available From"
          value={product.availableFrom}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="availableTo"
          placeholder="Available To"
          value={product.availableTo}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={!product.businessId}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
