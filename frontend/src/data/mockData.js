// ================= CATEGORIES =================
export const categories = [
  { id: "1", name: "Pizza", image: "/images/pizza/margherita.jpg" },
  { id: "2", name: "Burger", image: "/images/burger/classic-chicken.jpg" },
  { id: "3", name: "Biryani", image: "/images/biryani/chicken.jpg" },
  { id: "4", name: "Chinese", image: "/images/chinese/hakka-noodles.jpg" },
  { id: "5", name: "Desserts", image: "/images/desserts/gulab-jamun.jpg" },
  { id: "6", name: "South Indian", image: "/images/south-indian/masala-dosa.jpg" },
  { id: "7", name: "North Indian", image: "/images/north-indian/paneer-butter-masala.jpg" },
  { id: "8", name: "Drinks", image: "/images/drinks/cold-coffee.jpg" },
];

// ================= RESTAURANTS =================
export const restaurants = [
  {
    id: "r1",
    name: "Pizza Paradise",
    image: "/images/restaurants/pizza-paradise.jpg",
    cuisine: ["Pizza", "Italian"],
    rating: 4.5,
    deliveryTime: "25-35 min",
    minOrder: 199,
    address: "MG Road, Bangalore",
    isOpen: true,
  },
  {
    id: "r2",
    name: "Burger King",
    image: "/images/restaurants/burger-king.jpg",
    cuisine: ["Burger", "Fast Food"],
    rating: 4.2,
    deliveryTime: "20-30 min",
    minOrder: 149,
    address: "Koramangala, Bangalore",
    isOpen: true,
  },
  {
    id: "r3",
    name: "Hyderabadi Biryani House",
    image: "/images/restaurants/biryani-house.jpg",
    cuisine: ["North Indian", "Biryani"],
    rating: 4.7,
    deliveryTime: "35-45 min",
    minOrder: 249,
    address: "Indiranagar, Bangalore",
    isOpen: true,
  },
  {
    id: "r4",
    name: "Chinese Wok",
    image: "/images/restaurants/chinese-wok.jpg",
    cuisine: ["Chinese", "Asian"],
    rating: 4.3,
    deliveryTime: "30-40 min",
    minOrder: 199,
    address: "HSR Layout, Bangalore",
    isOpen: true,
  },
  {
    id: "r5",
    name: "Dosa Corner",
    image: "/images/restaurants/dosa-corner.jpg",
    cuisine: ["South Indian", "Udupi"],
    rating: 4.6,
    deliveryTime: "20-25 min",
    minOrder: 99,
    address: "Jayanagar, Bangalore",
    isOpen: true,
  },
  {
    id: "r6",
    name: "Punjabi Tandoor",
    image: "/images/restaurants/punjabi-tandoor.jpg",
    cuisine: ["North Indian", "Punjabi"],
    rating: 4.4,
    deliveryTime: "30-40 min",
    minOrder: 249,
    address: "Rajouri Garden, Delhi",
    isOpen: true,
  },

  {
    id: "r7",
    name: "Sweet Treats",
    image: "/images/restaurants/sweet-treats.jpg",
    cuisine: ["Desserts", "Drinks"],
    rating: 4.8,
    deliveryTime: "15-25 min",
    minOrder: 149,
    address: "Whitefield, Bangalore",
    isOpen: true,
  },
];

// ================= FOOD ITEMS (40) =================
export const foodItems = [
  // 🍕 Pizza (5)
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic cheese pizza",
    price: 299,
    restaurantId: "r1",
    image: "/images/pizza/margherita.jpg",
    category: "Pizza",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Loaded with pepperoni",
    price: 399,
    restaurantId: "r1",
    image: "/images/pizza/pepperoni.jpg",
    category: "Pizza",
    isVeg: false,
    isAvailable: true
  },
  {
    id: "3",
    name: "Veggie Supreme Pizza",
    description: "Veg loaded pizza",
    price: 349,
    restaurantId: "r1",
    image: "/images/pizza/veggie-supreme.jpg",
    category: "Pizza",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "4",
    name: "Farmhouse Pizza",
    description: "Onion capsicum mushroom",
    price: 379,
    restaurantId: "r1",
    image: "/images/pizza/farmhouse.jpg",
    category: "Pizza",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "5",
    name: "Cheese Burst Pizza",
    description: "Extra cheese inside",
    price: 429,
    restaurantId: "r1",
    image: "/images/pizza/cheese-burst.jpg",
    category: "Pizza",
    isVeg: true,
    isAvailable: true
  },

  // 🍔 Burger (5)
  {
    id: "6",
    name: "Classic Chicken Burger",
    description: "Crispy chicken patty",
    price: 149,
    restaurantId: "r2",
    image: "/images/burger/classic-chicken.jpg",
    category: "Burger",
    isVeg: false,
    isAvailable: true
  },
  {
    id: "7",
    name: "Veggie Burger",
    description: "Veg patty burger",
    price: 129,
    restaurantId: "r2",
    image: "/images/burger/veggie.jpg",
    category: "Burger",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "8",
    name: "Double Cheese Burger",
    description: "Double cheese blast",
    price: 249,
    restaurantId: "r2",
    image: "/images/burger/double-cheese.jpg",
    category: "Burger",
    isVeg: false,
    isAvailable: true
  },
  {
    id: "9",
    name: "Crispy Chicken Burger",
    description: "Extra crispy chicken",
    price: 199,
    restaurantId: "r2",
    image: "/images/burger/crispy-chicken.jpg",
    category: "Burger",
    isVeg: false,
    isAvailable: true
},
  {
    id: "10",
    name: "Paneer Tikka Burger",
    description: "Paneer tikka stuffing",
    price: 179,
    restaurantId: "r2",
    image: "/images/burger/paneer-tikka.jpg",
    category: "Burger",
    isVeg: true,
    isAvailable: true
  },

  // 🍛 Biryani (5)
  {
    id: "11",
    name: "Hyderabadi Chicken Biryani",
    description: "Spicy hyderabadi style",
    price: 299,
    restaurantId: "r3",
    image: "/images/biryani/chicken.jpg",
    category: "Biryani",
    isVeg: false,
    isAvailable: true
  },
  {
    id: "12",
    name: "Mutton Biryani",
    description: "Slow cooked mutton",
    price: 399,
    restaurantId: "r3",
    image: "/images/biryani/mutton.jpg",
    category: "Biryani",
    isVeg: false,
    isAvailable: true
  },
  {
    id: "13",
    name: "Veg Biryani",
    description: "Veg basmati rice",
    price: 199,
    restaurantId: "r3",
    image: "/images/biryani/veg.jpg",
    category: "Biryani",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "14",
    name: "Chicken Dum Biryani",
    description: "Dum cooked biryani",
    price: 349,
    restaurantId: "r3",
    image: "/images/biryani/dum-chicken.jpg",
    category: "Biryani",
    isVeg: false,
    isAvailable: true
},
  {
    id: "15",
    name: "Paneer Biryani",
    description: "Paneer biryani",
    price: 249,
    restaurantId: "r3",
    image: "/images/biryani/paneer.jpg",
    category: "Biryani",
    isVeg: true,
    isAvailable: true
  },

  // 🥡 Chinese (5)
  {
    id: "16",
    name: "Hakka Noodles",
    description: "Veg hakka noodles",
    price: 179,
    restaurantId: "r4",
    image: "/images/chinese/hakka-noodles.jpg",
    category: "Chinese",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "17",
    name: "Chicken Fried Rice",
    description: "Chicken fried rice",
    price: 199,
    restaurantId: "r4",
    image: "/images/chinese/fried-rice.jpg",
    category: "Chinese",
    isVeg: false,
    isAvailable: true
  },
  {
    id: "18",
    name: "Veg Manchurian",
    description: "Veg balls gravy",
    price: 169,
    restaurantId: "r4",
    image: "/images/chinese/veg-manchurian.jpg",
    category: "Chinese",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "19",
    name: "Chilli Chicken",
    description: "Spicy chilli chicken",
    price: 229,
    restaurantId: "r4",
    image: "/images/chinese/chilli-chicken.jpg",
    category: "Chinese",
    isVeg: false,
    isAvailable: true
  },
  {
    id: "20",
    name: "Spring Rolls",
    description: "Crispy rolls",
    price: 149,
    restaurantId: "r4",
    image: "/images/chinese/spring-rolls.jpg",
    category: "Chinese",
    isVeg: true,
    isAvailable: true
  },

  // 🥞 South Indian (5)
  {
    id: "21",
    name: "Masala Dosa",
    description: "Crispy dosa",
    price: 99,
    restaurantId: "r5",
    image: "/images/south-indian/masala-dosa.jpg",
    category: "South Indian",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "22",
    name: "Plain Dosa",
    description: "Simple dosa",
    price: 79,
    restaurantId: "r5",
    image: "/images/south-indian/plain-dosa.jpg",
    category: "South Indian",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "23",
    name: "Idli Sambar",
    description: "Soft idli",
    price: 69,
    restaurantId: "r5",
    image: "/images/south-indian/idli-sambar.jpg",
    category: "South Indian",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "24",
    name: "Uttapam",
    description: "Thick uttapam",
    price: 89,
    restaurantId: "r5",
    image: "/images/south-indian/uttapam.jpg",
    category: "South Indian",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "25",
    name: "Vada Sambar",
    description: "Crispy vada",
    price: 79,
    restaurantId: "r5",
    image: "/images/south-indian/vada-sambar.jpg",
    category: "South Indian",
    isVeg: true,
    isAvailable: true
  },

  // 🍲 North Indian (5)
  {
    id: "26",
    name: "Paneer Butter Masala",
    description: "Creamy paneer",
    price: 249,
    restaurantId: "r6",
    image: "/images/north-indian/paneer-butter-masala.jpg",
    category: "North Indian",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "27",
    name: "Butter Naan",
    description: "Soft naan",
    price: 49,
    restaurantId: "r6",
    image: "/images/north-indian/butter-naan.jpg",
    category: "North Indian",
    isVeg: true,
  isAvailable: true
  },
  {
    id: "28",
    name: "Dal Makhani",
    description: "Creamy dal",
    price: 199,
    restaurantId: "r6",
    image: "/images/north-indian/dal-makhani.jpg",
    category: "North Indian",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "29",
    name: "Shahi Paneer",
    description: "Royal paneer",
    price: 259,
    restaurantId: "r6",
    image: "/images/north-indian/shahi-paneer.jpg",
    category: "North Indian",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "30",
    name: "Jeera Rice",
    description: "Jeera flavored rice",
    price: 149,
    restaurantId: "r6",
    image: "/images/north-indian/jeera-rice.jpg",
    category: "North Indian",
    isVeg: true,
    isAvailable: true
  },

  // 🍰 Desserts (5)
  {
    id: "31",
    name: "Gulab Jamun",
    description: "Sweet dumplings",
    price: 79,
    restaurantId: "r7",
    image: "/images/desserts/gulab-jamun.jpg",
    category: "Desserts",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "32",
    name: "Chocolate Brownie",
    description: "Rich brownie",
    price: 149,
    restaurantId: "r7",
    image: "/images/desserts/brownie.jpg",
    category: "Desserts",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "33",
    name: "Ice Cream Sundae",
    description: "Ice cream dessert",
    price: 129,
    restaurantId: "r7",
    image: "/images/desserts/ice-cream.jpg",
    category: "Desserts",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "34",
    name: "Rasmalai",
    description: "Milk based sweet",
    price: 99,
    restaurantId: "r7",
    image: "/images/desserts/rasmalai.jpg",
    category: "Desserts",
    isVeg: true,
    isAvailable: true
  },  
  {
    id: "35",
    name: "Kheer",
    description: "Rice pudding",
    price: 89,
    restaurantId: "r7",
    image: "/images/desserts/kheer.jpg",
    category: "Desserts",
    isVeg: true,
    isAvailable: true
  },

  // 🥤 Drinks (5)
  {
    id: "36",
    name: "Cold Coffee",
    description: "Chilled coffee",
    price: 129,
    restaurantId: "r7",
    image: "/images/drinks/cold-coffee.jpg",
    category: "Drinks",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "37",
    name: "Chocolate Milkshake",
    description: "Thick milkshake",
    price: 149,
    restaurantId: "r7",
    image: "/images/drinks/milkshake.jpg",
    category: "Drinks",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "38",
    name: "Fresh Lime Soda",
    description: "Refreshing soda",
    price: 79,
    restaurantId: "r7",
    image: "/images/drinks/lime-soda.jpg",
    category: "Drinks",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "39",
    name: "Mango Shake",
    description: "Seasonal mango",
    price: 139,
    restaurantId: "r7",
    image: "/images/drinks/mango-shake.jpg",
    category: "Drinks",
    isVeg: true,
    isAvailable: true
  },
  {
    id: "40",
    name: "Soft Drink (Cola)",
    description: "Chilled cola",
    price: 59,
    restaurantId: "r7",
    image: "/images/drinks/cola.jpg",
    category: "Drinks",
    isVeg: true,
    isAvailable: true
  },
];

export const sampleOrders = [
  {
    id: 'ORD001',
    userId: '1',
    items: [
      { id: '1', foodItem: foodItems[0], quantity: 2 },
      { id: '2', foodItem: foodItems[2], quantity: 1 },
    ],
    totalAmount: 947,
    status: 'delivered',
    deliveryAddress: '123, MG Road, Bangalore - 560001',
    paymentMethod: 'online',
    paymentStatus: 'completed',
    createdAt: '2024-01-15T10:30:00Z',
    restaurantId: '1',
  },
  {
    id: 'ORD002',
    userId: '1',
    items: [
      { id: '3', foodItem: foodItems[6], quantity: 1 },
      { id: '4', foodItem: foodItems[8], quantity: 1 },
    ],
    totalAmount: 498,
    status: 'out_for_delivery',
    deliveryAddress: '456, Koramangala, Bangalore - 560034',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    createdAt: '2024-01-20T14:15:00Z',
    restaurantId: '3',
  },
];
