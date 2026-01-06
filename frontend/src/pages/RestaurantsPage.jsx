import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { restaurants } from '@/data/mockData';

const RestaurantsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  // Get unique cuisines
  const allCuisines = [...new Set(restaurants.flatMap((r) => r.cuisine))];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCuisine = !selectedCuisine || restaurant.cuisine.includes(selectedCuisine);
    const matchesOpen = !showOpenOnly || restaurant.isOpen;
    return matchesSearch && matchesCuisine && matchesOpen;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Restaurants</h1>
            <p className="text-muted-foreground">
              Discover the best restaurants near you
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge
              variant={showOpenOnly ? 'default' : 'outline'}
              className="cursor-pointer text-sm px-4 py-2 self-start"
              onClick={() => setShowOpenOnly(!showOpenOnly)}
            >
              <Star className="h-3 w-3 mr-1" />
              Open Now
            </Badge>
          </div>

          {/* Cuisine Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge
              variant={!selectedCuisine ? 'default' : 'outline'}
              className="cursor-pointer text-sm px-3 py-1"
              onClick={() => setSelectedCuisine('')}
            >
              All Cuisines
            </Badge>
            {allCuisines.slice(0, 10).map((cuisine) => (
              <Badge
                key={cuisine}
                variant={selectedCuisine === cuisine ? 'default' : 'outline'}
                className="cursor-pointer text-sm px-3 py-1"
                onClick={() => setSelectedCuisine(selectedCuisine === cuisine ? '' : cuisine)}
              >
                {cuisine}
              </Badge>
            ))}
          </div>

          {/* Results */}
          {filteredRestaurants.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No restaurants found</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantsPage;
