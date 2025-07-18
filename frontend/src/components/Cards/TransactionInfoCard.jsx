import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

function TransactionInfoCard({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) {
  const getAmountStyles = () => {
    return type === "income"
      ? "bg-green-50 text-green-500"
      : "bg-red-50 text-red-500";
  };

  return (
    <div
      className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60
    "
    >
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils className="" />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-xs lg:text-sm text-gray-700 font-medium">
            {title}
          </p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center  gap-2 ">
          {!hideDeleteBtn && (
            <button
              className="text-white bg-red-300 p-1.5 rounded-full hover:text-red-500 opacity-0 group-hover:opacity-100  cursor-pointer transition duration-300"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center justify-center gap-2 md:px-3 py-1.5 rounded-md min-w-24 whitespace-nowrap ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            <div className="text-xs md:text-sm lg:text-base">
              {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfoCard;
