import { View, Text, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import ModalDetalle from "./modal";
import { styles } from "./styles";

export default function Citas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCita, setSelectedCita] = useState({ especialidad: "", doctor: "", fecha: "" });
  const [citas, setCitas] = useState<{ especialidad: string; doctor: string; fecha: string }[]>([]);

  // Cargar citas guardadas
  useEffect(() => {
    const citasGuardadas = JSON.parse(localStorage.getItem("citas") || "[]");
    setCitas(citasGuardadas);
  }, []);

  // Abrir modal
  const abrirModal = (cita: { especialidad: string; doctor: string; fecha: string }) => {
    setSelectedCita(cita);
    setModalVisible(true);
  };

  // Eliminar cita
  const eliminarCita = (index: number) => {
    Alert.alert(
      "Eliminar Cita",
      "¿Estás segura que quieres eliminar esta cita?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => {
            const nuevasCitas = [...citas];
            nuevasCitas.splice(index, 1);
            setCitas(nuevasCitas);
            localStorage.setItem("citas", JSON.stringify(nuevasCitas));
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
            onLongPress={() => eliminarCita(index)} // Eliminar con presión larga
          >
            <Text style={styles.cardText}>{item.especialidad} - {item.doctor}</Text>
            <Text>{item.fecha}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Botón Nueva Cita */}
      <Button title="Nueva Cita" color="#4a90e2" onPress={() => router.push("/nueva-cita")} />

      <View style={{ height: 10 }} />

      {/* Botón Regresar al inicio */}
      <Button title="Regresar al Inicio" color="#e94e77" onPress={() => router.push("/")} />

      {/* Modal para ver detalles */}
      <ModalDetalle visible={modalVisible} onClose={() => setModalVisible(false)} cita={selectedCita} />
    </View>
  );
}
