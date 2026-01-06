import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />

          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive">Currently Closed</Badge>
            </div>
          )}

          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="bg-background/90">
              <Clock className="h-3 w-3 mr-1" />
              {restaurant.deliveryTime}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">
              {restaurant.name}
            </h3>

            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-600 text-white text-sm">
              <Star className="h-3 w-3 fill-current" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {restaurant.cuisine.slice(0, 3).map((item, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">
              {restaurant.address}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mt-1">
            Min. order: ₹{restaurant.minOrder}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
