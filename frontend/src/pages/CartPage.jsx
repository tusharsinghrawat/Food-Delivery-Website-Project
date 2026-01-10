import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
const getItemImage = (image) => {
  const base = import.meta.env.BASE_URL;

  if (!image) return base + "images/placeholder.jpg";

  // full URL (cloudinary etc)
  if (image.startsWith("http")) return image;

  // "/images/..." → frontend public
  if (image.startsWith("/")) return base + image.slice(1);

  // "drinks/milkshake.jpg" OR "images/..."
  if (image.startsWith("images/")) return base + image;

  return base + "images/" + image;
};


const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalAmount,
    clearCart,
  } = useCart();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ✅ SAFE calculations
  const totalAmount = Number(getTotalAmount()) || 0;
  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const tax = Math.round(totalAmount * 0.05);
  const grandTotal = totalAmount + deliveryFee + tax;

  /* ===============================
     CHECKOUT (ONLY REDIRECT)
     ❌ NO BACKEND CALL HERE
  ============================== */
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=/checkout");
      return;
    }

    if (items.length === 0) return;

    navigate("/checkout");
  };

  /* ===============================
     EMPTY CART
  ============================== */
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Add some delicious food to your cart!
            </p>
            <Link to="/menu">
              <Button>
                Browse Menu
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ===============================
     CART PAGE
  ============================== */
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => {
                const price = Number(item.foodItem.price) || 0;
                const itemTotal = price * item.quantity;

                return (
                  <Card key={`${item.productId}-${index}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                        src={getItemImage(item.foodItem.image)}
                        alt={item.foodItem.name}
                        className="w-24 h-24 object-cover rounded-md"
                        onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                        import.meta.env.BASE_URL + "images/placeholder.jpg";
                        }}
                       />
                          
                          <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold">
                              {item.foodItem.name}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() =>
                                removeFromCart(item.productId)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    Math.max(
                                      1,
                                      item.quantity - 1
                                    )
                                  )
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>

                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>

                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <span className="font-bold text-primary">
                              ₹{itemTotal}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            {/* ORDER SUMMARY */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal
                    </span>
                    <span>₹{totalAmount}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Delivery Fee
                    </span>
                    <span>
                      {deliveryFee === 0
                        ? "FREE"
                        : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Tax (5%)
                    </span>
                    <span>₹{tax}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">
                      ₹{grandTotal}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
