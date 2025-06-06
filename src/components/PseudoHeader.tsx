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
import { PseudoHeaderNavigateProps, PseudoHeaderType } from "../types/PseudoHeaderType";

interface Props  {
    navigate:string;
    headerTitle:string | undefined;
}





export const PseudoHeader: React.FC<Props> = (Props) =>{

    const navigation = useNavigation<PseudoHeaderNavigateProps>()

    const navigationHandler = () =>{
        let rota : keyof PseudoHeaderType;
        switch (Props.navigate) {
            case "Home":
            case "Profile":
            case "Options":

                rota = Props.navigate;
            break;
            default:
                rota = "Home";
            break;
        }
        navigation.navigate(rota);
    }




    return(
        <View style={[styles.container, styles.flexDirectionRow, styles.justifyContentBetween , styles.alignItemsCenter, {height:45}]}>
                <TouchableOpacity onPress={navigationHandler}>
                    <Image style={{height: 35, width:35, objectFit:'fill'}} source={require("../images/return.png")} />
                </TouchableOpacity>
                {Props.headerTitle ? <Text style={[styles.fontSize3, {fontWeight:"700"}]}>{Props.headerTitle}</Text> : <Text style={styles.fontSize4}>N/A</Text>}
                <Image 
                source={require("../images/IconPlaceHolderMaxHeightWidth.png")}
                style={{width: 40, height: 40}}
                />
        </View>
    )
}



