import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Pages/Home';
import Cita from './Pages/Cita';
import FormularioCita from './Pages/FormularioCita';
import Login from './Pages/Login';
import DatosPaciente from './Pages/DatosPaciente';
import Hospital from './Pages/Hospital';
import Historial from './Pages/Historial';
import BuscarMedico from './Pages/BuscarMedico';
import SeleccionHorario from './Pages/SeleccionHorario';
import Confirmacion from './Pages/Confirmacion';

import { CitaProvider } from './Contexto/ContextoCita';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CitaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="DatosPaciente" component={DatosPaciente} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Hospital" component={Hospital} />
          <Stack.Screen name="Historial" component={Historial} />
          <Stack.Screen name="BuscarMedico" component={BuscarMedico} />
          <Stack.Screen name="SeleccionHorario" component={SeleccionHorario} />
          <Stack.Screen name="Confirmacion" component={Confirmacion} />
          <Stack.Screen name="FormularioCita" component={FormularioCita} />
          <Stack.Screen name="Cita" component={Cita} />
        </Stack.Navigator>
      </NavigationContainer>
    </CitaProvider>
  );
}