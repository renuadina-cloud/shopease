import { useState } from "react";

function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("shopase-products")) || []
  );

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      setMessage("Please fill all product details.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name,
      price: Number(price),
      category: category,
    };

    const updatedProducts = [...products, newProduct];

    setProducts(updatedProducts);

    localStorage.setItem(
      "shopase-products",
      JSON.stringify(updatedProducts)
    );

    setName("");
    setPrice("");
    setCategory("");
    setMessage("Product added successfully! 🎉");
  };

  return (
    <section className="admin-page">
      <h2>Admin - Add Product</h2>

      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Add Product</button>
      </form>

      {message && <p>{message}</p>}

      <div className="admin-products">
        <h3>Added Products</h3>

        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          products.map((item) => (
            <div className="admin-product" key={item.id}>
  <span>
    {item.name} - ₹{item.price} - {item.category}
  </span>

  <button
    onClick={() => {
      const updatedProducts = products.filter(
        (product) => product.id !== item.id
      );

      setProducts(updatedProducts);

      localStorage.setItem(
        "shopase-products",
        JSON.stringify(updatedProducts)
      );
    }}
  >
    Delete
  </button>
  <button
  onClick={() => {
    const newName = prompt("Enter new product name:", item.name);
    const newPrice = prompt("Enter new price:", item.price);
    const newCategory = prompt("Enter new category:", item.category);

    if (!newName || !newPrice || !newCategory) return;

    const updatedProducts = products.map((product) =>
      product.id === item.id
        ? {
            ...product,
            name: newName,
            price: Number(newPrice),
            category: newCategory,
          }
        : product
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      "shopase-products",
      JSON.stringify(updatedProducts)
    );
  }}
>
  Edit
</button>
</div>
          ))
        )}
      </div>
    </section>
  );
}

export default Admin;