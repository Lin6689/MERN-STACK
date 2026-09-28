import ProductCard from "./ProductCard";

export default function ProductList({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const productId = product._id || product.id || index;

        return (
          <ProductCard
            key={productId}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isInWishlist={wishlist.some(
              (item) => (item._id || item.id) === (product._id || product.id)
            )}
          />
        );
      })}
    </div>
  );
}