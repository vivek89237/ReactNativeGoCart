import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Mapbox, {
  MapView,
  Camera, 
  LocationPuck,
  } from '@rnmapbox/maps';


//import {uploadStatus, getPosts} from '../utils/Firebase';

import {featureCollection, point} from "@turf/helpers";
import scooters from "../data/scooters.json";
import {OnPressEvent} from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { useScooter } from '../provider/ScooterProvider';
import LineRoute from './LineRoute';
import ShowVehicles from './ShowVehicles';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {

  const {setSelectedScooter, directionCoordinate, routeTime, routeDistance} = useScooter();

  //console.log("time", routeTime);

  const points = scooters.map(scooter => point([scooter.longitude, scooter.latitude], {scooter}))
  const scootersFeatures = featureCollection(points);

  

  const onPointPress  = async (event: OnPressEvent) =>{
    if(event.features[0]?.properties?.scooter){
      setSelectedScooter(event.features[0].properties.scooter);
    }
  }

  
  // const [data, setData ] = useState({});
  // useEffect(()=>{
  //   getPosts(setData);
  // },[])
  //console.log(data[0]?.userName);

  return (
    <MapView style={{flex:1}} styleURL="mapbox://styles/mapbox/dark-v11" >
        <Camera followZoomLevel={10} followUserLocation />
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

        <ShowVehicles 
          onPointPress = {onPointPress}
          scootersFeatures = {scootersFeatures}
        />

        {directionCoordinate && <LineRoute coordinates={directionCoordinate} /> }
    </MapView> 
  )
}

export default Map

const styles = StyleSheet.create({})