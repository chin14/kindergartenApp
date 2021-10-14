import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  clearData,
} from "../redux/actions/index";
import {useUser} from '../hooks/Users';
import firebase from "firebase/app";

import FeedScreen from "./main/Feed";
import ProfileScreen from "./main/Profile";
import SearchScreen from "./main/Search";
import CalenderScreen from "./main/Calender";
import ChatScreen from "../Chat /Chat";
import AddStack from "./main/AddStack";

//Material UI

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#C7BAA6",
  },
});
const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

const Main = (props) => {
  const user = useUser(firebase.auth().currentUser.uid);
  useEffect(() => {
    props.fetchUser();
    props.clearData();
    props.fetchUserPosts();
    props.fetchUserFollowing();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      labeled={false}
      barStyle={{ backgroundColor: "#708E7C" }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color="white"
              size={26}
            ></MaterialCommunityIcons>
          ),
        }}
      />
      {user?.role === "pädagoge" && <Tab.Screen
        name="AddContainer"
        component={AddStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-box"
              color="white"
              size={26}
            ></MaterialCommunityIcons>
          ),
        }}
      />}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Profile", {
              uid: firebase.auth().currentUser.uid,
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color="white"
              size={26}
            ></MaterialCommunityIcons>
          ),
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing, clearData },
    dispatch
  );

export default connect(null, mapDispatchProps)(Main);
