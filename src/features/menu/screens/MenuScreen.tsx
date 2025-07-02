import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Searchbar, useTheme, ActivityIndicator } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/AppStack';

type MenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

interface Props {
  navigation: MenuScreenNavigationProp;
}

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  ingredients?: string;
}


const getImageByName = (name: string) => {
  const normalized = name.toLowerCase().trim();
  switch (normalized) {
    case 'spicy burger':
      return require('../../../assets/images/spicyburger.webp');
    case 'smoked burguer':
      return require('../../../assets/images/smokedburger.jpg');
    case 'baconcheeseburguer':
      return require('../../../assets/images/baconcheeseburger.webp');
    case 'family':
      return require('../../../assets/images/food.png');
    case 'cocacola':
      return require('../../../assets/images/cocacola.webp');
    case 'fanta':
      return require('../../../assets/images/fanta.jpg');
    case 'sprite':
      return require('../../../assets/images/sprite.jpg');
    case 'chocolate cake':
      return require('../../../assets/images/chocolatecake.jpg');
    default:
      return require('../../../assets/images/food.png');
  }
};


const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
};

const MenuScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);


  const staticDishes: Dish[] = [
    {
      id: '1',
      name: 'Spicy Burger',
      description: 'Deliciosa hamburguesa con un toque picante, carne jugosa, queso derretido y salsa especial.',
      price: 8500,
      category: 'Hamburguesas',
      imageUrl: 'spicy_burger',
      ingredients: 'Carne de res, Queso cheddar, Lechuga, Tomate, Cebolla, Salsa picante, Pan artesanal'
    },
    {
      id: '2',
      name: 'Smoked Burguer',
      description: 'Hamburguesa ahumada con sabor único, preparada con carne premium y vegetales frescos.',
      price: 9500,
      category: 'Hamburguesas',
      imageUrl: 'smoked_burguer',
      ingredients: 'Carne ahumada, Queso suizo, Lechuga, Tomate, Pepinillos, Salsa BBQ, Pan brioche'
    },
    {
      id: '3',
      name: 'BaconCheeseBurguer',
      description: 'La clásica combinación de tocino crujiente y queso derretido en una hamburguesa perfecta.',
      price: 10500,
      category: 'Hamburguesas',
      imageUrl: 'baconcheeseburguer',
      ingredients: 'Carne de res, Tocino, Queso cheddar, Lechuga, Tomate, Cebolla, Mayonesa, Pan sesamo'
    },
    {
      id: '4',
      name: 'Family',
      description: 'Combo familiar perfecto para compartir, incluye variedad de platos principales.',
      price: 25000,
      category: 'Acompañamientos',
      imageUrl: 'family',
      ingredients: 'Hamburguesas variadas, Papas fritas, Aros de cebolla, Nuggets, Salsas variadas'
    },
    {
      id: '5',
      name: 'CocaCola',
      description: 'Refrescante bebida Coca-Cola clásica, perfecta para acompañar tu comida.',
      price: 2000,
      category: 'Bebidas',
      imageUrl: 'cocacola',
      ingredients: 'Agua carbonatada, Jarabe de cola, Cafeína'
    },
    {
      id: '6',
      name: 'Fanta',
      description: 'Bebida sabor naranja, refrescante y con el sabor cítrico que tanto te gusta.',
      price: 2000,
      category: 'Bebidas',
      imageUrl: 'fanta',
      ingredients: 'Agua carbonatada, Concentrado de naranja, Azúcar'
    },
    {
      id: '7',
      name: 'Sprite',
      description: 'Bebida lima-limón refrescante, perfecta para cualquier momento del día.',
      price: 2000,
      category: 'Bebidas',
      imageUrl: 'sprite',
      ingredients: 'Agua carbonatada, Concentrado lima-limón, Azúcar'
    },
    {
      id: '8',
      name: 'Chocolate Cake',
      description: 'Exquisito pastel de chocolate, húmedo y con un intenso sabor a cacao.',
      price: 4500,
      category: 'Postres',
      imageUrl: 'chocolate cake',
      ingredients: 'Chocolate, Harina, Huevos, Mantequilla, Azúcar, Cacao en polvo, Crema'
    }
  ];

  const getAllCategories = () => {
    const cats = ['Todos', ...new Set(staticDishes.map(dish => dish.category))];
    return cats;
  };

  const categories = getAllCategories();

  useEffect(() => {

    const loadDishes = () => {
      setTimeout(() => {
        setDishes(staticDishes);
        setFilteredDishes(staticDishes);
        setLoading(false);
      }, 1000);
    };

    loadDishes();
  }, []);

  useEffect(() => {
    // Filtro por categoría
    let filtered = dishes;  
    if (activeCategory !== 'Todos') {
      filtered = dishes.filter(dish => dish.category === activeCategory);
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDishes(filtered);
  }, [searchQuery, activeCategory, dishes]);

  const handleDishPress = (dish: Dish) => {
    navigation.navigate('DishDetail', { dishId: dish.id, dish });
  };

 //Funcion que no se realizo :C 
  const addNewDish = (newDish: Omit<Dish, 'id'>) => {
    const dishWithId = {
      ...newDish,
      id: (dishes.length + 1).toString()
    };
    setDishes(prev => [...prev, dishWithId]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={styles.loadingText}>Cargando menú delicioso...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          🍽️ Menú Copper Bites
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          {filteredDishes.length} platos disponibles
        </Text>
      </View>


      <Searchbar
        placeholder="Buscar platos, ingredientes..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        icon="magnify"
        clearIcon="close"
      />


      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map(category => (
          <Button
            key={category}
            mode={activeCategory === category ? 'contained' : 'outlined'}
            onPress={() => setActiveCategory(category)}
            style={[
              styles.categoryButton,
              activeCategory === category && styles.activeCategoryButton
            ]}
            labelStyle={{
              color: activeCategory === category ? theme.colors.onPrimary : theme.colors.primary
            }}
          >
            {category}
          </Button>
        ))}
      </ScrollView>

      <ScrollView 
        contentContainerStyle={styles.dishesContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredDishes.length > 0 ? (
          filteredDishes.map(dish => (
            <TouchableOpacity 
              key={dish.id} 
              onPress={() => handleDishPress(dish)}
              activeOpacity={0.7}
            >
              <Card style={styles.dishCard} elevation={3}>
                <Card.Content>
                  <Image 
                    source={getImageByName(dish.name)}
                    style={styles.dishImage}
                    resizeMode="cover"
                  />
                  <View style={styles.dishInfo}>
                    <View style={styles.dishHeader}>
                      <Text variant="titleMedium" style={styles.dishName}>
                        {dish.name}
                      </Text>
                      <Text variant="titleMedium" style={styles.dishPrice}>
                        {formatPrice(dish.price)}
                      </Text>
                    </View>
                    <Text variant="labelMedium" style={styles.dishCategory}>
                      {dish.category}
                    </Text>
                    <Text 
                      variant="bodySmall" 
                      numberOfLines={2} 
                      style={styles.dishDescription}
                    >
                      {dish.description}
                    </Text>
                    {dish.ingredients && (
                      <Text 
                        variant="bodySmall" 
                        numberOfLines={1} 
                        style={styles.dishIngredients}
                      >
                        🥘 {dish.ingredients.split(',').slice(0, 3).join(', ')}...
                      </Text>
                    )}
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              🔍 No se encontraron platos
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtitle}>
              Intenta con otra categoría o término de búsqueda
            </Text>
            <Button 
              mode="outlined" 
              onPress={() => {
                setSearchQuery('');
                setActiveCategory('Todos');
              }}
              style={styles.resetButton}
            >
              Ver todo el menú
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#8B4513',
  },
  headerSubtitle: {
    color: '#666',
    marginTop: 4,
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryButton: {
    marginRight: 8,
    borderRadius: 20,
  },
  activeCategoryButton: {
    backgroundColor: '#d4a574',
  },
  dishesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  dishCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  dishImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  dishInfo: {
    flex: 1,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  dishName: {
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  dishPrice: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  dishCategory: {
    color: '#d4a574',
    marginBottom: 8,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  dishDescription: {
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
  },
  dishIngredients: {
    color: '#888',
    fontStyle: 'italic',
    fontSize: 11,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 60,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 24,
  },
  resetButton: {
    borderColor: '#d4a574',
  },

  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#d4a574',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MenuScreen;