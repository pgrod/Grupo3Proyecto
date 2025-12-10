import { View, Text, Button, Modal } from "react-native";
import { styles } from "./styles";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  cita: { especialidad?: string; doctor?: string; fecha?: string };
}

export default function ModalDetalle({ visible, onClose, cita }: ModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 22, marginBottom: 10 }}>Detalles de la cita</Text>
          <Text style={{ fontSize: 18 }}>Especialidad: {cita.especialidad}</Text>
          <Text style={{ fontSize: 18 }}>Doctor: {cita.doctor}</Text>
          <Text style={{ fontSize: 18 }}>Fecha: {cita.fecha}</Text>

          <Button title="Cerrar" onPress={onClose} color="#4a90e2" />
        </View>
      </View>
    </Modal>
  );
}
