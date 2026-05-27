import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const url = `http://localhost:8010/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.5379&lng=91.4950&restaurantId=${id}`;
      const data = await fetch(url);
      const text = await data.text();

      if (!text || text.trim() === "") {
        setError("Swiggy returned empty response — needs real browser cookies");
        return;
      }

      const json = JSON.parse(text);
      setRestaurant(json?.data?.cards[0]?.card?.card?.info);

      const itemCards =
        json?.data?.cards
          ?.find((c) => c?.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
            (c) => c?.card?.card?.itemCards
          )?.card?.card?.itemCards || [];

      setMenuItems(itemCards);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <p className="text-red-500 font-medium text-lg">⚠️ {error}</p>
    </div>
  );

  if (!restaurant) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading menu...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">

      {/* Restaurant Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{restaurant.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{restaurant.cuisines?.join(", ")}</p>

        <div className="flex items-center gap-4 mt-3 text-sm">
          <span className="bg-green-600 text-white font-semibold px-2 py-0.5 rounded text-xs">
            ⭐ {restaurant.avgRating}
          </span>
          <span className="text-gray-600">🕐 {restaurant.sla?.deliveryTime} mins</span>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Menu</h2>

        {menuItems.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No items found</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {menuItems.map((item) => (
              <li key={item.card.info.id} className="flex items-center justify-between py-4 gap-4">
                
                {/* Item Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{item.card.info.name}</h3>
                  {item.card.info.description && (
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{item.card.info.description}</p>
                  )}
                  <p className="text-gray-700 font-bold text-sm mt-1">
                    ₹{item.card.info.price / 100}
                  </p>
                </div>

                {/* Add Button */}
                <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-xs font-bold px-4 py-1.5 rounded-lg transition duration-200">
                  ADD
                </button>

              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default RestaurantMenu;