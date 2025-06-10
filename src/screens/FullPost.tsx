import { View, Image, TouchableOpacity, Text } from "react-native";
import PostHome from "../hooks/Posts";
import { useEffect, useState } from "react";
import { NavigationScreenProp } from "../routes/Stack";
import { styles } from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";

export const FullPost = ({route} :NavigationScreenProp) => {
    const { getSpecficPost, post } = PostHome();
    const navigation = useNavigation<NavigationPropStack>();

    useEffect(() => {
        getSpecficPost(String(route.params.postId))
    },[]);
    
    useEffect(() => {
        post.forEach((doc) => {
            console.log("Id do post " + doc.IdPost)
        })
    },[post]);

    return(
        <View style={styles.root}>
           <View style={[styles.m3]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../images/back-icon.png')} />
                </TouchableOpacity>

                <View style={{alignSelf:'flex-start', margin:15, flexDirection:'row', alignItems:'center'}}>
                    <Image width={45} height={45} source={require('../images/userIcon.png')} />
                    <View style={{margin:10}}>
                        <Text style={{fontWeight:'bold'}}>{props.Username}</Text>
                        <Text style={{opacity:0.5}}>{}{'\n'}Post N: {props.IdPost}</Text>
                    </View>
                </View>
            </View> 
        </View>
    );
}