import React from 'react';
import { View, Text, Button } from 'react-native';

export const ListaCitas: React.FC = () => {
  return (
    <View>
      <Text>Lista de citas</Text>
    </View>
  );
};

export default function Home({ navigation }: { navigation: any }) {
  return (
    <View>
      <ListaCitas />
      <Button title="Agendar nueva cita" onPress={() => navigation.navigate('FormularioCita')} />
    </View>
  );
}