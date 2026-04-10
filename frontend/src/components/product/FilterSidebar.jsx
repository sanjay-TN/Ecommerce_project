export default function FilterSidebar({ categories, filters, onChange }) {
  return (
    <aside className="glass-panel sticky top-32 rounded-[2rem] p-6">
      <p className="section-kicker">Refine Search</p>
      <h3 className="mt-3 text-2xl font-black">Filters</h3>
      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">Category</label>
          <select
            value={filters.categoryId}
            onChange={(event) => onChange("categoryId", event.target.value)}
            className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(event) => onChange("sortBy", event.target.value)}
            className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 outline-none"
          >
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">Direction</label>
          <select
            value={filters.direction}
            onChange={(event) => onChange("direction", event.target.value)}
            className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 outline-none"
          >
            <option value="desc">High to low</option>
            <option value="asc">Low to high</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              value={filters.minPrice}
              onChange={(event) => onChange("minPrice", event.target.value)}
              className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 outline-none"
              placeholder="Min"
            />
            <input
              value={filters.maxPrice}
              onChange={(event) => onChange("maxPrice", event.target.value)}
              className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 outline-none"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
