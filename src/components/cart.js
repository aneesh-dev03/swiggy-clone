import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem, clearCart } from "../utilis/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const restaurantName = useSelector((state) => state.cart.restaurantName);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🛒 Your Cart</h1>
            {restaurantName && (
              <p className="text-sm text-gray-400 mt-0.5">from <span className="text-orange-500 font-semibold">{restaurantName}</span></p>
            )}
          </div>
          {cartItems.length > 0 && (
            <button
              className="text-xs text-red-500 border border-red-400 px-3 py-1 rounded-lg hover:bg-red-50 transition"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🛒</p>
            <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
            <p className="text-gray-400 text-sm mt-1">Add some delicious items from the menu!</p>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-4 gap-4">

                  <div className="flex items-center gap-3 flex-1">
                    {/* Veg/Non-veg indicator */}
                    <span className={`w-3 h-3 rounded-sm border-2 shrink-0 flex items-center justify-center ${item.isVeg ? "border-green-600" : "border-red-600"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`}></span>
                    </span>

                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                      <p className="text-gray-700 font-bold text-sm">
                        ₹{item.price}
                        {item.quantity > 1 && (
                          <span className="text-gray-400 font-normal ml-1">× {item.quantity} = ₹{Number(item.price) * item.quantity}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Quantity counter */}
                  <div className="flex items-center gap-2">
                    <button
                      className="w-7 h-7 rounded-full border border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white font-bold text-base transition flex items-center justify-center"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-bold text-gray-800 text-sm">{item.quantity}</span>
                    <button
                      className="w-7 h-7 rounded-full border border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white font-bold text-base transition flex items-center justify-center"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>

                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="mt-6 pt-4 border-t flex items-center justify-between">
              <span className="font-bold text-gray-800 text-base">
                Total ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
              <span className="font-bold text-orange-500 text-lg">₹{total}</span>
            </div>

            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition duration-200">
              Proceed to Checkout →
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Cart;