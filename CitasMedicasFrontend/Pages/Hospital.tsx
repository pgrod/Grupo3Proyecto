import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ubicacion from '../Componentes/Ubicacion';

export default function Hospital() {
  // Puedes sustituir por datos reales desde Contexto
  const hospital = {
    nombre: 'Hospital Central',
    direccion: 'Blvd. Fuerzas Armadas, Comayagüela, FM',
    telefono: '+504 2222-2222'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del Hospital</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text>{hospital.nombre}</Text>
        <Text style={styles.label}>Dirección:</Text>
        <Text>{hospital.direccion}</Text>
        <Text style={styles.label}>Teléfono:</Text>
        <Text>{hospital.telefono}</Text>
      </View>
      <Ubicacion />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, gap: 6, borderWidth: 1, borderColor: '#eee' },
  label: { fontWeight: '600', marginTop: 8 }
});