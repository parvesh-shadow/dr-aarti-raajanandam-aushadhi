import { Minus, Plus, Trash2 } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

export default function CartItem({ item, onQtyChange, onRemove }) {
  const { id, category, name, description, pack, price, qty, image, inStock = true } = item;

  return (
    <article className="relative flex flex-col gap-4 border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
      {/* Image */}
      <div className="relative h-36 w-full shrink-0 sm:h-36 sm:w-34">
        {category && (
          <span className="absolute left-0 top-0 z-10 rounded-xs bg-gray-100 px-2 py-0.5 text-xs text-black">
            {category}
          </span>
        )}
        <ImagePlaceholder
          src={image}
          alt={name}
          label="Product"
          sizes="128px"
          imageClassName="object-cover"
          className="h-full w-full bg-white"
        />
        {inStock && (
          <span className="absolute bottom-0 bg-white rounded-xs px-1 py-0.5 right-0 z-10 text-xs sm:textsm font-medium text-black">
            In Stock
          </span>
        )}
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <h2 className="pr-8 text-base xl:text-[22px]  font-semibold text-black">{name}</h2>
        <p className="mt-2 line-clamp-2 text-xs text-gray-800 sm:text-sm">
          {description}
        </p>
        <p className="mt-1 text-xs text-black sm:text-sm">{pack}</p>
      </div>

      {/* Price + quantity */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <p className="text-base xl:text-2xl font-medium text-black">
          ₹{(price * qty).toLocaleString("en-IN")}
        </p>

        <div className="flex items-center border border-gray-300">
          <button
            type="button"
            onClick={() => onQtyChange(id, qty - 1)}
            aria-label="Decrease quantity"
            className="p-2 transition-colors hover:text-[#A88C35]"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-10 text-center text-xs sm:text-sm" aria-live="polite">
            {String(qty).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => onQtyChange(id, qty + 1)}
            aria-label="Increase quantity"
            className="p-2 transition-colors hover:text-[#A88C35]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(id)}
        aria-label={`Remove ${name} from cart`}
        className="absolute right-3 top-3 text-red-500 transition-colors hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </article>
  );
}