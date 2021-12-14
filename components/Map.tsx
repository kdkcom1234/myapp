import * as React from "react";
import MapView, { Marker, Region, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const [locationList, setLocationList] = useState([
    { latitude: 37.5025936, longitude: 127.029604, title: "역삼공원" },
    { latitude: 37.4984548, longitude: 127.0211041, title: "명달공원" },
    { latitude: 37.4972322, longitude: 127.0307145, title: "역삼까치공원" },
  ]);

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
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {locationList.length > 0 &&
            locationList.map((loc) => (
              <Marker
                key={loc.title}
                title={loc.title}
                coordinate={{
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                }}
              />
            ))}
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
