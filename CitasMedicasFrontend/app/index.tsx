import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Inicio</Text>

      <Link href="/confirmacion">
        <Button title="Ir a Confirmación" />
      </Link>
    </View>
  );
}
