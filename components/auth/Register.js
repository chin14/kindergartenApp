import React, { useState } from 'react'
import {  Button, TextInput, View } from 'react-native'
import firebase from 'firebase/app';
import "firebase/firestore";


const Register = () =>{
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');

  
    function onSignUp(){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) =>{
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log(result)
            })
            .catch((error) =>{
            console.log(error)
        })

  }
      return (
          <View>
            <TextInput
                 placeholder="name"
                 onChangeText={(name) => setName({ name })}
             />
          
              <TextInput
                  placeholder="email"
                  onChangeText={(email) => setEmail({ email })}
              />
              <TextInput
                  placeholder="password"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword({ password })}
              />
  
              <Button
                  onPress={onSignUp}
                  title="Sing in"
              />
          </View>
      )
    }


// export class Register extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             email: '',
//             passwort: '',
//             name: ''
//         }
        
//         this.onSignUp = this.onSignUp.bind(this)
//     }
//     onSignUp(){
//         const { email, password, name } = this.state;
//         firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((result) =>{
//             firebase.firestore().collection("users")
//                 .doc(firebase.auth().currentUser.uid)
//                 .set({
//                     name,
//                     email
//                 })
//             console.log(result)
//         })
//         .catch((error) =>{
//             console.log(error)
//         })
//     }

//     render() {
//         return (
//             <View>
//                 <TextInput
//                     placeholder="name"
//                     onChangeText={(name) => this.setState({ name })}
//                 />
//                    <TextInput
//                     placeholder="email"
//                     onChangeText={(email) => this.setState({ email })}
//                 />
//                    <TextInput
//                     placeholder="password"
//                     secureTextEntry={true}
//                     onChangeText={(password) => this.setState({ password })}
//                 />

//                 <Button
//                     onPress={() => this.onSignUp()}
//                     title="Sing Up"
//                 />
//             </View>
//         )
//     }
// }

export default Register
