export const menuData = {
  restaurant: {
    name: "Bella Vista Restaurant",
    description: "Fresh, locally-sourced ingredients crafted into memorable dining experiences",
    location: "Downtown District"
  },
  mainCategories: [
    {
      id: "pizza",
      name: "Pizza",
      description: "Authentic wood-fired pizzas with fresh ingredients",
      subcategories: [
        {
          id: "margherita",
          name: "Margherita Pizzas",
          description: "Classic Italian pizzas with tomato, mozzarella, and fresh basil",
          items: [
            {
              id: "margherita-classic",
              name: "Classic Margherita",
              description: "Traditional pizza with San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil",
              price: "16.95",
              image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"],
              popular: true
            },
            {
              id: "margherita-buffalo",
              name: "Buffalo Margherita",
              description: "Premium pizza with fresh buffalo mozzarella, Roma tomatoes, and organic basil",
              price: "19.95",
              image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            },
            {
              id: "margherita-burrata",
              name: "Burrata Margherita",
              description: "Gourmet pizza topped with creamy burrata cheese, cherry tomatoes, and fresh arugula",
              price: "22.95",
              image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            },
            {
              id: "margherita-pesto",
              name: "Pesto Margherita",
              description: "Unique twist with homemade basil pesto, fresh mozzarella, and sun-dried tomatoes",
              price: "18.95",
              image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            }
          ]
        },
        {
          id: "specialty",
          name: "Specialty Pizzas",
          description: "Chef's signature pizza creations with premium toppings",
          items: [
            {
              id: "pepperoni-supreme",
              name: "Pepperoni Supreme",
              description: "Premium pepperoni, Italian sausage, mushrooms, green peppers, and extra mozzarella",
              price: "24.95",
              image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=300&fit=crop&crop=center",
              dietary: [],
              popular: true
            },
            {
              id: "quattro-stagioni",
              name: "Quattro Stagioni",
              description: "Four seasons pizza with artichokes, mushrooms, ham, and olives on four quarters",
              price: "26.95",
              image: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=400&h=300&fit=crop&crop=center",
              dietary: []
            },
            {
              id: "prosciutto-arugula",
              name: "Prosciutto & Arugula",
              description: "Thin-crust pizza with prosciutto di Parma, fresh arugula, and shaved Parmesan",
              price: "28.95",
              image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center",
              dietary: []
            },
            {
              id: "truffle-mushroom",
              name: "Truffle Mushroom",
              description: "Gourmet pizza with mixed wild mushrooms, truffle oil, goat cheese, and fresh thyme",
              price: "29.95",
              image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            },
            {
              id: "bbq-chicken",
              name: "BBQ Chicken",
              description: "Smoky BBQ sauce, grilled chicken, red onions, cilantro, and mozzarella cheese",
              price: "23.95",
              image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&crop=center",
              dietary: []
            }
          ]
        },
        {
          id: "white-pizzas",
          name: "White Pizzas",
          description: "No-sauce pizzas with creamy cheese bases and gourmet toppings",
          items: [
            {
              id: "ricotta-spinach",
              name: "Ricotta & Spinach White",
              description: "Creamy ricotta base with fresh spinach, garlic, mozzarella, and Parmesan cheese",
              price: "21.95",
              image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            },
            {
              id: "three-cheese",
              name: "Three Cheese White",
              description: "Blend of mozzarella, Parmesan, and Gorgonzola with caramelized onions and walnuts",
              price: "23.95",
              image: "https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            }
          ]
        },
        {
          id: "vegan-pizzas",
          name: "Vegan Pizzas",
          description: "Plant-based pizzas with dairy-free cheese and fresh vegetables",
          items: [
            {
              id: "vegan-margherita",
              name: "Vegan Margherita",
              description: "Classic pizza with house-made cashew mozzarella, fresh tomatoes, and basil",
              price: "18.95",
              image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegan"],
              popular: true
            },
            {
              id: "mediterranean-vegan",
              name: "Mediterranean Vegan",
              description: "Dairy-free cheese with olives, sun-dried tomatoes, artichokes, and fresh herbs",
              price: "20.95",
              image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegan"]
            }
          ]
        }
      ]
    },
    {
      id: "beverages",
      name: "Beverages",
      description: "Refreshing drinks to complement your meal",
      subcategories: [
        {
          id: "hot-drinks",
          name: "Hot Drinks",
          description: "Warming beverages",
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
              id: "tea",
              name: "Herbal Tea Selection",
              description: "Choose from chamomile, peppermint, or Earl Grey",
              price: "4.95",
              image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegan", "gluten-free"]
            }
          ]
        },
        {
          id: "cold-drinks",
          name: "Cold Drinks",
          description: "Refreshing cold beverages",
          items: [
            {
              id: "juice",
              name: "Fresh Orange Juice",
              description: "Freshly squeezed Valencia oranges",
              price: "4.95",
              image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegan", "gluten-free"]
            },
            {
              id: "cocktail",
              name: "Signature Mojito",
              description: "Fresh mint, lime, and premium rum with a splash of soda water",
              price: "12.95",
              image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegan", "gluten-free"]
            }
          ]
        },
        {
          id: "wines",
          name: "Wines & Spirits",
          description: "Curated selection of wines and spirits",
          items: [
            {
              id: "wine-red",
              name: "House Red Wine",
              description: "Smooth Cabernet Sauvignon with notes of blackberry and oak",
              price: "8.95",
              image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegan", "gluten-free"]
            }
          ]
        }
      ]
    },
    {
      id: "pasta",
      name: "Pasta",
      description: "Handcrafted pasta dishes with authentic Italian flavors",
      subcategories: [
        {
          id: "spaghetti",
          name: "Spaghetti",
          description: "Classic long pasta dishes with traditional and modern sauces",
          items: [
            {
              id: "spaghetti-carbonara",
              name: "Spaghetti Carbonara",
              description: "Traditional Roman pasta with pancetta, eggs, Pecorino Romano, and black pepper",
              price: "19.95",
              image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center",
              dietary: [],
              popular: true
            },
            {
              id: "spaghetti-bolognese",
              name: "Spaghetti Bolognese",
              description: "Classic meat sauce made with beef, pork, tomatoes, and aromatic vegetables",
              price: "18.95",
              image: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop&crop=center",
              dietary: []
            },
            {
              id: "spaghetti-aglio-olio",
              name: "Spaghetti Aglio e Olio",
              description: "Simple yet elegant pasta with garlic, olive oil, red chili flakes, and parsley",
              price: "16.95",
              image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            }
          ]
        },
        {
          id: "penne",
          name: "Penne",
          description: "Tube-shaped pasta perfect for holding rich, flavorful sauces",
          items: [
            {
              id: "penne-arrabbiata",
              name: "Penne all'Arrabbiata",
              description: "Spicy pasta with tomatoes, garlic, red chili peppers, and fresh basil",
              price: "17.95",
              image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            },
            {
              id: "penne-puttanesca",
              name: "Penne Puttanesca",
              description: "Bold pasta dish with olives, capers, anchovies, tomatoes, and garlic",
              price: "19.95",
              image: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=400&h=300&fit=crop&crop=center",
              dietary: []
            }
          ]
        },
        {
          id: "ravioli",
          name: "Ravioli",
          description: "House-made stuffed pasta parcels with gourmet fillings",
          items: [
            {
              id: "ravioli-spinach-ricotta",
              name: "Spinach & Ricotta Ravioli",
              description: "Fresh pasta filled with spinach and ricotta, served with sage butter sauce",
              price: "21.95",
              image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            },
            {
              id: "ravioli-lobster",
              name: "Lobster Ravioli",
              description: "Luxurious pasta parcels filled with lobster meat in cream sauce with fresh herbs",
              price: "28.95",
              image: "https://images.unsplash.com/photo-1572441713537-9a41739f9fab?w=400&h=300&fit=crop&crop=center",
              dietary: []
            }
          ]
        },
        {
          id: "penne",
          name: "Penne",
          description: "Tube-shaped pasta perfect for holding rich, flavorful sauces",
          items: [
            {
              id: "penne-arrabbiata",
              name: "Penne all'Arrabbiata",
              description: "Spicy pasta with tomatoes, garlic, red chili peppers, and fresh basil",
              price: "17.95",
              image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center",
              dietary: ["vegetarian"]
            },
            {
              id: "penne-puttanesca",
              name: "Penne Puttanesca",
              description: "Bold pasta dish with olives, capers, anchovies, tomatoes, and garlic",
              price: "19.95",
              image: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=400&h=300&fit=crop&crop=center",
              dietary: []
            }
          ]
        },
        {
          id: "ravioli",
          name: "Ravioli",
          description: "House-made stuffed pasta parcels with gourmet fillings",
        }
      ]
    },
    {
      id: "tobacco",
      name: "Tobacco",
      description: "Premium tobacco products",
      subcategories: [
        {
          id: "cigarettes",
          name: "Cigarettes",
          description: "Premium cigarette brands",
          items: [
            {
              id: "marlboro",
              name: "Marlboro Gold",
              description: "Premium light cigarettes",
              price: "12.50",
              image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
              dietary: [],
              ageRestricted: true
            },
            {
              id: "camel",
              name: "Camel Blue",
              description: "Smooth and mild cigarettes",
              price: "11.95",
              image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
              dietary: [],
              ageRestricted: true
            }
          ]
        },
        {
          id: "cigars",
          name: "Premium Cigars",
          description: "Hand-rolled premium cigars",
          items: [
            {
              id: "cuban",
              name: "Cuban Romeo y Julieta",
              description: "Premium hand-rolled Cuban cigar",
              price: "25.00",
              image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
              dietary: [],
              ageRestricted: true
            }
          ]
        },
        {
          id: "accessories",
          name: "Smoking Accessories",
          description: "Quality smoking accessories",
          items: [
            {
              id: "lighter",
              name: "Premium Lighter",
              description: "High-quality butane lighter",
              price: "15.00",
              image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
              dietary: []
            }
          ]
        }
      ]
    }
  ]
};