const withVegBadge = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="relative">
        {props.resData?.info?.veg && (
          <div className="absolute top-2 left-2 z-10 bg-white text-green-600 text-xs font-semibold px-2 py-0.5 rounded-md shadow flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
            Veg
          </div>
        )}
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withVegBadge;