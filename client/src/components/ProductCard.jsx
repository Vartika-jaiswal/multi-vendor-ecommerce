import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";


const ProductCard = ({
  product,
  onEdit,
  onDelete,
}) => {

  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">

      {/* IMAGE */}

      <img
        src={`http://localhost:8000/${product.image}`}

        alt={product.title}

        className="w-full h-48 object-cover"
      />


      <div className="p-4">

        {/* TOP */}

        <div className="flex items-start justify-between gap-3">

          <div>

            <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
              {product.title}
            </h2>

            <p className="text-gray-500 text-xs mt-1">
              {product.category}
            </p>

          </div>


          <div className="bg-[#F3F4FF] text-[#6D5DF6] px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap">

            {product.stock} Left

          </div>

        </div>


        {/* DESCRIPTION */}

        <p className="text-gray-500 mt-3 text-sm line-clamp-2 min-h-[40px]">
          {product.description}
        </p>


        {/* BOTTOM */}

        <div className="flex items-end justify-between mt-4">

          <div>

            <h3 className="text-2xl font-bold text-[#6D5DF6]">
              ₹{product.price}
            </h3>

            {product.discount > 0 && (

              <p className="text-xs text-green-500 mt-1 font-medium">
                {product.discount}% OFF
              </p>

            )}

          </div>


          {/* ACTIONS */}

          <div className="flex gap-2">

            {/* EDIT */}

            <button
              onClick={() =>
                onEdit(product)
              }

              className="w-10 h-10 rounded-xl bg-[#F3F4FF] text-[#6D5DF6] flex items-center justify-center hover:bg-[#6D5DF6] hover:text-white transition-all duration-300"
            >
              <FaEdit size={14} />
            </button>


            {/* DELETE */}

            <button
              onClick={() =>
                onDelete(product._id)
              }

              className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <FaTrash size={14} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;