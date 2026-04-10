import { useEffect, useState } from "react";
import { adminApi, categoryApi, orderApi, productApi } from "../../api/services";
import AppLayout from "../../components/layout/AppLayout";

const emptyProduct = {
  name: "",
  sku: "",
  description: "",
  price: "",
  originalPrice: "",
  stock: "",
  brand: "",
  featured: false,
  categoryId: "",
  thumbnail: "",
  imageUrls: []
};

const apiOrigin = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api").replace(/\/api$/, "");

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const load = async () => {
    const [dashboard, productsRes, categoriesRes, ordersRes, usersRes] = await Promise.all([
      adminApi.dashboard(),
      productApi.getAll({ page: 0, size: 50 }),
      categoryApi.getAll(),
      orderApi.allOrders(),
      adminApi.users()
    ]);
    setMetrics(dashboard.data.data);
    setProducts(productsRes.data.data.content);
    setCategories(categoriesRes.data.data);
    setOrders(ordersRes.data.data);
    setUsers(usersRes.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const createCategory = async (event) => {
    event.preventDefault();
    if (editingCategoryId) {
      await categoryApi.update(editingCategoryId, categoryForm);
    } else {
      await categoryApi.create(categoryForm);
    }
    setCategoryForm({ name: "", description: "" });
    setEditingCategoryId(null);
    load();
  };

  const createProduct = async (event) => {
    event.preventDefault();
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice),
      stock: Number(productForm.stock),
      categoryId: Number(productForm.categoryId),
      imageUrls: productForm.thumbnail ? [productForm.thumbnail] : []
    };
    if (editingProductId) {
      await productApi.update(editingProductId, payload);
    } else {
      await productApi.create(payload);
    }
    setProductForm(emptyProduct);
    setEditingProductId(null);
    load();
  };

  const updateOrderStatus = async (orderId, status) => {
    await orderApi.updateStatus(orderId, status);
    load();
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const response = await productApi.upload(formData);
    setProductForm((state) => ({ ...state, thumbnail: `${apiOrigin}${response.data.data}` }));
  };

  const editProduct = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      brand: product.brand || "",
      featured: product.featured,
      categoryId: categories.find((category) => category.name === product.categoryName)?.id || "",
      thumbnail: product.thumbnail,
      imageUrls: product.images || []
    });
  };

  const editCategory = (category) => {
    setEditingCategoryId(category.id);
    setCategoryForm({ name: category.name, description: category.description || "" });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <section className="grid gap-4 md:grid-cols-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="rounded-[2rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{key}</p>
              <p className="mt-2 text-3xl font-black">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={createCategory} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold">{editingCategoryId ? "Update Category" : "Create Category"}</h2>
            <div className="mt-4 space-y-3">
              <input value={categoryForm.name} onChange={(e) => setCategoryForm((s) => ({ ...s, name: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none" placeholder="Category name" />
              <textarea value={categoryForm.description} onChange={(e) => setCategoryForm((s) => ({ ...s, description: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none" rows="4" placeholder="Description" />
              <button className="rounded-2xl bg-brand-blue px-5 py-3 font-semibold text-white">{editingCategoryId ? "Update Category" : "Save Category"}</button>
            </div>
            <div className="mt-6 space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3">
                  <div>
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-xs text-slate-500">{category.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => editCategory(category)} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold">Edit</button>
                    <button type="button" onClick={async () => { await categoryApi.remove(category.id); load(); }} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </form>

          <form onSubmit={createProduct} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold">{editingProductId ? "Update Product" : "Create Product"}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {["name", "sku", "brand", "thumbnail", "price", "originalPrice", "stock"].map((key) => (
                <input key={key} value={productForm[key]} onChange={(e) => setProductForm((s) => ({ ...s, [key]: e.target.value }))} className="rounded-xl border border-slate-200 px-4 py-3 outline-none" placeholder={key} />
              ))}
              <select value={productForm.categoryId} onChange={(e) => setProductForm((s) => ({ ...s, categoryId: e.target.value }))} className="rounded-xl border border-slate-200 px-4 py-3 outline-none">
                <option value="">Select category</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3">
                <input type="checkbox" checked={productForm.featured} onChange={(e) => setProductForm((s) => ({ ...s, featured: e.target.checked }))} />
                Featured
              </label>
            </div>
            <input type="file" accept="image/*" onChange={uploadImage} className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none" />
            <textarea value={productForm.description} onChange={(e) => setProductForm((s) => ({ ...s, description: e.target.value }))} className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none" rows="4" placeholder="Description" />
            <button className="mt-3 rounded-2xl bg-brand-yellow px-5 py-3 font-semibold text-brand-ink">{editingProductId ? "Update Product" : "Save Product"}</button>
          </form>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold">Orders</h2>
            <div className="mt-4 space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="font-bold">{order.orderNumber}</p>
                      <p className="text-sm text-slate-500">{order.customerName} • Rs. {order.totalAmount}</p>
                    </div>
                    <select value={order.orderStatus} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 outline-none">
                      {["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"].map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold">Users</h2>
            <div className="mt-4 space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                  <div>
                    <p className="font-bold">{user.fullName}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{user.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold">Product Inventory</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">SKU</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-slate-100">
                    <td className="py-3">{product.name}</td>
                    <td className="py-3">{product.sku}</td>
                    <td className="py-3">Rs. {product.price}</td>
                    <td className="py-3">{product.stock}</td>
                    <td className="py-3">{product.categoryName}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => editProduct(product)} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold">Edit</button>
                        <button type="button" onClick={async () => { await productApi.remove(product.id); load(); }} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
