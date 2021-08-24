import React, { useState, useEffect } from "react";
import MapView, { Region, Marker } from "react-native-maps";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState<null | Location.LocationObject>(
    null
  );
  const [region, setRegion] = useState<Region>();
  const [marker, setMarker] = useState<Region[]>();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  useEffect(() => {
    const handleLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // -21.5492778,-45.4214182
      setRegion({
        // latitude: location.coords.latitude,
        // longitude: location.coords.longitude,
        // latitude: -21.5492778,
        // longitude: -45.4214182,
        latitude: -21.5631541,
        longitude: -45.4386853,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setMarker([
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        {
          latitude: -21.5492778,
          longitude: -45.4214182,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
      ]);
    };
    handleLocation();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {!region && <Text style={styles.paragraph}>{text}</Text>}
      {region && (
        <MapView style={styles.map} region={region}>
          {marker && marker.map((item) => <Marker coordinate={item} />)}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
