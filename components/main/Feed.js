import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {useAllPosts} from '../../hooks/Posts';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import firebase from 'firebase/app';
import 'firebase/firestore'
import { Typography } from '@material-ui/core';



const useStyles = makeStyles({
  avatar:{
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 5,
  },
})
function Feed(props) {
  const classes = useStyles();
  const posts = useAllPosts(firebase.auth().currentUser.uid);
  const [user, setUser] = useState(() => {
    const user = firebase.auth().currentUser;

    return user;
  });
  return (
   
      <ScrollView style={styles.root}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} key={item.downloadURL + `?${new Date()}`} source={{ uri: item.downloadURL  }} />
              <View style={styles.container}>
                 <Avatar alt={user.name} className={classes.avatar}/> 
                </View>
               <Text style={styles.containerInfo}>{item.caption}</Text>
              <Divider />
            </View>
          )}
        />
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  root:{
    backgroundColor: "white"
  },
  container: {
    display: "flex"
  },
  containerInfo: {
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 20,
  },
  // containerGallery: {
  //   flex: 1,
  // },
  containerImage: {
    marginTop: 15,
    marginBottom: 30,
  },
  image: {
    resizeMode:"cover",
    aspectRatio: 1/1,
    
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersLoaded: store.usersState.usersLoaded,

});

export default connect(mapStateToProps, null)(Feed);

