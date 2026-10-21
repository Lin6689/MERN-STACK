import ProductCard from "./ProductCard";

export default function ProductList({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  ratingMap = {},
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlist.some(
            (w) => (w._id || w.id) === (p._id || p.id)
          )}
          rating={ratingMap[p._id]}
        />
      ))}
    </div>
  );
}