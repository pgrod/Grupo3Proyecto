import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

type Props = {
  navigation: any;
};

export default function Login({ navigation }: Props) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    if (!correo || !contrasena) {
      Alert.alert('Campos requeridos', 'Ingresa tu correo y contraseña');
      return;
    }
    // Simulación: si es usuario nuevo, ir a DatosPaciente; si no, ir a Home
    const esNuevoUsuario = correo.endsWith('+nuevo@demo.com');
    if (esNuevoUsuario) {
      navigation.navigate('DatosPaciente', { correo });
    } else {
      navigation.navigate('Home', { correo });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput placeholder="Correo electrónico" value={correo} onChangeText={setCorreo} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Contraseña" value={contrasena} onChangeText={setContrasena} style={styles.input} secureTextEntry />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 16, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }
});