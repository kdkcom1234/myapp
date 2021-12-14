import * as React from "react";
import MapView, { Marker, Region, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  useEffect(() => {
    (async () => {
      // 위치정보 권한 요청
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        return;
      }

      // 현재 위치 얻어오고 state 업데이트
      let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
      console.log(location);
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          zoomControlEnabled
          toolbarEnabled
          showsMyLocationButton
          showsUserLocation
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {/* <Marker /> */}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 120,
  },
});
