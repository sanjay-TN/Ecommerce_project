import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (!products.length) {
    return (
      <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
        <p className="text-lg font-semibold">No products found</p>
        <p className="mt-2 text-sm text-slate-500">Try adjusting filters, search text or category selection.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
