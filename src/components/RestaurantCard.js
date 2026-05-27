import { CDN_URL } from "../utilis/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, deliveryTime } = resData?.info;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer group">
      
      {/* Image */}
      <div className="overflow-hidden">
        <img
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          alt={name}
          src={cloudinaryImageId ? CDN_URL + cloudinaryImageId : "https://via.placeholder.com/300x200"}
          onError={(e) => { e.target.src = "https://via.placeholder.com/300x200"; }}
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-bold text-gray-800 text-base truncate">{name}</h3>
        <p className="text-gray-500 text-xs truncate mt-0.5">{cuisines.join(", ")}</p>

        {/* Rating & Time */}
        <div className="flex items-center gap-2 mt-2 text-sm">
          <span className="bg-green-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
            ⭐ {avgRating}
          </span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-600 text-xs">{deliveryTime} mins</span>
        </div>

        {/* Cost */}
        <p className="text-gray-500 text-xs mt-1">{costForTwo}</p>
      </div>

    </div>
  );
};

export default RestaurantCard;