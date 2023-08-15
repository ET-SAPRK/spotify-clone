import { StyleSheet, Text ,View ,SafeAreaView ,ScrollView ,Image ,Pressable , FlatList} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = ({route}) => {
  const [userProfile, setUserProfile] = useState();
  // const navigation = useNavigation();
  // const {access_token } = route.params;

  const getProfile = async () => {
  //   try {
  //     const response = await fetch("https://api.spotify.com/v1/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setUserProfile(data);
  //     return data;
  //   } catch (err) {
  //     console.log(err.message);
  //   }
   };
  useEffect(() => {
    //console.log(access_token);
  }, []);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
       <ScrollView style={{ marginTop: 50 }}>
       <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{ uri: userProfile?.images[0].url }}
            />
          </View>
        </View>
       </ScrollView>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})