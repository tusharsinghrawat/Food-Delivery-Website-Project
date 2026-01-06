import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FoodCard from "@/components/food/FoodCard";
import { foodItems } from "@/data/mockData"; // ✅ DEMO DATA (INTENTIONAL)

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ===============================
     BUILD CATEGORIES (SAFE)
  ============================== */
  const buildCategories = (data) => {
    const uniqueCategories = [
      ...new Set(data.map((item) => item.category)),
    ].map((name, index) => ({
      id: index + 1,
      name,
    }));

    setCategories(uniqueCategories);
  };

  /* ===============================
     LOAD FOOD (DEMO MODE – FINAL)
  ============================== */
  useEffect(() => {
    // 🔥 DEMO ITEMS WITH EXPLICIT FLAG
    const demoFoods = foodItems.map((item) => ({
      ...item,
      isDemo: true,        // ✅ demo marker
      _id: null,           // ❌ no backend id (INTENTIONAL)
    }));

    setFoods(demoFoods);
    buildCategories(demoFoods);
    setLoading(false);
  }, []);

  /* ===============================
     FILTER LOGIC (UNCHANGED)
  ============================== */
  const filteredItems = foods.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;

    const matchesVeg = !isVegOnly || item.isVeg;

    return matchesSearch && matchesCategory && matchesVeg;
  });

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      searchParams.delete("category");
    } else {
      setSelectedCategory(category);
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
            <p className="text-muted-foreground">
              Explore our wide variety of delicious dishes
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button
              variant={isVegOnly ? "default" : "outline"}
              onClick={() => setIsVegOnly(!isVegOnly)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Veg Only
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <Badge
              variant={!selectedCategory ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                setSelectedCategory("");
                searchParams.delete("category");
                setSearchParams(searchParams);
              }}
            >
              All
            </Badge>

            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={
                  selectedCategory === category.name
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading food items...
            </p>
          ) : filteredItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <FoodCard
                  key={item.id}
                  food={item} // ✅ demo item with isDemo=true
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No dishes found
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MenuPage;


