import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Mapbox, {MapView, Camera, LocationPuck} from '@rnmapbox/maps';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  return (
    <MapView style={{flex:1}} styleURL="mapbox://styles/mapbox/dark-v11" >
        <Camera followZoomLevel={14} followUserLocation />
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
    </MapView> 
  )
}

export default Map

const styles = StyleSheet.create({})