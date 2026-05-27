import { useParams } from "react-router-dom";
import mockMenuData from "../utilis/mockMenuData";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utilis/cartSlice";

const flyToCart = (buttonEl) => {
  const cartIcon = document.getElementById("cart-icon");
  if (!cartIcon) return;

  // Get positions
  const btnRect = buttonEl.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  // Create the flying dot
  const dot = document.createElement("div");
  dot.innerText = "🛒";
  dot.style.cssText = `
    position: fixed;
    left: ${btnRect.left + btnRect.width / 2}px;
    top: ${btnRect.top + btnRect.height / 2}px;
    font-size: 20px;
    z-index: 9999;
    pointer-events: none;
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(1);
    opacity: 1;
  `;
  document.body.appendChild(dot);

  // Trigger fly after small delay (so transition kicks in)
  setTimeout(() => {
    dot.style.left = `${cartRect.left + cartRect.width / 2}px`;
    dot.style.top = `${cartRect.top + cartRect.height / 2}px`;
    dot.style.transform = "scale(0.3)";
    dot.style.opacity = "0";
  }, 10);

  // Remove dot after animation
  setTimeout(() => {
    document.body.removeChild(dot);
  }, 800);
};

const RestaurantMenu = () => {
  const { id } = useParams();
  const [openCategory, setOpenCategory] = useState(null);
  const [addedItems, setAddedItems] = useState({});
  const dispatch = useDispatch();

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleAddItem = (e, item) => {
dispatch(addItem({ item, restaurantName: mockMenuData.name }))
    flyToCart(e.currentTarget);

    // Button feedback — briefly show "Added ✓"
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">

      {/* Restaurant Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{mockMenuData.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{mockMenuData.cuisines.join(", ")}</p>
        <div className="flex items-center gap-4 mt-3 text-sm">
          <span className="bg-green-600 text-white font-semibold px-2 py-0.5 rounded text-xs">
            ⭐ {mockMenuData.avgRating}
          </span>
          <span className="text-gray-600">🕐 {mockMenuData.deliveryTime} mins</span>
          <span className="text-gray-600">💰 {mockMenuData.costForTwo}</span>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Menu</h2>

        {mockMenuData.menu.map((section) => (
          <div key={section.category} className="mb-2 border-b last:border-none">

            <button
              className="w-full flex items-center justify-between py-3 text-left"
              onClick={() => toggleCategory(section.category)}
            >
              <span className="font-semibold text-gray-800">
                {section.category} ({section.items.length})
              </span>
              <span className="text-gray-400 text-lg">
                {openCategory === section.category ? "▲" : "▼"}
              </span>
            </button>

            {openCategory === section.category && (
              <ul className="divide-y divide-gray-100 mb-2">
                {section.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-4 gap-4">

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-3 h-3 rounded-sm border-2 flex items-center justify-center ${item.isVeg ? "border-green-600" : "border-red-600"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`}></span>
                        </span>
                        <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                      </div>
                      <p className="text-gray-700 font-bold text-sm">₹{item.price}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.description}</p>
                    </div>

                    {/* ADD button with fly animation */}
                    <button
                      className={`border text-xs font-bold px-4 py-1.5 rounded-lg transition duration-200 whitespace-nowrap
                        ${addedItems[item.id]
                          ? "border-green-500 text-green-500 scale-95"
                          : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                        }`}
                      onClick={(e) => handleAddItem(e, item)}
                    >
                      {addedItems[item.id] ? "Added ✓" : "ADD +"}
                    </button>

                  </li>
                ))}
              </ul>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};

export default RestaurantMenu;