import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productApi } from "../../api/services";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import HeroBanner from "../../components/product/HeroBanner";
import FilterSidebar from "../../components/product/FilterSidebar";
import ProductGrid from "../../components/product/ProductGrid";
import { useShop } from "../../context/ShopContext";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const { categories } = useShop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    categoryId: "",
    sortBy: "createdAt",
    direction: "desc",
    minPrice: "",
    maxPrice: ""
  });

  useEffect(() => {
    setLoading(true);
    productApi
      .getAll({
        page: 0,
        size: 12,
        search: searchParams.get("search") || undefined,
        categoryId: filters.categoryId || undefined,
        sortBy: filters.sortBy,
        direction: filters.direction,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined
      })
      .then((response) => setProducts(response.data.data.content))
      .catch((err) => setError(err.response?.data?.message || "Unable to load products"))
      .finally(() => setLoading(false));
  }, [filters, searchParams]);

  const handleChange = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <AppLayout>
      <div className="space-y-8">
        <HeroBanner />
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { value: "50K+", label: "Monthly discovery sessions" },
            { value: "24/7", label: "Cart and checkout availability" },
            { value: "Top-rated", label: "Products with review support" }
          ].map((item) => (
            <div key={item.label} className="glass-panel rounded-[2rem] p-6">
              <p className="text-3xl font-black text-brand-blue">{item.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{item.label}</p>
            </div>
          ))}
        </section>
        <div className="grid gap-6 lg:grid-cols-[290px_1fr]">
          <FilterSidebar categories={categories} filters={filters} onChange={handleChange} />
          <div>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-kicker">Discover</p>
                <h2 className="section-title mt-2">Featured products</h2>
              </div>
              <p className="text-sm text-slate-500">
                {searchParams.get("search") ? `Showing results for "${searchParams.get("search")}"` : "Browse curated picks, trending launches and best-value deals."}
              </p>
            </div>
            {loading ? <Loader label="Fetching products..." /> : error ? <ErrorState message={error} /> : <ProductGrid products={products} />}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
