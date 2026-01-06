import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FoodCard from '@/components/food/FoodCard';
import { restaurants, foodItems } from '@/data/mockData';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const restaurantFoods = foodItems.filter(
    (f) => f.restaurantId === id
  );

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Restaurant not found
            </h1>
            <Link to="/restaurants">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Restaurants
              </Button>
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

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="container">
              <Link
                to="/restaurants"
                className="inline-flex items-center text-sm mb-4 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Restaurants
              </Link>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="container py-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">
                  {restaurant.name}
                </h1>
                {!restaurant.isOpen && (
                  <Badge variant="destructive">
                    Closed
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {restaurant.cuisine.map((c, i) => (
                  <Badge key={i} variant="secondary">
                    {c}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-600 text-white">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurant.address}</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                Minimum order:{' '}
                <span className="font-semibold text-foreground">
                  ₹{restaurant.minOrder}
                </span>
              </p>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Menu
            </h2>
            {restaurantFoods.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {restaurantFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No menu items available for this restaurant
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;
