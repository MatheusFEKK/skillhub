import { Text, View, ScrollView, Pressable, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import ButtonDark from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { BottomBarProps } from "../routes/BottomBar";
import { db } from "../firebase/connectionFirebase";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { PseudoHeaderNavigateProps } from "../types/PseudoHeaderType";

export const PseudoHeader = (navigate:string, headerTitle:string)=>{



    const navigation = useNavigation<PseudoHeaderNavigateProps>()


    return(
        <View style={[styles.container, styles.flexDirectionRow, styles.justifyContentBetween, styles.pV2 , styles.alignItemsCenter, {height:45}]}>
                <TouchableOpacity onPress={()=> navigation.navigate(`${navigate ? "Home" : "Profile"}`)}>
                    <Image style={{height: 40, width:40}} source={require("../images/back-icon.png")} />
                </TouchableOpacity>
                {headerTitle ? <Text>{headerTitle}</Text> : <Text>N/A</Text>}
                <Image 
                source={require("../images/IconPlaceHolderMaxHeightWidth.png")}
                style={{width: 40, height: 40}}
                />
        </View>
    )
}



