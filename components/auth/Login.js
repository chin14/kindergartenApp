import React, { useState } from 'react'
import {  TextInput, View, StyleSheet } from 'react-native'
import firebase from 'firebase/app';
import { Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    
    btn:{
        marginLeft: 13,
        marginRight: 13,
        backgroundColor: "green",
        color: "white",
        borderRadius: 30,
    }
})

const Login = () =>{
  const classes = useStyles();
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');


  function onSignUp(){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) =>{
        console.log(result)
    })
    .catch((error) =>{
        console.log(error)
    })
}
    return (
        <View  style={styles.root}>
        
            <TextInput
                style={styles.input}
                placeholder="email"
                onChangeText={(email) => setEmail( email )}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword( password )}
            />

            <Button
                onClick={onSignUp}
                className={classes.btn}
                size="medium"
                variant="outlined"
                
            >On Sign In</Button>
        </View>
    )
  }


// export class Login extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             email: '',
//             passwort: '',
           
//         }
        
//         this.onSignUp = this.onSignUp.bind(this)
//     }
//     onSignUp(){
//         const { email, password } = this.state;
//         firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((result) =>{
//             console.log(result)
//         })
//         .catch((error) =>{
//             console.log(error)
//         })
//     }

//     render() {
//         return (
//             <View>
               
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
//                     title="Sing in"
//                 />
//             </View>
//         )
//     }
// }

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F4D1BB',
       
        
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 30,
        
    },

  });

export default Login
