import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { styles } from "./styles";

const especialidades = [
  { id: "1", nombre: "Medicina General" },
  { id: "2", nombre: "Odontología" },
  { id: "3", nombre: "Pediatría" },
];

export default function NuevaCita() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona Especialidad</Text>

      <FlatList
        data={especialidades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/seleccion-doctor",
              params: { especialidad: item.nombre },
            }}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <Text>{item.nombre}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

