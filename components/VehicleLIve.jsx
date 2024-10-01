import { getUID } from "../utils/getUID";
import { getVehicleInfo } from "../utils/Firebase";
import * as Location from 'expo-location';

export default function VehicleLive(){
    return (

    );
}

const updateTaxiLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  
    const location = await Location.getCurrentPositionAsync({ 
      accuracy: Location.Accuracy.High, 
      distanceInterval: 10 // Update location every 10 meters
    });
  
    const locationRef = database.ref('taxi/location');
    locationRef.set({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

setInterval(updateTaxiLocation, 5000);