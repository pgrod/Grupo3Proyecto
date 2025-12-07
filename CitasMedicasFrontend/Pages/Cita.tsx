import React from 'react';
import { View, Text } from 'react-native';

type Datos = {
  nombre: string;
  fecha: string;
  hora: string;
};

type Props = {
  route: {
    params: {
      datos: Datos;
    };
  };
};

export default function Cita({ route }: Props) {
  const { datos } = route.params;

  return (
    <View>
      <Text>Confirmación de cita</Text>
      <Text>Paciente: {datos.nombre}</Text>
      <Text>Fecha: {datos.fecha}</Text>
      <Text>Hora: {datos.hora}</Text>
    </View>
  );
}