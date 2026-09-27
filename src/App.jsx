import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Products from "./components/products";
import Checkout from "./Checkout";
import Login from "./Login";
import Admin from "./components/Admin";
const products = [
  { id: 1, name: "Laptop", price: 55000, category: "Electronics", icon: "💻" },
  { id: 2, name: "Smart Phone", price: 25000, category: "Electronics", icon: "📱" },
  { id: 3, name: "Headphones", price: 2999, category: "Audio", icon: "🎧" },
  { id: 4, name: "Smart Watch", price: 4999, category: "Wearables", icon: "⌚" },
  { id: 5, name: "Keyboard", price: 1499, category: "Accessories", icon: "⌨️" },
  { id: 6, name: "Mouse", price: 899, category: "Accessories", icon: "🖱️" },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("shopase-cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("shopase-cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={darkMode ? "app dark-mode":"app"}>
      <button
  className="dark-mode-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
      <header className="navbar">
        <h1>Shopase</h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#cart">Cart 🛒 ({cartCount})</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div>
            <p className="tag">WELCOME TO SHOPASE</p>
            <h2>Everything you need, in one place.</h2>
            <p>
              Discover electronics and accessories at great prices.
            </p>
            <a href="#products" className="hero-button">
              Shop Now
            </a>
          </div>
        </section>

        <section className="products-section" id="products">
          <h2>Our Products</h2>

          <div className="controls">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Audio">Audio</option>
              <option value="Wearables">Wearables</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <p className="empty">No products found.</p>
            ) : (
              filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-icon">{product.icon}</div>

                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <strong>₹{product.price.toLocaleString("en-IN")}</strong>

                  <button onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="cart-section" id="cart">
          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <span>
                    {item.icon} {item.name} × {item.quantity}
                  </span>

                  <span>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>

                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}

              <h3 className="total">
                Total: ₹{cartTotal.toLocaleString("en-IN")}
              </h3>

              <button className="checkout" onClick={() => alert("Order placed successfully!")}>
                Checkout
              </button>
            </>
          )}
        </section>
        <Login/>
        <Admin/>
        <products/>
        <Checkout cartTotal={cartTotal} />
      </main>

      <footer>
        <p>© 2026 Shopase. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;