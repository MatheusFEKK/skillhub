import { Text, View, ScrollView, Pressable, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/connectionFirebase";
import { ButtonDark } from "../components/ButtonDark";
import { useNavigation } from "@react-navigation/native";
import { BottomBarProps } from "../routes/BottomBar";
import { db } from "../firebase/connectionFirebase";
import { doc, getDoc } from "firebase/firestore";
import PseudoHeader from "../components/Header";

export const ProfileUser: React.FC = () => {

    const [userName, setUserName] = useState<null | string>();

    async function getUserNameProfile(){
        const usuario = auth.currentUser;
        const idUsuario = String(usuario?.uid);
        const docRef = doc(db, "users/" + idUsuario );
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            setUserName(docSnap.data()?.name);
            
        }else{
           console.log("User does not exists"); 
        }
    }


    useEffect(()=>{
        getUserNameProfile();
        
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
            <PseudoHeader />
            <ScrollView>
                <View style={[styles.container, styles.mV2]}>
                    <ButtonDark PlaceHolderButtonDark="Desconectar" FunctionButtonDark={() => signOutUser()} />
                </View>
            </ScrollView>
        </View>
    )
}