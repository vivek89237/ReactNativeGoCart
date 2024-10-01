import {PropsWithChildren, createContext, useContext, useState, useEffect} from 'react'
import * as Location from 'expo-location';
import { getDirections } from '~/services/directions';

const ScooterContext = createContext({});

export default function ScooterProvider ({children} : PropsWithChildren) {
    const [direction, setDirection] = useState({});
    const [selectedScooter, setSelectedScooter] = useState({});
    const [isNearby, setIsNearby] = useState(false);


    console.log("selected: ", selectedScooter);

    useEffect(()=>{
      const fetchDircections = async ()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let myLocation = await Location.getCurrentPositionAsync({});

        const newDirection = await getDirections(
          [myLocation.coords.longitude, myLocation.coords.latitude],
          [selectedScooter?.longitude, selectedScooter?.latitude]
        );
        setDirection(newDirection);

      };

      if(selectedScooter) {
        fetchDircections();
      }
    }, [selectedScooter])

    return (
    <ScooterContext.Provider value ={{
      selectedScooter, 
      setSelectedScooter, 
      direction, 
      directionCoordinate: direction?.routes?.[0]?.geometry?.coordinates,
      routeTime: direction?.routes?.[0]?.duration,
      routeDistance: direction?.routes?.[0]?.distance,
      isNearby
      }}>
        {children}
    </ScooterContext.Provider>
  )
}

export const useScooter = () => useContext(ScooterContext);