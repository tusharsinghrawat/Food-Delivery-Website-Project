import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

/* ===============================
   STATUS CONFIG
================================ */
const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-500",
    icon: Clock,
    message: "Order received. Waiting for confirmation 🕒",
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-500",
    icon: CheckCircle,
    message: "Order confirmed by restaurant ✅",
  },
  preparing: {
    label: "Preparing",
    color: "bg-orange-500",
    icon: Package,
    message: "Your food is being prepared 🍳",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "bg-purple-500",
    icon: Truck,
    message: "Delivery partner is on the way 🚴",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-600",
    icon: CheckCircle,
    message: "Order delivered successfully 🎉",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-destructive",
    icon: XCircle,
    message: "Order was cancelled ❌",
  },
};

/* ===============================
   ORDER CARD
================================ */
const OrderCard = ({ order, onCancel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const normalizedStatus = (order.status || "pending").toLowerCase();
  const status = statusConfig[normalizedStatus] || statusConfig.pending;
  const StatusIcon = status.icon;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canCancel =
    normalizedStatus === "pending" || normalizedStatus === "confirmed";

  const handleCancel = async () => {
    if (isCancelling) return;
    setIsCancelling(true);
    await onCancel(order._id);
    setIsCancelling(false);
  };

  /* ===============================
     ✅ IMAGE HANDLER (GITHUB PAGES SAFE)
  ============================== */
  const getItemImage = (image) => {
    const base = import.meta.env.BASE_URL;

    if (!image) return `${base}images/placeholder.jpg`;

    // backend full URL
    if (image.startsWith("http")) return image;

    // absolute local path
    if (image.startsWith("/")) return `${base}${image.slice(1)}`;

    // local public/images
    return `${base}images/${image}`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              Order #{order._id?.slice(-6)}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <Badge className={`${status.color} text-white`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* SUMMARY */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">
            {order.items?.length || 0} item
            {order.items?.length > 1 ? "s" : ""}
          </span>
          <span className="font-bold text-primary">
            ₹{Number(order.totalAmount) || 0}
          </span>
        </div>

        {/* PAYMENT */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <CreditCard className="h-4 w-4" />
          <span className="capitalize">
            Payment: {order.paymentMethod || "COD"}
          </span>
        </div>

        {/* STATUS MESSAGE */}
        <p className="text-sm font-medium text-primary mb-4">
          {status.message}
        </p>

        {/* ADDRESS */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mt-0.5" />
          <span>{order.deliveryAddress || "-"}</span>
        </div>

        {/* CANCEL */}
        {canCancel && (
          <Button
            variant="destructive"
            className="w-full mb-3"
            onClick={handleCancel}
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Cancel Order"}
          </Button>
        )}

        {/* TOGGLE */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Hide Details <ChevronUp className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              View Details <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>

        {/* DETAILS */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t space-y-3">
            {order.items && order.items.length > 0 ? (
              order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 text-sm"
                >
                  <img
                    src={getItemImage(item.image || item.foodItem?.image)}
                    alt={item.name}
                    className="w-14 h-14 rounded object-cover border"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getItemImage();
                    }}
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{(Number(item.price) || 0) * item.quantity}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No items found
              </p>
            )}

            <Separator />

            <Link to="/menu">
              <Button variant="outline" className="w-full">
                Reorder
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/* ===============================
   ORDERS PAGE
================================ */
const OrdersPage = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Order fetch error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await api.put(`/orders/cancel/${orderId}`);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.error || "Cancel failed");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    fetchOrders();
    intervalRef.current = setInterval(fetchOrders, 5000);

    return () => clearInterval(intervalRef.current);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">
              Please login to view orders
            </h1>
            <Link to="/auth?redirect=/orders">
              <Button>Login</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">My Orders</h1>

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onCancel={cancelOrder}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  No orders yet
                </h2>
                <Link to="/menu">
                  <Button>Browse Menu</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;
