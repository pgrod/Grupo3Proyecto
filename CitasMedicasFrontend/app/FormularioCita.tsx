import React from 'react';
import { View } from 'react-native';
// Local stub of FormularioCita to avoid missing module error
const FormularioCita: React.FC<{ onSubmit: (datos: any) => void }> = ({ onSubmit }) => {
  // Replace this stub with the real component from ../Componentes/FormularioCita when available
  return null;
};

interface Props {
  navigation: any;
}

export default function FormularioCitaPage({ navigation }: Props) {
  const handleSubmit = (datos: any) => {
    // Aquí podrías guardar la cita y navegar
    navigation.navigate('Cita', { datos });
  };

  return (
    <View>
      <FormularioCita onSubmit={handleSubmit} />
    </View>
  );
}