import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, Chip } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/AppStack';

type DishDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'DishDetail'>;

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

const DishDetailScreen: React.FC<DishDetailScreenProps> = ({ route, navigation }) => {
  const theme = useTheme();
  const { dish } = route.params;

  const handleAddToCart = () => {
    navigation.navigate('Menu');
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={getImageByName(dish.name)}
        style={styles.dishImage}
        resizeMode="cover"
      />

      <Card style={styles.detailCard}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.dishName}>{dish.name}</Text>
            <Text variant="titleLarge" style={styles.dishPrice}>{formatPrice(dish.price)}</Text>
          </View>

          <Chip icon="tag" style={styles.categoryChip}>
            {dish.category}
          </Chip>

          <Text variant="bodyLarge" style={styles.sectionTitle}>Descripción</Text>
          <Text variant="bodyMedium" style={styles.description}>{dish.description}</Text>

          <Text variant="bodyLarge" style={styles.sectionTitle}>Ingredientes</Text>
          <Text variant="bodyMedium">
            {dish.ingredients 
              ? dish.ingredients.split(',').map((item: string, idx: number) => (
                  <Text key={idx}>- {item.trim()}{'\n'}</Text>
                ))
              : 'No hay ingredientes disponibles'}
          </Text>

          <Button 
            mode="contained" 
            onPress={handleAddToCart}
            style={styles.addButton}
            icon="cart-plus"
          >
            Agregar al Pedido
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dishImage: {
    width: '100%',
    height: 300,
  },
  detailCard: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dishName: {
    fontWeight: 'bold',
    flex: 1,
  },
  dishPrice: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  categoryChip: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  addButton: {
    marginTop: 24,
    borderRadius: 8,
  },
});

export default DishDetailScreen;
