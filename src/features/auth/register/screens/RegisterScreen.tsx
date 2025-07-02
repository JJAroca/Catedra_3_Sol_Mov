import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  Card,
  Checkbox,
  useTheme,
  ActivityIndicator
} from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from '../../../../api/api';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Menu: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

const handleRegister = async () => {
  if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Error', 'Las contraseñas no coinciden');
    return;
  }

  setLoading(true);

  try {
    const response = await api.post('/users/register', {
      name,
      lastname: 'TuApellido', 
      email,
      password
    });

    setLoading(false);
    Alert.alert('Éxito', 'Registro exitoso');
    navigation.navigate('Menu');
  } catch (error: any) {
    setLoading(false);
    console.log(error.response?.data || error.message);
    Alert.alert('Error', error.response?.data?.message || 'No se pudo registrar');
  }
};
  const handleTermsPress = () => {
    Alert.alert(
      'Términos y Condiciones',
      'Aquí irían los términos y condiciones de tu aplicación. Debes aceptarlos para poder registrarte.',
      [
        { text: 'Entendido' }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.primary }]}>
            Crear Cuenta
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Completa el formulario para registrarte
          </Text>
        </View>

        <Card style={styles.formCard}>
          <Card.Content style={styles.form}>
            <TextInput
              label="Nombre completo *"
              value={name}
              onChangeText={setName}
              mode="outlined"
              autoComplete="name"
              left={<TextInput.Icon icon="account" />}
              style={styles.input}
            />

            <TextInput
              label="Email *"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              left={<TextInput.Icon icon="email" />}
              style={styles.input}
            />

            <TextInput
              label="Teléfono"
              value={phone}
              onChangeText={setPhone}
              mode="outlined"
              keyboardType="phone-pad"
              autoComplete="tel"
              left={<TextInput.Icon icon="phone" />}
              style={styles.input}
            />

            <TextInput
              label="Contraseña *"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              autoComplete="password"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
            />

            <TextInput
              label="Confirmar contraseña *"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              left={<TextInput.Icon icon="lock-check" />}
              right={
                <TextInput.Icon 
                  icon={showConfirmPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
              style={styles.input}
            />

            <View style={styles.termsContainer}>
              <Checkbox
                status={acceptTerms ? 'checked' : 'unchecked'}
                onPress={() => setAcceptTerms(!acceptTerms)}
              />
              <Text variant="bodyMedium" style={styles.termsText}>
                Acepto los {' '}
                <Text 
                  style={{ color: theme.colors.primary }} 
                  onPress={handleTermsPress}
                >
                  términos y condiciones
                </Text>
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
              contentStyle={styles.buttonContent}
              disabled={loading}
              icon={loading ? undefined : "account-plus"}
            >
              {loading ? <ActivityIndicator color={theme.colors.onPrimary} /> : 'Registrarme'}
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.loginSection}>
          <Text variant="bodyMedium" style={styles.loginText}>
            ¿Ya tienes cuenta?
          </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            textColor={theme.colors.primary}
          >
            Inicia sesión aquí
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  formCard: {
    elevation: 4,
    marginBottom: 24,
  },
  form: {
    padding: 8,
  },
  input: {
    marginBottom: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  registerButton: {
    marginBottom: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    opacity: 0.7,
  },
});

export default RegisterScreen;
