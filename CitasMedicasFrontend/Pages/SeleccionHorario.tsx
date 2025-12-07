import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

type Props = { navigation: any; route: any };

const HORARIOS = ['08:00', '09:30', '11:00', '13:30', '15:00', '16:30'];

export default function SeleccionHorario({ navigation, route }: Props) {
  const { especialidad, disponible } = route.params ?? {};
  const [dia, setDia] = useState('2025-12-08'); // ejemplo
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);

  const confirmar = () => {
    if (!horaSeleccionada) return;
    navigation.navigate('Confirmacion', { especialidad, dia, hora: horaSeleccionada });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona horario</Text>
      <Text style={styles.info}>Especialidad: {especialidad}</Text>
      <Text style={styles.info}>Médico disponible: {disponible ? 'Sí' : 'No (lista limitada)'}</Text>

      <Text style={styles.label}>Día</Text>
      <Text style={styles.day}>{dia}</Text>

      <FlatList
        data={HORARIOS}
        keyExtractor={(h) => h}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setHoraSeleccionada(item)}
            style={[styles.slot, horaSeleccionada === item && styles.selected]}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ gap: 8 }}
      />

      <Button title="Confirmar" onPress={confirmar} disabled={!horaSeleccionada} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  info: { textAlign: 'center' },
  label: { fontWeight: '600' },
  day: { textAlign: 'center', marginBottom: 8 },
  slot: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  selected: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' }
});