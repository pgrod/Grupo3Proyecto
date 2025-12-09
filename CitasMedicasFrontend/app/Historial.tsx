import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CitaContext } from '../Contexto/ContextoCita';

export const ListaCitas: React.FC = () => {
  const { citas } = useContext(CitaContext);

  if (!citas || citas.length === 0) {
    return (
      <View>
        <Text>No hay citas</Text>
      </View>
    );
  }

  return (
    <View>
      {citas.map((cita: { especialidad: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; dia: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; hora: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, i: React.Key | null | undefined) => (
        <Text key={i}>
          {cita.especialidad} - {cita.dia} {cita.hora}
        </Text>
      ))}
    </View>
  );
};

export default function Historial() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de citas</Text>
      <ListaCitas />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' }
});