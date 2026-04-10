import { PackageCheck, PackageX } from "lucide-react";
import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/common/Loader";
import { orderApi } from "../../api/services";

const cancellableStatuses = ["PENDING", "CONFIRMED", "PACKED"];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyOrderId, setBusyOrderId] = useState(null);
  const [message, setMessage] = useState("");

  const loadOrders = () => {
    return orderApi.myOrders().then((response) => setOrders(response.data.data));
  };

  useEffect(() => {
    loadOrders().finally(() => setLoading(false));
  }, []);

  const cancelOrder = async (orderId) => {
    setBusyOrderId(orderId);
    setMessage("");
    try {
      const response = await orderApi.cancel(orderId);
      setOrders((current) => current.map((order) => (order.id === orderId ? response.data.data : order)));
      setMessage(`Order ${response.data.data.orderNumber} was cancelled successfully.`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to cancel this order.");
    } finally {
      setBusyOrderId(null);
    }
  };

  return (
    <AppLayout>
      {loading ? <Loader label="Fetching your orders..." /> : (
        <div className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Purchase timeline</p>
              <h1 className="section-title mt-2">Your orders</h1>
            </div>
            <p className="text-sm text-slate-500">Track progress, review purchases, and cancel items before shipment if plans change.</p>
          </div>

          {message && <div className="glass-panel rounded-[1.7rem] p-4 text-sm font-medium text-brand-ink">{message}</div>}

          {orders.map((order) => {
            const canCancel = cancellableStatuses.includes(order.orderStatus);

            return (
              <div key={order.id} className="glass-panel rounded-[2rem] p-6">
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-black">{order.orderNumber}</h2>
                    <p className="mt-1 text-sm text-slate-500">{new Date(order.createdAt).toLocaleString()}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Payment via <span className="font-semibold text-slate-900">{order.paymentMethod}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className={`rounded-full px-3 py-1 font-semibold ${order.orderStatus === "CANCELLED" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-brand-blue"}`}>
                      {order.orderStatus}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {order.items.map((item) => (
                    <div key={`${order.id}-${item.productId}`} className="flex items-center justify-between rounded-[1.4rem] border border-slate-100 bg-white/70 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                          {order.orderStatus === "CANCELLED" ? <PackageX size={20} /> : <PackageCheck size={20} />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{item.productName}</p>
                          <p className="text-sm text-slate-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold">Rs. {item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-600">
                    <p>Deliver to: <span className="font-semibold text-slate-900">{order.shippingAddress.city}, {order.shippingAddress.state}</span></p>
                    <p>Total payable: <span className="text-lg font-black text-slate-900">Rs. {order.totalAmount}</span></p>
                  </div>

                  <div className="flex items-center gap-3">
                    {canCancel && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        disabled={busyOrderId === order.id}
                        className="rounded-2xl bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {busyOrderId === order.id ? "Cancelling..." : "Cancel Order"}
                      </button>
                    )}
                    {!canCancel && order.orderStatus !== "CANCELLED" && (
                      <span className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-medium text-slate-500">
                        Cancellation unavailable after shipment
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {!orders.length && <div className="glass-panel rounded-[2rem] p-10 text-center">No orders yet.</div>}
        </div>
      )}
    </AppLayout>
  );
}
