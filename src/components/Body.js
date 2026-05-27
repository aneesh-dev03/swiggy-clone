import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import withVegBadge from "./withVegBadge";
const VegRestaurantCard = withVegBadge(RestaurantCard);
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchtext] = useState("");

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.6691661&lng=76.5369979&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    const restaurants =
      json?.data?.cards?.find(
        (card) =>
          card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    setListOfRestaurants(restaurants);
    setFilteredRestaurant(restaurants);
  };

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="py-4 px-4">
      <div className="flex flex-wrap items-center gap-3 mb-6">

        <div className="flex items-center gap-2">
          <input
            type="text"
            className="border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
            value={searchText}
            onChange={(e) => {
              setSearchtext(e.target.value);
            }}
          />
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full transition"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filtered);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="border border-gray-300 hover:border-orange-500 hover:text-orange-500 text-gray-700 text-sm font-medium px-5 py-2 rounded-full transition"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating >= 4.3
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRestaurant.length === 0 ? (
          <h2 className="col-span-full text-center text-gray-500 text-lg mt-10">
            😔 Sorry, no good restaurant available
          </h2>
        ) : (
        filteredRestaurant.map((restaurant) => (
  <Link
    key={restaurant.info.id}
    to={`/menu/${restaurant.info.id}`}
  >
    {restaurant.info.veg ? (
      <VegRestaurantCard resData={restaurant} />
    ) : (
      <RestaurantCard resData={restaurant} />
    )}
  </Link>
))
        )}
      </div>
    </div>
  );
};

export default Body;