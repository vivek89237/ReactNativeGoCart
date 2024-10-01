import BottomSheet , {BottomSheetView } from '@gorhom/bottom-sheet';
import { Text , Image, View} from'react-native';
import { Button } from './Button';
import { useEffect, useRef } from 'react';
import {useScooter} from "~/provider/ScooterProvider";
import scooterImg from "~/assets/scooter.png"

export default function SelectedScooterSheet(){
    
    const {selectedScooter, isNearby} = useScooter();

    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(()=>{
        if(selectedScooter){
            bottomSheetRef.current?.expand();
        }
    }, [selectedScooter])

    return (
        <BottomSheet 
            ref={bottomSheetRef} 
            index={-1} 
            snapPoints={[200]}  
            enablePanDownToClose>
            <BottomSheetView style={{flex: 1, flexDirection:'row'}}>
                <View>
                    <Image source={scooterImg} style={{width: 50, height: 50}} />
                    <Text>Lime-s</Text>
                    <Text>Street</Text>
                </View>
                <View>
                    <Text>12 km</Text>
                </View>
                <View>
                    <Button title='Book Now' disabled={isNearby}  />
                </View>
            </BottomSheetView>
      </BottomSheet>
    );
}