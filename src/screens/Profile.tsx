import { Text, View, ScrollView, Pressable, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import firestore from '@react-native-firebase/firestore';
import ButtonDark from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { NavigationPropStack } from "../routes/Stack";
import { BottomBarProps } from "../routes/BottomBar";
import { Button } from "react-native";
import PseudoHeader from "../components/Header";
import { HeaderHeightContext } from "@react-navigation/elements";

export const ProfileUser: React.FC = () => {

    const [userName, setUserName] = useState<null | string>();


    useEffect(()=>{
        const usuario = auth.currentUser;


        if(usuario){
            setUserName(usuario.displayName);
        }



    },[])


    const signOutUser = async () => {
        try {
            await signOut(auth)
            console.log("Disconnect from the account!");
        } catch (error) {
            console.log("It was not possible to log out from the app! " + error);
        }
    }
    const navigation = useNavigation<BottomBarProps>();

    return (
        <View style={[styles.root]}>
            <View style={[styles.container, styles.flexDirectionRow, styles.justifyContentBetween, styles.pV2 , styles.alignItemsCenter, {height:45}]}>
                <TouchableOpacity onPress={()=>{ navigation.navigate("Home")}}>
                    <Image style={{height: 40, width:40}} source={require("../images/back-icon.png")} />
                </TouchableOpacity>
                {userName ? <Text>{userName}</Text> : <Text>Profile</Text>}
                <Image 
                source={require("../images/IconPlaceHolderMaxHeightWidth.png")}
                style={{width: 40, height: 40}}
                />
            </View>
            <ScrollView>
                <View style={[styles.container, styles.mV2]}>

                    <ButtonDark PlaceHolderButtonDark="Desconectar" FunctionButtonDark={() => signOutUser()} />
                </View>
            </ScrollView>
        </View>
    )
}