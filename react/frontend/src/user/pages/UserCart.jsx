const UserCart = ({ cart }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">My Cart</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, index) => (
        <div key={index} className="border p-2 my-2">
          {item.name} - ₹{item.price}
        </div>
      ))}
    </div>
  );
};

export default UserCart;