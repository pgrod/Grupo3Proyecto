
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Ubicacion() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
        latitude: 15.7597,
        longitude: -86.7822,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 14.0723, longitude: -87.1921 }}
          title="Hospital EuroHonduras"
          description="Ubicación de la cita médica"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});