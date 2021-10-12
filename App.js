import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import firebaseApp from "./firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import MainScreen from "./components/Main";
import LoginScreen from "./components/auth/Login";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";
import ChatScreen from "./Chat /Chat";
import CalenderScreen from "./components/main/Calender";

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const Appf = ({ navigation }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
      // setLoggedIn(user !==)
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initalRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerStyle: {
                backgroundColor: '#708E7C',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerStyle: {
                backgroundColor: '#708E7C',
                
              },
              headerTintColor: 'white',
              
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
 
      <NavigationContainer>
        <Stack.Navigator initalRouteName="Main">
          <Stack.Screen name="Kindergarten" component={MainScreen} />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            navigation={navigation}
            options={{ title: "Awesome app" }}
          />
          <Stack.Screen
            name="Save"
            component={SaveScreen}
            navigation={navigation}
          />
        </Stack.Navigator>
      </NavigationContainer>

     <NavigationContainer> 
        <Drawer.Navigator initialRouteName="Profile" screenOptions={{
          headerStyle: {
            backgroundColor: '#708E7C',
            color: 'white',
            justifyContent: 'right'
          },
          headerTintColor: "white",

    drawerStyle: {
      backgroundColor: '#708E7C',
      width: 240,
    
    },
    overlayColor: {
      backgroundColor:'white',
      opacity: 0.1,
    },
    drawerIcon: {
      justifyContent: 'right'
    },
    drawerLabelStyle:{
      color: 'white'
    },
    drawerPosition: 'right'
  }} >
          <Drawer.Screen name="Kindergarten" component={MainScreen} drawerStyle={{backgroundColor: 'black'}}/>
          <Drawer.Screen name="Chat" component={ChatScreen} />
          <Drawer.Screen name="Calendar" component={CalenderScreen}/>
        

        </Drawer.Navigator>
      </NavigationContainer> *
    </Provider>
  );
};
// export class App extends Component {
//   constructor(props){
//     super();
//     this.state = {
//       loaded: false,

//     }
//   }
//   componentDidMount(){
//     firebase.auth().onAuthStateChanged((user) =>{
//       if(!user){
//         this.setState({
//           loggedIn: false,
//           loaded: true,
//         })
//       }else{
//         this.setState({
//           loggedIn: true,
//           loaded: true,
//         })
//       }
//     })
//   }
//   render() {
//     const { loggedIn, loaded } = this.state;
//     if(!loaded){
//       return(
//         <View style={{ flex: 1, justifyContent: 'center'}}>
//           <Text>Loading</Text>
//         </View>
//       )
//     }
//     if(!loggedIn){
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initalRouteName="Landing">
//           <Stack.Screen name="Landing" component={ LandingScreen } options={{ headerShown: false}}/>
//           <Stack.Screen name="Register" component={ RegisterScreen } />
//           <Stack.Screen name="Login" component={ LoginScreen } />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
//   return(
//     <Provider store={store}>
//      <NavigationContainer>
//       <Stack.Navigator initalRouteName="Main">
//           <Stack.Screen name="Main" component={ MainScreen } />
//           <Stack.Screen name="Add" component={ AddScreen } navigation={this.props.navigation} />
//           <Stack.Screen name="Save" component={ SaveScreen } navigation={this.props.navigation} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>

//   )
// }
// }

export default Appf;
