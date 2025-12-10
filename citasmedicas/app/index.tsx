import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import { styles } from "./styles";
import Toast from "react-native-toast-message";

export default function Home() {
  // Función de ejemplo para mostrar un toast
  const showWelcomeToast = () => {
    Toast.show({
      type: "success",
      text1: "¡Bienvenida!",
      text2: "Bienvenida al Sistema de Citas Médicas 👋",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema de Citas Médicas</Text>

      <Link href="/login" asChild>
        <Button title="Iniciar Sesión" color="#4a90e2" onPress={showWelcomeToast} />
      </Link>

      <View style={{ height: 10 }} />

      <Link href="/registro" asChild>
        <Button title="Registrarme" color="#4a90e2" onPress={showWelcomeToast} />
      </Link>

      {/* Toast global */}
      <Toast />
    </View>
  );
}

