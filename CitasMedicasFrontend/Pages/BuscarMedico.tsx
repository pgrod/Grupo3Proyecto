import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

type Props = { navigation: any };

const ESPECIALIDADES = ['Medicina General', 'Pediatría', 'Cardiología', 'Dermatología'];

export default function BuscarMedico({ navigation }: Props) {
  const [especialidad, setEspecialidad] = useState<string | null>(null);

  const handleBuscar = () => {
    if (!especialidad) return;
    navigation.navigate('SeleccionHorario', { especialidad });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar médico</Text>
      {ESPECIALIDADES.map((esp) => (
        <TouchableOpacity
          key={esp}
          style={[styles.option, especialidad === esp && styles.selected]}
          onPress={() => setEspecialidad(esp)}
        >
          <Text>{esp}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Continuar" onPress={handleBuscar} disabled={!especialidad} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  option: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 8 },
  selected: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' }
});