import { Stack, Link } from 'expo-router';
import { StatusBar, StatusBarStyle } from 'react-native';
import Map from '~/components/Map';
import SelectedScooterSheet from '~/components/SelectedScooterSheet';
import MapboxGeocoding from '../components/Geo';
import VendorMap from '../components/VendorMap';
export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Gocart', headerShown:false}} />
      <Map />
      {/* <VendorMap /> */}
      <SelectedScooterSheet />
    </>
  );
}
