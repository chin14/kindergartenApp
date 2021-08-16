import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index'
import firebase from 'firebase';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';
import SearchScreen from './main/Search';
import CalenderScreen from './main/Calender';




const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () =>{
    return(null)
}

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchUserPosts();
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
            <Tab.Screen name="Feed" component={FeedScreen} options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size}) =>(
                    <MaterialCommunityIcons name="home" color={ color } size={ 26 }></MaterialCommunityIcons>
                )
                }} />
                   <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation} 
                   options={{ 
                tabBarIcon: ({ color, size}) =>(
                    <MaterialCommunityIcons name="magnify" color={ color } size={ 26 }></MaterialCommunityIcons>
                )
                }} />
                <Tab.Screen name="AddContainer" component={EmptyScreen} 
                listeners={({ navigation }) =>({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Add")
                    }
                })}
                options={{ 
                tabBarIcon: ({ color, size}) =>(
                    <MaterialCommunityIcons name="plus-box" color={ color } size={ 26 }></MaterialCommunityIcons>
                )
                }} />
                <Tab.Screen name="Profile" component={ProfileScreen}
                     listeners={({ navigation }) =>({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                        }})}
                    options={{ 
                    tabBarIcon: ({ color, size}) =>(
                    <MaterialCommunityIcons name="account-circle" color={ color } size={ 26 }></MaterialCommunityIcons>
                )
                }} />
                <Tab.Screen name="Calender" component={CalenderScreen} options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size}) =>(
                    <MaterialCommunityIcons name="calendar-check" color={ color } size={ 26 }></MaterialCommunityIcons>
                )
                }} />
            {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
          </Tab.Navigator>  
        )
    }
}
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts}, dispatch)


export default connect(null,mapDispatchProps)(Main);
