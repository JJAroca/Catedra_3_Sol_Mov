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

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  
type LoginResponse = {
  data?: {
    token?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert('Error', 'Completa todos los campos');
    return;
  }

  setLoading(true);

  try {
    const response = await api.post<LoginResponse>('/users/login', {
      email,
      password,
    });

    const token = response.data?.data?.token;

    setLoading(false);
    Alert.alert('Bienvenido', 'Inicio de sesión exitoso');
    navigation.navigate('Menu');
  } catch (error: any) {
    setLoading(false);
    console.log(error.response?.data || error.message);
    Alert.alert('Error', error.response?.data?.message || 'Credenciales incorrectas');
  }
};

  const handleForgotPassword = () => {
    Alert.prompt(
      'Recuperar Contraseña',
      'Ingresa tu email para recuperar tu contraseña:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Enviar',
          onPress: (email) => {
            if (email && email.includes('@')) {
              Alert.alert('Éxito', 'Se ha enviado un email para recuperar tu contraseña');
            } else {
              Alert.alert('Error', 'Por favor ingresa un email válido');
            }
          }
        }
      ],
      'plain-text',
      email
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
            Iniciar Sesión
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Accede a tu cuenta para realizar pedidos
          </Text>
        </View>

        <Card style={styles.formCard}>
          <Card.Content style={styles.form}>
            <TextInput
              label="Email"
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
              label="Contraseña"
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

            <View style={styles.optionsRow}>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={rememberMe ? 'checked' : 'unchecked'}
                  onPress={() => setRememberMe(!rememberMe)}
                />
                <Text variant="bodyMedium">Recordarme</Text>
              </View>

              <Button
                mode="text"
                onPress={handleForgotPassword}
                compact
                textColor={theme.colors.primary}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </View>

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
              disabled={loading}
              icon={loading ? undefined : "login"}
            >
              {loading ? <ActivityIndicator color={theme.colors.onPrimary} /> : 'Iniciar Sesión'}
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.registerSection}>
          <Text variant="bodyMedium" style={styles.registerText}>
            ¿No tienes cuenta?
          </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            textColor={theme.colors.primary}
          >
            Regístrate aquí
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    marginBottom: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    opacity: 0.7,
  },
});

export default LoginScreen;
