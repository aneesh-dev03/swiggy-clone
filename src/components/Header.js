import { useState } from "react";
import { LOGO_URL } from "../utilis/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      
      {/* Logo */}
      <div>
        <img className="w-16 h-16 object-contain" src={LOGO_URL} />
      </div>

      {/* Nav */}
      <div>
        <ul className="flex items-center gap-6 text-gray-700 font-medium text-sm list-none m-0 p-0">
     <li className="hover:text-orange-500 cursor-pointer transition">
  <Link to="/" className="no-underline text-gray-700 hover:text-orange-500">🏠 Home</Link>
</li>
          <li className="hover:text-orange-500 cursor-pointer transition">
            <Link to="/about" className="no-underline text-gray-700 hover:text-orange-500">About</Link>
          </li>
          <li className="hover:text-orange-500 cursor-pointer transition">
            <Link to="/contact" className="no-underline text-gray-700 hover:text-orange-500">Contact</Link>
          </li>

          {/* ← now a clickable link */}
          <li id="cart-icon" className="hover:text-orange-500 cursor-pointer transition">
            <Link to="/cart" className="no-underline text-gray-700 hover:text-orange-500">
              🛒 Cart ({cartItems.length})
            </Link>
          </li>

          <li>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full transition duration-200"
              onClick={() => setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login")}
            >
              {btnNameReact}
            </button>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Header;