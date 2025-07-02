import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/AppStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Contact'>;

const ContactScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Contáctanos" />
        <Card.Content>
          <Text variant="bodyMedium">📍 Dirección: Antofagasta, Av Angamos 741</Text>
          <Text variant="bodyMedium">📞 Teléfono: +56 9 3566 6153</Text>
          <Text variant="bodyMedium">✉️ Email: contacto@copperbites.cl</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Map')}>
            Ver Ubicación en Mapa
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  card: {
    padding: 8,
  },
});

export default ContactScreen;
