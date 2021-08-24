import React from 'react'
import { StyleSheet, View, Button, Image} from 'react-native'


export default function Landing({ navigation }) {
    return (
        <View style={styles.root}>
        <View>
        <Image
                style={styles.image}
                source={require('../../assets/kg.png')}
                />

        </View>
        <View style = {styles.container}>
                
            <Button 
                color="green"
                title="Register"
                onPress={() => navigation.navigate("Register")}/>
        </View>

        <View style = {styles.container}>
            <Button
                color = "purple"
                title="Login"
                onPress={() => navigation.navigate("Login")}/>
        </View>
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
            flex: 1,
            backgroundColor: '#f5deb3',
            
        },
    image: {
        width: 200, 
        height: 100, 
        marginBottom: 5, 
        marginLeft: 80, 
        marginTop: 250,
        },
    container: {

            justifyContent: 'center',
            marginLeft: 110, 
            width: 150,
            marginBottom: 15, 
            
        },
})