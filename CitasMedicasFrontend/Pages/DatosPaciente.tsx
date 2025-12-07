import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { CitaContext } from '../Contexto/ContextoCita';

type Props = { navigation: any };

export default function DatosPaciente({ navigation }: Props) {
  // state declarations (initialize to empty strings or appropriate defaults)
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [genero, setGenero] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [correo, setCorreo] = useState('');

  // context inside component
  const { setPaciente } = useContext(CitaContext);

  const handleContinuar = () => {
    if (!nombre || !edad || !genero || !tipoSangre || !correo) {
      Alert.alert('Campos requeridos', 'Completa la información del paciente');
      return;
    }

    // update context and navigate
    setPaciente({ nombre, edad, peso, genero, tipoSangre, correo });
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos del paciente</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Edad" value={edad} onChangeText={setEdad} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Peso (kg)" value={peso} onChangeText={setPeso} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Género" value={genero} onChangeText={setGenero} style={styles.input} />
      <TextInput placeholder="Tipo de sangre" value={tipoSangre} onChangeText={setTipoSangre} style={styles.input} />
      <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} style={styles.input} keyboardType="email-address" />
      <Button title="Continuar" onPress={handleContinuar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }
});