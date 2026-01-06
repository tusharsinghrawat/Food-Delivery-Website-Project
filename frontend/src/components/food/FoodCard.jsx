import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Leaf } from "lucide-react";
import { useCart } from "@/context/CartContext";

const BACKEND_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  /* ===============================
     ✅ FINAL ADD TO CART (STABLE)
     ✔ frontend + backend items allowed
     ✔ click NEVER blocked
  ============================== */
  const handleAddToCart = (e) => {
    e.stopPropagation(); // 🔥 click bug fix

    if (!food) {
      console.error("Food missing");
      return;
    }

    // ⚠️ just info, NOT blocking
    if (!food._id) {
      console.warn("Frontend-only item added:", food.name);
    }

    // ✅ clone object (important)
    addToCart({ ...food });
  };

  /* ===============================
     IMAGE HANDLER (UNCHANGED)
  ============================== */
  const getLocalSrc = (image) => {
    if (!image) return "/images/placeholder.jpg";
    if (image.startsWith("/")) return image;
    return `/images/${image}`;
  };

  const getBackendSrc = (image) => {
    if (!image) return null;
    return `${BACKEND_URL}/uploads/${image}`;
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getLocalSrc(food.image)}
          alt={food.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
          onLoad={(e) => {
            const backendSrc = getBackendSrc(food.image);
            if (!backendSrc) return;

            const img = new Image();
            img.src = backendSrc;
            img.onload = () => {
              e.currentTarget.src = backendSrc;
            };
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/placeholder.jpg";
          }}
        />

        {food.isVeg && (
          <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">
            <Leaf className="h-3 w-3 mr-1" />
            Veg
          </Badge>
        )}

        {!food.isAvailable && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-muted-foreground font-medium">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold line-clamp-1">{food.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{food.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {food.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ₹{food.price}
          </span>

          <Button
            type="button"
            size="sm"
            onClick={handleAddToCart}
            disabled={!food.isAvailable}
            className="
              transition-all duration-300
              hover:scale-105
              hover:bg-primary/90
              hover:shadow-lg
              active:scale-95
            "
          >
            <Plus className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:rotate-90" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;


