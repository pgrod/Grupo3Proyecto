import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useSearchParams } from 'expo-router/build/hooks';

export default function SeleccionDoctor() {
  const { especialidad } = useSearchParams<{ especialidad: string }>();

  const doctores = [
    { id: "1", nombre: "Dr. Pérez" },
    { id: "2", nombre: "Dra. Gómez" },
    { id: "3", nombre: "Dr. Martínez" },
  ];

  const seleccionarDoctor = async (doctor: { nombre: string }) => {
    try {
      // Traer citas guardadas
      const citasGuardadas = await AsyncStorage.getItem("citas");
      const citas = citasGuardadas ? JSON.parse(citasGuardadas) : [];

      // Agregar nueva cita
      citas.push({ especialidad, doctor: doctor.nombre, fecha: "Hoy" });

      // Guardar de nuevo
      await AsyncStorage.setItem("citas", JSON.stringify(citas));

      // Redirigir a pantalla de citas
      router.push("/citas");
    } catch (error) {
      console.error("Error guardando la cita:", error);
      alert("Ocurrió un error al guardar la cita. Intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Especialidad: {especialidad}</Text>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Selecciona un doctor:</Text>

      <FlatList
        data={doctores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => seleccionarDoctor(item)}>
            <Text>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
