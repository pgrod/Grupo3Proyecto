import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { useSearchParams } from "expo-router/build/hooks";

export default function SeleccionDoctor() {
  const { especialidad } = useSearchParams<{ especialidad: string }>();
  const doctores = [
    { id: "1", nombre: "Dr. Pérez" },
    { id: "2", nombre: "Dra. Gómez" },
    { id: "3", nombre: "Dr. Martínez" },
  ];

  const seleccionarDoctor = (doctor: { nombre: string }) => {
    const citasGuardadas = JSON.parse(localStorage.getItem("citas") || "[]");
    citasGuardadas.push({ especialidad, doctor: doctor.nombre, fecha: "Hoy" });
    localStorage.setItem("citas", JSON.stringify(citasGuardadas));
    router.push("/citas");
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

