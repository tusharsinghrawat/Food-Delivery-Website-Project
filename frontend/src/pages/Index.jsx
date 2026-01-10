import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Truck, Clock, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import CategoryCard from '@/components/category/CategoryCard';
import { restaurants, categories } from '@/data/mockData';
import { useState } from 'react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredRestaurants = restaurants
    .filter((r) => r.isOpen)
    .slice(0, 4);

  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less',
    },
    {
      icon: Clock,
      title: 'Live Tracking',
      description:
        'Track your order in real-time from kitchen to doorstep',
    },
    {
      icon: ThumbsUp,
      title: 'Best Quality',
      description:
        'We partner with only the best restaurants in town',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delicious Food,{' '}
                <span className="text-primary">Delivered Fast</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Order from your favorite restaurants and get it
                delivered to your doorstep in minutes
              </p>
              <form
                onSubmit={handleSearch}
                className="flex gap-2 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for food or restaurants..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Explore by Category
              </h2>
              <Link to="/menu">
                <Button variant="ghost" size="sm">
                  View All{' '}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() =>
                    navigate(
                      `/menu?category=${category.name}`
                    )
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Popular Restaurants
              </h2>
              <Link to="/restaurants">
                <Button variant="ghost" size="sm">
                  View All{' '}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Choose FoodExpress?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Download our app or order online now!
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/menu">
                <Button size="lg" variant="secondary">
                  Order Now
                </Button>
              </Link>
              <Link to="/restaurants">
                <Button
                  size="lg"
                  variant="secondary"
                  
                >
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
