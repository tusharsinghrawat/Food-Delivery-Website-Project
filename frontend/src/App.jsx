import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import OrdersPage from "./pages/OrdersPage";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/CheckoutPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} /> {/* ✅ FIX */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
