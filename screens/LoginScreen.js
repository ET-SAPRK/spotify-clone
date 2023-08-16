import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest,ResponseType } from 'expo-auth-session';
import { Button } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: 'your client Id',
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public" // or "playlist-modify-private"
      ],
      usePKCE: false,
      redirectUri: 'exp://192.168.43.207:19000/--/'
      // redirectUri: makeRedirectUri({
      //   scheme: 'exp://localhost:19000/--/'
      // }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      
      // Fetch data from the API using the access token
      fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(response => response.json()) // Parse the response JSON
      .then(data => {
        // Now you can do whatever you want with the fetched data
        navigation.navigate("Main", { data:data.images[0].url });
        AsyncStorage.setItem("token",access_token);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
      
      
    }
  }, [response]);
  

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 50 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={60}
          color="white"
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on spotify!
        </Text>

        <View style={{ height: 50 }} />
        <Pressable
         disabled={!request}
         onPress={() => {promptAsync()}}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical:10
          }}
        >
          <Text>Sign In with spotify</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with phone number</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
        <AntDesign name="google" size={24} color="red" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with Google</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
         <Entypo name="facebook" size={24} color="blue" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Sign In with facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}