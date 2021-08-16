import React, { Component } from 'react'
import {  Button, TextInput, View } from 'react-native'
import firebase from 'firebase';

export class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            passwort: '',
           
        }
        
        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp(){
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) =>{
            console.log(result)
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    render() {
        return (
            <View>
               
                   <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                   <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    onPress={() => this.onSignUp()}
                    title="Sing in"
                />
            </View>
        )
    }
}

export default Login
