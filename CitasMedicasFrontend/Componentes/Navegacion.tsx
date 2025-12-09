import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../app/Home';
import FormularioCita from '../app/FormularioCita';
import Cita from '../app/Cita';

export default function Navegacion() {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="FormularioCita" component={FormularioCita} />
                <Tab.Screen name="Cita" component={Cita} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}