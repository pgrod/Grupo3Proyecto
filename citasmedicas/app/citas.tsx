import { View, Text, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import ModalDetalle from "./modal";
import { styles } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Citas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCita, setSelectedCita] = useState({ especialidad: "", doctor: "", fecha: "" });
  const [citas, setCitas] = useState<{ especialidad: string; doctor: string; fecha: string }[]>([]);

  // Cargar citas guardadas desde AsyncStorage
  useEffect(() => {
    const cargarCitas = async () => {
      const citasGuardadas = await AsyncStorage.getItem("citas");
      if (citasGuardadas) setCitas(JSON.parse(citasGuardadas));
    };
    cargarCitas();
  }, []);

  const abrirModal = (cita: { especialidad: string; doctor: string; fecha: string }) => {
    setSelectedCita(cita);
    setModalVisible(true);
  };

  // Eliminar cita individual
  const eliminarCita = (index: number) => {
    Alert.alert(
      "Eliminar Cita",
      "¿Estás segura que quieres eliminar esta cita?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: async () => {
            const nuevasCitas = [...citas];
            nuevasCitas.splice(index, 1);
            setCitas(nuevasCitas);
            await AsyncStorage.setItem("citas", JSON.stringify(nuevasCitas));
          } 
        },
      ]
    );
  };

  // Limpiar todas las citas
  const limpiarCitas = () => {
    Alert.alert(
      "Limpiar todas las citas",
      "¿Estás segura que quieres borrar todo el registro?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, borrar todo", 
          style: "destructive", 
          onPress: async () => {
            setCitas([]);
            await AsyncStorage.removeItem("citas");
          } 
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Citas</Text>

      <FlatList
        data={citas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => abrirModal(item)}
            onLongPress={() => eliminarCita(index)}
          >
            <Text style={styles.cardText}>{item.especialidad} - {item.doctor}</Text>
            <Text>{item.fecha}</Text>
            <Text style={{ fontSize: 12, color: "#888" }}>Presiona largo para eliminar</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Nueva Cita" color="#4a90e2" onPress={() => router.push("/nueva-cita")} />
      <View style={{ height: 10 }} />
      <Button title="Limpiar Registro de Citas" color="#e94e77" onPress={limpiarCitas} />
      <View style={{ height: 10 }} />
      <Button title="Regresar al Inicio" color="#888" onPress={() => router.push("/")} />

      <ModalDetalle visible={modalVisible} onClose={() => setModalVisible(false)} cita={selectedCita} />
    </View>
  );
}
