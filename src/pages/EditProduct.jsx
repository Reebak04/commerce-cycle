import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        const data = await res.json();
  
        // Format dates for input fields
        data.available_from = data.available_from?.split("T")[0];
        data.available_to = data.available_to?.split("T")[0];
  
        setProductData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Error loading product.");
        navigate("/home");
      }
    };
  
    fetchProduct();
  }, [id, navigate]);
  

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/home");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating product.");
    }
  };

  if (loading || !productData) {
    return <p>Loading product data...</p>;
  }

  return (
    <div>
      <nav className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/add">Add Product</Link>
      </nav>

      <div className="container">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="pname" value={productData.pname} onChange={handleChange} placeholder="Product Name" required />
          <input type="text" name="description" value={productData.description} onChange={handleChange} placeholder="Description" required />
          <input type="number" name="quantity" value={productData.quantity} onChange={handleChange} placeholder="Quantity" required />
          <input type="text" name="unit" value={productData.unit} onChange={handleChange} placeholder="Unit" required />
          <input type="date" name="available_from" value={productData.available_from} onChange={handleChange} required />
          <input type="date" name="available_to" value={productData.available_to} onChange={handleChange} required />
          <input type="text" name="image" value={productData.image} onChange={handleChange} placeholder="Image URL" required />
          <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" required />
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
