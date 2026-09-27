import { useState } from "react";

function Checkout({ cartTotal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      setMessage("Please fill all the details.");
      return;
    }

    setMessage("Order placed successfully! 🎉");
  };

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h3>Total: ₹{cartTotal}</h3>

        <button type="submit">Place Order</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}

export default Checkout;