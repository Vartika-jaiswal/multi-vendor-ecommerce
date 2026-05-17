const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <div className="bg-white rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3 text-gray-800">
            {value}
          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatCard;