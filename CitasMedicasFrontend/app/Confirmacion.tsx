import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { CitaContext } from '../Contexto/ContextoCita';

type Props = {
  navigation: any;
  route: { params: { especialidad: string; dia: string; hora: string } };
};

export default function Confirmacion({ navigation, route }: Props) {
  const { especialidad, dia, hora } = route.params;
  const { agregarCita, paciente } = useContext(CitaContext);

  const finalizar = () => {
    agregarCita({
      paciente,
      especialidad,
      dia,
      hora
    });
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmación de la cita</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Especialidad:</Text>
        <Text>{especialidad}</Text>
        <Text style={styles.label}>Día:</Text>
        <Text>{dia}</Text>
        <Text style={styles.label}>Hora:</Text>
        <Text>{hora}</Text>
      </View>
      <Button title="Confirmar y regresar al inicio" onPress={finalizar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, gap: 6, borderWidth: 1, borderColor: '#eee' },
  label: { fontWeight: '600', marginTop: 8 }
});