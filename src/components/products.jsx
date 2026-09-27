function Products() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 55000,
    },
    {
      id: 2,
      name: "Smart Phone",
      category: "Electronics",
      price: 25000,
    },
    {
      id: 3,
      name: "Headphones",
      category: "Accessories",
      price: 3000,
    },
    {
      id: 4,
      name: "Smart Watch",
      category: "Accessories",
      price: 5000,
    },
  ];

  return (
    <section className="products">
      <h2>Our Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">🛍️</div>

            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <h4>₹{product.price.toLocaleString("en-IN")}</h4>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;