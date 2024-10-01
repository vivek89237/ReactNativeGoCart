import {firestore} from "./firebase";
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

let vehicleRef = collection(firestore, "posts");

export const uploadVehicleInfo =(object)=>{
    addDoc(postRef, object)
    .then((res) => {
        toast.success('Document has been uploaded.');
    })
    .catch((err) =>{
        toast.error(err);
    })
}

export const getVehicleInfo = (setAllStatus) =>{
    onSnapshot(postRef, response =>{
        setAllStatus(response.docs.map((docs)=>{
            return {...docs.data(), id: docs.id}
        }))
        // console.log(response.docs.map((docs)=>{
        //     return {...docs.data(), id: docs.id}
        // }));
    })
}

export const updateVehicleInfo =(id, location)=>{
    let postToEdit = doc(postRef, id);
    updateDoc(postToEdit, {location})
    .then((res) => {
        toast.success('Post has been updated.');
    })
    .catch((err) =>{
        toast.error(err);
    })
}

