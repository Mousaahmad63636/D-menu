export const menuData = {
  restaurant: {
    name: "Bella Vista Restaurant",
    description: "Fresh, locally-sourced ingredients crafted into memorable dining experiences",
    location: "Downtown District"
  },
  categories: [
    {
      id: "appetizers",
      name: "Appetizers",
      description: "Perfect starters to begin your culinary journey",
      items: [
        {
          id: "bruschetta",
          name: "Classic Bruschetta",
          description: "Toasted artisan bread topped with fresh tomatoes, basil, garlic, and extra virgin olive oil",
          price: "12.95",
          image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegetarian"],
          popular: true
        },
        {
          id: "calamari",
          name: "Crispy Calamari",
          description: "Tender squid rings lightly battered and fried, served with marinara sauce and lemon",
          price: "15.95",
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&crop=center",
          dietary: []
        },
        {
          id: "charcuterie",
          name: "Artisan Charcuterie Board",
          description: "Selection of cured meats, artisanal cheeses, olives, nuts, and seasonal fruits",
          price: "24.95",
          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&crop=center",
          dietary: ["gluten-free-options"]
        },
        {
          id: "soup",
          name: "Roasted Tomato Basil Soup",
          description: "Creamy roasted tomato soup with fresh basil, served with artisan bread",
          price: "9.95",
          image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegetarian"]
        }
      ]
    },
    {
      id: "mains",
      name: "Main Courses",
      description: "Expertly prepared dishes featuring the finest ingredients",
      items: [
        {
          id: "salmon",
          name: "Pan-Seared Atlantic Salmon",
          description: "Fresh salmon fillet with lemon herb butter, served with seasonal vegetables and wild rice",
          price: "28.95",
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=center",
          dietary: ["gluten-free"],
          popular: true
        },
        {
          id: "ribeye",
          name: "Prime Ribeye Steak",
          description: "12oz dry-aged ribeye grilled to perfection, served with garlic mashed potatoes and asparagus",
          price: "38.95",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center",
          dietary: ["gluten-free"]
        },
        {
          id: "pasta",
          name: "Lobster Ravioli",
          description: "House-made ravioli filled with lobster and ricotta, finished with cream sauce and fresh herbs",
          price: "26.95",
          image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center",
          dietary: []
        },
        {
          id: "chicken",
          name: "Herb-Crusted Chicken",
          description: "Free-range chicken breast with rosemary and thyme crust, served with roasted vegetables",
          price: "22.95",
          image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop&crop=center",
          dietary: ["gluten-free"]
        },
        {
          id: "risotto",
          name: "Wild Mushroom Risotto",
          description: "Creamy Arborio rice with seasonal wild mushrooms, parmesan, and truffle oil",
          price: "19.95",
          image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegetarian", "gluten-free"]
        }
      ]
    },
    {
      id: "desserts",
      name: "Desserts",
      description: "Sweet endings to complete your dining experience",
      items: [
        {
          id: "tiramisu",
          name: "Classic Tiramisu",
          description: "Traditional Italian dessert with coffee-soaked ladyfingers, mascarpone, and cocoa",
          price: "8.95",
          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegetarian"]
        },
        {
          id: "cheesecake",
          name: "New York Cheesecake",
          description: "Rich and creamy cheesecake with graham cracker crust and berry compote",
          price: "7.95",
          image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegetarian"]
        },
        {
          id: "chocolate",
          name: "Dark Chocolate Tart",
          description: "Decadent dark chocolate tart with salted caramel and vanilla bean ice cream",
          price: "9.95",
          image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegetarian"]
        },
        {
          id: "gelato",
          name: "Artisan Gelato Trio",
          description: "Three scoops of house-made gelato: vanilla bean, pistachio, and chocolate",
          price: "6.95",
          image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegetarian", "gluten-free"]
        }
      ]
    },
    {
      id: "beverages",
      name: "Beverages",
      description: "Carefully curated selection of drinks to complement your meal",
      items: [
        {
          id: "coffee",
          name: "Espresso",
          description: "Rich, full-bodied espresso from single-origin beans",
          price: "3.95",
          image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegan", "gluten-free"]
        },
        {
          id: "wine-red",
          name: "House Red Wine",
          description: "Smooth Cabernet Sauvignon with notes of blackberry and oak",
          price: "8.95",
          image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegan", "gluten-free"]
        },
        {
          id: "cocktail",
          name: "Signature Mojito",
          description: "Fresh mint, lime, and premium rum with a splash of soda water",
          price: "12.95",
          image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegan", "gluten-free"]
        },
        {
          id: "tea",
          name: "Herbal Tea Selection",
          description: "Choose from chamomile, peppermint, or Earl Grey",
          price: "4.95",
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegan", "gluten-free"]
        },
        {
          id: "juice",
          name: "Fresh Orange Juice",
          description: "Freshly squeezed Valencia oranges",
          price: "4.95",
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&crop=center",
          dietary: ["vegan", "gluten-free"]
        }
      ]
    }
  ]
};
