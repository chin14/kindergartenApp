import React, { useState } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import firebase from 'firebase/app';
import "firebase/firestore";
import { Button, Checkbox} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    box:{
        marginLeft: 16,
        
    },
    btn:{
        marginLeft: 13,
        marginRight: 13,
        backgroundColor: "green",
        color: "white",
        borderRadius: 30,
    }
})
const Register = () =>{
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isTeacher, setIsTeacher] = useState(false);

  
    function onSignUp(){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) =>{
                firebase.firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                        role: isTeacher ? "teacher" : "parent"
                    })
                console.log(result)
            })
            .catch((error) =>{
            console.log(error)
        })

  }
      return (
          <View 
          style={styles.root}
          >
              

            <TextInput
                 style={styles.input}
                 placeholder="name"
                 onChangeText={(name) => setName( name )}
             />
          
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

              <FormControlLabel
                    label="Ich bin Pädagoge"
                    control=
                    {<Checkbox
                        className={classes.box}
                        value={isTeacher}
                        onChange={setIsTeacher}
                        />}
                    />
         
              <Button
                  className={classes.btn}
                  onClick={onSignUp}
                  size="medium"
                  variant="outlined"
                  
                 
              >On Sign Up</Button>
           
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

export default Register
