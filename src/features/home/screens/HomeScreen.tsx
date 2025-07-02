import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../app/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ImageBackground 
      source={require('../../../assets/images/food.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircleBlack}>
            <Image 
              source={require('../../../assets/images/CopperBites_Logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Login')}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            labelStyle={styles.buttonText}
          >
            Login
          </Button>
          
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Register')}
            style={[styles.button, styles.signUpButton]}
            labelStyle={[styles.buttonText, styles.signUpText]}
          >
            Sign Up
          </Button>

          <View style={styles.menuLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <Text style={[styles.linkText, { color: '#FFFFFF' }]}>Menu</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
              <Text style={[styles.linkText, { color: '#FFFFFF' }]}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 0,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoCircleBlack: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  logoImage: {
    width: '75%',
    height: '75%',
  },
  buttonsContainer: {
    marginBottom: 60,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 8,
    borderRadius: 25,
  },
  signUpButton: {
    backgroundColor: '#FF6B00',
    borderWidth: 0,
  },
  signUpText: {
    color: '#FFFFFF', 
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 25,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
