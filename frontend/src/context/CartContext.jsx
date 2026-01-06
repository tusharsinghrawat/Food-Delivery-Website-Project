import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Create context
const CartContext = createContext(undefined);

// storage keys
const ORDERS_STORAGE_KEY = "orders";
const CART_ITEMS_STORAGE_KEY = "cart_items";

// ✅ MongoDB ObjectId validator
const isValidObjectId = (id) =>
  typeof id === "string" && id.length === 24;

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const { toast } = useToast();

  // 🔑 universal id helper
  const getFoodId = (food) => food?._id || food?.id;

  /* ===============================
     LOAD ORDERS FROM STORAGE
  ============================== */
  useEffect(() => {
    const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch {
        setOrders([]);
      }
    }
  }, []);

  /* ===============================
     SAVE ORDERS TO STORAGE
  ============================== */
  useEffect(() => {
    localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify(orders)
    );
  }, [orders]);

  /* ===============================
     LOAD CART ITEMS FROM STORAGE
     🔥 AUTO CLEAN INVALID ITEMS
  ============================== */
  useEffect(() => {
    const storedItems = localStorage.getItem(CART_ITEMS_STORAGE_KEY);
    if (storedItems) {
      try {
        const parsed = JSON.parse(storedItems);
        const cleaned = parsed.filter(
          (item) => isValidObjectId(item?.foodItem?._id)
        );
        setItems(cleaned);
      } catch {
        setItems([]);
      }
    }
  }, []);

  /* ===============================
     SAVE CART ITEMS TO STORAGE
  ============================== */
  useEffect(() => {
    localStorage.setItem(
      CART_ITEMS_STORAGE_KEY,
      JSON.stringify(items)
    );
  }, [items]);

  /* ===============================
     ADD TO CART ✅ FINAL FIX
  ============================== */
  const addToCart = (food) => {
    const foodId = getFoodId(food);

    // 🚫 BLOCK demo / invalid items
    if (!food || !foodId) {
  toast({
    title: "Item not orderable",
    description: "Invalid item",
    variant: "destructive",
  });
  return;
}


    setItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === foodId
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === foodId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: foodId,
          foodItem: {
            _id: foodId,
            name: food.name,
            price: food.price,
            image: food.image,
          },
          quantity: 1,
        },
      ];
    });

    toast({
      title: "Added to Cart",
      description: `${food.name} added to your cart`,
    });
  };

  /* ===============================
     PLACE ORDER (FRONTEND DEMO)
  ============================== */
  const placeOrder = () => {
    if (items.length === 0) return;

    const newOrder = {
      orderId: Date.now().toString(),
      items: items.map((item) => ({
        ...item,
        foodItem: { ...item.foodItem },
      })),
      totalAmount: getTotalAmount(),
      status: "placed",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, newOrder]);
    setItems([]);

    toast({
      title: "Order Placed",
      description: "Your order has been saved successfully",
    });
  };

  /* ===============================
     REMOVE FROM CART
  ============================== */
  const removeFromCart = (foodId) => {
    setItems((prev) =>
      prev.filter((item) => item.productId !== foodId)
    );

    toast({
      title: "Removed from Cart",
      description: "Item removed from your cart",
    });
  };

  /* ===============================
     UPDATE QUANTITY
  ============================== */
  const updateQuantity = (foodId, quantity) => {
    if (quantity < 1) {
      removeFromCart(foodId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === foodId
          ? { ...item, quantity }
          : item
      )
    );
  };

  /* ===============================
     CLEAR CART
  ============================== */
  const clearCart = () => {
    setItems([]);
  };

  /* ===============================
     TOTAL AMOUNT
  ============================== */
  const getTotalAmount = () => {
    return items.reduce(
      (total, item) =>
        total + item.foodItem.price * item.quantity,
      0
    );
  };

  /* ===============================
     TOTAL ITEMS
  ============================== */
  const getTotalItems = () => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  /* ===============================
     UI HELPERS
  ============================== */
  const isInCart = (foodId) => {
    return items.some((item) => item.productId === foodId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        getTotalAmount,
        getTotalItems,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
