import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mapbox, { MapView, Camera, LocationPuck } from '@rnmapbox/maps';
import { Searchbar } from 'react-native-paper';
import { featureCollection, point } from "@turf/helpers";
import scooters from "../data/scooters.json";
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { useScooter } from '../provider/ScooterProvider';
import LineRoute from './LineRoute';
import ShowVehicles from './ShowVehicles';
import {getVehicleInfo} from "../utils/Firebase"
import {getCoordinates} from "../services/directions";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  const { setSelectedScooter, directionCoordinate } = useScooter();
  const [vendors, setVendor] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  const points = vendors?.map(scooter => point([scooter.longitude, scooter.latitude], { scooter }));
  const scootersFeatures = featureCollection(points);

  const onPointPress = async (event: OnPressEvent) => {
    if (event.features[0]?.properties?.scooter) {
      setSelectedScooter(event.features[0].properties.scooter);
    }
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = vendors.filter(item =>
        item?.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  useEffect(()=>{
    getVehicleInfo(setVendor);
  },[])

  const address: string = "213B Dhiraj Nagar, Indore, Indore, Madhya Pradesh, India";

  useEffect(()=>{
    getCoordinates(address, setCoordinates);
  },[])
  

  // console.log('customer', customer);
  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView style={styles.map} styleURL="mapbox://styles/mapbox/dark-v11">
        <Camera followZoomLevel={10} followUserLocation />
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

        <ShowVehicles
          onPointPress={onPointPress}
          scootersFeatures={scootersFeatures}
        />
        

        {directionCoordinate && <LineRoute coordinates={directionCoordinate} />}
      </MapView>

      {/* Floating Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 50, // Adjust this value as needed to move the search bar
    left: 10,
    right: 10,
  },
  searchbar: {
    backgroundColor: '#A0D683',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 5, // Adds shadow for Android
  },
});

export default Map;
