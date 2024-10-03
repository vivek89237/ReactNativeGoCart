import {firestore} from "./firebaseConfig.ts";
import {ToastAndroid} from 'react-native';
import { 
    addDoc, 
    collection, 
    onSnapshot, 
    doc, 
    updateDoc,
    query, 
    where, 
    setDoc, 
    deleteDoc 
} from 'firebase/firestore';

let vendorRef = collection(firestore, "vendor");
let customerRef = collection(firestore, "customer");

// export const uploadVehicleInfo =(object)=>{
//     addDoc(postRef, object)
//     .then((res) => {
//         toast.success('Document has been uploaded.');
//     })
//     .catch((err) =>{
//         toast.error(err);
//     })
// }

export const getVehicleInfo = (setAllStatus) =>{
    onSnapshot(vendorRef, response =>{
        setAllStatus(response.docs.map((docs)=>{
            return {...docs.data(), id: docs.id}
        }))
        // console.log(response.docs.map((docs)=>{
        //     return {...docs.data(), id: docs.id}
        // }));
    })
}

export const getCustomer = (setAllStatus) =>{
    onSnapshot(customerRef, response =>{
        setAllStatus(response.docs.map((docs)=>{
            return {...docs.data(), id: docs.id}
        }))
        // console.log(response.docs.map((docs)=>{
        //     return {...docs.data(), id: docs.id}
        // }));
    })
}


export const updateVehicleInfo =(id, latitude, longitude)=>{
    let postToEdit = doc(vendorRef, id);
    updateDoc(postToEdit, {latitude: latitude, longitude: longitude})
    .then((res) => {
        ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
    })
    .catch((err) =>{
        ToastAndroid.show('Error', ToastAndroid.SHORT);
    })
}

