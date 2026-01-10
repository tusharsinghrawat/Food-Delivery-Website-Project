import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { MapPin, CreditCard, CheckCircle } from "lucide-react";

const CheckoutPage = () => {
  const { items, getTotalAmount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  /* ===============================
     AUTH + CART GUARD
  ============================== */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=/checkout");
      return;
    }
    if (!orderPlaced && items.length === 0 && !isProcessing) {
      navigate("/cart");
    }
  }, [isAuthenticated, items, orderPlaced, isProcessing, navigate]);

  /* ===============================
     AUTO REDIRECT AFTER SUCCESS
  ============================== */
  useEffect(() => {
    if (orderPlaced) {
      navigate("/orders");
    }
  }, [orderPlaced, navigate]);

  // SAFE calculations
  const subtotal = Number(getTotalAmount()) || 0;
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleInputChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  /* ===============================
     PLACE ORDER (BACKEND SAFE)
  ============================== */
  const handlePlaceOrder = async () => {
    if (isProcessing) return;

    if (
      !address.street ||
      !address.city ||
      !address.pincode ||
      !address.phone ||
      address.phone.length < 10 ||
      address.pincode.length < 6
    ) {
      toast({
        title: "Invalid Address",
        description: "Please fill valid address details",
        variant: "destructive",
      });
      return;
    }

    // Normalize cart items for backend
    let normalizedItems;
    try {
      normalizedItems = items.map((item) => {
  if (!item.foodItem || !item.foodItem._id) {
    throw new Error("Invalid cart item");
  }

  return {
    food: String(item.foodItem._id),
    name: item.foodItem.name,       // ✅ ADD THIS
    price: item.foodItem.price,
    image: item.foodItem.image || "",      // ✅ ADD THIS
    quantity: Number(item.quantity),
  };
});

    } catch {
      toast({
        title: "Cart Error",
        description: "Some cart items are invalid. Please re-add them.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        items: normalizedItems,
        totalAmount: Number(total.toFixed(2)),
        deliveryAddress: `${address.fullName}, ${address.phone}, ${address.street}, ${address.city}, ${address.state} - ${address.pincode}`,
        paymentMethod,
      };

      const res = await api.post("/orders", orderData);

      if (!res?.data?.order?._id && !res?.data?._id) {
        throw new Error("Order not created");
      }

      clearCart();
      setOrderPlaced(true);

      toast({
        title: "Order Placed Successfully 🎉",
        description: "Redirecting to your orders...",
      });
    } catch (error) {
      toast({
        title: "Order Failed",
        description:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  /* ===============================
     SUCCESS SCREEN
  ============================== */
  if (orderPlaced) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold mt-4">
                Order Confirmed!
              </h2>
              <p className="text-muted-foreground mt-2">
                Redirecting to your orders...
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  /* ===============================
     CHECKOUT UI
  ============================== */
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Address */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input name="fullName" value={address.fullName} onChange={handleInputChange} placeholder="Full Name" />
                <Input name="phone" value={address.phone} onChange={handleInputChange} placeholder="Phone" />
                <Input name="street" value={address.street} onChange={handleInputChange} placeholder="Street" />
                <div className="grid grid-cols-3 gap-3">
                  <Input name="city" value={address.city} onChange={handleInputChange} placeholder="City" />
                  <Input name="state" value={address.state} onChange={handleInputChange} placeholder="State" />
                  <Input name="pincode" value={address.pincode} onChange={handleInputChange} placeholder="Pincode" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="cod" />
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="upi" />
                    <span>UPI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="card" />
                    <span>Card</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => {
                const price = Number(item.foodItem.price) || 0;
                return (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.foodItem.name} × {item.quantity}</span>
                    <span>₹{price * item.quantity}</span>
                  </div>
                );
              })}

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
