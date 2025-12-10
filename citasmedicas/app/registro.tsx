import { View, Text, TextInput, Button } from "react-native";
import { Link } from "expo-router";
import { styles } from "./styles";

export default function Registro() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput placeholder="Nombre" style={styles.input} />
      <TextInput placeholder="Correo" style={styles.input} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />

      <Link href="/citas" asChild>
        <Button title="Registrarme" color="#4a90e2" />
      </Link>

      <View style={{ height: 10 }} />

      <Link href="/" asChild>
        <Button title="Cancelar" color="#e94e77" />
      </Link>
    </View>
  );
}

