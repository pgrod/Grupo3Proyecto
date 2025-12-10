import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import { styles } from "./styles";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema de Citas Médicas</Text>

      <Link href="/login" asChild>
        <Button title="Iniciar Sesión" color="#4a90e2" />
      </Link>

      <View style={{ height: 10 }} />

      <Link href="/registro" asChild>
        <Button title="Registrarme" color="#4a90e2" />
      </Link>
    </View>
  );
}
