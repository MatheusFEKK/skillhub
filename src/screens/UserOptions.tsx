import { Text, View, ScrollView, Pressable, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import ButtonDark from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { BottomBarProps } from "../routes/BottomBar";
import { db } from "../firebase/connectionFirebase";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { PseudoHeader } from "../components/PseudoHeader";
import AsyncStorage from "@react-native-async-storage/async-storage"


export const UserOptions = ()=>{


    return(
        <View style={[styles.root, styles.defaultRootBackground]}>
            <View style={[styles.container, styles.flexDirectionRow, styles.justifyContentBetween , styles.alignItemsCenter, {height:45}]}>
                <Text style={[styles.fontSize4, {fontWeight:"700"}]}>Opções</Text>
                <Image 
                source={require("../images/IconPlaceHolderMaxHeightWidth.png")}
                style={{width: 40, height: 40}}
                />
        </View>
            
        </View>
    )
}