import React, {useState} from 'react'
import { Button, Image, TextInput, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import firebase from 'firebase';
require("firebase/firestore");
require("firebase/firebase-storage");


export default function Save(props) {
    const [caption, setcaption] = useState("");

    const uplaodImage = async() =>{
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath);

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
        .storage()
        .ref()
        .child(childPath)
        .put(blob)

        const taskProgress = snapshot =>{
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
         const taskCompleted = () =>{
             task.snapshot.ref.getDownloadURL().then((snapshot)=>{
                 savePostData(snapshot)
                 console.log(snapshot)
             })         
        }

        const taskError = snapshot =>{
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress,  taskError, taskCompleted)
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function () {
            props.navigation.popToTop()
        }))
    }
    return (
        <View style={{flex: 1}}>
                <Image source={{uri: props.route.params.image}}/>
                <TextInput
                placeholder="Write a Caption..." 
                onChangeText={(caption) => setcaption(caption)}/>
                <Button title="Save" onPress={() => uplaodImage()} />

        </View>
    )
}
